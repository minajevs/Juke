import Vector from "./Vector";
import Tools from "../Tools/Tools";

export interface IRectOptions{
    w?:number;
    h?:number;
    pos?:Vector;
    pos2?:Vector;  
}

export default class Rect{
    //Physical parameters
    w:number = 0;
    h:number = 0;
    //Top-left coordinates
    pos:Vector = new Vector(0,0);
    //Bottom-right coordinates
    readonly pos2:Vector = new Vector(0,0);
    
    constructor(options?:IRectOptions){
        if(options){
            this.w = options.w || this.w;
            this.h = options.h || this.h;
            this.pos = options.pos || this.pos;
        }
        this.pos2 = Vector._plus(this.pos, new Vector(this.w, this.h));
    }

    intersects(rect:Rect):boolean{
        return !(this.pos.x > rect.pos2.x ||
                this.pos2.x < rect.pos.x ||
                this.pos.y > rect.pos2.y ||
                this.pos2.y < rect.pos.y)
    }
}