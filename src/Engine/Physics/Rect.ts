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
    get pos2():Vector {return Vector._plus(this.pos, new Vector(this.w, this.h))}
    set pos2(value:Vector){
        this.w = value.x - this.pos.x; 
        this.h = value.y - this.pos.y;
        console.log(this.w);
    }
    get area():number {return (this.pos2.x - this.pos.x) * (this.pos2.y - this.pos.y)}
    get largeArea():number {return (this.pos2.x - this.pos.x) * (this.pos2.y - this.pos.y)}    
    get center():Vector {return Vector._plus(this.pos, new Vector(this.w/2, this.h/2))}
    set center(value:Vector) {this.pos.x = value.x-(this.w/2); this.pos.y = value.y-(this.h/2)}
    
    constructor(options?:IRectOptions){
        Tools.extend(this, options)
    }

    intersects(rect:Rect):boolean{
        return !(this.pos.x > rect.pos2.x ||
                this.pos2.x < rect.pos.x ||
                this.pos.y > rect.pos2.y ||
                this.pos2.y < rect.pos.y)
    }

    //touches(rect:Rect):Tuple{
    //    return {true, 1}
    //}
}