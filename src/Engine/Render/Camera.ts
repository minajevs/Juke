import Tools from "../Tools/Tools";
import GameObject, { IGameObjectOptions } from "../Physics/GameObject";
import Render, { IDebugOptions } from "../Render/Render";
import Vector from "../Physics/Vector";
import Rect from "../Physics/Rect";
import TestGameObject from "../../TestGameObject";
import Keyboard from "../Controls/Keyboard";
import Objects from "../Core/Objects";
import Tick from "../Core/Tick";

interface ICameraOptions extends IGameObjectOptions {
    render?: Render;
    gameObjects?: Objects;
}


export default class Camera extends GameObject {
    private renderer: Render;
    private lastUpdate: number;
    private debug: boolean;
    gameObjects: Objects;
    constructor(options?: ICameraOptions) {
        super(options);
        this.tag = "camera";
        Tools.extend(this, options);
        this.renderer = this.renderer || new Render({ h: this.h, w: this.w });
    }

    update(tick: Tick) {
        this.lastUpdate = tick.tick;
        this.debug = tick.variables["debug"] === true;
        this.renderer.clear();
    }

    updateObject(tick: Tick, object: GameObject) {
        if (this.lastUpdate != tick.tick) {
            this.update(tick);
        }
        this.render(object);
    }

    render(object: GameObject) {
        if (object.renderable && object.sprite && object.sprite.visible && this.objectInView(object)) {
            let drawRect = new Rect({ pos: Vector._minus(object.sprite.pos, this.pos), w: object.sprite.w, h: object.sprite.h });
            this.renderer.drawImage(object.sprite.src, drawRect, object.sprite.offset);
        }

        if (this.debug && this.objectInView(object)) {
            let objectOptions: IDebugOptions = { rect: new Rect(), color: "" };
            if (object.sprite != null) {
                objectOptions.color = object.sprite.visible ? "green" : "gray";
                objectOptions.rect = new Rect({ pos: Vector._minus(object.sprite.pos, this.pos), w: object.sprite.w, h: object.sprite.h });
                objectOptions.text = `x: ${object.sprite.pos.x} y:${object.sprite.pos.y}`;
            } else {
                objectOptions.color = object.renderable ? "blue" : "red";
                objectOptions.rect = new Rect({ pos: Vector._minus(object.getRect().pos, this.pos), w: object.getRect().w, h: object.getRect().h });
            }
            this.renderer.debug(objectOptions);
            if (object.colliders.length > 0) {
                for (let collider of object.colliders) {
                    let colliderOptions: IDebugOptions = {
                        rect: new Rect({ pos: Vector._minus(collider.pos, this.pos), w: collider.w, h: collider.h }),
                        color: "red"
                    };
                    this.renderer.debug(colliderOptions);
                }
            }
        }
    }

    private objectInView(object: GameObject): boolean {
        return this.intersects(object);
    }
}