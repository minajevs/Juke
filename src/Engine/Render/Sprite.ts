import ImageResource from '../Resources/ImageResource';
import {IResource} from '../Resources/Resource';
import Renderable, {IRenderableOptions} from "./Renderable";
import Tools from '../Tools/Tools';

interface ISpriteOptions extends IRenderableOptions{
    src:ImageResource | IResource;
    mirror?:{vertical:boolean, horizontal:boolean};
}

export default class Sprite extends Renderable{
    src:ImageResource;
    name:string;
    mirror:{vertical:boolean, horizontal:boolean} = {vertical: false, horizontal: false};
    
    constructor(options:ISpriteOptions){
        super(options);
        Tools.extend(this, options)
        this.src = <ImageResource>options.src;
        this.name = options.src.name;
    }
}