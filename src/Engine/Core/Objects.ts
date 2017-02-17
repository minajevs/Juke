import GameObject, {EnumLayer} from "../Physics/GameObject";

export default class Objects{
    objects: Array<Array<GameObject>> = [];
    layerCount: number = 0;

    constructor(){
        for (let num in EnumLayer){
            if (typeof EnumLayer[num] === "number") {
                this.objects[+EnumLayer[num]] = new Array<GameObject>();
                this.layerCount++;
            }
        }
    }

    public add(obj: GameObject){
        this.objects[obj.layer].push(obj);
    }

    public length(layer?: EnumLayer): number{
        return this.objects[layer].length;
    }

    public get(layer?: EnumLayer): Array<GameObject>{
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