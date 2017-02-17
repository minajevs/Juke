import GameObject from "../Physics/GameObject";
import Rect from "../Physics/Rect";
import SpatialMap from "../Physics/SpatialMap";

export default class Tick{
    tick: number = 0;
    inView: boolean;
    update: boolean;
    map: SpatialMap;
    world: Rect;
    events: {[id:string] : Event} = {}
    variables: {[id:string] : number|boolean|string} = {}

    constructor(tick?: number){
        this.tick = tick || this.tick;
        this.events = {};
        this.variables = {};
    }
}