import { IRectOptions } from './Rect';
import Tools from "../Tools/Tools";

import GameObject from "../Physics/GameObject";
import Rect from "../Physics/Rect";
import Objects from "../Core/Objects";
import Core from "../Core/Core";

export interface IColliderOptions extends IRectOptions{
    objects?: Objects;
}

export default class Collider extends Rect{
    objects:Objects;

    constructor(options?:IColliderOptions){
        super(options);
        Tools.extend(this, options);          
    }

    collisions(object:GameObject):Array<GameObject>{
        //TODO: Add multi-level collisions
        let ret = new Array<GameObject>();
        let layer = this.objects.get(object.layer);
        for(let obj of layer){
            if(obj.collider && object.collider
                && obj.collider.intersects(object.collider) 
                && obj !== object){
                    ret.push(obj);
                }
        }

        return ret;
    }    
}