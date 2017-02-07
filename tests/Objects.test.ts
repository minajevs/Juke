import Objects from '../src/Engine/Core/Objects';
import GameObject, {EnumLayer} from '../src/Engine/Physics/GameObject';


describe("Test Objects constructor", () => {
    let objects = new Objects();
    it("Can add new objects", () => {
        objects.add(new GameObject({layer: 1}));
        objects.add(new GameObject({layer: 2}));
        objects.add(new GameObject({layer: 3}));
    });
    it("Can get objects by layers", () => {
        chai.assert.isTrue(objects.get(1).length === 1);
        chai.assert.isTrue(objects.get(2).length === 1);
        chai.assert.isTrue(objects.get(3).length === 1);
        chai.assert.isTrue(objects.get(0).length === 0);       
    });
    it("Can get all objects", () => {
        chai.assert.isTrue(objects.get().length === 3);       
    });

            
})