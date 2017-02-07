import ImageResource from './../src/Engine/Resources/ImageResource';
import Sprite from './../src/Engine/Render/Sprite';
import Renderable from './../src/Engine/Render/Renderable';
import Vector from '../src/Engine/Physics/Vector';


describe("Test Sprite constructor", () => {
    let sprite = new Sprite({
        src: new ImageResource({name: "test", src: ""}),
        visible: false,
        pos: new Vector(10,20),
        w: 13,
        h: 11
    });
    it("Name is same as src name", () => {
        chai.assert.strictEqual(sprite.name, "test");
        chai.assert.strictEqual(sprite.src.name, sprite.name);
    });
    it("Visibility is set", () => {
        chai.assert.isFalse(sprite.visible);
    });
    it("Pos is set", () => {
        chai.assert.strictEqual(sprite.pos.x, 10);
        chai.assert.strictEqual(sprite.pos.y, 20);
    });
    it("Dimensions are set", () => {
        chai.assert.strictEqual(sprite.h, 11);
        chai.assert.strictEqual(sprite.w, 13);
    });
})

describe("Test Renderable constructor", () => {
    let renderable = new Renderable({
        visible: false,
        pos: new Vector(10,20),
        w: 13,
        h: 11
    });
    it("Visibility is set", () => {
        chai.assert.isFalse(renderable.visible);
    });
    it("Pos is set", () => {
        chai.assert.strictEqual(renderable.pos.x, 10);
        chai.assert.strictEqual(renderable.pos.y, 20);
    });
    it("Dimensions are set", () => {
        chai.assert.strictEqual(renderable.h, 11);
        chai.assert.strictEqual(renderable.w, 13);
    });
})