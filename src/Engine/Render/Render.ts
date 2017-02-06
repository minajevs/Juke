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


export default class Render{
    private ctx:CanvasRenderingContext2D;
    private lastRender:number;
    private options:IRenderOptions = {w: 800, h: 600};

    constructor(options?:IRenderOptions){
        Tools.extend(this.options, options);
        this.ctx = this.options.ctx || this.CreateCanvas();
    }

    public drawImage(resource:ImageResource, rect:Rect){
        this.ctx.drawImage(resource.res, rect.pos.x, rect.pos.y, rect.w, rect.h);
    }

    public clear(){
        this.ctx.clearRect(0, 0, this.options.w, this.options.h);
    }

    public write(options:IWriteOptions){
        this.ctx.fillText(options.text, options.position.x, options.position.y);
    }

    private CreateCanvas() : CanvasRenderingContext2D{
        let canvas = document.createElement('canvas');
        canvas.id = 'GameCanvas',
        canvas.width = this.options.w,
        canvas.height = this.options.h,
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        return canvas.getContext('2d');
    }
}