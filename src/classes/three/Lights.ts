import * as THREE from "three";

export default class Lights {

    static _directionalLight: THREE.DirectionalLight;
    static _debug?: THREE.DirectionalLightHelper

    constructor(scene: THREE.Scene) {
        Lights._directionalLight = new THREE.DirectionalLight('#fff', 3)
        Lights._directionalLight.position.set(-2.25, 5, -4.5)

        Lights._applyShadowSettings();

        scene.add(Lights._directionalLight);
    }

    static _applyShadowSettings = () => {
        Lights._directionalLight.castShadow = true
        Lights._directionalLight.shadow.mapSize.set(1024, 1024)
        Lights._directionalLight.shadow.camera.near = 0.1
        Lights._directionalLight.shadow.camera.far = 30
        Lights._directionalLight.shadow.camera.top = 8
        Lights._directionalLight.shadow.camera.right = 8
        Lights._directionalLight.shadow.camera.bottom = -8
        Lights._directionalLight.shadow.camera.left = -8
    }

    static _addDebug = () => {
        Lights._debug = new THREE.DirectionalLightHelper(Lights._directionalLight, 1, "red");
        return Lights._debug;
    }
}