import Vector from "./Vector";
import Tools from "../Tools/Tools";
import IRect from './IRect';

export interface IRectOptions{
    w?: number;
    h?: number;
    pos?: Vector;
    pos2?: Vector;
}

/** Base geometric class. Represents 2d rectangular with vector position and 2 dimensions (width, height) */
export default class Rect implements IRect{
    /** Width */
    w: number = 0;

    /** Height */
    h: number = 0;

    /** Top-left corner position of rectangular */
    pos: Vector = new Vector(0, 0);

    /** Bottom-right position of rectangular */
    get pos2(): Vector {return Vector._plus(this.pos, new Vector(this.w, this.h)); }
    set pos2(value: Vector){
        this.w = value.x - this.pos.x;
        this.h = value.y - this.pos.y;
    }

    /** Rectangular area */
    get area(): number {return (this.pos2.x - this.pos.x) * (this.pos2.y - this.pos.y); }

    /** Center point of rectangular */
    get center(): Vector {return Vector._plus(this.pos, new Vector(this.w / 2, this.h / 2)); }
    set center(value: Vector) {this.pos.x = value.x - (this.w / 2); this.pos.y = value.y - (this.h / 2); }

    constructor(options?: IRectOptions){
        Tools.extend(this, options);
    }

    /** Tells if rectangular intersects with provided rectangular */
    intersects(rect: Rect): boolean{
        return !(this.pos.x > rect.pos2.x ||
                this.pos2.x < rect.pos.x ||
                this.pos.y > rect.pos2.y ||
                this.pos2.y < rect.pos.y);
    }

    //touches(rect:Rect):Tuple{
    //    return {true, 1}
    //}
}