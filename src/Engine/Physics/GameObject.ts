import Vector from "./Vector";
import Rect, { IRectOptions } from "./Rect";
import IRect from "./IRect";
import Sprite from "../Render/Sprite";
import Tools from "../Tools/Tools";
import Core from "../Core/Core";
import Tick from "../Core/Tick";
import IGameObject from './IGameObject';
import {Roles,Layer} from './Enums';

export interface IGameObjectOptions extends IRectOptions {
    tag?: string;
    role?: Roles;
    renderable?: boolean;
    sprite?: Sprite;
    layer?: Layer;
    children?: Array<IGameObject>;
    parent?: IGameObject;
    collide?: boolean;
}

/** Base game engine object class. */
export default class GameObject extends Rect implements IGameObject{
    /** Free text. Can be used to identify object from others */
    tag: string = undefined;

    /** Object type */
    role: Roles = Roles.default;

    /** Tells engine if this object should be rendered */
    renderable: boolean = false;

    /** Game object sprite */
    sprite: Sprite; //TODO: add some default sprite

    /** Tells on which layer object is located. The higher leyer is - the later object will be taken care of */
    layer: Layer = 0;

    /** Private children dictionary. Children are stored in dictionary by roles. Keys: Role / Values: Array of objects */
    private _children: { [role: number]: Array<IGameObject> } = {};
    
    /** All game object children */
    get children(): Array<IGameObject> {
        let ret:Array<IGameObject> = [];
        for (let role in Roles){
            ret = ret.concat(this._children[role]);
        }
        return ret;
    }
    set children(value: Array<IGameObject>) {
        for (let obj of value)
            this.addChild(obj);
    }

    /** Game object children of "Collider" type */
    get colliders(): IGameObject[] {
        return this._children[Roles.collider];
    };

    /** Internal game object parent reference */
    private _parent: IGameObject;

    /** Parent object */
    get parent(): IGameObject { return this._parent; }
    set parent(value: IGameObject) {
        let parent = this._parent;
        if (this._parent != null)
            this._parent.removeChild(this);

        if (value != null) {
            value.addChild(this);
            if (this.positionLock == parent) this.positionLock = value;
        }
    }

    /** Object which game object is "locked" to (position locked) */
    positionLock: IGameObject;

    /** Internal near object reference. Is tuple of near objects and reference time frame (tick) */
    private _nearObjects: [Array<IGameObject>, number] = [[], 0]; //Objectlist , last update tick

    /** Object located nearby */
    get nearObjects(): Array<IGameObject> {
        if (this._nearObjects[1] != this.tick.tick)
            this._nearObjects = [this.tick.map.getNearby(this), this.tick.tick];
        return this._nearObjects[0];
    }

    /** Local backup of the current tick */
    private tick: Tick;

    /** Creates an instance of GameObject */
    constructor(options?: IGameObjectOptions) {
        super(options);
        Tools.extend(this, options);
        console.log('TAG', options == null ? 'none' : options.tag);
        console.log('options.parent', options == null ? 'none' : options.parent);
        console.log('this.parent', this.parent);
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

    /** Updates GameObject state for provided tick */
    update(tick: Tick) {
        this.tick = tick;
        if (this.positionLock != null) this.pos = this.positionLock.pos;
        for (let role in Roles)
            for (let obj of this._children[role])
                obj.update(tick);

    }

    /** Adds child to object */
    addChild(object: IGameObject) {
        if (this._children[object.role] == null) this._children[object.role] = new Array<GameObject>();
        if (this._children[object.role].indexOf(object) > -1) return;

        if (object.positionLock == object.parent) object.positionLock = this;
        this._children[object.role].push(object);
        object.parent = this;
    }

    /** Removes child from object */
    removeChild(object: IGameObject) {
        if (this._children[object.role] == null || this._children[object.role].indexOf(object) == -1) return;
        let index = this._children[object.role].indexOf(object);
        if (object.parent == this.positionLock) this.positionLock = null;
        object.parent = null;
        this._children[object.role].splice(index, 1);
    }

    /** Returns object rect */
    getRect(): IRect {
        return new Rect({ pos: this.pos, w: this.w, h: this.h });
    }

    /** Tells if object collides with any or provided object */
    collides(object?: IGameObject): boolean {
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

    /** Get all objects with which object collides */
    collisions(): Array<IGameObject> {
        let ret = new Array<IGameObject>();
        for (let obj of this.nearObjects) {
            if (obj === this) continue;
            for (let collider of this.colliders) {
                if (obj.colliders.some(collider2 => collider2.intersects(collider)))
                    ret.push(obj);
            }
        }
        return ret;
    }

    /** Adds to current position */
    moveBy(pos: Vector) {
        this.pos._plus(pos);
        //if(this.collider) this.collider.pos._plus(pos);
    }

    /** Sets current vector */
    moveTo(pos: Vector) {
        let delta = Vector._minus(pos, this.pos);
        this.moveBy(delta);
    }
}