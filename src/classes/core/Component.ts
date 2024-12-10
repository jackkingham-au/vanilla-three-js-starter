import Application from "../three/Application";
import Entity, { EngineObject } from "./Entity";

export default class Component {
    update = (elapsedTime: number) => {}

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
}