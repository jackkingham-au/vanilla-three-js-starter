import Application from "../three/Application";
import EntityManager from "./EntityManager";

type ComponentClass = Record<any, any>

export type EngineObject = { _parent: any } & Record<any, any>;

export default class Entity {
    _parent!: EntityManager;
    _components: Map<string, ComponentClass> = new Map();

    setParent = (entityManager: EntityManager) => {
        this._parent = entityManager;
    }

    _getApplication() {
        let current: EngineObject = this._parent;
        while (current._parent) {
            current = current._parent;
        }

        return current as unknown as Application;
    }

    _getParentOfType<T>(type: new (...args: any[]) => T): T | null {
        let current: EngineObject = this._parent;
        while (current) {
            if (current instanceof type) {
                return current as T;
            }

            current = current._parent;
        }
        
        return null;
    }

    _addComponent = (Component: new (...args: any[]) => ComponentClass, name: string) => {
        const instance = new Component(this);
        this._components.set(name, instance);
    }

    _updateComponents = (elapsedTime: number) => {
        this._components.forEach(component => {
            component.update(elapsedTime);
        })
    }

    update = (elapsedTime: number) => {}
}   