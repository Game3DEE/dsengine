import React, { Suspense } from 'react'
import { Canvas, PointerEvent } from 'react-three-fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Object3D } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
import { LevelRenderer } from '../components/LevelRenderer';

import { findTileInLevel, Level, TileInstance } from '../Level';
import { dungeonTileSet, getElementForTile } from '../TileSets';

import './EditPage.css'

const gridSize = 1;

const defaultMap = {
    version: 0,
    size: 64,
    tiles: [],
    tileSet: dungeonTileSet,
}

export default function EditPage() {
    const cursorRef = React.useRef<Object3D>()
    const [ tileIndex, setTileIndex ] = React.useState(-1)
    const [ tileRotation, setTileRotation ] = React.useState(0)
    const [ map, setMap ] = React.useState<Level>(defaultMap)

    React.useEffect(() => {
        const item = localStorage.getItem('untitled')
        if (item) {
            const lvl : Level = JSON.parse(item)
            lvl.tileSet = dungeonTileSet;
            setMap(lvl)
        }
    }, [setMap])

    // Handle moving the cursor
    const onPointerMove = (event: PointerEvent) => {
        const { point } = event
        event?.stopPropagation()

        const gridX = Math.floor(point.x / gridSize)
        const gridY = Math.floor(point.z / gridSize)
        document.getElementsByClassName('grid-pos')[0].textContent = `${gridX},${gridY} / ${point.x.toFixed(3)},${point.z.toFixed(3)} / ${tileRotation}`

        if (cursorRef.current) {
            cursorRef.current.position.set(
                gridX * gridSize + gridSize / 2,
                0,
                gridY * gridSize + gridSize / 2,
            )
        }
    }

    // Handle modifying tile under cursor
    const onPointerDown = (event: PointerEvent) => {
        const { point } = event
        event?.stopPropagation()

        const gridX = Math.floor(point.x / gridSize)
        const gridY = Math.floor(point.z / gridSize)
        const tile = findTileInLevel(map, gridX, gridY)
        
        // Check if we're picking a tile
        if (event.shiftKey) {
            // ... and if so, handle case of no tile
            setTileIndex(tile ? map.tileSet.tiles.findIndex(t => t.id === tile.id) : -1 )
            tile && setTileRotation(tile.rotation)
            return
        }

        // Don't clear out tile unless shift is pressed
        if (tileIndex === -1 && !event.ctrlKey) {
            return
        }

        // Update state with new tile
        const { version, size, tiles, tileSet } = map
        const newTiles: TileInstance[] = tiles.slice()

        if (tile) {
            newTiles.splice(newTiles.indexOf(tile), 1)
        }

        if (tileIndex >= 0) {
            newTiles.push({
                id: map.tileSet.tiles[tileIndex].id,
                x: gridX,
                y: gridY,
                rotation: tileRotation,
            })
        }
        
        setMap({ version, size, tileSet, tiles: newTiles })
    }

    useKeyboard((event: KeyboardEvent) => {
        const up = event.type === 'keyup'
        switch(event.key.toLowerCase()) {
            case 'escape':
                setTileIndex(-1)
                break;
            case 's':
                localStorage.setItem('untitled', JSON.stringify(map))
                break;
            case 'r':
                up && setTileRotation((tileRotation + 1) % 4)
                break
            case '[':
                up && tileIndex >= 0 && setTileIndex(tileIndex -1)
                break
            case ']':
                up && tileIndex < map.tileSet.tiles.length -1 && setTileIndex(tileIndex +1)
                break
        }
    })

    const levelSize = map.size * gridSize
    /* Why does this not work??? 
    tabIndex={-1} onKeyDown={keyPressed}
    */
    return (
        <>
        <span className="grid-pos"/>
        <Canvas shadowMap camera={{position:[8,5,0]}}>
            <Suspense fallback={null}>
                <OrbitControls maxPolarAngle={Math.PI * 0.5} />
                <Stats />
                <directionalLight intensity={0.4}/>
                <ambientLight intensity={0.2} />
                <gridHelper args={[levelSize, map.size, 0x222222, 0x444444]} />
                <axesHelper args={[levelSize]} position-y={0.01} />
                <LevelRenderer gridSize={gridSize} level={map} />
                { /* hidden plane is there to detect mouse movement on "ground" */}
                <mesh 
                    name="hidden-plane"
                    rotation-x={-Math.PI / 2}
                    onPointerMove={onPointerMove}
                    onPointerDown={onPointerDown}
                    >
                    <planeBufferGeometry args={[levelSize, levelSize]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>
                <group
                    ref={cursorRef}
                    name="cursor-container"
                    position={[gridSize / 2, 0, gridSize / 2]}>

                    {
                    // show selected tile on cursor
                    tileIndex >= 0 && <group
                        scale={[0.25,0.25,0.25]}
                        rotation-y={ -(Math.PI / 2) * tileRotation}
                        name="tile-container">
                        {getElementForTile(map.tileSet.id, map.tileSet.tiles[tileIndex].id)}
                    </group>
                    }
                    {
                    <mesh
                        name="cursor"
                        rotation-x={-Math.PI / 2}
                        position-y={0.01}>
                        <planeBufferGeometry args={[1,1,3,3]} />
                        <meshBasicMaterial color={0x440000} wireframe />
                    </mesh>
                    }
                </group>
            </Suspense>
        </Canvas>
        </>
    )
}
