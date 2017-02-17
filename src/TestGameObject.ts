import GameObject from "./Engine/Physics/GameObject";

export default class TestGameObject extends GameObject{
    public text: string = "TEST";

    constructor(){
        super();
        this.pos.x = 100;
        this.pos.y = 100;
    }
}