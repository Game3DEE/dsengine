import React from 'react'
import { useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { GroupProps } from "react-three-fiber"
import { Mesh, MeshBasicMaterial, RepeatWrapping } from 'three'

interface PlayerOwnProps {
    animation?: string
    character?: 'Cleric' | 'Monk' | 'Ranger' | 'Rogue' | 'Warrior' | 'Wizard'
}

type PlayerProps = PlayerOwnProps & GroupProps

export const Player = React.forwardRef(({ animation = 'Idle', character = 'Warrior', ...props }: PlayerProps, nref: any) => {
    const { animations, nodes } = useGLTF(`npc/${character}.glb`)
    const { ref, actions } = useAnimations(animations)
    const tex = useTexture(`npc/${character}_Texture.png`)
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
        if (animation) {
            if (activeAnimation !== animation) {
                if (activeAnimation) {
                    actions[activeAnimation!].stop()
                }
                setActiveAnimation(animation)
                actions[animation].play()
            }
        }
    }, [actions, activeAnimation, setActiveAnimation, animation])

    return (
        <group name="player" {...props} ref={nref}>
            <primitive ref={ref} object={nodes.Scene} />
            {props.children}
        </group>
        
    )
})
