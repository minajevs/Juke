import GameObject from "../Physics/GameObject";

export default class Tick{
    tick:number = 0;
    inView:boolean;
    update:boolean;
    collisions:Array<GameObject> = [];

    constructor(tick?:number){
        this.tick = tick || this.tick;
    }
}