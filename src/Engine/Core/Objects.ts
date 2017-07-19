import GameObject, {Layer} from "../Physics/GameObject";

export default class Objects{
    objects: Array<Array<GameObject>> = [];
    layerCount: number = 0;

    constructor(){
        for (let num in Layer){
            if (typeof Layer[num] === "number") {
                this.objects[+Layer[num]] = new Array<GameObject>();
                this.layerCount++;
            }
        }
    }

    public add(obj: GameObject){
        this.objects[obj.layer].push(obj);
    }

    public length(layer?: Layer): number{
        return this.objects[layer].length;
    }

    public get(layer?: Layer): Array<GameObject>{
        if (layer != null && this.objects[layer] != null){
            return this.objects[layer];
        } else {
            let ret: Array<GameObject> = [];
            for (let arr of this.objects) {
                ret = ret.concat(arr);
            }
            return ret;
        }
    }
}