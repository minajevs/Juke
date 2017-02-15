import TestGameObject from './TestGameObject';
import Player from "./Objects/Player";
import Juke, { Vector, Rect, Resources, ImageResource, Sprite, GameObject } from "./Engine/Juke";




let a = new Juke.Core({ debug: false });
a.resources.add(new ImageResource({ src: "../Assets/pika.png", name: "pikachu" }));
a.resources.add(new ImageResource({ src: "../Assets/barrel.png", name: "barrel" }));

let player = new Player({
    keyboard: a.keyboard,
    camera: a.camera,
    pos: new Vector(100, 100),
    w: 100,
    h: 100,
    sprite: new Sprite({ src: a.resources.getByName("pikachu") }),
    renderable: true,
    layer: 1,
    collider: new Rect({ pos: new Vector(100, 100), w: 100, h: 100 })
});

a.add(player);

a.add(new GameObject({
    pos: new Vector(200, 200),
    w: 100,
    h: 100,
    sprite: new Sprite({ src: a.resources.getByName("pikachu") }),
    renderable: true
}));
a.add(new GameObject({
    pos: new Vector(300, 300),
    w: 100,
    h: 100,
    sprite: new Sprite({ src: a.resources.getByName("barrel") }),
    renderable: true,
    layer: 1,
    collider: new Rect({ pos: new Vector(300, 300), w: 62, h: 100 })
}));

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        a.add(new GameObject({
            pos: new Vector(i * 20, j * 20),
            w: 20,
            h: 20,
            sprite: new Sprite({ src: a.resources.getByName("pikachu") }),
            renderable: true,
            collider: new Rect({ pos: new Vector(0, 0), w: 0, h: 0 })
        }));
    }
}

a.init();