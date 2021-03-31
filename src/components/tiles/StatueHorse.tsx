import React from "react"

import { GroupProps } from "react-three-fiber"
import { Floor } from "./Floor"
import { useCachedGLTF } from "../../hooks/useCachedGLTF"

const model = 'models/Statue_Horse.glb'

export function StatueHorse(props: GroupProps) {
    const { nodes } = useCachedGLTF(model)
    
    // HACK! TODO: Fix model
    nodes.Pedestal.position.set(0,0,0)
    nodes.Horse.position.x = 0;
    nodes.Horse.position.z = 0;

    return (
        <group name="statue-horse" {...props}>
            <primitive object={nodes.Scene.clone()} castShadow receiveShadow />
            <Floor />
        </group>
    )
}
