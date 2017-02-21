import Resources from "./../Resources/Resources";
import udpate from "../Render/Render";
import Tools from "../Tools/Tools";
import * as _Stats from "../Tools/Stats";
import Camera from "../Render/Camera";
import GameObject from "../Physics/GameObject";
import Vector from "../Physics/Vector";
import Keyboard from "../Controls/Keyboard";
import ImageResource from "../Resources/ImageResource";
import Objects from "./Objects";
import SpatialMap from "../Physics/SpatialMap";
import Tick from "./Tick";
import Events from "./Events";


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
    private stats: Stats;

    debug: boolean = false;
    resources: Resources = new Resources();
    camera: Camera = new Camera({ pos: new Vector(0, 0), w: 800, h: 600 });
    keyboard: Keyboard;
    spatialMap: SpatialMap = new SpatialMap({ w: 10000, h: 10000, cellsize: 500 });

    constructor(options?: ICoreOptions) {
        Tools.extend(this.options, options);
        Tools.extend(this, options);

        Keyboard.initialize([Keyboard.UP, Keyboard.DOWN, Keyboard.RIGHT, Keyboard.LEFT, Keyboard.SPACE]);

        this.camera.gameObjects = this.objects;
        if (this.options.w && this.options.h) {
            this.spatialMap.w = this.options.w;
            this.spatialMap.h = this.options.h;
        }

        if (this.debug) {
            this.stats = new Stats();
        }
    }

    public start(): void {
        this.lastTick = Date.now();
        this.startTime = Date.now();
        this.loop(this.lastTick);
    }

    public stop(): void {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }

    public add(obj: GameObject): void {
        this.objects.add(obj);
        this.spatialMap.add(obj);
    }

    public async init() {
        let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
        this.fpsInterval = 1000 / this.options.fps;

        console.log("Started loading game!");
        let start = Date.now();
        await this.resources.loadAll(count => {
            if(this.debug) console.log((100*count/this.resources.length()).toFixed(0) + "%");
        });
        this.start();
        console.log(`Game loaded in ${Date.now() - start}ms`);
    }

    private loop = (tick: number) => {
        let internalTick = new Tick(tick);
        internalTick.variables["debug"] = true;
        if (this.debug) {
            this.stats.fps.begin();
            this.stats.loop.begin();
        }
        let now = Date.now();
        let elapsed = now - this.lastTick;
        if (elapsed > this.fpsInterval) {
            this.lastTick = now - (elapsed % this.fpsInterval);
        }
        this.update(internalTick);
        if (this.debug) {
            this.stats.fps.end();
            this.stats.loop.end();
        }
        this.requestId = window.requestAnimationFrame(this.loop);
    }

    //Updates state
    private update(tick: Tick) {
        //Update self
        this.camera.update(tick);

        //Update objects
        let objects = this.objects.get();
        for (let obj of objects) {
            if (obj.colliders.length > 0)
                tick.map = this.spatialMap;
            obj.update(tick);
        }
        for (let i = 0; i < this.objects.layerCount; i++) {
            if (this.objects.length(i) > 0) {
                let layer = this.objects.get(i);
                for (let obj of layer) {
                    this.camera.updateObject(tick, obj);
                }
            }
        }
    }
}

class Stats {
    fps: IStats;
    loop: IStats;
    collisions: IStats;
    update: IStats;
    constructor() {
        this.fps = _Stats.Stats();
        this.loop = _Stats.Stats();
        this.collisions = _Stats.Stats();
        this.update = _Stats.Stats();

        let fpsEl = document.createElement("div");
        this.fps.dom.style.cssFloat = "left";
        this.fps.dom.style.position = "relative";
        fpsEl.appendChild(this.fps.dom).appendChild(document.createTextNode("Fps"));

        let loopEl = document.createElement("div");
        this.loop.dom.style.cssFloat = "left";
        this.loop.dom.style.position = "relative";
        loopEl.appendChild(this.loop.dom).appendChild(document.createTextNode("Loop"));

        let collisionsEl = document.createElement("div");
        this.collisions.dom.style.cssFloat = "left";
        this.collisions.dom.style.position = "relative";
        collisionsEl.appendChild(this.collisions.dom).appendChild(document.createTextNode("Collisions"));

        let udpateEl = document.createElement("div");
        this.update.dom.style.cssFloat = "left";
        this.update.dom.style.position = "relative";
        udpateEl.appendChild(this.update.dom).appendChild(document.createTextNode("Update"));


        this.fps.showPanel(0);
        this.loop.showPanel(1);
        this.collisions.showPanel(1);
        this.update.showPanel(1);

        document.body.appendChild(fpsEl);
        document.body.appendChild(loopEl);
        document.body.appendChild(collisionsEl);
        document.body.appendChild(udpateEl);
    }
}

interface IStats {
    REVISION: number;
    dom: HTMLDivElement;
    addPanel: (panel: any) => any;
    showPanel: (id: any) => void;
    begin: () => void;
    end: () => number;
    update: () => void;
    domElement: HTMLDivElement;
    setMode: (id: any) => void;
}