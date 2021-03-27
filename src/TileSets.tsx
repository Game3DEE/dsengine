import {
  Arch,
  Floor,
  Wall,
  WallCorner,
  WallT,
  WallX,
} from "./components/tiles";

import { SubTilePhysics, Tile } from "./Level";

export const tiles: Tile[] = [
  {
    id: "qd2:floor",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Floor />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
  {
    id: "qd2:wall",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Wall />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
  {
    id: "qd2:wall-corner",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <WallCorner />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
  {
    id: "qd2:wall-T",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Walkable,
    ],
    element: <WallT />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
  {
    id: "qd2:wall-X",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked, SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
    ],
    element: <WallX />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
  {
    id: "qd2:arch",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Walkable, SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Arch />,
    tags: [ 'Quaternius', 'Dungeon' ],
  },
];

/** Returns total number of available tiles
 * 
 * NOTE: count is not stable across sessions/versions
*/
export function getTileCount() {
    return tiles.length
}

/** Returns tile definition by ID */
export function getTileById(id: string) {
    return tiles.find(tile => tile.id === id)
}

/**
 * Returns tile index by ID, or -1 if not found 
 * 
 * NOTE: index is not stable across sessions/versions
 */
export function getTileIndexById(id: string) {
    return tiles.findIndex(tile => tile.id === id)
}

/** Returns tile definiton by global tile index
 * 
 * NOTE: index is not stable across sessions/versions
*/
export function getTileByIndex(index: number) {
    if (index < 0 || index >= tiles.length) {
        return undefined;
    }

    return tiles[index]
}
