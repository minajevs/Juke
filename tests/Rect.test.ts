import Rect from './../src/Engine/Physics/Rect';
import Vector from './../src/Engine/Physics/Vector';


describe("Test default Rect constructor", () => {
    let rect = new Rect();
    it("Pos is 0,0", () => {
        chai.assert.strictEqual(rect.pos.x, 0);          
        chai.assert.strictEqual(rect.pos.y, 0);          
    });
    it("Dimensions are 0,0", () => { 
        chai.assert.strictEqual(rect.w, 0);     
        chai.assert.strictEqual(rect.h, 0);     
    });
    it("Pos2 is 0,0", () => { 
        chai.assert.strictEqual(rect.pos2.x, 0);     
        chai.assert.strictEqual(rect.pos2.y, 0);     
    });
    it("Center is 0,0", () => { 
        chai.assert.strictEqual(rect.center.x, 0);     
        chai.assert.strictEqual(rect.center.y, 0);     
    });
})

describe("Test default Rect constructor", () => {
    let rect = new Rect({pos: new Vector(11,22), w: 33, h: 44});
    it("Pos is correct", () => {
        chai.assert.strictEqual(rect.pos.x, 11);          
        chai.assert.strictEqual(rect.pos.y, 22);          
    });
    it("Dimensions are correct", () => { 
        chai.assert.strictEqual(rect.w, 33);     
        chai.assert.strictEqual(rect.h, 44);     
    });
    it("Pos2 is correct", () => { 
        chai.assert.strictEqual(rect.pos2.x, 11+33);     
        chai.assert.strictEqual(rect.pos2.y, 22+44);     
    });
    it("Center is correct", () => { 
        chai.assert.strictEqual(rect.center.x, 11+33/2);     
        chai.assert.strictEqual(rect.center.y, 22+44/2);     
    });
})

describe("Test Rect centering", () => {
    let rect = new Rect({pos: new Vector(10,10), w: 20, h: 20});
    it("Center is correct", () => {
        chai.assert.strictEqual(rect.center.x, 10+(20/2));          
        chai.assert.strictEqual(rect.center.y, 10+(20/2));          
    });
    it("Center set is correct", () => {
        rect.center = new Vector(15,15);
        chai.assert.strictEqual(rect.pos.x, 15-(20/2));          
        chai.assert.strictEqual(rect.pos.y, 15-(20/2));          
    });
})

describe("Test Rect pos2 set", () => {
    let rect = new Rect({pos: new Vector(10,10), w: 20, h: 20});
    it("Pos2 before set is correct", () => {
        chai.assert.strictEqual(rect.pos2.x, 10+20);          
        chai.assert.strictEqual(rect.pos2.y, 10+20);          
    });
    it("Pos2 after is correct", () => {
        rect.pos2 = new Vector(50, 50);
        chai.assert.strictEqual(rect.pos2.x, 50);          
        chai.assert.strictEqual(rect.pos2.y, 50);          
    });
    it("Dimensions after is correct", () => {
        chai.assert.strictEqual(rect.w, 40);          
        chai.assert.strictEqual(rect.h, 40);          
    });
})