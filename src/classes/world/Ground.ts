import * as THREE from "three";

import FloorMaterial from "../../materials/FloorMaterial";
import FloorShadowMaterial from "../../materials/FloorShadowMaterial";
import World from "./World";

export default class Ground {
    static GROUND_SIZE = 10;

    parent: World;
    _mesh!: THREE.Mesh;
    _material!: FloorMaterial;
    _depthMaterial!: FloorShadowMaterial;

    constructor(parent: World) {
        this.parent = parent;

        this._init();
        this.debug();
    }

    debug = () => {
        const folder = this.parent.parent._debug.addFolder("Ground")

        folder.addColor(this._material.uniforms.uValleyColor, "value").name("uValleyColor")
        folder.addColor(this._material.uniforms.uPeakColor, "value").name("uPeakColor")
    }

    _init = () => {
        this._material = new FloorMaterial();
        this._depthMaterial = new FloorShadowMaterial();

        this._mesh = new THREE.Mesh(this._geometry(), this._material as unknown as THREE.Material);
        this._mesh.customDepthMaterial = this._depthMaterial as unknown as THREE.Material;

        this._mesh.receiveShadow = true;
        this._mesh.geometry.rotateX(-Math.PI / 2);
    }

    _geometry = () => {
        return new THREE.PlaneGeometry(
            Ground.GROUND_SIZE,
            Ground.GROUND_SIZE,
            Ground.GROUND_SIZE * 20,
            Ground.GROUND_SIZE * 20
        )
    }
}