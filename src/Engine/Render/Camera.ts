import Tools from "../Tools/Tools";
import GameObject, {IGameObjectOptions} from "../Physics/GameObject";
import Render, {IDebugOptions} from "../Render/Render";
import Vector from "../Physics/Vector";
import Rect from "../Physics/Rect";
import TestGameObject from "../../TestGameObject";
import Keyboard from "../Controls/Keyboard";

interface ICameraOptions extends IGameObjectOptions{
    render?: Render;
    gameObjects: Array<GameObject>;
    debug?:boolean;
}


export default class Camera extends GameObject{
    private renderer:Render;
    private lastUpdate:number;
    private gameObjects:Array<GameObject> = [];
    private debug:boolean = false;
    
    constructor(options?:ICameraOptions){
        super(options);  
        this.tag = "camera";
        this.renderer = options && options.render || new Render({h: this.h, w: this.w});
        this.debug = options && options.debug || this.debug;
        this.gameObjects = options.gameObjects;
        console.log(this.gameObjects);     
    }

    update(tick:number){
        this.lastUpdate = tick;
        this.renderer.clear();

        for(let obj of this.gameObjects){
            this.render(obj);
        }
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
            console.log(object.sprite);
                
            this.renderer.drawImage(object.sprite.src, object.sprite);
        } 

        if(this.debug && this.objectInView(object)){
            let options:IDebugOptions = {rect: new Rect(), color:""};
            if (object.sprite != null){
                options.color = object.sprite.visible ?  "green" : "gray";
                options.rect = object.sprite;
                options.text = `x: ${object.sprite.pos.x} y:${object.sprite.pos.y}`;
            } else {
                options.color = object.renderable ? "blue" : "red";
                options.rect = object.getRect();
            }
            this.renderer.debug(options);
        }
    }

    private objectInView(object:GameObject):boolean{
        return this.intersects(object);
    }

    moveBy(pos:Vector){
        this.pos._plus(pos);
    }
}