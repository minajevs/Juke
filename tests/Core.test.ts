import Resources from './../src/Engine/Resources/Resources';
import Core from './../src/Engine/Core/Core';
import Collider from './../src/Engine/Physics/Collider';
import Vector from './../src/Engine/Physics/Vector';
import Camera from '../src/Engine/Render/Camera';
import Keyboard from '../src/Engine/Controls/Keyboard';

describe("Test default Core constructor", () => {
    let core = new Core();
    it("Debug is off", () => {    
        chai.assert.isFalse(core.debug);
    });
    it("Resources are set up", () => {    
        chai.assert.isNotNull(core.resources);
        chai.assert.instanceOf(core.resources, Resources);
    });
    it("Camera is set up", () => {    
        chai.assert.isNotNull(core.camera);
        chai.assert.instanceOf(core.camera, Camera);        
    });
    it("Keyboard is set up", () => {    
        chai.assert.isNotNull(core.keyboard);
        chai.assert.instanceOf(core.keyboard, Keyboard);
    });
    it("Collider is set up", () => {    
        chai.assert.isNotNull(core.collider);
    });
})

describe("Test custom Core constructors", () => {
    let emptyOptionsAndEmptyCameraCore = new Core(undefined);
    let customConstructor = new Core({
        debug: true, 
        camera: new Camera({pos: new Vector(11, 12), w: 100, h:200}),
        collider: new Collider()
    });
    let defaultCore = new Core();
    it("Empty camera is set up", () => {
        chai.assert.isNotNull(emptyOptionsAndEmptyCameraCore.camera); 
        chai.assert.instanceOf(emptyOptionsAndEmptyCameraCore.camera, Camera);   
    });
    it("Empty options is set up", () => {
        chai.assert.isFalse(emptyOptionsAndEmptyCameraCore.debug); 
    });
    it("Custom camera is set up", () => {
        chai.assert.isNotNull(customConstructor.camera); 
        chai.assert.instanceOf(customConstructor.camera, Camera);   
        chai.assert.strictEqual(customConstructor.camera.debug, true);
        chai.assert.strictEqual(customConstructor.camera.pos.x, 11);
        chai.assert.strictEqual(customConstructor.camera.pos.y, 12);
        chai.assert.strictEqual(customConstructor.camera.w, 100);
        chai.assert.strictEqual(customConstructor.camera.h, 200);
    });
})

describe("Test Core options", () => {
    let emptyOptionsAndEmptyCameraCore = new Core(undefined);
    let defaultCore = new Core();
    it("Empty camera Core is set up", () => {
        chai.assert.isNotNull(emptyOptionsAndEmptyCameraCore.camera); 
        chai.assert.instanceOf(emptyOptionsAndEmptyCameraCore.camera, Camera);   
    });
    it("Empty options Core is set up", () => {
        chai.assert.isFalse(emptyOptionsAndEmptyCameraCore.debug); 
    });
})