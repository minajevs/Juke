import ImageResource from '../Resources/ImageResource';
import {IResource} from '../Resources/Resource';
import Renderable, {IRenderableOptions} from "./Renderable";

interface ISpriteOptions extends IRenderableOptions{
    src:ImageResource | IResource;
}

export default class Sprite extends Renderable{
    src:ImageResource;
    name:string;
    
    constructor(options:ISpriteOptions){
        super(options);
        if(options){
            this.src = <ImageResource>options.src;
            this.name = options.src.name;
        }
    }
}