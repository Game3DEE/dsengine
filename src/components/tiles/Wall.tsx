import { useGLTF } from '@react-three/drei'
import { GroupProps } from 'react-three-fiber'
import { Floor } from './Floor';

const wallModel = 'models/Wall_Modular.glb'

export function Wall(props: GroupProps) {
    const { nodes } = useGLTF(wallModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall" {...props}>
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 3, 0]} rotation-z={rot()} />
            <Floor />
        </group>
    )
}

export function WallCorner(props: GroupProps) {
    const { nodes } = useGLTF(wallModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-corner" {...props}>
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <Floor />
        </group>
    )
}


export function WallT(props: GroupProps) {
    const { nodes } = useGLTF(wallModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-T" {...props}>
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <Floor />
        </group>
    )
}

export function WallX(props: GroupProps) {
    const { nodes } = useGLTF(wallModel)

    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-T" {...props}>
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[-1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 1, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 1, 3, 0]} rotation-z={rot()} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 1, -1]} rotation={[0, Math.PI / 2, rot()]} />
            <primitive object={nodes.Wall_Modular.clone()} position={[ 0, 3, -1]} rotation={[0, Math.PI / 2, rot()]} />
            <Floor />
        </group>
    )
}

useGLTF.preload(wallModel)