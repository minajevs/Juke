import * as Juke from "../Engine/Juke";

interface IPlayerOptions extends Juke.IGameObjectOptions{
    keyboard:Juke.Keyboard;
}

export default class Player extends Juke.GameObject{
    private keyboard: Juke.Keyboard;

    constructor(options:IPlayerOptions){
        super(options);
        this.keyboard = options.keyboard;
    }

    update(tick:number){
        if(this.keyboard.isDown(Juke.Keyboard.UP))       this.pos.y -= 5;
        if(this.keyboard.isDown(Juke.Keyboard.DOWN))     this.pos.y += 5;
        if(this.keyboard.isDown(Juke.Keyboard.RIGHT))    this.pos.x += 5;
        if(this.keyboard.isDown(Juke.Keyboard.LEFT))     this.pos.x -= 5;

        this.sprite.pos = this.pos;
    }
}