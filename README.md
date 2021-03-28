# DSEngine

WebGL based 3D ARPG engine based on the old [Darkstone](https://en.wikipedia.org/wiki/Darkstone) game. For testing, I'm using graphics from [Quaternius](https://www.patreon.com/quaternius), but at some point in the future this will be integrated with my [Darkstone recreation project](https://github.com/Game3DEE/darkstone) to load the Darkstone game data directly.

For now I'm focusing on gameplay, and level / room creation. I am planning to add non-fantasy tilesets (from both [Quaternius](https://www.patreon.com/quaternius) and [Kenny](https://kenney.nl/) in the near future too.

Stay tuned, and feel free to leave feedback.

There is a Github hosted [live demo](https://game3dee.github.io/dsengine/) available.

## Live Demo Guide

### Edit mode

Use the `[` and `]` keys to cycle through the available tiles, and use the mouse button to place it on the grid. Press `SHIFT` and click to select the tile under the cursor, use `CTRL` click to delete the tile under the cursor.

Press `S` to save to local storage (only one map can be stored currently).

A more userfriendly UI is being planned ;)

### Play mode

When in play mode, use `ASWD` to move around, you can press `1` or `2` to switch between top-down view and 3rd person view.

Using the arrow keys you can move the camera closer/further away, or left/right.

Use `ESC` to toggle the physics debug view.

and be aware of the bugs, as there are likely many ;)

### Maps

The `/#/play` and `/#/edit` URLs allow a map to be specified, if the specified map is not found localStorage will be loaded.

For example, to load the default map explicitely, use `/#/edit/default`.
