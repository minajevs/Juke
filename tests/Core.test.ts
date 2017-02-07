import Resources from './../src/Engine/Resources/Resources';
import Core from './../src/Engine/Core/Core';
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
})

describe("Test custom Core constructors", () => {
    let emptyOptionsAndEmptyCameraCore = new Core(undefined, undefined);
    let defaultCore = new Core();
    it("Empty camera Core is set up", () => {
        chai.assert.isNotNull(emptyOptionsAndEmptyCameraCore.camera); 
        chai.assert.instanceOf(emptyOptionsAndEmptyCameraCore.camera, Camera);   
    });
    it("Empty options Core is set up", () => {
        chai.assert.isFalse(emptyOptionsAndEmptyCameraCore.debug); 
    });
})