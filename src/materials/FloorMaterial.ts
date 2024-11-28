import * as THREE from "three";

import vertexShader from "../shaders/terrain/custom/vertex.glsl";
import fragmentShader from "../shaders/terrain/custom/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

export default class FloorMaterial {
    uniforms: Record<string, THREE.IUniform>;

    
    constructor() {
        this.uniforms = {
            uValleyColor: {
                value: new THREE.Color("#94d2bd")
            },
            uPeakColor: {
                value: new THREE.Color("#0a9396")
            },
        }

        return new CustomShaderMaterial({
            baseMaterial: THREE.MeshToonMaterial,

            vertexShader,
            fragmentShader,
            uniforms: this.uniforms
        }) 
    }
}