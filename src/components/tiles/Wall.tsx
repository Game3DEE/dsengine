import React from 'react';

import { useGLTF } from '@react-three/drei'
import { GroupProps } from 'react-three-fiber'
import { PlainSquareColumn } from './Columns';
import { Floor } from './Floor';

const wallModel = 'models/Wall_Modular.glb'
const wallCoverModel = 'models/WallCover_Modular.glb'
const brokenWallModel = 'models/Decorative_Wall.glb'

function WallWithCover({ rotation, ...props }: GroupProps) {
    const { nodes: cnodes } = useGLTF(wallCoverModel)
    const { nodes: wnodes } = useGLTF(wallModel)

    let coverRotation = undefined
    if (rotation) {
        const rot = rotation as any
        coverRotation = [rot[0], rot[1], 0]
    }

    return (
        <group {...props}>
            <primitive object={cnodes.WallCover_Modular.clone()} rotation={coverRotation} castShadow receiveShadow />
            <primitive object={wnodes.Wall_Modular.clone()}      rotation={rotation}      castShadow receiveShadow />
        </group>
    )
}

function PlainWall(props: GroupProps) {
    const { nodes } = useGLTF(wallModel)

    return (
        <primitive object={nodes.Wall_Modular.clone()} castShadow receiveShadow {...props} />
    )
}

export function WallBroken(props: GroupProps) {
    const { nodes } = useGLTF(brokenWallModel)

    return (
        <group name="wall-broken" {...props} >
            <primitive object={nodes.Decorative_Wall.clone()} position-y={1} />
            <Floor/>
        </group>
    )   
}

export function Wall(props: GroupProps) {
    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall" {...props}>
            <WallWithCover  position={[-1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[-1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[ 1, 3, 0]} rotation={[0, 0, rot()]} />
            <Floor />
        </group>
    )
}

export function WallWithColumn(props: GroupProps) {
    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-with-clm" {...props}>
            <WallWithCover  position={[-1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[-1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[ 1, 3, 0]} rotation={[0, 0, rot()]} />
            <PlainSquareColumn />
            <Floor />
        </group>
    )
}

export function WallCorner(props: GroupProps) {
    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-corner" {...props}>
            <WallWithCover      position={[-1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall          position={[-1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover      position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainWall          position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainSquareColumn />
            <Floor />
        </group>
    )
}


export function WallT(props: GroupProps) {
    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-T" {...props}>
            <WallWithCover  position={[-1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[-1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[ 1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainWall      position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainSquareColumn />
            <Floor />
        </group>
    )
}

export function WallX(props: GroupProps) {
    const rot = () => (Math.floor(Math.random() * 8) -4) * Math.PI;

    return (
        <group name="wall-X" {...props}>
            <WallWithCover  position={[-1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[-1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 1, 1, 0]} rotation={[0, 0, rot()]} />
            <PlainWall      position={[ 1, 3, 0]} rotation={[0, 0, rot()]} />
            <WallWithCover  position={[ 0, 1, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainWall      position={[ 0, 3, 1]} rotation={[0, Math.PI / 2, rot()]} />
            <WallWithCover  position={[ 0, 1, -1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainWall      position={[ 0, 3, -1]} rotation={[0, Math.PI / 2, rot()]} />
            <PlainSquareColumn />
            <Floor />
        </group>
    )
}

useGLTF.preload(brokenWallModel)
useGLTF.preload(wallModel)
useGLTF.preload(wallCoverModel)
