import { IRectOptions } from "./Rect";
import Tools from "../Tools/Tools";
import GameObject from "../Physics/GameObject";
import Rect from "../Physics/Rect";
import Vector from "../Physics/Vector";

export interface ISpatialMapOptions{
    w?: number;
    h?: number;
    cellsize?: number;
    debug?: boolean;
}

export default class SpatialMap{
    w: number;
    h: number;
    cellsize: number;
    objects: Array<GameObject> = [];
    debug: boolean = false;

    private colCount: number;
    private rowCount: number;
    private buckets: {[id: number] : Array<GameObject>} = {};

    constructor(options?: ISpatialMapOptions){
        Tools.extend(this, options);
        this.colCount = this.w / this.cellsize;
        this.rowCount = this.h / this.cellsize;
        this.clear();
    }


    public add(object: GameObject){
        if (object.collider == null) return;

        let bucketIds = this.getBucketIds(object.collider);
        for (let bucketId of bucketIds){
            if (this.buckets[bucketId] != null)
                this.buckets[bucketId].push(object);
            else {if (this.debug) console.log(`Can't add obj with x:${object.collider.pos.x} y:${object.collider.pos.y} w:${object.collider.w} h:${object.collider.h}`); }
        }
    }

    public getNearby(object: GameObject): Array<GameObject>{
        if (object.collider == null) return null;
        let ret = new Array<GameObject>();
        let bucketIds = this.getBucketIds(object.collider);
        for (let bucketId of bucketIds){
            ret = ret.concat(this.buckets[bucketId]);
        }
        return ret;
    }


    private clear(): void{
        this.buckets = {};
        for (let i = 0; i < this.colCount * this.rowCount; i++){
            this.buckets[i] = new Array<GameObject>();
        }
    }

    private getBucketIds(rect: Rect): Array<number>{
        let buckets = [];
        let temp = [
            this.getBucketId(rect.pos),
            this.getBucketId(rect.pos2),
            this.getBucketId(new Vector(rect.pos.x, rect.pos2.y)),
            this.getBucketId(new Vector(rect.pos2.x, rect.pos.y))
        ];
        for (let i = 0; i < 4; i++){
            if (buckets.indexOf(temp[i]) === -1 && temp[i] != null) buckets.push(temp[i]);
        }

        return buckets;
    }

    private getBucketId(pos: Vector): number{
        let cellPos = (Math.floor(pos.x / this.cellsize)) +
                        (Math.floor(pos.y / this.cellsize)) *
                        this.colCount;
        if ((cellPos + 1) > this.colCount * this.rowCount || cellPos < 0) return null;
        return cellPos;
    }

    collisions(object: GameObject): Array<GameObject>{
        //TODO: =
        let ret = new Array<GameObject>();

        for (let obj of this.objects){
            if (obj.collider && object.collider
                && obj.collider.intersects(object.collider)
                && obj !== object){
                    ret.push(obj);
                }
        }

        return ret;
    }
}