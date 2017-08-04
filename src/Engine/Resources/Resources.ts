import { IResource } from "./Resource";
import Tools from "../Tools/Tools";
import IResources from './IResources';

interface IResourcesOptions {
    name?: string;
}

export default class Resources implements IResources {
    private _resources: Array<IResource> = [];
    name: string;

    constructor(resources?: Array<IResource>, options?: IResourcesOptions) {
        if (resources) {
            for (let res of resources) {
                this.add(res);
            }
        }
        Tools.extend(this, options);
        return this;
    }

    public add(resource: IResource) {
        if (!this.resourceExists(resource)) {
            resource.id = this._resources.length;
            this._resources.push(resource);
        }
    }

    /** Loads all resources
     * @param callback Called after every resource is loaded with count of loaded resources 
     */
    public async load(callback: (count:number) => any = ()=>{}){
        let loaded = 0;
        for (let res of this._resources){
            if (!res.loaded)
                await res.load(this);
            callback(++loaded);
        }
    }

    public length():number{
        return this._resources.length;
    }

    /** Finds resource by name */
    public get(name: string): IResource{
        return this._resources.find(x => x.name === name);
    }

    private resourceExists(resource: IResource): boolean {
        return resource.name === "untitled" ||
            this._resources.find(x => x.name === resource.name) != null;
    }
}