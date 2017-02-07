//Core
import Core from "./Core/Core";
import Objects from "./Core/Objects";
//Physics
import GameObject, {IGameObjectOptions} from "./Physics/GameObject";
import Vector from "./Physics/Vector";
import Rect from "./Physics/Rect";
//Controls
import Keyboard from "./Controls/Keyboard";
//Resources
import Resources from "./Resources/Resources";
import {IResource} from "./Resources/Resource";
import ImageResource from "./Resources/ImageResource";
//Render
import Sprite from "./Render/Sprite";
import Camera from "./Render/Camera";


export default {Core};

export {
    //Core
    Core, Objects,
    //Physics
    Vector, Rect, GameObject, IGameObjectOptions,
    //Controls
    Keyboard,
    //Resources
    IResource, Resources, ImageResource,
    //Render
    Sprite, Camera
};


