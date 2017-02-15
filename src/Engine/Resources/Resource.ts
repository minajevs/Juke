import Resources from "./Resources";

export enum ResourceType{
    Image,
    Sound,
    Spritesheet,
    SpritesheetMap
    //etc
}

export interface IResource{
    name:string;
    id:number;
    type:ResourceType;
    src:string;
    res:HTMLImageElement | HTMLAudioElement;
    loaded:boolean;
    load(resources?:Resources):Promise<IResource>;
}