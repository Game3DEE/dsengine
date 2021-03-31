import { GroupProps } from 'react-three-fiber'
import { useCachedGLTF } from '../../hooks/useCachedGLTF'
import { Floor } from './Floor'

const archModel = 'models/Arch.glb'

export function Arch(props: GroupProps) {
    const { nodes } = useCachedGLTF(archModel)
    return (
        <group name="arch" {...props}>
            <primitive object={nodes.Arch.clone()} castShadow receiveShadow />
            <Floor />
        </group>
        
    )
}
