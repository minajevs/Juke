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
    keyboard:Keyboard;
    
    constructor(keyboard:Keyboard, options?:ICameraOptions){
        super(options);  
        this.tag = "camera";
        this.renderer = options && options.render || new Render({height: this.height, width: this.width});
        this.gameObjects = options.gameObjects;
        this.keyboard = keyboard;
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
        if(object instanceof Camera) return;
        else if (object instanceof TestGameObject){
            this.renderer.write({
                text: object.text,
                position: Vector._minus(object.position, this.position)
            });
        }

    }

    moveBy(pos:Vector){
        this.position._plus(pos);
    }
}