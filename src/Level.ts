/** Represents a complete level definition */
export interface Level {
    /**
     * Version of Level format
     * Currently always 1, will be tracked from official release.
     */
    version: number
    /** Width and height of level (in tiles) */
    size: number
    /** list of all placed tiles in level */
    tiles: TileInstance[]
}

/** Represents a single instance of a tile */
export interface TileInstance {
    /** id of Tile definition */
    id: string
    /** x coordinate in tile grid */
    x: number
    /** y coordinate in tile grid */
    y: number
    /** rotation in steps of 90 degrees [0-3] */
    rotation: number
}

/** Represents a tile definition */
export interface Tile {
    /** globally unique ID of a tile */
    id: string

    /** A 3x3 grid of physics values
     * @see SubTilePhysics
     */
    physics: SubTilePhysics[]

    /** list of tags related to tile (used for search) */
    tags: string[]

    /** React Three Fiber element for tile */
    element: JSX.Element
}

/**
 *  Represents the physics state of a part of a tile 
 *  @see Tile.physics
 */

export enum SubTilePhysics {
    Void,
    Walkable,
    Blocked,
}

/** Lookup tile at given position in level
 * @param {Level}  level level to search
 * @param {number} x position [in tile units]
 * @param {number} y position [in tile units]
 * 
 * @returns {Tile} tile if found, or undefined if not
 */
export function findTileInLevel(lvl: Level, x: number, y: number) {
    return lvl.tiles.find(tile => tile.x === x && tile.y === y)
}
