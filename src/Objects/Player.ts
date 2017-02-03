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
        console.log(this.position);
        
        if(this.keyboard.isDown(Juke.Keyboard.UP))       this.position.y -= 1;
        if(this.keyboard.isDown(Juke.Keyboard.DOWN))     this.position.y += 1;
        if(this.keyboard.isDown(Juke.Keyboard.RIGHT))    this.position.x += 1;
        if(this.keyboard.isDown(Juke.Keyboard.LEFT))     this.position.x -= 1;
    }
}