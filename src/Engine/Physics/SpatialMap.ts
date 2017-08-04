import { IRectOptions } from "./Rect";
import Tools from "../Tools/Tools";
import IGameObject from "../Physics/IGameObject";
import IRect from "../Physics/IRect";
import Vector from "../Physics/Vector";

export interface ISpatialMapOptions {
    w?: number;
    h?: number;
    cellsize?: number;
}

/** Implementation of spatial map which allows quickly traverse and search objects on a 2D pane.   */
export default class SpatialMap {
    /** Maximum width of the map */
    w: number;
    
    /** Maximum height of the map */
    h: number;

    /** How big cells on a spatial map must be */
    cellsize: number;

    /** All the objects located on a map */
    objects: Array<IGameObject> = [];

    /** Of how many columns spatial map is made */
    private readonly colCount: number;

    /** Of how many rows spatial map is made */
    private readonly rowCount: number;

    /** Spatial map cells */
    private buckets: { [id: number]: Array<IGameObject> } = {};

    /** Creates new spatial map */
    constructor(options?: ISpatialMapOptions) {
        Tools.extend(this, options);
        this.colCount = this.w / this.cellsize;
        this.rowCount = this.h / this.cellsize;
        this.clear();
    }

    /** Adds an object to the map */
    public add(object: IGameObject) {
        if (object.colliders.length < 1) return;

        for (let collider of object.colliders) {
            let bucketIds = this.getBucketIds(collider);
            for (let bucketId of bucketIds) {
                if (this.buckets[bucketId] != null)
                    this.buckets[bucketId].push(object);
            }
        }
    }

    /** Finds nearby objects of an object
     * @returns Array of nearby objects */
    public getNearby(object: IGameObject): Array<IGameObject> {
        if (object.colliders.length < 1) return null;
        let ret = new Array<IGameObject>();

        for (let collider of object.colliders){
            let bucketIds = this.getBucketIds(collider);
            for (let bucketId of bucketIds) {
                ret = ret.concat(this.buckets[bucketId]);
            }
        }
        return ret;
    }

    /** Removes all objects from the map, recreates buckets  */
    private clear(): void {
        this.buckets = {};
        for (let i = 0; i < this.colCount * this.rowCount; i++) {
            this.buckets[i] = new Array<IGameObject>();
        }
    }

    /** Gets buckets for coordinates on the map 
     * @param rect Rectangular coordinates
     * @returns Array of bucket IDs
    */
    private getBucketIds(rect: IRect): Array<number> {
        let buckets = [];
        let temp = [
            this.getBucketId(rect.pos),
            this.getBucketId(rect.pos2),
            this.getBucketId(new Vector(rect.pos.x, rect.pos2.y)),
            this.getBucketId(new Vector(rect.pos2.x, rect.pos.y))
        ];
        for (let i = 0; i < 4; i++) {
            if (buckets.indexOf(temp[i]) === -1 && temp[i] != null) buckets.push(temp[i]);
        }

        return buckets;
    }

    /** Gets bucket for a point on the map 
     * @returns bucket ID
    */
    private getBucketId(pos: Vector): number {
        let cellPos = (Math.floor(pos.x / this.cellsize)) +
            (Math.floor(pos.y / this.cellsize)) *
            this.colCount;
        if ((cellPos + 1) > this.colCount * this.rowCount || cellPos < 0) return null;
        return cellPos;
    }

    //collisions(object: GameObject): Array<GameObject> {
    //    //TODO: =
    //    let ret = new Array<GameObject>();
//
    //    for (let obj of this.objects) {
    //        if (obj.collider && object.collider
    //            && obj.collider.intersects(object.collider)
    //            && obj !== object) {
    //            ret.push(obj);
    //        }
    //    }
//
    //    return ret;
    //}
}