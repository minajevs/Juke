import Tools from "../Tools/Tools";
import Vector from "../Physics/Vector";
import Rect from "../Physics/Rect";
import ImageResource from "../Resources/ImageResource";

interface IRenderOptions{
    ctx?:CanvasRenderingContext2D;
    w?:number;
    h?:number;
}

interface IWriteOptions{
    text:string;
    position: Vector;
}

export interface IDebugOptions{
    rect:Rect, 
    color:string, 
    text?:string
}


export default class Render{
    private ctx:CanvasRenderingContext2D;
    private lastRender:number;
    private w:number = 800;
    private h:number = 600;

    constructor(options?:IRenderOptions){
        Tools.extend(this, options);
        this.ctx = this.ctx || this.CreateCanvas();
    }

    public drawImage(resource:ImageResource, rect:Rect, offset:Rect){
        this.ctx.drawImage(resource.res, offset.pos.x, offset.pos.y, offset.w, offset.h, rect.pos.x, rect.pos.y, rect.w, rect.h);
    }

    public debug(options:IDebugOptions){
        this.ctx.beginPath();
        this.ctx.lineWidth=1;
        this.ctx.strokeStyle=options.color;
        this.ctx.rect(options.rect.pos.x, options.rect.pos.y, options.rect.w, options.rect.h);
        this.ctx.stroke();
        if(options.text)
            this.write({text: options.text, position: Vector._plus(options.rect.pos, new Vector(0,-5))});
            
    }

    public clear(rect?:Rect){
        let clearRect = rect || new Rect({pos: new Vector(0,0), w: this.w, h: this.h});
        this.ctx.clearRect(clearRect.pos.x, clearRect.pos.y, clearRect.w, clearRect.h);
    }

    public write(options:IWriteOptions){
        this.ctx.fillText(options.text, options.position.x, options.position.y);
    }

    private CreateCanvas() : CanvasRenderingContext2D{
        let canvas = document.createElement('canvas');
        canvas.id = 'GameCanvas',
        canvas.width = this.w,
        canvas.height = this.h,
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        return canvas.getContext('2d');
    }
}