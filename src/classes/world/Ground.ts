import * as THREE from "three";

import FloorMaterial from "../../materials/FloorMaterial";
import FloorShadowMaterial from "../../materials/FloorShadowMaterial";
import World from "./World";

export default class Ground {
    static GROUND_SIZE = 10;

    parent: World;
    _mesh!: THREE.Mesh;

    constructor(parent: World) {
        this.parent = parent;

        this._init();
    }

    _init = () => {
        this._mesh = new THREE.Mesh(
            this._geometry(),
            new THREE.MeshStandardMaterial({ color: "lightgreen" })
        );

        this._mesh.rotateX(-Math.PI / 2);
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