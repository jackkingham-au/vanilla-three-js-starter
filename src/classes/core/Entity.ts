import EntityManager from "./EntityManager";

export default class Entity {
    _parent?: EntityManager;

    setParent = (entityManager: EntityManager) => {
        this._parent = entityManager;
    }

    update = (elapsedTime: number) => {
            
    }   
}