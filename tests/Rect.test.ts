import Rect from './../src/Engine/Physics/Rect';

describe("Test test", () => {
    let r1 = new Rect();
    it("Should be 0 width", () => {
        chai.assert.strictEqual(r1.w, 0);     
    });
})