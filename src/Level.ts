/** Current level format version.
 * Increased on breaking format changes
 */
const CURRENT_LEVEL_VERSION = 1;

/** Represents a complete level definition */
export class Level {
    /**
     * Version of Level format.
     * @see CURRENT_LEVEL_VERSION
     */
    version: number
    /** Width and height of level (in tiles) */
    size: number
    /** list of all placed tiles in level */
    tiles: TilePlacement[]

    constructor(version = CURRENT_LEVEL_VERSION, size = 64, tiles: TilePlacement[] = []) {
        this.version = version
        this.size = size
        this.tiles = tiles
    }

    /** Create an exact duplicate of this level
     * 
     * @returns {Level} cloned level
     */
    clone() {
        return new Level(this.version, this.size, this.tiles.slice())
    }

    /** Lookup tile at given position in level
     * @param {number} x position [in tile units]
     * @param {number} y position [in tile units]
     * 
     * @returns {Tile} tile if found, or undefined if not
     */
    findTileAt(x: number, y: number): TilePlacement | undefined {
        return this.tiles.find(tile => tile.x === x && tile.y === y)
    }

    /** Clear tile at given position.
     * will simply do nothing if no tile exists on that position
     * @param {number} x position [in tile units]
     * @param {number} y position [in tile units]
     */
     clearTileAt(x: number, y: number) {
        // Check to see if we already have a tile on that position
        let tileIdx = this.tiles.findIndex(tile => tile.x === x && tile.y === y)
        if (tileIdx >= 0) {
            // If so, remove it
            this.tiles.splice(tileIdx, 1)
        }
    }

    /** Set tile at given position.
     * Will overwrite any existing tile at that location.
     * @param {string} tileId tile to place
     * @param {TilePlacement} placement information of tile
     */
    setTileAt(id: string, tilePlacement: TilePlacement) {
        // Check to see if we already have a tile on that position
        let tileIdx = this.tiles.findIndex(tile => tile.x === tilePlacement.x && tile.y === tilePlacement.y)
        if (tileIdx >= 0) {
            // If so, remove it
            this.tiles.splice(tileIdx, 1)
        }
        this.tiles.push(tilePlacement)
    }

    /** Create a new Level object from a "JSON" object.
     * 
     * NOTE: Will allways return a Level with CURRENT_LEVEL_NUMBER, or throw an error if the version is not supported.
     * 
     * @param {any} json The input JSON object (assumed to be the result of JSON.parse)
     * 
     * @returns {Level} level
     * 
     * @throws {Error} if json is not a valid Level representation
     */
    static fromJSON(json: any): Level {
        const version = parseInt(json.version, 10)
        const size = parseInt(json.size)

        // TODO extend checking to tile elements too?
        if (!isNaN(version) && !isNaN(size) && Array.isArray(json.tiles)) {
            // We always return the level with the latest version
            // if any version conversion needs to be done, this is the place!
            return new Level(CURRENT_LEVEL_VERSION, json.size, json.tiles)
        }

        throw Error("JSON object is not a (valid) level!")
    }
}

/** Represents the placement of a single tile */
export interface TilePlacement {
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
