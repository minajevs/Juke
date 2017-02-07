import GameObject, {EnumLayer} from "../src/Engine/Physics/GameObject";
import Vector from "../src/Engine/Physics/Vector";


describe("Test GameObject constructor", () => {
    let object = new GameObject({
        pos: new Vector(22,33),
        w: 20,
        h: 23,
        layer: 3,
        tag: "testObj%",
        renderable: false
    });
    it("Renderabiility is set", () => {
        chai.assert.isFalse(object.renderable);
    });
    it("Pos is set", () => {
        chai.assert.strictEqual(object.pos.x, 22);
        chai.assert.strictEqual(object.pos.y, 33);
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
})