import { Arch, Floor, Wall, WallCorner, WallT, WallX } from "./components/tiles"
import { TilePhysics, TileSet } from "./Level"

export const dungeonTileSet: TileSet = {
    id: 'dungeon',
    tiles: [
        { id: 'floor', physics: [
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
        ] },
        { id: 'wall', physics: [
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
            TilePhysics.Blocked,  TilePhysics.Blocked,  TilePhysics.Blocked,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
        ] },
        { id: 'wall-corner', physics: [
            TilePhysics.Walkable, TilePhysics.Blocked,  TilePhysics.Walkable,
            TilePhysics.Walkable, TilePhysics.Blocked,  TilePhysics.Blocked,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
        ] },
        { id: 'wall-T', physics: [
            TilePhysics.Walkable, TilePhysics.Blocked,  TilePhysics.Walkable,
            TilePhysics.Blocked,  TilePhysics.Blocked,  TilePhysics.Blocked,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
        ] },
        { id: 'wall-X', physics: [
            TilePhysics.Walkable, TilePhysics.Blocked,  TilePhysics.Walkable,
            TilePhysics.Blocked,  TilePhysics.Blocked,  TilePhysics.Blocked,
            TilePhysics.Walkable, TilePhysics.Blocked,  TilePhysics.Walkable,
        ] },
        { id: 'arch', physics: [
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
            TilePhysics.Blocked,  TilePhysics.Walkable,  TilePhysics.Blocked,
            TilePhysics.Walkable, TilePhysics.Walkable, TilePhysics.Walkable,
        ] },
    ]
}

export function getElementForTile(tileSetId: string, tileId: string) {
    switch(tileSetId) {
        case 'dungeon':
            switch(tileId) {
                case 'wall':
                    return <Wall />;
                case 'wall-corner':
                    return <WallCorner />;
                case 'wall-T':
                    return <WallT />;
                case 'wall-X':
                    return <WallX />
                case 'floor':
                    return <Floor />
                case 'arch':
                    return <Arch />
            }
            break;
    }

    return undefined;
}
