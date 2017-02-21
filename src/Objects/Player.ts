import * as Juke from "../Engine/Juke";

interface IPlayerOptions extends Juke.IGameObjectOptions{

}

export default class Player extends Juke.GameObject{
    constructor(options: IPlayerOptions){
        super(options);
        this.tag = "player";
    }

    update(tick: Juke.Tick){
        super.update(tick);

        let kb = Juke.Keyboard;

        if (kb.isDown(Juke.Keyboard.UP))       this.move(-5, false);
        if (kb.isDown(Juke.Keyboard.DOWN))     this.move(5, false);
        if (kb.isDown(Juke.Keyboard.RIGHT))    this.move(5, true);
        if (kb.isDown(Juke.Keyboard.LEFT))     this.move(-5, true);
        if (kb.isDown(Juke.Keyboard.SPACE))    console.log(this);

        Juke.Events.emit("player:update", this);
    }

    private move(step: number, vertical: boolean){
        if (vertical){
            this.pos.x += step;
            while (this.collides()){
                this.pos.x -= step / Math.abs(step);
            }
        } else {
            this.pos.y += step;
            while (this.collides()){
                this.pos.y -= step / Math.abs(step);
            }
        }
    }
}