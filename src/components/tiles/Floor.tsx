import { useGLTF } from '@react-three/drei'
import { GroupProps } from 'react-three-fiber'

const floorModel = 'models/Floor_Modular.glb'

export function Floor(props: GroupProps) {
    const { nodes } = useGLTF(floorModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    const height = 0.08;
    return (
        <group name="floor" {...props}>
            <primitive object={nodes.Floor_Modular.clone()} position={[-1, -height, -1]} rotation-y={rot()} />
            <primitive object={nodes.Floor_Modular.clone()} position={[ 1, -height, -1]} rotation-y={rot()} />
            <primitive object={nodes.Floor_Modular.clone()} position={[-1, -height,  1]} rotation-y={rot()} />
            <primitive object={nodes.Floor_Modular.clone()} position={[ 1, -height,  1]} rotation-y={rot()} />
        </group>
    )
}

useGLTF.preload(floorModel)