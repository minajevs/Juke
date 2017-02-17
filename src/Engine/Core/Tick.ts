import GameObject from "../Physics/GameObject";
import Rect from "../Physics/Rect";
import SpatialMap from "../Physics/SpatialMap";

export default class Tick{
    tick: number = 0;
    inView: boolean;
    update: boolean;
    map: SpatialMap;
    world: Rect;

    constructor(tick?: number){
        this.tick = tick || this.tick;
    }
}