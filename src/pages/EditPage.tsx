import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Stats, OrbitControls } from '@react-three/drei'

const gridSize = 1;
const gridCount = 64;
const levelSize = gridCount * gridSize;

export default function EditPage() {
    return (
        <Canvas shadowMap camera={{position:[8,5,0]}}>
            <OrbitControls maxPolarAngle={Math.PI * 0.5} />
            <Stats />
            <directionalLight />
            <ambientLight />
            <gridHelper args={[levelSize, gridCount, 0x440000, 0x444444]} />
        </Canvas>
    )
}
