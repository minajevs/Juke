import GameObject from "./Engine/Physics/GameObject";

export default class TestGameObject extends GameObject{
    public text:string = "TEST";

    constructor(){
        super();
        this.position.x = 100;
        this.position.y = 100;
    }
}