import { useGLTF } from '@react-three/drei'
import { GroupProps } from 'react-three-fiber'
import { Floor } from './Floor'

const SColumnModel = 'models/Column.glb'
const RColumnModel = 'models/Column2.glb'

/** Warning: for internal use only */
export function PlainSquareColumn(props: GroupProps) {
    const { nodes } = useGLTF(SColumnModel)
    return (
        <primitive object={nodes.Column.clone()} castShadow receiveShadow {...props} />
    )

}

export function SquareColumn(props: GroupProps) {
    return (
        <group name="sqcolumn" {...props}>
            <PlainSquareColumn />
            <Floor />
        </group>
    )
}

export function RoundColumn(props: GroupProps) {
    const { nodes } = useGLTF(RColumnModel)
    return (
        <group name="rncolumn" {...props}>
            <primitive object={nodes.Column2.clone()} castShadow receiveShadow />
            <Floor />
        </group>
    )
}

useGLTF.preload(SColumnModel)
useGLTF.preload(RColumnModel)