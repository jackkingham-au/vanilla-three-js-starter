
import Application from "../three/Application";
import Ground from "./Ground";

export default class World {
    parent: Application;
    _ground: Ground;

    constructor(parent: Application) {
        this.parent = parent;
        this._ground = new Ground(this);

        this.parent._scene.add(this._ground._mesh);
    }

    update = (elapsedTime: number) => {
        
    }
}