# TODO

Asorted list of things to do

## Architecture

* Add ability to add tiles based on existing models (possibly combining multiple models for 1 tile)
* Use `zustand` as store, keep player & level state in there
* Split up PlayPage component, it is **way** to complex for its own good:
    * Move out player (movement/camera) handling
        * Likely rename Player component to simply Character
        * Move out the actual movement/camera handling to "real" Player component
* Integrate easystarjs for A* pathfinding

## Performance

* Make Tile Instancing more efficient, large maps currently drop the FPS significantly

## Misc

* Sort out lighting/fog, lighting is no good currently.

## Content

* Create tiles from Quaternius' packs
* Create tiles from some of Kenny's packs, good candidates are:
    * Fantasy Town Kit
    * Space Interior
    * Nature Pack
    * Furniture Kit
    * Graveyard Kit
