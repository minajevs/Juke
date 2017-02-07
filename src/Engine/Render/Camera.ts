import Tools from "../Tools/Tools";
import GameObject, {IGameObjectOptions} from "../Physics/GameObject";
import Render, {IDebugOptions} from "../Render/Render";
import Vector from "../Physics/Vector";
import Rect from "../Physics/Rect";
import TestGameObject from "../../TestGameObject";
import Keyboard from "../Controls/Keyboard";
import Objects from "../Core/Objects";

interface ICameraOptions extends IGameObjectOptions{
    render?: Render;
    gameObjects: Objects;
    debug?:boolean;
}


export default class Camera extends GameObject{
    private renderer:Render;
    private lastUpdate:number;
    private gameObjects:Objects;
    private debug:boolean = false;
    
    constructor(options?:ICameraOptions){
        super(options);  
        this.tag = "camera";
        Tools.extend(this, options);
        this.renderer = this.renderer || new Render({h: this.h, w: this.w});    
    }

    update(tick:number){
        this.lastUpdate = tick;
        this.renderer.clear();
    }

    updateObject(tick:number, object:GameObject){
        if(this.lastUpdate != tick){
            this.lastUpdate = tick;
            this.renderer.clear();           
        }
        this.render(object);

    }

    prepareUpdate(object:GameObject){
        let clearRect = object.getRect();
        if(this.debug) {
            clearRect.pos = Vector._minus(clearRect.pos, new Vector(1,12));
            clearRect.w += 2;
            clearRect.h += 13;
        }
        this.renderer.clear(clearRect);
    }

    render(object:GameObject){
        if(object.renderable && object.sprite && object.sprite.visible && this.objectInView(object)){  
            let drawRect = new Rect({pos: Vector._minus(object.sprite.pos, this.pos), w: object.sprite.w, h: object.sprite.h});     
            this.renderer.drawImage(object.sprite.src, drawRect);
        } 

        if(this.debug && this.objectInView(object)){
            let options:IDebugOptions = {rect: new Rect(), color:""};
            if (object.sprite != null){
                options.color = object.sprite.visible ?  "green" : "gray";
                options.rect = new Rect({pos: Vector._minus(object.sprite.pos, this.pos), w: object.sprite.w, h: object.sprite.h});
                options.text = `x: ${object.sprite.pos.x} y:${object.sprite.pos.y}`;
            } else {
                options.color = object.renderable ? "blue" : "red";
                options.rect = new Rect({pos: Vector._minus(object.getRect().pos, this.pos), w: object.getRect().w, h: object.getRect().h});
            }
            this.renderer.debug(options);
        }
    }

    private objectInView(object:GameObject):boolean{
        return this.intersects(object);
    }
}