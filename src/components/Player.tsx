import React from 'react'
import { useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { GroupProps } from "react-three-fiber"
import { Mesh, MeshBasicMaterial, RepeatWrapping } from 'three'

const playerModel = 'npc/Rogue.glb'

interface PlayerOwnProps {
    animation?: string
}

type PlayerProps = PlayerOwnProps & GroupProps

export const Player = React.forwardRef((props: PlayerProps, nref: any) => {
    const { animations, nodes } = useGLTF(playerModel)
    const { ref, actions } = useAnimations(animations)
    const tex = useTexture('npc/Rogue_Texture.png')
    tex.wrapS = tex.wrapT = RepeatWrapping;
    const [ activeAnimation, setActiveAnimation ] = React.useState('')

    nodes.Scene.traverse(o => {
        if (o instanceof Mesh) {
            const m = o as Mesh;
            (Array.isArray(m.material) ? m.material : [m.material]).forEach(m => {
                (m as MeshBasicMaterial).map = tex;
            })
        }
    })

    React.useEffect(() => {
        //console.log(actions)
        if (props.animation) {
            if (activeAnimation !== props.animation) {
                if (activeAnimation) {
                    actions[activeAnimation!].stop()
                }
                setActiveAnimation(props.animation)
                actions[props.animation].play()
            }
        }
    }, [actions, activeAnimation, setActiveAnimation, props.animation])

    return (
        <group name="player" {...props} ref={nref}>
            <primitive ref={ref} object={nodes.Scene} />
            {props.children}
        </group>
        
    )
})

useGLTF.preload(playerModel)
