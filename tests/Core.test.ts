import Resources from './../src/Engine/Resources/Resources';
import Core from './../src/Engine/Core/Core';
import SpatialMap from './../src/Engine/Physics/SpatialMap';
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
        chai.assert.isNotNull(Keyboard);
        chai.assert.isUndefined((<any>Keyboard).keys[999]);
        chai.assert.strictEqual((<any>Keyboard).keys[32], false);
    });
    it("Spatial map is set up", () => {    
        chai.assert.isNotNull(core.spatialMap);
        chai.assert.strictEqual(core.spatialMap.w, 10000);
        chai.assert.strictEqual(core.spatialMap.h, 10000);
        chai.assert.strictEqual(core.spatialMap.cellsize, 500);
    });
})

describe("Test custom Core constructors", () => {
    let emptyOptionsAndEmptyCameraCore = new Core(undefined);
    let customConstructor = new Core({
        debug: true, 
        camera: new Camera({pos: new Vector(11, 12), w: 100, h:200}),
        spatialMap: new SpatialMap({w: 100, h: 200, cellsize:25})
    });
    let defaultCore = new Core();
    it("Empty camera is set up", () => {
        chai.assert.isNotNull(emptyOptionsAndEmptyCameraCore.camera); 
        chai.assert.instanceOf(emptyOptionsAndEmptyCameraCore.camera, Camera);   
    });
    it("Empty options is set up", () => {
        chai.assert.isFalse(emptyOptionsAndEmptyCameraCore.debug); 
    });
    it("Empty spatialmap is set up", () => {
        chai.assert.strictEqual(emptyOptionsAndEmptyCameraCore.spatialMap.w, 10000); 
        chai.assert.strictEqual(emptyOptionsAndEmptyCameraCore.spatialMap.h, 10000); 
        chai.assert.strictEqual(emptyOptionsAndEmptyCameraCore.spatialMap.cellsize, 500); 
    });
    it("Custom spatialmap is set up", () => {
        chai.assert.strictEqual(customConstructor.spatialMap.w, 100); 
        chai.assert.strictEqual(customConstructor.spatialMap.h, 200); 
        chai.assert.strictEqual(customConstructor.spatialMap.cellsize, 25); 
    });
    it("Custom camera is set up", () => {
        chai.assert.isNotNull(customConstructor.camera); 
        chai.assert.instanceOf(customConstructor.camera, Camera);   
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