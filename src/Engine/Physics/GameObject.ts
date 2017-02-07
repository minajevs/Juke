import Vector from "./Vector";
import Rect, {IRectOptions} from "./Rect";
import Sprite from "../Render/Sprite";
import Tools from "../Tools/Tools";

export enum EnumLayer{
    default     =   0,
    background  =   1,
    ground      =   2,
    foreground  =   3,
    special     =   4
}

export interface IGameObjectOptions extends IRectOptions{
    tag?:string;
    renderable?:boolean;
    sprite?:Sprite;
    layer?:EnumLayer;
}

export default class GameObject extends Rect{
    tag:string = undefined;
    renderable:boolean = false;
    sprite:Sprite; //TODO: add some default sprite
    layer:EnumLayer = 0;

    constructor(options?:IGameObjectOptions){
        super(options);
        Tools.extend(this, options);
        if(options && options.sprite){
                this.sprite = options.sprite;
                this.sprite.pos = this.pos;
                this.sprite.w = this.w;
                this.sprite.h = this.h;
        }
    }

    update(tick:number){

    }

    getRect():Rect{
        return new Rect({pos: this.pos, w: this.w, h: this.h});
    }

    moveBy(pos:Vector){
        this.pos._plus(pos);
    }

    moveTo(pos:Vector){
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    }
}