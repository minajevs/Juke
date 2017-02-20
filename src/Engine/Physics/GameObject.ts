import Vector from "./Vector";
import Rect, { IRectOptions } from "./Rect";
import Sprite from "../Render/Sprite";
import Tools from "../Tools/Tools";
import Core from "../Core/Core";
import Tick from "../Core/Tick";

export enum EnumLayer {
    default = 0,
    background = 1,
    ground = 2,
    foreground = 3,
    special = 4
}

export interface IGameObjectOptions extends IRectOptions {
    tag?: string;
    renderable?: boolean;
    sprite?: Sprite;
    layer?: EnumLayer;
    collider?: Rect | boolean;
    children?: Array<GameObject>;
    parent?: GameObject;
}

export default class GameObject extends Rect {
    tag: string = undefined;
    renderable: boolean = false;
    sprite: Sprite; //TODO: add some default sprite
    layer: EnumLayer = 0;
    collider: Rect;
    private _children: Array<GameObject> = [];
    get children():Array<GameObject>{return this._children.slice()}//returns copy to avoid data corruption!!!!
    set children(value:Array<GameObject>){
        if(this._children == null) this._children = []; //strange behavior, but we need this. either way compilator errors appear
        for(let obj of value)
            this.addChild(obj);
    }

    private _parent: GameObject;
    get parent():GameObject {return this._parent;}
    set parent(value:GameObject) {
        if(this.parent != null)
            this.parent.removeChild(this);
        
        if(value != null)
            value.addChild(this);
    }

    private _nearObjects: [Array<GameObject>, number] = [[], 0]; //Objectlist , last update tick
    get nearObjects(): Array<GameObject> {
        if (this._nearObjects[1] != this.tick.tick)
            this._nearObjects = [this.tick.map.getNearby(this), this.tick.tick];
        return this._nearObjects[0];
    }

    tick: Tick;

    constructor(options?: IGameObjectOptions) {
        super(options);
        Tools.extend(this, options);
        if (options && options.collider != null && typeof options.collider === "boolean") {
            this.collider = options.collider
                ? new Rect({ pos: this.pos, w: this.w, h: this.h })
                : undefined;
        }
        if (this.sprite) {
            this.sprite.pos = this.pos;
            this.sprite.w = this.w;
            this.sprite.h = this.h;
        }
    }

    update(tick: Tick) {
        this.tick = tick;
    }

    addChild(object: GameObject) {
        if (this._children.indexOf(object) > -1) return;

        this._children.push(object);
        object._parent = this;
    }

    removeChild(object: GameObject) {
        let index = this._children.indexOf(object);
        if (index <= -1) return;

        object._parent = null;
        this._children.splice(index, 1);

    }

    getRect(): Rect {
        return new Rect({ pos: this.pos, w: this.w, h: this.h });
    }

    collides(object?: GameObject): boolean {
        if (this.collider == null || this.tick == null) return false;

        if (object != null) {
            return object.collider == null
                ? false
                : this.collider.intersects(object.collider);
        } else {
            for (let obj of this.nearObjects) {
                if (obj === this) continue;
                if (this.collider.intersects(obj.collider)) {
                    return true;
                }
            }
            return false;
        }
    }

    collisions(): Array<GameObject> {
        let ret = new Array<GameObject>();
        for (let obj of this.nearObjects) {
            if (obj === this) continue;
            if (this.collider.intersects(obj.collider)) {
                ret.push(obj);
            }
        }
        return ret;
    }

    moveBy(pos: Vector) {
        this.pos._plus(pos);
        //if(this.collider) this.collider.pos._plus(pos);
    }

    moveTo(pos: Vector) {
        let delta = Vector._minus(pos, this.pos);
        this.moveBy(delta);
    }
}