import Entity from "./Entity";
import Game from "./Game";

export default class EntityManager {
    _entities: Entity[];
    _entitiesMap: Record<string, Entity>
    _ids: number;
    _parent: Game;

    constructor(parent: Game) {
        this._parent = parent;

        this._entities = [];
        this._entitiesMap = {}
        this._ids = 0;
    }

    /** Add a component to the manager. */
    add = (EntityClass: new (parent: EntityManager) => Entity, givenName?: string) => {
        const name = givenName ?? EntityClass.name;
        const entity = new EntityClass(this);

        entity._init();

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