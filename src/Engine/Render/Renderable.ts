import Rect, {IRectOptions} from "../Physics/Rect";
import GameObject from "../Physics/GameObject";
import Tools from "../Tools/Tools";

export interface IRenderableOptions extends IRectOptions{
    visible?: boolean;
    scale?: number;
}

export default class Renderable extends GameObject{
    visible: boolean = true;
    scale: number = 1;

    constructor(options?: IRenderableOptions){
        super(options);
        Tools.extend(this, options);
    }
}