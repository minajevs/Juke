import Rect from '../src/Engine/Physics/Rect';
import Vector from '../src/Engine/Physics/Vector';
import SpatialMap from '../src/Engine/Physics/SpatialMap';

describe("Test SpatialMap constructor", () => {
    let defMap = new SpatialMap();
    it("Default constructor", () => {
        chai.assert.strictEqual(defMap.h, undefined);
        chai.assert.strictEqual(defMap.w, undefined);
        chai.assert.strictEqual(defMap.cellsize, undefined);
    });  
    let custmMap = new SpatialMap({w: 10, h: 20, cellsize: 200});
    it("Custom constructor", () => {
        chai.assert.strictEqual(custmMap.h, 20);
        chai.assert.strictEqual(custmMap.w, 10);
        chai.assert.strictEqual(custmMap.cellsize, 200);
    });              
})

describe("Test SpatialMap bucket creation", () => {
    let map = new SpatialMap({w: 100, h: 100, cellsize: 25});  // 4x4 grid, 16 buckets
    it("Initialization is correct", () => {    
        chai.assert.strictEqual((<any>map).colCount, 4);
        chai.assert.strictEqual((<any>map).rowCount, 4);
        chai.assert.isArray((<any>map).buckets[15]);
        chai.assert.isNotArray((<any>map).buckets[16]);
        chai.assert.isUndefined((<any>map).buckets[16]);
    });     

    it("Bucket Id is found correctly", () => {    
        let v1 = new Vector(0,0);
        let v2 = new Vector(25,25);
        let v3 = new Vector(0,45);
        let v4 = new Vector(200,200);
        chai.assert.strictEqual((<any>map).getBucketId(v1), 0);
        chai.assert.strictEqual((<any>map).getBucketId(v2), 5);
        chai.assert.strictEqual((<any>map).getBucketId(v3), 4);
        chai.assert.strictEqual((<any>map).getBucketId(v4), 40);
    });          
     it("Bucket Ids are found correctly", () => {    
       let r1 = new Rect({pos: new Vector(0,0), pos2: new Vector(10,10)});
       let r2 = new Rect({pos: new Vector(0,0), pos2: new Vector(50,10)});
       let r3 = new Rect({pos: new Vector(30,30), pos2: new Vector(60,60)});
       let r4 = new Rect({pos: new Vector(30,90), pos2: new Vector(90,100)});

       chai.assert.deepEqual((<any>map).getBucketIds(r1), [0]);
       chai.assert.deepEqual((<any>map).getBucketIds(r2), [0,2]);
       chai.assert.deepEqual((<any>map).getBucketIds(r3), [5,10,9,6]);
       chai.assert.deepEqual((<any>map).getBucketIds(r4), [13,19,17,15]);
    });  
})

