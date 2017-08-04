import IGameObject from "../Physics/IGameObject";
import {Layer} from '../Physics/Enums';

export default class Objects{
    objects: Array<Array<IGameObject>> = [];
    layerCount: number = 0;

    constructor(){
        for (let num in Layer){
            if (typeof Layer[num] === "number") {
                this.objects[+Layer[num]] = new Array<IGameObject>();
                this.layerCount++;
            }
        }
    }

    public add(obj: IGameObject){
        this.objects[obj.layer].push(obj);
    }

    public length(layer?: Layer): number{
        return this.objects[layer].length;
    }

    public get(layer?: Layer): Array<IGameObject>{
        if (layer != null && this.objects[layer] != null){
            return this.objects[layer];
        } else {
            let ret: Array<IGameObject> = [];
            for (let arr of this.objects) {
                ret = ret.concat(arr);
            }
            return ret;
        }
    }
}