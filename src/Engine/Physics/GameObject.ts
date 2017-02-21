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

export enum Roles {
    default = 0,
    collider = 1,
    sprite = 2,
}

export interface IGameObjectOptions extends IRectOptions {
    tag?: string;
    role?: Roles;
    renderable?: boolean;
    sprite?: Sprite;
    layer?: EnumLayer;
    children?: Array<GameObject>;
    parent?: GameObject;
    collide?: boolean;
}

export default class GameObject extends Rect {
    tag: string = undefined;
    role: Roles = Roles.default;
    renderable: boolean = false;
    sprite: Sprite; //TODO: add some default sprite
    layer: EnumLayer = 0;
    get colliders(): GameObject[] {
        return this._children[Roles.collider];
    };

    private _children: { [role: number]: Array<GameObject> } = {};
    get children(): Array<GameObject> {
        let ret:Array<GameObject> = [];
        for (let role in Roles){
            ret = ret.concat(this._children[role]);
        }
        return ret;
    }
    set children(value: Array<GameObject>) {
        for (let obj of value)
            this.addChild(obj);
    }

    private _parent: GameObject;
    get parent(): GameObject { return this._parent; }
    set parent(value: GameObject) {
        let parent = this._parent;
        if (this._parent != null)
            this._parent.removeChild(this);

        if (value != null) {
            value.addChild(this);
            if (this.positionLock == parent) this.positionLock = value;
        }
    }

    positionLock: GameObject;

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
        if (options && options.collide) {
            this.addChild(new GameObject({ pos: this.pos, w: this.w, h: this.h, role: Roles.collider }));
        }
        if (this.sprite) {
            this.sprite.pos = this.pos;
            this.sprite.w = this.w;
            this.sprite.h = this.h;
        }
        if (options && options.children) {
            for (let child of options.children)
                this.addChild(child);
        }
        if (this.sprite) this.sprite.parent = this;
        this.positionLock = this.parent;

        for(let role in Roles)
            if(this._children[role] == null) this._children[role] = []
    }

    update(tick: Tick) {
        this.tick = tick;
        if (this.positionLock != null) this.pos = this.positionLock.pos;
        for (let role in Roles)
            for (let obj of this._children[role])
                obj.update(tick);

    }

    addChild(object: GameObject) {
        if (this._children[object.role] == null) this._children[object.role] = new Array<GameObject>();
        if (this._children[object.role].indexOf(object) > -1) return;

        if (object.positionLock == object.parent) object.positionLock = this;
        this._children[object.role].push(object);
        object._parent = this;
    }

    removeChild(object: GameObject) {
        if (this._children[object.role] == null || this._children[object.role].indexOf(object) == -1) return;
        let index = this._children[object.role].indexOf(object);
        if (object._parent == this.positionLock) this.positionLock = null;
        object._parent = null;
        this._children[object.role].splice(index, 1);
    }

    getRect(): Rect {
        return new Rect({ pos: this.pos, w: this.w, h: this.h });
    }

    collides(object?: GameObject): boolean {
        let colliders = this.colliders;
        if (colliders.length < 1 || this.tick == null) return false;

        if (object != null) {
            return object.colliders.length < 1
                ? false
                : colliders.some(x => object.colliders.some(y => x.intersects(y)))
        } else {
            for (let obj of this.nearObjects) {
                if (obj === this) continue;
                if (colliders.some(x => obj.colliders.some(y => x.intersects(y)))) {
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
            for (let collider of this.colliders) {
                if (obj.colliders.some(collider2 => collider2.intersects(collider)))
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