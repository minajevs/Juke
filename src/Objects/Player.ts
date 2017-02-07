import * as Juke from "../Engine/Juke";

interface IPlayerOptions extends Juke.IGameObjectOptions{
    keyboard:Juke.Keyboard;
    camera:Juke.Camera;
}

export default class Player extends Juke.GameObject{
    private keyboard: Juke.Keyboard;
    private camera: Juke.Camera;

    constructor(options:IPlayerOptions){
        super(options);
        this.keyboard = options.keyboard;
        this.camera = options.camera;
    }

    update(tick:number){
        if(this.keyboard.isDown(Juke.Keyboard.UP))       this.pos.y -= 5;
        if(this.keyboard.isDown(Juke.Keyboard.DOWN))     this.pos.y += 5;
        if(this.keyboard.isDown(Juke.Keyboard.RIGHT))    this.pos.x += 5;
        if(this.keyboard.isDown(Juke.Keyboard.LEFT))     this.pos.x -= 5;

        this.sprite.pos = this.pos;
        this.camera.center = this.center;
    }
}