import Events from './../src/Engine/Core/Events';

describe("Test Events", () => {

    it("Can subscribe to event", () => {    
        Events.subscribe("nigga", () => {});
        chai.assert.isNotNull((<any>Events).events);
        chai.assert.isNotNull((<any>Events).events["nigga"]);
        chai.assert.strictEqual((<any>Events).events["nigga"].length, 1);
    });
    it("Can emit event", () => {    
        let test:number = 0;
        Events.subscribe("event:test", (data:number) => {test = data});
        Events.emit("event:test", 1);
        chai.assert.strictEqual(test, 1);
        Events.emit("event:test", 50);
        chai.assert.strictEqual(test, 50);        
    });
    it("Emit does not affects context", () => {  
        class Foo{
            bar:number = 0;
            constructor(){
                Events.subscribe("events:foo", (data) => {this.bar = data});
            }
        }
        let foo = new Foo();
        chai.assert.strictEqual(foo.bar, 0);        
        Events.emit("events:foo", 100);
        chai.assert.strictEqual(foo.bar, 100);              
    });
    it("Events emits multiple functions", () => {  
        let a = 0;
        let b = 0;
        let c = 0;  
        Events.subscribe("events:multiple", (data) => {a = data;});
        Events.subscribe("events:multiple", (data) => {b = data;});
        Events.subscribe("events:multiple", (data) => {c = data;});
        Events.emit("events:multiple", 100);
        chai.assert.strictEqual(a, 100);
        chai.assert.strictEqual(b, 100);
        chai.assert.strictEqual(c, 100);
    });
});