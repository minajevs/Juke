import Tools from "../Tools/Tools";
import GameObject, {IGameObjectOptions} from "../Physics/GameObject";
import Render from "../Render/Render";
import Vector from "../Physics/Vector";
import TestGameObject from "../../TestGameObject";
import Keyboard from "../Controls/Keyboard";

interface ICameraOptions extends IGameObjectOptions{
    render?: Render;
    gameObjects: Array<GameObject>;
}


export default class Camera extends GameObject{
    private renderer:Render;
    private lastUpdate:number;
    private gameObjects:Array<GameObject> = [];
    
    constructor(options?:ICameraOptions){
        super(options);  
        this.tag = "camera";
        this.renderer = options && options.render || new Render({h: this.h, w: this.w});
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

    render(object:GameObject){
        if(object.renderable && object.sprite && object.sprite.visible && this.objectInView(object)){
            console.log(object);
            this.renderer.drawImage(object.sprite.src, object.sprite);
            this.renderer.write({text:`${object.pos.x}:${object.pos.y}`, position: Vector._minus(object.pos, new Vector(0,10))});
        }
    }

    private objectInView(object:GameObject):boolean{
        return this.intersects(object);
    }

    moveBy(pos:Vector){
        this.pos._plus(pos);
    }
}