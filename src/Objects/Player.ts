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
        this.tag = "player";
    }

    update(tick:Juke.Tick){
        super.update(tick);

        if(this.keyboard.isDown(Juke.Keyboard.UP))       this.move(-5, false);
        if(this.keyboard.isDown(Juke.Keyboard.DOWN))     this.move(5, false);
        if(this.keyboard.isDown(Juke.Keyboard.RIGHT))    this.move(5, true);
        if(this.keyboard.isDown(Juke.Keyboard.LEFT))     this.move(-5, true);
        if(this.keyboard.isDown(Juke.Keyboard.SPACE))    console.log(this);
        
        this.collider.pos = this.pos;
        this.sprite.pos = this.pos;
        this.camera.center = this.center;
    }

    private move(step:number, vertical:boolean){
        if(vertical){
            this.pos.x += step;
            while(this.collides()){
                this.pos.x -= step/Math.abs(step);
            }
        } else {
            this.pos.y += step;
            while(this.collides()){
                this.pos.y -= step/Math.abs(step);
            }
        }
    }
}