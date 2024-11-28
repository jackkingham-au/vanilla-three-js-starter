import Application from "../three/Application";
import EntityManager from "./EntityManager";

export default class Game {
    _parent: Application;
    _entityManager: EntityManager;
    
    constructor(parent: Application) {
        this._parent = parent;
        this._entityManager = new EntityManager();
    }

    update = (elapsedTime: number) => {
        this._entityManager.update(elapsedTime);
    }
}