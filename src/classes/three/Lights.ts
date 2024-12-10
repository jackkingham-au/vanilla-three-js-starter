import Application from "./Application";
import * as THREE from "three";

export default class Lights {
    _parent: Application;
    _lights: Array<THREE.Object3D>;

    constructor(parent: Application) {
        this._parent = parent;
        this._lights = [];

        this._init();
    }

    _init = () => {
        this._addTopLight();
        
        this._parent._scene.add(...this._lights);
    }

    _addTopLight = () => {
        const directionalLight = new THREE.DirectionalLight('#fff', 3)

        directionalLight.position.set(-2.25, 5, -4.5)
        directionalLight.intensity = 6;

        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.near = 0.1
        directionalLight.shadow.camera.far = 30
        directionalLight.shadow.camera.top = 8
        directionalLight.shadow.camera.right = 8
        directionalLight.shadow.camera.bottom = -8
        directionalLight.shadow.camera.left = -8

        this._lights.push(directionalLight);

        const helper = new THREE.DirectionalLightHelper(directionalLight, 1, "red");
        this._lights.push(helper);
    }
}