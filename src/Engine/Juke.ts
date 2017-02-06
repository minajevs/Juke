import Core from "./Core/Core";
import GameObject, {IGameObjectOptions} from "./Physics/GameObject";
import Vector from "./Physics/Vector";
import Rect from "./Physics/Rect";
import Keyboard from "./Controls/Keyboard";
import Resources from "./Resources/Resources";
import {IResource} from "./Resources/Resource";
import ImageResource from "./Resources/ImageResource";
import Sprite from "./Render/Sprite";


export default {Core};

export {
    //Core
    Core, 
    //Physics
    Vector, Rect, GameObject, IGameObjectOptions,
    //Controls
    Keyboard,
    //Resources
    IResource, Resources, ImageResource,
    //Render
    Sprite,
};


