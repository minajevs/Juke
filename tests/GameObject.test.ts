import GameObject from "../src/Engine/Physics/GameObject";
import { Layer, Roles } from '../src/Engine/Physics/Enums';
import Vector from "../src/Engine/Physics/Vector";
import Rect from "../src/Engine/Physics/Rect";


describe("Test GameObject", () => {
    let object = new GameObject({
        pos: new Vector(22, 33),
        w: 20,
        h: 23,
        layer: 3,
        tag: "testObj%",
        renderable: true,
        children: [new GameObject({ pos: new Vector(0, 0), w: 10, h: 10, role: Roles.collider})]
    });

    let objectWithColliderBoolean = new GameObject({
        pos: new Vector(100, 200),
        w: 111,
        h: 222,
        collide: true
    });
    let objectWithOutColliderBoolean = new GameObject({
        pos: new Vector(100, 200),
        w: 111,
        h: 222,
    });
    let objectWithOutColliderBooleanFalse = new GameObject({
        pos: new Vector(100, 200),
        w: 111,
        h: 222,
        collide: false
    });
    it("Pos is set", () => {
        chai.assert.strictEqual(object.pos.x, 22);
        chai.assert.strictEqual(object.pos.y, 33);
    });
    it("Pos2 is set", () => {
        chai.assert.strictEqual(object.pos2.x, 22 + 20);
        chai.assert.strictEqual(object.pos2.y, 33 + 23);
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
        chai.assert.strictEqual(object.layer, Layer.foreground);
    });
    it("Renderability is set", () => {
        chai.assert.isTrue(object.renderable);
    });
    it("Position lock is set", () => {
        chai.assert.isUndefined(object.positionLock);
    });
    it("Collider is set", () => {
        chai.assert.isNotNull(object.colliders);
        chai.assert.strictEqual(object.colliders.length, 1);
        chai.assert.strictEqual(object.colliders[0].pos.x, 0);
        chai.assert.strictEqual(object.colliders[0].pos.y, 0);
        chai.assert.strictEqual(object.colliders[0].w, 10);
        chai.assert.strictEqual(object.colliders[0].h, 10);
    });
    it("Collider is set from boolean (true)", () => {
        chai.assert.strictEqual(objectWithColliderBoolean.colliders[0].pos.x, 100);
        chai.assert.strictEqual(objectWithColliderBoolean.colliders[0].pos.y, 200);
        chai.assert.strictEqual(objectWithColliderBoolean.colliders[0].w, 111);
        chai.assert.strictEqual(objectWithColliderBoolean.colliders[0].h, 222);
    });
    it("Collider is not set from boolean (undefined)", () => {
        chai.assert.isUndefined(objectWithOutColliderBoolean.colliders[0]);
    });
    it("Collider is not set from boolean (false)", () => {
        chai.assert.isUndefined(objectWithOutColliderBooleanFalse.colliders[0]);
    });
    it("GameObject moves by correctly", () => {
        object.moveBy(new Vector(10, 10));
        chai.assert.strictEqual(object.w, 20);
        chai.assert.strictEqual(object.h, 23);
        chai.assert.strictEqual(object.pos.x, 22 + 10);
        chai.assert.strictEqual(object.pos.y, 33 + 10);
        chai.assert.strictEqual(object.pos2.x, 22 + 20 + 10);
        chai.assert.strictEqual(object.pos2.y, 33 + 23 + 10);
        chai.assert.strictEqual(object.center.x, 22 + 20 / 2 + 10);
        chai.assert.strictEqual(object.center.y, 33 + 23 / 2 + 10);
    });
    it("GameObject moves to correctly", () => {
        object.moveTo(new Vector(11, 11));
        chai.assert.strictEqual(object.w, 20);
        chai.assert.strictEqual(object.h, 23);
        chai.assert.strictEqual(object.pos.x, 11);
        chai.assert.strictEqual(object.pos.y, 11);
        chai.assert.strictEqual(object.pos2.x, 20 + 11);
        chai.assert.strictEqual(object.pos2.y, 23 + 11);
        chai.assert.strictEqual(object.center.x, 20 / 2 + 11);
        chai.assert.strictEqual(object.center.y, 23 / 2 + 11);
    });
})

