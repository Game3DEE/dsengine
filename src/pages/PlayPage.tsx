import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Canvas, GroupProps, useFrame } from 'react-three-fiber'
import { Stats } from '@react-three/drei'
import { Object3D, Vector3 } from 'three'

import { LevelRenderer } from '../components/LevelRenderer'
import { Player } from '../components/Player'
import { useKeyboard } from '../hooks/useKeyboard'

import { Level, SubTilePhysics } from '../Level'

import './PlayPage.css'

interface SceneOwnProps {
    level: Level
}
type SceneProps = SceneOwnProps & GroupProps

interface PageParams {
    level?: string
}

function Scene({ level }: SceneProps) {
    const lightRef = React.useRef<Object3D>()
    const playerRef = React.useRef<Object3D>()
    const tmpVec = React.useRef<Vector3>(new Vector3())
    const cameraRef = React.useRef<Object3D>()
    const [ playerAnim, setPlayerAnim ] = React.useState('Idle')
    const [ debug, setDebug ] = React.useState(false)

    const physGridSize = level.size * 3
    const halfLevelSize = level.size / 2;

    const physicsMap = React.useMemo(() => level.createPhysicsMap(), [level])

    const inputs = {
        left: false,
        right: false,
        forward: false,
        backward: false,
        attack: false,
    }

    useFrame(({ camera }) => {
        if (playerRef.current && cameraRef.current) {
            // Update camera

            cameraRef.current.getWorldPosition(tmpVec.current)
            camera.position.lerp(tmpVec.current, 0.05)
            const pos = playerRef.current.position
            camera.lookAt(pos.x, pos.y + 0.5, pos.z)

            // Update rotation
            if (inputs.left) {
                playerRef.current.rotation.y += Math.PI * 0.005
            }
            if (inputs.right) {
                playerRef.current.rotation.y += -Math.PI * 0.005
            }
            if (inputs.forward || inputs.backward) {
                tmpVec.current.set(0, 0, inputs.forward ? 0.01 : -0.01)
                tmpVec.current.applyQuaternion(playerRef.current.quaternion)
                tmpVec.current.add(playerRef.current.position)

                // Check if we can actually move there
                let physGridX = Math.floor((tmpVec.current.x + halfLevelSize) / (1/3));
                let physGridY = Math.floor((tmpVec.current.z + halfLevelSize) / (1/3));
                //console.log(Math.floor(physGridX / 3) - halfLevelSize, Math.floor(physGridY / 3) - halfLevelSize, physGridX % 3, physGridY % 3)

                if (physicsMap[physGridY * physGridSize + physGridX] === SubTilePhysics.Walkable) {
                    playerRef.current.position.copy(tmpVec.current)
                }
            }
        }
    });

    useKeyboard(event => {
        const down = event.type === 'keydown'
        const cameraStep = 0.1;
        const cam = cameraRef.current;

        switch(event.key.toLowerCase()) {
            case 'arrowup':
                cam && (cam.position.y -= cameraStep);
                break;
            case 'arrowdown':
                cam && (cam.position.y += cameraStep);
                break;
            case 'arrowleft':
                cam && (cam.position.x  -= cameraStep);
                break;
            case 'arrowright':
                cam && (cam.position.x += cameraStep);
                break;
            case '1':
                cam && cam.position.set(.7,13,-2)
                break;
            case '2':
                cam && cam.position.set(.7,3,-2)
                break;

            case 'w': inputs.forward = down; setPlayerAnim(down ? 'Walk' : 'Idle'); break;
            case 'a': inputs.left = down; break;
            case 's': inputs.backward = down; setPlayerAnim(down ? 'Walk' : 'Idle'); break;
            case 'd': inputs.right = down; break;

            case 'escape':
                down && setDebug(!debug);
                break;

            case 'space':
            case ' ':
                inputs.attack = down;
                break;

            default:
                console.log(event.key)
        }
    })

    return (
        <>
        <Stats />

        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.4} position={[2.5,1,0.4]} ref={lightRef} castShadow />

        <LevelRenderer debug={debug} level={level} gridSize={1} />

        <Player
            animation={playerAnim}
            scale={[0.2,0.2,0.2]}
            position={[1.5,0.06,0.4]}
            ref={playerRef}>
            <group position={[.7,3,-2]} ref={cameraRef} />
        </Player>
        </>
    )
}

export default function PlayPage() {
    const [ level, setLevel ] = React.useState<Level>(new Level())
    const { level: loadLevel } = useParams<PageParams>()

    React.useEffect(() => {
        let levelToLoad = loadLevel || 'default';
        fetch(`levels/${levelToLoad}.json`).then(body => body.json()).then(loadedLevel => {
            setLevel(Level.fromJSON(loadedLevel))
        }).catch(reason => {
            console.log(reason)
            const item = localStorage.getItem('untitled')
            if (item) {
                const data = JSON.parse(item)
                setLevel(Level.fromJSON(data))
            }    
        })
    }, [setLevel, loadLevel])

    return (
        <Canvas shadowMap camera={{position:[8,5,0]}} className="ingame">
            <Suspense fallback={null}>
                <Scene level={level} />
            </Suspense>
        </Canvas>
    )
}
