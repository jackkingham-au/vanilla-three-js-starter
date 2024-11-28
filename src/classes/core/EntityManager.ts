import Entity from "./Entity";

export default class EntityManager {
    _entities: Entity[];
    _entitiesMap: Record<string, Entity>
    _ids: number;

    constructor() {
        this._entities = [];
        this._entitiesMap = {}
        this._ids = 0;
    }

    _getName = () => {
        this._ids += 1;

        return `__component__${this._ids}`
    }

    /** Add a component to the manager. */
    add = (entity: Entity, name?: string) => {
        if (!name) name = this._getName();

        this._entities.push(entity);
        this._entitiesMap[name] = entity;
    }

    /** Get a component by name */
        get = (name: string) => {
        return this._entitiesMap[name];
    }

    /** Filter components by `Array.prototype.filter`. */
    filter = (filter: Parameters<typeof Array.prototype.filter>[0]) => {
        return this._entities.filter(filter);
    }

    update = (elapsedTime: number) => {
        for (const entity of this._entities) {
            entity.update(elapsedTime);
        }
    }
}