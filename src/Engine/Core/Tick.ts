import GameObject from "../Physics/GameObject";
import Rect from "../Physics/Rect";

export default class Tick{
    tick:number = 0;
    inView:boolean;
    update:boolean;
    bucket:Array<GameObject> = [];
    world:Rect;

    constructor(tick?:number){
        this.tick = tick || this.tick;
    }
}