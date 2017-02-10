import Vector from "./Vector";
import Rect, {IRectOptions} from "./Rect";
import Sprite from "../Render/Sprite";
import Tools from "../Tools/Tools";
import Core from "../Core/Core";
import Tick from "../Core/Tick";

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
    collider?:Rect;
}

export default class GameObject extends Rect{
    tag:string = undefined;
    renderable:boolean = false;
    sprite:Sprite; //TODO: add some default sprite
    layer:EnumLayer = 0;
    collider: Rect;

    constructor(options?:IGameObjectOptions){
        super(options);
        Tools.extend(this, options);
        if(this.sprite){
            this.sprite.pos = this.pos;
            this.sprite.w = this.w;
            this.sprite.h = this.h;
        }
    }

    update(tick:Tick){

    }

    getRect():Rect{
        return new Rect({pos: this.pos, w: this.w, h: this.h});
    }

    moveBy(pos:Vector){
        this.pos._plus(pos);
        //if(this.collider) this.collider.pos._plus(pos);
    }

    moveTo(pos:Vector){
        let delta = Vector._minus(pos, this.pos);
        this.moveBy(delta);
    }
}