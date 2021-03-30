import { getTileById } from "./TileSets";

/** Current level format version.
 * Increased on breaking format changes
 */
const CURRENT_LEVEL_VERSION = 2;

/** Represents the placement of a single tile */
export interface TilePlacement {
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
    tiles: { [key: string]: TilePlacement[] }

    constructor(version = CURRENT_LEVEL_VERSION, size = 64, tiles = {}) {
        this.version = version
        this.size = size
        this.tiles = tiles
    }

    /** Create an exact duplicate of this level
     * 
     * @returns {Level} cloned level
     */
    clone() {
        return new Level(this.version, this.size, Object.assign({}, this.tiles))
    }

    /** Lookup tile at given position in level
     * @param {number} x position [in tile units]
     * @param {number} y position [in tile units]
     * 
     * @returns {[string,TilePlacement]} id and placement of tile if found, or undefined if not
     */
    findTileAt(x: number, y: number): [string, TilePlacement | undefined] {
        const entries = Object.entries(this.tiles)
        for (const [id, placements] of entries) {
            for (const placement of placements) {
                if (placement.x === x && placement.y === y) {
                    return [ id, placement ];
                }
            }
        }

        return [ '', undefined ]
    }

    /** Clear tile at given position.
     * will simply do nothing if no tile exists on that position
     * @param {number} x position [in tile units]
     * @param {number} y position [in tile units]
     */
     clearTileAt(x: number, y: number) {
        const tiles = Object.values(this.tiles)
        for (const placements of tiles) {
            for (const placement of placements) {
                if (placement.x === x && placement.y === y) {
                    placements.splice(placements.indexOf(placement), 1)
                    return;
                }
            }
        }
    }

    /** Set tile at given position.
     * Will overwrite any existing tile at that location.
     * @param {string} tileId tile to place
     * @param {TilePlacement} placement information of tile
     */
    setTileAt(id: string, tilePlacement: TilePlacement) {
        // clear out any tile that's there
        this.clearTileAt(tilePlacement.x, tilePlacement.y)
        // Insert new tile
        if (this.tiles[id] === undefined) {
            this.tiles[id] = [];
        }
        this.tiles[id].push(tilePlacement)
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

        interface TPV0 { // v0 TilePlacement
            id: string;
            x: number;
            y: number;
            rotation: number;
        }

        // TODO extend checking to tile elements too?
        if (!isNaN(version) && !isNaN(size)) {
            if (version < 2) {
                const tiles: { [key: string]: TilePlacement[] } = {}
                json.tiles.forEach((tile: TPV0) => {
                    if (tiles[tile.id] === undefined) {
                        tiles[tile.id] = [];
                    }
                    tiles[tile.id].push({
                        x: tile.x,
                        y: tile.y,
                        rotation: tile.rotation,
                    })
                })

                return new Level(CURRENT_LEVEL_VERSION, json.size, tiles)
            } else if (version === CURRENT_LEVEL_VERSION) {
                return new Level(CURRENT_LEVEL_VERSION, json.size, json.tiles)
            }
        }

        throw Error("JSON object is not a (valid) level!")
    }

    createPhysicsMap() {
        const physGridSize = this.size * 3
        const halfLevelSize = this.size / 2;
    
        let physGrid = new Array<SubTilePhysics>(physGridSize * physGridSize).fill(SubTilePhysics.Void)
        const entries = Object.entries(this.tiles)
        for (const [id, placements] of entries) {
            let tileP = getTileById(id)
            if (tileP !== undefined) {
                placements.forEach( ti => {
                    const x = (ti.x + halfLevelSize) * 3; // add half the map size (in tiles) to
                    const y = (ti.y + halfLevelSize) * 3; // make sure coordinates are positive
                    const physics = tileP!.physics.slice();
                    for (let i = 0; i < ti.rotation; i++) {
                        const old = physics.slice() // XXX TODO implement in-place rotation
                        physics[0] = old[6]
                        physics[1] = old[3]
                        physics[2] = old[0]
                        physics[3] = old[7]
                        physics[4] = old[4]
                        physics[5] = old[1]
                        physics[6] = old[8]
                        physics[7] = old[5]
                        physics[8] = old[2]
                    }
                    let off = (y * physGridSize) + x
                    for (let i = 0; i < 3; i++) {
                        physGrid[off + 0] = physics[3 * i + 0]
                        physGrid[off + 1] = physics[3 * i + 1]
                        physGrid[off + 2] = physics[3 * i + 2]
                        off += physGridSize
                    }
                })
            }
        }

        return physGrid    
    }
}
