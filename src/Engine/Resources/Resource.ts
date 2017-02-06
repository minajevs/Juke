export enum ResourceType{
    Image,
    Sound,
    //etc
}

export interface IResource{
    name:string;
    id:number;
    type:ResourceType;
    src:string;
    res:HTMLImageElement | HTMLAudioElement;
    loaded:boolean;
    load():Promise<IResource>;
}