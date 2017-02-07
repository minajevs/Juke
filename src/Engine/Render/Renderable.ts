import Rect, {IRectOptions} from "../Physics/Rect";

export interface IRenderableOptions extends IRectOptions{
    visible?:boolean;
    scale?:number;
}

export default class Renderable extends Rect{
    visible:boolean = true;
    scale:number = 1;

    constructor(options?:IRenderableOptions){
        super(options);
        if(options){
            this.visible = (options.visible != null) 
                ? options.visible 
                : this.visible;
            this.scale = options.scale || this.scale;
        }
    }
}