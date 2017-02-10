import GameObject from "../Physics/GameObject";
import Vector from "../Physics/Vector";
import Rect from "../Physics/Rect";

export default class NewObjects{

    private data: Node = new Node();

    constructor(){

    }

    insert(object:GameObject){
        let findNode:Node = new Node();
        findNode.pos = object.pos;
        findNode.pos2 = object.pos2;
        let node = this.selectSubTree(findNode);
    }

    rbrush_collisions(object:GameObject):Array<GameObject>{
        let ret = new Array<GameObject>();
        //let layer = this.objects.get(object.layer);
        

        return ret;
    }

    insert(object:GameObject){

    }

    private selectSubTree(object:Node, node:Node, level:number, path:Array<GameObject>){
        while(true){
            if(node.leaf || path.length -1 === level) break;
            let minArea = Infinity,
                minEnlargement = Infinity,
                target:Node;
            for(let child of node.children){
                let area = child.area;
                let enlargement = this.enlargement(object, child);
                if(enlargement < minEnlargement){
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    target = child;
                } else if(enlargement === minEnlargement){
                    if(area<minArea){
                        minArea = area;
                        target = child;
                    }
                }
            }
            node = target || node.children[0];
        }
        return true;
    }

    private enlargement(node1:Node, node2:Node){
        return (Math.max(node2.pos2.x, node1.pos2.x) - Math.min(node2.pos.x, node1.pos.x)) *
                (Math.max(node2.pos2.y, node1.pos2.y) - Math.min(node2.pos.x, node1.pos.y));
    }
}

class Node extends Rect{
    children:Array<Node> = [];
    object:GameObject;
    height:number = 0;
    leaf:boolean = false;
    pos2:Vector;
    constructor(){
        super();
        this.pos = new Vector(Infinity,Infinity);
        this.pos2 = new Vector(Infinity,Infinity);
    }
}