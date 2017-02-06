import {IResource, ResourceType} from "./Resource";

export interface IImageResourceOptions{
    name:string;
    src:string;
}

export default class ImageResource implements IResource{
    res:HTMLImageElement;
    name:string;
    id:number;
    type:ResourceType = ResourceType.Image;
    src:string;
    loaded:boolean;

    constructor(options:IImageResourceOptions){
        this.src = options.src;
        this.name = options.name;
        this.type = ResourceType.Image;
        this.loaded = false;
    }

    public load():Promise<ImageResource>{
        console.log('load res!');
        
        let img = new Image();
        let promise = new Promise<ImageResource>((resolve, reject) => {
            img.onload = () => {
                this.res = img;
                this.loaded = true;
                resolve(this);
            }
            img.onerror = () => {
                reject(`Could not load "${this.name}" - ${this.src}`);
            }
        })
        img.src = this.src;
        return promise;
    }
}