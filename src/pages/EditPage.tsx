import React from 'react'
import { Canvas, PointerEvent } from 'react-three-fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Object3D } from 'three';

const gridSize = 1;
const gridCount = 64;
const levelSize = gridCount * gridSize;

export default function EditPage() {
    const cursorRef = React.useRef<Object3D>()

    const moveCursor = (event: PointerEvent) => {
        const { point } = event
        event?.stopPropagation()

        const gridX = Math.floor(point.x / gridSize)
        const gridY = Math.floor(point.z / gridSize)
        console.log(gridX, gridY)

        if (cursorRef.current) {
            cursorRef.current.position.set(
                gridX * gridSize + gridSize / 2,
                0,
                gridY * gridSize + gridSize / 2,
            )
        }
    }

    return (
        <Canvas shadowMap camera={{position:[8,5,0]}}>
            <OrbitControls maxPolarAngle={Math.PI * 0.5} />
            <Stats />
            <directionalLight />
            <ambientLight />
            <gridHelper args={[levelSize, gridCount, 0x440000, 0x444444]} />
            <mesh name="hidden-plane" rotation-x={-Math.PI / 2} onPointerMove={moveCursor}>
                <planeBufferGeometry args={[levelSize,levelSize]}/>
                <meshBasicMaterial visible={false}/>
            </mesh>
            <group ref={cursorRef} name="cursor-container">
                <mesh name="cursor" rotation-x={-Math.PI / 2} position-y={0.01}>
                    <planeBufferGeometry args={[1,1,3,3]} />
                    <meshBasicMaterial color={0x000044} wireframe />
                </mesh>
            </group>
        </Canvas>
    )
}
