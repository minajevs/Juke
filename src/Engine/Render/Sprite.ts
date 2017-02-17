import ImageResource from '../Resources/ImageResource';
import {IResource} from '../Resources/Resource';
import Renderable, {IRenderableOptions} from "./Renderable";
import Tools from '../Tools/Tools';
import Rect from '../Physics/Rect';
import Vector from '../Physics/Vector';

interface ISpriteOptions extends IRenderableOptions{
    src:ImageResource | IResource;
    mirror?:{vertical:boolean, horizontal:boolean};
    offset?:Rect;
    name?:string;
}

export default class Sprite extends Renderable{
    src:ImageResource;
    name:string;
    mirror:{vertical:boolean, horizontal:boolean} = {vertical: false, horizontal: false};
    private _offset:Rect;
    get offset() {
        return this._offset == null
            ? new Rect({pos:new Vector(0,0), w: this.src && this.src.res && this.src.res.width || this.w, h: this.src && this.src.res && this.src.res.height || this.h})
            : this._offset;
    };
    set offset(value:Rect){this._offset = value;}
    constructor(options:ISpriteOptions){
        super(options);
        Tools.extend(this, options)
        this.src = <ImageResource>options.src;
        if(options.name == null)
            this.name = options.src.name;
    }
}