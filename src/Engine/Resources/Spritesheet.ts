import ImageResource, { IImageResourceOptions } from './ImageResource';
import { IResource, ResourceType } from './Resource';
import Resources from './Resources';
import Renderable, { IRenderableOptions } from "../Render/Renderable";
import Tools from '../Tools/Tools';
import Rect from '../Physics/Rect';
import Vector from '../Physics/Vector';
import Sprite from '../Render/Sprite';

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

    async load(resources?: Resources) {
        let img = await super.load();
        if (this.mapSrc != null) {
            this.map = new SpritesheetMap(this.mapSrc);
            let loadResult = await this.map.load();
            if (!loadResult) { this.map = null; }
        }
    }

    getSprite(position?: Rect, name?: string): Sprite {
        if (name != null) {
            if (this.map == null) return null;
            let map = this.map.sprites[name];
            if (map == null) return null;
            return this.getSprite(new Rect({ pos: new Vector(map.x, map.y), w: map.w, h: map.h }));
        } else if (position != null) {
            return new Sprite({
                src: this,
                name: `${this.name}${position.pos.x}-${position.pos.y}_${position.w}_${position.h}`,
                offset: position
            })
        } else {
            return null;
        }
    }
}

class SpritesheetMap {
    src: string;
    sprites: { [name: string]: { x: number, y: number, w: number, h: number } } = {}

    constructor(src: string) {
        this.src = src;
        return this;
    }

    async load() {
        try {
            let response = await fetch(this.src);
            if (this.src.indexOf(".json") !== -1) {
                let json = await response.json();
                this.parseJsonLines(json);
            } else {
                let text = await response.text();
                this.parseStringLines(text);
            }
            return true;
        } catch (e) {
            console.log("Can't load map " + this.src);
            return false;
        }
    }

    private parseJsonLines(lines: Array<string>) {
        for (let line of lines) {
            let args = line.split(" ");
            this.sprites[args[0]] = { x: parseInt(args[2]), y: parseInt(args[3]), w: parseInt(args[4]), h: parseInt(args[5]) };
        }
    }

    private parseStringLines(text:string){
        let arr = text.split(/\r?\n/);
        this.parseJsonLines(arr);
    }
}