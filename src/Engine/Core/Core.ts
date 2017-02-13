import Resources from './../Resources/Resources';
import Render from "../Render/Render";
import Tools from "../Tools/Tools";
import Camera from "../Render/Camera";
import GameObject from "../Physics/GameObject";
import Vector from "../Physics/Vector";
import Keyboard from "../Controls/Keyboard";
import ImageResource from "../Resources/ImageResource";
import Objects from "./Objects";
import SpatialMap from "../Physics/SpatialMap";
import Tick from "./Tick";


interface ICoreOptions {
    ctx?: CanvasRenderingContext2D;
    tickLength?: number;
    fps?: number;
    debug?: boolean;
    camera?: Camera;
    spatialMap?: SpatialMap;
    w?: number;
    h?: number;
}


export default class Core {
    private options: ICoreOptions = { fps: 60 };
    private fpsInterval: number;
    private lastTick: number;
    private startTime: number;
    private totalFrames: number = 0;
    private requestId: number;
    private objects: Objects = new Objects();

    debug: boolean = false;
    resources: Resources = new Resources();
    camera: Camera = new Camera({ pos: new Vector(0, 0), w: 800, h: 600 });
    keyboard: Keyboard;
    spatialMap: SpatialMap = new SpatialMap({w: 10000, h: 10000, cellsize: 500});

    constructor(options?: ICoreOptions) {
        Tools.extend(this.options, options);
        Tools.extend(this, options);

        this.keyboard = new Keyboard([Keyboard.UP, Keyboard.DOWN, Keyboard.RIGHT, Keyboard.LEFT, Keyboard.SPACE]);
        this.camera.gameObjects = this.objects;
        this.camera.debug = this.debug;
        this.spatialMap.debug = this.debug;
        if(this.options.w && this.options.h){
            this.spatialMap.w = this.options.w;
            this.spatialMap.h = this.options.h;
        }
    }

    public start(): void {
        this.lastTick = Date.now();
        this.startTime = Date.now();
        this.loop(this.lastTick);
    }

    public stop(): void {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId)
            this.requestId = null;
        }
    }

    public add(obj: GameObject): void {
        this.objects.add(obj);
        this.spatialMap.add(obj);
    }

    public init(): Promise<any> {
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
        this.requestId = window.requestAnimationFrame(this.loop);

        let now = Date.now();
        let elapsed = now - this.lastTick;
        if (elapsed > this.fpsInterval) {
            this.lastTick = now - (elapsed % this.fpsInterval);
        }
        let internalTick = new Tick(tick);
        this.update(internalTick);
    }

    //Updates state
    private update(tick: Tick) {
        //Update self
        //this.collider.objects = this.objects;
        this.camera.update(tick);
        //Update objects
        for (let i = 0; i < this.objects.layerCount; i++) {
            if (this.objects.length(i) > 0) {
                let layer = this.objects.get(i);
                for (let obj of layer) {
                    //tick.collisions = this.collider.collisions(obj);
                    tick.bucket = this.spatialMap.getNearby(obj);
                    obj.update(tick);
                    this.camera.updateObject(tick, obj);
                }
            }
        }
    }
}