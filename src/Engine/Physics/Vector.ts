export default class Vector{
    public x: number;
    public y: number;

    constructor(x:number = 0, y:number = 0){
        this.x = x;
        this.y = y;
    }

    _plus(vector:Vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    static _plus(vector1:Vector, vector2:Vector) : Vector{
        return new Vector(vector1.x+vector2.x, vector1.y+vector2.y);
    }

    _minus(vector:Vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    static _minus(vector1:Vector, vector2:Vector) : Vector{
        return new Vector(vector1.x-vector2.x, vector1.y-vector2.y);
    }

    _inverse(){
        this.x = -this.x;
        this.y = -this.y;
    }
}