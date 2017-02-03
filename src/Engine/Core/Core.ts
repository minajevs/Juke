import Render from "../Render/Render";
import Tools from "../Tools/Tools";
import Camera from "../Render/Camera";
import GameObject from "../Physics/GameObject";
import Vector from "../Physics/Vector";
import Keyboard from "../Controls/Keyboard";

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

    private objects: Array<GameObject> = [];

    keyboard: Keyboard;

    constructor(options?: ICoreOptions) {
        Tools.extend(this.options, options);

        this.init();
    }

    public start(): void {
        this.lastTick = Date.now();
        this.startTime = Date.now();
        this.loop(this.lastTick);
    }

    public add(obj: GameObject): void {
        this.objects.push(obj);
    }

    private init(): void {
        this.keyboard = new Keyboard([Keyboard.UP, Keyboard.DOWN, Keyboard.RIGHT, Keyboard.LEFT]);
        this.objects.push(new Camera(this.keyboard, { position: new Vector(0, 0), width: 800, height: 600, gameObjects: this.objects }));

        console.log('fps:' + this.options.fps);


        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;

        this.fpsInterval = 1000 / this.options.fps;
    }

    private loop = (tick: number) => {
        window.requestAnimationFrame(this.loop);

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
    }
}