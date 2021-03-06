//Core
import Core from "./Core/Core";
import Tick from "./Core/Tick";
import Objects from "./Core/Objects";
import Events from "./Core/Events";
//Physics
import GameObject, {IGameObjectOptions} from "./Physics/GameObject";
import Vector from "./Physics/Vector";
import Rect from "./Physics/Rect";
import {Roles} from "./Physics/GameObject";
//Controls
import Keyboard from "./Controls/Keyboard";
//Resources
import Resources from "./Resources/Resources";
import {IResource} from "./Resources/Resource";
import ImageResource from "./Resources/ImageResource";
import Spritesheet from "./Resources/Spritesheet";
//Render
import Sprite from "./Render/Sprite";
import Camera from "./Render/Camera";


export default {Core};

export {
    //Core
    Core, Objects, Tick, Events, 
    //Physics
    Vector, Rect, GameObject, IGameObjectOptions, Roles,
    //Controls
    Keyboard,
    //Resources
    IResource, Resources, ImageResource, Spritesheet,
    //Render
    Sprite, Camera
};