describe("GameObject coupling", () => {
    let objWithChildren = new GameObject({
        children: [
            new GameObject({ tag: "test" }),
            new GameObject({ tag: "test2" })
        ]
    });

    //Constructors default
    it("Default children is empty", () => {
        let obj = new GameObject();
        chai.assert.isNotNull(obj.children);
    });
    it("Default parent is empty", () => {
        let obj = new GameObject();
        chai.assert.isNotNull(obj.parent);
    });
    //Constructors custom
    it("Custom children in constructor are set", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        chai.assert.isNotNull(objWithChildren.children);
        chai.assert.strictEqual(objWithChildren.children.length, 2);
        chai.assert.strictEqual(objWithChildren.children[0].tag, "test");
        chai.assert.strictEqual(objWithChildren.children[1].tag, "test2");
        chai.assert.strictEqual(objWithChildren.children[0].positionLock, objWithChildren.children[0].parent);
        chai.assert.strictEqual(objWithChildren.children[0].positionLock, objWithChildren);
    });
    it("Custom parent in constructor is set", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        chai.assert.isNotNull(childWithParent.parent);
        chai.assert.strictEqual(childWithParent.parent.children.length, 1);
        chai.assert.strictEqual(childWithParent.parent.tag, "123");
        chai.assert.strictEqual(childWithParent.parent.children[0], childWithParent);
        chai.assert.strictEqual(childWithParent.parent.children[0].positionLock, childWithParent.parent);
    });
    //Add
    it("Can add parent", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        let obj = new GameObject();
        obj.parent = child;
        chai.assert.strictEqual(obj.parent, child);
        chai.assert.strictEqual(child.children.length, 2);
    });
    it("Can add child", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        let obj = new GameObject();
        obj.addChild(child);
        chai.assert.strictEqual(obj.children.length, 1);
        chai.assert.strictEqual(obj.children[0].tag, "123");
    });
    //Remove
    it("Can remove parent", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        let obj = new GameObject();
        obj.parent = null;
        chai.assert.strictEqual(child.children.length, 1);
        chai.assert.isNull(obj.parent);
    });
    it("Can remove child", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        let obj = new GameObject();
        obj.removeChild(child);
        chai.assert.strictEqual(obj.children.length, 0);
    });

    //Change
    it("Can change parent", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        childWithParent.parent = new GameObject({tag: "kek"})
        chai.assert.strictEqual(childWithParent.parent.children.length, 1);
        chai.assert.strictEqual(childWithParent.parent.children[0].tag, childWithParent.tag);
        chai.assert.strictEqual(childWithParent.parent.tag, "kek");
    });
    it("Can't modify children directly", () => {
        let child = new GameObject({ tag: "123" });
        let childWithParent = new GameObject({ tag: "parent!", parent: child });
        let children = childWithParent.parent.children;
        chai.assert.strictEqual(children.length, 1);
        chai.assert.strictEqual(childWithParent.parent.children.length, 1);
        children.push(new GameObject());
        chai.assert.strictEqual(children.length, 2);
        chai.assert.strictEqual(childWithParent.parent.children.length, 1);
    });
});

describe("GameObject position locking", () => {
    let child = new GameObject({tag: "child"});
    let parent = new GameObject({tag: "parent", children: [child]});
    let newobj = new GameObject();

    it("Position lock is set", () => {
        chai.assert.strictEqual(child.positionLock, parent);
    });
    it("Can change position lock", () => {
        child.positionLock = newobj;
        chai.assert.strictEqual(child.positionLock, newobj);
    });
    it("Can change position lock to null", () => {
        child.positionLock = null;
        chai.assert.strictEqual(child.positionLock, null);
    });
    it("Setting parent does not affect custom position lock", () => {
        child.positionLock = newobj;
        child.parent = parent;
        chai.assert.strictEqual(child.positionLock, newobj);
        chai.assert.strictEqual(child.parent, parent);
    });
    it("Setting parent does affect default position lock", () => {
        child.positionLock = newobj;
        child.parent = parent;
        chai.assert.strictEqual(child.positionLock, newobj);
        chai.assert.strictEqual(child.parent, parent);
    });
});