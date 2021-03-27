import { useGLTF } from '@react-three/drei'
import { GroupProps } from 'react-three-fiber'
import { Floor } from './Floor'

const archModel = 'models/Arch.glb'

export function Arch(props: GroupProps) {
    const { nodes } = useGLTF(archModel)
    return (
        <group name="arch" {...props}>
            <primitive object={nodes.Arch.clone()} castShadow receiveShadow />
            <Floor />
        </group>
        
    )
}

useGLTF.preload(archModel)