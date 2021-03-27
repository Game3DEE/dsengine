import React, { Suspense } from 'react'
import { Canvas, PointerEvent } from 'react-three-fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Object3D } from 'three';
import { Floor, Wall, WallCorner, WallT, WallX, Arch } from '../components/tiles';
import { useKeyboard } from '../hooks/useKeyboard';

const gridSize = 1;

const tileList = [
    <Floor />,
    <Wall />,
    <WallCorner />,
    <WallT />,
    <WallX />,
    <Arch />,
];

interface Tile {
    id: string
    x: number
    y: number // (tile) grid based location
    rotation: number    
}

interface Map {
    version: number // currently unused, intended for public releases
    size: number // currently size is fixed by editor to gridCount (64)
    tiles: Tile[]
}

function findTileAt(map: Map, x: number, y: number) {
    return map.tiles.find(tile => tile.x === x && tile.y === y)
}

const defaultMap = {
    version: 0,
    size: 64,
    tiles: [],
}

export default function EditPage() {
    const cursorRef = React.useRef<Object3D>()
    const [ tileIndex, setTileIndex ] = React.useState(-1)
    const [ tileRotation, setTileRotation ] = React.useState(0)
    const [ map, setMap ] = React.useState<Map>(defaultMap)

    // Handle moving the cursor
    const onPointerMove = (event: PointerEvent) => {
        const { point } = event
        event?.stopPropagation()

        const gridX = Math.floor(point.x / gridSize)
        const gridY = Math.floor(point.z / gridSize)

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
        const tile = findTileAt(map, gridX, gridY)
        // Check if we're picking a tile
        if (event.shiftKey) {
            // ... and if so, handle case of no tile
            setTileIndex(tile ? parseInt(tile.id) : -1 )
            tile && setTileRotation(tile.rotation)
            return
        }

        // Don't clear out tile unless shift is pressed
        if (tileIndex === -1 && !event.ctrlKey) {
            return
        }

        // Update state with new tile
        const { version, size, tiles } = map
        const newTiles: Tile[] = tiles.slice()

        if (tile) {
            newTiles.splice(newTiles.indexOf(tile), 1)
        }

        if (tileIndex >= 0) {
            newTiles.push({
                id: `${tileIndex}`,
                x: gridX,
                y: gridY,
                rotation: tileRotation,
            })
        }
        
        setMap({ version, size, tiles: newTiles })
    }

    useKeyboard((event: KeyboardEvent) => {
        const up = event.type === 'keyup'
        switch(event.key.toLowerCase()) {
            case 'escape':
                setTileIndex(-1)
                break;
            case 'r':
                up && setTileRotation((tileRotation + 1) % 4)
                break
            case '[':
                up && tileIndex >= 0 && setTileIndex(tileIndex -1)
                break
            case ']':
                up && tileIndex < tileList.length -1 && setTileIndex(tileIndex +1)
                break
        }
    })

    const levelSize = map.size * gridSize
    /* Why does this not work??? 
    tabIndex={-1} onKeyDown={keyPressed}
    */
    return (
        <div className="scene-container" >
        <Canvas shadowMap camera={{position:[8,5,0]}}>
            <Suspense fallback={null}>
                <OrbitControls maxPolarAngle={Math.PI * 0.5} />
                <Stats />
                <directionalLight intensity={0.4}/>
                <ambientLight intensity={0.2} />
                <gridHelper args={[levelSize, map.size, 0x440000, 0x444444]} />
                { // Draw map
                    map.tiles.map(tile => (
                        <group 
                            key={`${tile.x}x${tile.y}`}
                            position-x={tile.x * gridSize + gridSize / 2}
                            position-z={tile.y * gridSize + gridSize / 2}
                            rotation-y={-(Math.PI / 2) * tile.rotation}
                            scale={[0.25,0.25,0.25]}
                        >
                            {tileList[parseInt(tile.id)]}
                        </group>
                    ))
                }
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
                        {tileList[tileIndex]}
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
        </div>
    )
}
