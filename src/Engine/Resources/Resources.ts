import { IResource } from "./Resource";
import Tools from "../Tools/Tools";

interface IResourcesOptions {
    name?: string;
}

export default class Resources {
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

    public loadAll(): Promise<IResource[]> {
        let p = [];
        for (let res of this._resources){
            if (!res.loaded)
                p.push(res.load(this));

        }
        return Promise.all(p);
    }

    public getByName(name: string): IResource {
        return this._resources.find(x => x.name === name);
    }

    private resourceExists(resource: IResource): boolean {
        return resource.name === "untitled" ||
            this._resources.find(x => x.name === resource.name) != null;
    }
}