import TestGameObject from './TestGameObject';
import Player from "./Objects/Player";
import Juke, {Vector} from "./Engine/Juke";


let a = new Juke.Core();
let player = new Player({keyboard: a.keyboard, position: new Vector(100,100)});
a.add(player);
//a.start();


//a.start();
//a.add(new TestGameObject());
//let b = new TestGameObject();
//b.position.x = 400;
//a.add(b);
//console.log("Sup");