import Entity from "./Entity";

export default class Component {
    _parent?: Entity;

    setParent = (entity: Entity) => {
        this._parent = entity;
    }
}