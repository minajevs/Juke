import Resources from './../Resources/Resources';
import Render from "../Render/Render";
import Tools from "../Tools/Tools";
import Camera from "../Render/Camera";
import GameObject from "../Physics/GameObject";
import Vector from "../Physics/Vector";
import Keyboard from "../Controls/Keyboard";
import ImageResource from "../Resources/ImageResource";

interface ICoreOptions {
    ctx?: CanvasRenderingContext2D;
    tickLength?: number;
    fps?: number;
}


export default class Core {
    private options: ICoreOptions = { fps: 60 };
    private fpsInterval: number;
    private lastTick: number;
    private startTime: number;
    private totalFrames: number = 0;
    private requestId:number;

    private objects: Array<GameObject> = [];

    resources: Resources = new Resources();
    camera: Camera;
    keyboard: Keyboard;

    constructor(camera?:Camera, options?: ICoreOptions) {
        Tools.extend(this.options, options);
        this.keyboard = new Keyboard([Keyboard.UP, Keyboard.DOWN, Keyboard.RIGHT, Keyboard.LEFT]);
        this.camera = camera || new Camera({ pos: new Vector(0,0), w: 800, h: 600, gameObjects: this.objects });
    }

    public start(): void {
        this.lastTick = Date.now();
        this.startTime = Date.now();
        this.loop(this.lastTick);
    }

    public stop():void{ 
        console.log(this.requestId);
        
        if(this.requestId){
            window.cancelAnimationFrame(this.requestId)
            this.requestId = null;
        }
    }

    public add(obj: GameObject): void {
        this.objects.push(obj);
    }

    public init(): Promise<any>{
        console.log('fps:' + this.options.fps);


        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
        this.fpsInterval = 1000 / this.options.fps;

        let p = this.resources.loadAll();
        p.then(res => {
            this.start();
        });

        return p;

    }

    private loop = (tick: number) => {
        //this.requestId = window.requestAnimationFrame(this.loop);

        let now = Date.now();
        let elapsed = now - this.lastTick;
        if (elapsed > this.fpsInterval) {
            this.lastTick = now - (elapsed % this.fpsInterval);
        }


        this.update(tick);
    }

    //Updates state
    private update(tick: number) {
        if (this.keyboard.isDown(Keyboard.UP)) {
            console.log('up');

        }

        for (let obj of this.objects) {
            obj.update(tick);
        }

        this.camera.update(tick);
    }
}