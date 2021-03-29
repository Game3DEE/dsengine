import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Canvas, GroupProps, useFrame } from 'react-three-fiber'
import { Stats } from '@react-three/drei'
import { Object3D, Vector3 } from 'three'

import { LevelRenderer } from '../components/LevelRenderer'
import { Player } from '../components/Player'
import { useKeyboard } from '../hooks/useKeyboard'

import { Level, SubTilePhysics } from '../Level'
import { getTileById } from '../TileSets'

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

    const physGridSize = 64 * 3
    const halfLevelSize = level.size / 2;

    const physicsMap = React.useMemo(() => {
        let physGrid = new Array<SubTilePhysics>(physGridSize * physGridSize).fill(SubTilePhysics.Void)
        level.tiles.forEach(ti => {
            const x = (ti.x + halfLevelSize) * 3; // add half the map size (in tiles) to
            const y = (ti.y + halfLevelSize) * 3; // make sure coordinates are positive
            let tileP = getTileById(ti.id)
            if (tileP) {
                const physics = tileP.physics.slice();
                for (let i = 0; i < ti.rotation; i++) {
                    const old = physics.slice()
                    physics[0] = old[6]
                    physics[1] = old[3]
                    physics[2] = old[0]
                    physics[3] = old[7]
                    physics[4] = old[4]
                    physics[5] = old[1]
                    physics[6] = old[8]
                    physics[7] = old[5]
                    physics[8] = old[2]
                }
                let off = (y * physGridSize) + x
                for (let i = 0; i < 3; i++) {
                    physGrid[off + 0] = physics[3 * i + 0]
                    physGrid[off + 1] = physics[3 * i + 1]
                    physGrid[off + 2] = physics[3 * i + 2]
                    off += physGridSize
                }
            }
        })
        return physGrid
    }, [level.tiles, halfLevelSize, physGridSize])

    const physDebug = React.useMemo(() => {
        const elems: JSX.Element[] = []
        physicsMap.forEach((el, idx) => {
            if (el === SubTilePhysics.Blocked) {
                const x = ((idx % physGridSize) * 1/3) - halfLevelSize + (1/3)/2
                const y = (Math.floor(idx / physGridSize) * 1/3) - halfLevelSize + (1/3)/2
                elems.push(
                    <mesh key={idx} position={[x, 1, y]}>
                        <boxBufferGeometry args={[1/3,2,1/3]}/>
                        <meshLambertMaterial color="hotpink" transparent opacity={0.5} />
                    </mesh>
                )
            }
        })

        return elems
    }, [physGridSize, halfLevelSize, physicsMap])

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

        <LevelRenderer level={level} gridSize={1} />
        {debug && physDebug}

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
            setLevel(loadedLevel)
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
