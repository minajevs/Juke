import ImageResource, { IImageResourceOptions } from './ImageResource';
import { IResource, ResourceType } from './Resource';
import Resources from './Resources';
import Renderable, { IRenderableOptions } from "../Render/Renderable";
import Tools from '../Tools/Tools';

interface ISpriteSheetOptions extends IImageResourceOptions {
    mapSrc?: string;
}

export default class Spritesheet extends ImageResource {
    private mapSrc?: string;
    map: SpritesheetMap;
    constructor(options?: ISpriteSheetOptions) {
        super(options);
        Tools.extend(this, options);
        this.type = ResourceType.Spritesheet;
    }

    load(resources?: Resources): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            super.load()
                .then((self) => {
                    if (this.mapSrc != null) {
                        this.map = new SpritesheetMap(this.mapSrc);
                        let ret = this.map.load();
                        ret.then(res => {
                            if (!res){this.map = null; reject();}
                        });
                        resolve(ret);
                    }
                });
        });
    }
}

class SpritesheetMap {
    src: string;
    sprites: { [name: string]: { x: number, y: number, w: number, h: number } } = {}

    constructor(src: string) {
        this.src = src;
        return this;
    }

    load(): Promise<boolean> {
        return new Promise<boolean>((resoove, reject) => {
            let client = new XMLHttpRequest();
            client.open('GET', this.src);
            client.onreadystatechange = () => {
                console.log(<Array<string>>client.response);
                this.parseLines(client.response);
            }
            client.send();
        });
    }

    private parseLines(lines:Array<string>) {
        for (let line of lines) {
            let args = line.split(" ");
            this.sprites[args[0]] = { x: parseInt(args[2]), y: parseInt(args[3]), w: parseInt(args[4]), h: parseInt(args[5]) };
        }
    }
}