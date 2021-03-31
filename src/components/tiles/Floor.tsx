import { GroupProps } from 'react-three-fiber'
import { useCachedGLTF } from '../../hooks/useCachedGLTF';

const floorModel = 'models/Floor_Modular.glb'

export function Floor(props: GroupProps) {
    const { nodes } = useCachedGLTF(floorModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    const height = 0.08;
    return (
        <group name="floor" {...props}>
            <primitive object={nodes.Floor_Modular.clone()} position={[-1, -height, -1]} rotation-y={rot()} receiveShadow />
            <primitive object={nodes.Floor_Modular.clone()} position={[ 1, -height, -1]} rotation-y={rot()} receiveShadow />
            <primitive object={nodes.Floor_Modular.clone()} position={[-1, -height,  1]} rotation-y={rot()} receiveShadow />
            <primitive object={nodes.Floor_Modular.clone()} position={[ 1, -height,  1]} rotation-y={rot()} receiveShaodw />
        </group>
    )
}
