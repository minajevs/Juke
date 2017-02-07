import Vector from "./Vector";
import Rect, {IRectOptions} from "./Rect";
import Sprite from "../Render/Sprite";

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
        if(options){
            if(options.sprite){
                this.sprite = options.sprite;
                this.sprite.pos = this.pos;
                this.sprite.w = this.w;
                this.sprite.h = this.h;
            }
            this.tag = options.tag || this.tag;
            this.renderable = options.renderable || this.renderable;
            this.layer = options.layer || this.layer;
        }
    }

    update(tick:number){

    }

    getRect():Rect{
        return new Rect({pos: this.pos, w: this.w, h: this.h});
    }
}