import { GroupProps } from 'react-three-fiber'
import { useCachedGLTF } from '../../hooks/useCachedGLTF'
import { Floor } from './Floor'

const SColumnModel = 'models/Column.glb'
const RColumnModel = 'models/Column2.glb'

/** Warning: for internal use only */
export function PlainSquareColumn(props: GroupProps) {
    const { nodes } = useCachedGLTF(SColumnModel)
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
    const { nodes } = useCachedGLTF(RColumnModel)
    return (
        <group name="rncolumn" {...props}>
            <primitive object={nodes.Column2.clone()} castShadow receiveShadow />
            <Floor />
        </group>
    )
}
