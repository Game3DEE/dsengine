import React from 'react';
import { GroupProps } from 'react-three-fiber'
import { Level } from '../Level'
import { getTileById } from '../TileSets';

interface OwnProps {
    level: Level
    gridSize: number
}

type LevelRendererProps = OwnProps & GroupProps

export function LevelRenderer({ level, gridSize }: LevelRendererProps) {
    const tiles = React.useMemo( () => level.tiles.map(tile => (
        <group 
            key={`${tile.x}x${tile.y}`}
            position-x={tile.x * gridSize + gridSize / 2}
            position-z={tile.y * gridSize + gridSize / 2}
            rotation-y={-(Math.PI / 2) * tile.rotation}
            scale={[0.25,0.25,0.25]}
        >
            {getTileById(tile.id)?.element}
        </group>
    )), [level, gridSize])

    return ( <>{tiles}</> );
}