import GameObject, {EnumLayer} from "../src/Engine/Physics/GameObject";
import Vector from "../src/Engine/Physics/Vector";
import Rect from "../src/Engine/Physics/Rect";


describe("Test GameObject", () => {
    let object = new GameObject({
        pos: new Vector(22,33),
        w: 20,
        h: 23,
        layer: 3,
        tag: "testObj%",
        renderable: true,
        collider: new Rect({pos: new Vector(0,0), w: 10, h: 10})
    });
    it("Pos is set", () => {
        chai.assert.strictEqual(object.pos.x, 22);
        chai.assert.strictEqual(object.pos.y, 33);
    });
    it("Pos2 is set", () => {
        chai.assert.strictEqual(object.pos2.x, 22+20);
        chai.assert.strictEqual(object.pos2.y, 33+23);
    });
    it("Dimensions are set", () => {
        chai.assert.strictEqual(object.h, 23);
        chai.assert.strictEqual(object.w, 20);
    });
    it("Tag is set", () => {
        chai.assert.strictEqual(object.tag, "testObj%");
    });
    it("Layer is set", () => {
        chai.assert.strictEqual(object.layer, 3);
        chai.assert.strictEqual(object.layer, EnumLayer.foreground);
    });
    it("Renderability is set", () => {
        chai.assert.isTrue(object.renderable);
    });
    it("Collider is set", () => {
        chai.assert.strictEqual(object.collider.pos.x, 0);
        chai.assert.strictEqual(object.collider.pos.y, 0);
        chai.assert.strictEqual(object.collider.w, 10);
        chai.assert.strictEqual(object.collider.h, 10);
    });
    it("GameObject moves by correctly", () => {
        object.moveBy(new Vector(10,10));
        chai.assert.strictEqual(object.w, 20);
        chai.assert.strictEqual(object.h, 23);
        chai.assert.strictEqual(object.pos.x, 22+10);
        chai.assert.strictEqual(object.pos.y, 33+10);
        chai.assert.strictEqual(object.pos2.x, 22+20+10);
        chai.assert.strictEqual(object.pos2.y, 33+23+10);
        chai.assert.strictEqual(object.center.x, 22+20/2+10);
        chai.assert.strictEqual(object.center.y, 33+23/2+10);

        //chai.assert.strictEqual(object.collider.pos.x, 0+10);
        //chai.assert.strictEqual(object.collider.pos.y, 0+10);
    });
    it("GameObject moves to correctly", () => {
        object.moveTo(new Vector(11,11));
        chai.assert.strictEqual(object.w, 20);
        chai.assert.strictEqual(object.h, 23);
        chai.assert.strictEqual(object.pos.x, 11);
        chai.assert.strictEqual(object.pos.y, 11);
        chai.assert.strictEqual(object.pos2.x, 20+11);
        chai.assert.strictEqual(object.pos2.y, 23+11);
        chai.assert.strictEqual(object.center.x, 20/2+11);
        chai.assert.strictEqual(object.center.y, 23/2+11);

        //chai.assert.strictEqual(object.collider.pos.x, -11);
        //chai.assert.strictEqual(object.collider.pos.x, -11);
    });
})