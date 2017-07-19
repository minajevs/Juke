/** 2D Vector object */
export default class Vector{
    /** Horizontal coordinate */
    public x: number;
    /** Vertical coordinate */
    public y: number;

    /** Creates a new vector with the following coordinates
     * @param x Optional
     * @param y Optional
     */
    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    /** Adds another vector coordinates to own */
    _plus(vector: Vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    /** Sums 2 vectors */
    static _plus(vector1: Vector, vector2: Vector) : Vector{
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    /** Divides by another vector*/
    _divide(vector: Vector){
        this.x /= vector.x;
        this.y /= vector.y;
    }

    /** Substracts another vector from itself */
    _minus(vector: Vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    /** Substracts second vector from first */
    static _minus(vector1: Vector, vector2: Vector) : Vector{
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    /** Vector times -1 */
    _inverse(){
        this.x = -this.x;
        this.y = -this.y;
    }
}