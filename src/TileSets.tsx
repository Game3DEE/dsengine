import {
  Arch,
  Floor,
  RoundColumn,
  SquareColumn,
  StatueHorse,
  Wall,
  WallBroken,
  WallCorner,
  WallT,
  WallWithColumn,
  WallX,
} from "./components/tiles";

import { SubTilePhysics, Tile } from "./Level";

export const tiles: Tile[] = [
  {
    id: "qd2-floor",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Floor />,
    tags: [ 'Quaternius', 'Dungeon', 'Floor' ],
  },
  {
    id: "qd2-wall",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Wall />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall' ],
  },
  {
    id: "qd2-wall-with-column",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <WallWithColumn />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall with Column' ],
  },
  {
    id: "qd2-wall-corner",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <WallCorner />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall', 'Corner' ],
  },
  {
    id: "qd2-wall-T",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked,  SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Walkable,
    ],
    element: <WallT />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall T' ],
  },
  {
    id: "qd2-wall-X",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Blocked, SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
    ],
    element: <WallX />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall X' ],
  },
  {
    id: "qd2-wall-broken",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked,  SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <WallBroken />,
    tags: [ 'Quaternius', 'Dungeon', 'Wall Broken' ],
  },
  {
    id: "qd2-arch",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Blocked,  SubTilePhysics.Walkable, SubTilePhysics.Blocked,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <Arch />,
    tags: [ 'Quaternius', 'Dungeon', 'Arch' ],
  },
  {
    id: "qd2-square-column",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <SquareColumn />,
    tags: [ 'Quaternius', 'Dungeon', 'Square Column' ],
  },
  {
    id: "qd2-round-column",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <RoundColumn />,
    tags: [ 'Quaternius', 'Dungeon', 'Round Column' ],
  },
  {
    id: "qd2-statue-horse",
    physics: [
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Blocked, SubTilePhysics.Walkable,
      SubTilePhysics.Walkable, SubTilePhysics.Walkable, SubTilePhysics.Walkable,
    ],
    element: <StatueHorse />,
    tags: [ 'Quaternius', 'Dungeon', 'Statue', 'Horse' ],
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
