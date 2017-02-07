import TestGameObject from './TestGameObject';
import Player from "./Objects/Player";
import Juke, {Vector, Rect, Resources, ImageResource, Sprite, GameObject} from "./Engine/Juke";




let a = new Juke.Core({debug:true});
a.resources.add(new ImageResource({src: "../Assets/pika.png", name: "pikachu"}));

let player = new Player({
    keyboard: a.keyboard, 
    pos: new Vector(100,100),
    w: 100,
    h: 100,
    sprite: new Sprite({src: a.resources.getByName("pikachu")}),
    renderable: true
});

a.add(player);

a.add(new GameObject({
    pos: new Vector(200,200),
    w: 100,
    h: 100,
    sprite: new Sprite({src: a.resources.getByName("pikachu"), visible: false}),
    renderable: true
}));

a.init();