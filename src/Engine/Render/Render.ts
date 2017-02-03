import Tools from "../Tools/Tools";
import Vector from "../Physics/Vector";

interface IRenderOptions{
    ctx?:CanvasRenderingContext2D;
    width?:number;
    height?:number;
}

interface IWriteOptions{
    text:string;
    position: Vector;
}


export default class Render{
    private ctx:CanvasRenderingContext2D;
    private lastRender:number;
    private options:IRenderOptions = {width: 800, height: 600};

    constructor(options?:IRenderOptions){
        Tools.extend(this.options, options);
        this.ctx = this.options.ctx || this.CreateCanvas();
    }

    public draw(){
        this.clear();
    }

    public clear(){
        this.ctx.clearRect(0, 0, this.options.width, this.options.height);
    }

    public write(options:IWriteOptions){
        this.ctx.fillText(options.text, options.position.x, options.position.y);
    }

    private CreateCanvas() : CanvasRenderingContext2D{
        let canvas = document.createElement('canvas');
        canvas.id = 'GameCanvas',
        canvas.width = this.options.width,
        canvas.height = this.options.height,
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        return canvas.getContext('2d');
    }
}