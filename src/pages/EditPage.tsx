import React, { Suspense } from 'react'

import { Canvas, PointerEvent } from 'react-three-fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Object3D } from 'three';

import { useKeyboard } from '../hooks/useKeyboard'
import { LevelRenderer } from '../components/LevelRenderer'

import { emptyLevel, findTileInLevel, Level, TileInstance } from '../Level'
import { getTileByIndex, getTileCount, getTileIndexById } from '../TileSets'

import './EditPage.css'
import { useParams } from 'react-router';

import LevelRoguelike  from 'roguelike/level/roguelike'

const gridSize = 1;

interface PageParams {
    level?: string
}

function generateTiles(size: number) {
    const tiles = []

    let level;
    try {
        level = LevelRoguelike({
            width: size,
            height: size,
            retry: 100, // How many times should we try to add a room?
            special: true, // Should we generate a "special" room?
            room: {
              ideal: 15, // Give up once we get this number of rooms
              min_width: 5,
              max_width: 10,
              min_height: 5,
              max_height: 10
            },
        })
    } catch(e) {
        console.warn(e)
        return [];
    }

    const blockingTiles = [ 2,3,4 ]
    const halfSize = size / 2;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let tile = level.world[y][x]
            const u = (y === 0)      ? false : (blockingTiles.includes(level.world[y-1][x]))
            const d = (y === size-1) ? false : (blockingTiles.includes(level.world[y+1][x]))
            const l = (x === 0)      ? false : (blockingTiles.includes(level.world[y][x-1]))
            const r = (x === size-1) ? false : (blockingTiles.includes(level.world[y][x+1]))
            let count = 0
            if (u) ++count
            if (d) ++count
            if (l) ++count
            if (r) ++count

            switch(tile) {
                case 0: // void
                    break;
                case 1: // floor
                    tiles.push({
                        id: 'qd2-floor',
                        x: x - halfSize,
                        y: y - halfSize,
                        rotation: 0,
                    })
                   break;
                case 2: // wall
                    let rotation = 0
                    let type = 'qd2-wall'
                    if (count === 4) {
                        // It is a +
                        type = 'qd2-wall-X'
                    } else if (count === 3) {
                        type = 'qd2-wall-T'
                        if (u && d) {
                            rotation = r ? 3 : 1
                        } else {
                            rotation = u ? 2 : 0
                        }
                    } if (count === 2) {
                        if (!l && !r) {
                            // its a normal vertical wall
                            rotation = 1;
                        } else if (u && r) {
                            type = 'qd2-wall-corner'
                            rotation = 2;
                        } else if (r && d) {
                            type = 'qd2-wall-corner'
                            rotation = 3;
                        } else if (d && l) {
                            type = 'qd2-wall-corner'
                            rotation = 0;
                        } else if (l && u) {
                            type = 'qd2-wall-corner'
                            rotation = 1;
                        }
                    }
                    tiles.push({
                        id: type,
                        x: x - halfSize,
                        y: y - halfSize,
                        rotation,
                    })
                    break;
                case 3: // door
                    tiles.push({
                        id: 'qd2-arch',
                        x: x - halfSize,
                        y: y - halfSize,
                        rotation: (u || d) ? 1 : 0,
                    })
                    break;
                case 4: // special door
                    tiles.push({
                        id: 'qd2-arch',
                        x: x - halfSize,
                        y: y - halfSize,
                        rotation: (u || d) ? 1 : 0,
                    })   
                    break;
                case 5: // enter
                    break;
                case 6: // exit
                    break;
            }
        }
    }

    return tiles
}

export default function EditPage() {
    const cursorRef = React.useRef<Object3D>()
    const [ tileIndex, setTileIndex ] = React.useState(-1)
    const [ tileRotation, setTileRotation ] = React.useState(0)
    const [ map, setMap ] = React.useState<Level>(emptyLevel)
    const { level } = useParams<PageParams>()

    React.useEffect(() => {
        let levelToLoad = level || 'default';
        fetch(`levels/${levelToLoad}.json`).then(body => body.json()).then(loadedLevel => {
            setMap(loadedLevel)
        }).catch(reason => {
            console.log(reason)
            const item = localStorage.getItem('untitled')
            if (item) {
                setMap(JSON.parse(item))
            }    
        })
    }, [setMap, level])

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
        let tile = findTileInLevel(map, gridX, gridY)
        
        // Check if we're picking a tile
        if (event.shiftKey) {
            // ... and if so, handle case of no tile
            setTileIndex(tile ? getTileIndexById(tile.id) : -1 )
            tile && setTileRotation(tile.rotation)
            return
        }

        // Update state with new tile (if there was one)
        const { version, size, tiles } = map
        const newTiles: TileInstance[] = tiles.slice()

        if (tile && (tileIndex !== -1 || event.ctrlKey)) {
            newTiles.splice(newTiles.indexOf(tile), 1)
        }

        // Only place new tile if one is 
        // selected and ctrl key not pressed
        if (tileIndex >= 0 && !event.ctrlKey) {
            newTiles.push({
                id: getTileByIndex(tileIndex)!.id,
                x: gridX,
                y: gridY,
                rotation: tileRotation,
            })
        }
        
        // finally update map!
        setMap({ version, size, tiles: newTiles })
    }

    useKeyboard((event: KeyboardEvent) => {
        const up = event.type === 'keyup'
        switch(event.key.toLowerCase()) {
            case 'escape':
                setTileIndex(-1)
                break;
            case 'g':
                if (!up) {
                   const { version, size } = map
                   const newTiles = generateTiles(size)
                   setMap({ version, size, tiles: newTiles })
                }
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
                up && tileIndex < getTileCount() -1 && setTileIndex(tileIndex +1)
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
                        {getTileByIndex(tileIndex)!.element}
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
