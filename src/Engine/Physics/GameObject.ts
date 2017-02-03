import Vector from "../Physics/Vector";

export interface IGameObjectOptions{
    position?:Vector;
    width?:number;
    height?:number;
    tag?:string;
}

export default class GameObject{
    position:Vector = new Vector(0,0);
    width:number = 0;
    height:number = 0;
    tag:string;

    constructor(options?:IGameObjectOptions){
        this.position = options && options.position || this.position;
        this.width = options && options.width || this.width;
        this.height = options && options.height || this.height;
        this.tag = options && options.tag || undefined;
    }

    update(tick:number){

    }
}