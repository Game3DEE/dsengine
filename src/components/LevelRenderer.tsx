import React from 'react';
import { GroupProps } from 'react-three-fiber'
import { Level, SubTilePhysics } from '../Level'
import { getTileById } from '../TileSets';

interface OwnProps {
    level: Level
    debug?: boolean
    gridSize: number
}

type LevelRendererProps = OwnProps & GroupProps

export function LevelRenderer({ level, debug, gridSize }: LevelRendererProps) {
    // Create tile list to render for level
    const tiles = React.useMemo(() => {
        const tiles : JSX.Element[] = []
        const entries = Object.entries(level.tiles)
        for (const [id, placements] of entries) {
            const element = getTileById(id)?.element
            tiles.push.apply(tiles, placements.map(tile => (
                <group 
                key={`${tile.x}x${tile.y}`}
                position-x={tile.x * gridSize + gridSize / 2}
                position-z={tile.y * gridSize + gridSize / 2}
                rotation-y={-(Math.PI / 2) * tile.rotation}
                scale={[0.25,0.25,0.25]}
            >
                {element}
            </group>    
            )))
        }

        // Add our debug meshes if debug is enabled
        if (debug) {
            const physGridSize = level.size * 3
            const halfLevelSize = level.size / 2;

            const physicsMap = level.createPhysicsMap();
            physicsMap.forEach((el, idx) => {
                if (el === SubTilePhysics.Blocked) {
                    const x = ((idx % physGridSize) * 1/3) - halfLevelSize + (1/3)/2
                    const y = (Math.floor(idx / physGridSize) * 1/3) - halfLevelSize + (1/3)/2
                    tiles.push(
                        <mesh key={idx} position={[x, 1, y]}>
                            <boxBufferGeometry args={[1/3,2,1/3]}/>
                            <meshLambertMaterial color="hotpink" transparent opacity={0.5} />
                        </mesh>
                    )
                }
            })
        
        }  
        return tiles
    }, [level, debug, gridSize])

    return ( <>{tiles}</> );
}