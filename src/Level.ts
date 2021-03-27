export interface TileInstance {
    id: string
    x: number
    y: number // (tile) grid based location
    rotation: number    
}

export enum TilePhysics {
    Void,
    Walkable,
    Blocked
}

export interface Tile {
    id: string
    physics: TilePhysics[] // 3x3 block
}

export interface TileSet {
    id: string
    tiles: Tile[]
}

export interface Level {
    version: number     // currently unused, intended for public releases
    size: number        // currently size is fixed by editor to gridCount (64)
    tileSet: TileSet    // tiles available to be used in level
    tiles: TileInstance[] // actual placed tiles
}

export function findTileInLevel(lvl: Level, x: number, y: number) {
    return lvl.tiles.find(tile => tile.x === x && tile.y === y)
}

export function findTileInSetById(tileSet: TileSet, tileId: string) {
    return tileSet.tiles.find(t => t.id === tileId);
}
