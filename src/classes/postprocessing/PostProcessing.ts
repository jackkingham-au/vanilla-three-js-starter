import { EffectComposer, RenderPass, SMAAPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import Application from "../three/Application";
import * as THREE from "three";

export default class PostProcessing {
    _parent: Application
    _composer: EffectComposer
    _renderPass: RenderPass
    _renderTarget: THREE.WebGLRenderTarget
    _passes: Record<string, any> = {}

    constructor(parent: Application) {
        this._parent = parent;
        
        this._renderTarget = new THREE.WebGLRenderTarget(this._parent._viewport.width, this._parent._viewport.height, {
            samples: window.devicePixelRatio === 1 ? 2 : 0
        });

        this._composer = new EffectComposer(this._parent._renderer, this._renderTarget);

        this._renderPass = new RenderPass(this._parent._scene, this._parent._camera);
        this._composer.addPass(this._renderPass);

        this._addBloomPass();

        this._addAntiAliasingPass();

        this.debug();
    }

    debug = () => {
        const gui = this._parent._debug.addFolder("Post Processing");
        const bloomFolder = gui.addFolder("Bloom");

        bloomFolder.add(this._passes.bloom, 'enabled').name("Enabled")
        bloomFolder.add(this._passes.bloom, 'strength').min(0).max(2).step(0.001)
        bloomFolder.add(this._passes.bloom, 'radius').min(0).max(2).step(0.001)
        bloomFolder.add(this._passes.bloom, 'threshold').min(0).max(2).step(0.001)

        gui.close();
    }

    _addBloomPass() {
        const BLOOM_STRENGTH = 0.6;
        const BLOOM_THRESHOLD = 0.1;
        const BLOOM_RADIUS = 0.6;

        const bloom = new UnrealBloomPass(
            new THREE.Vector2(this._parent._viewport.width, this._parent._viewport.height),
            BLOOM_STRENGTH,
            BLOOM_THRESHOLD,
            BLOOM_RADIUS
        );

        this._passes.bloom = bloom;
        this._composer.addPass(bloom);
    }

    _addAntiAliasingPass() {
        if (this._parent._renderer.capabilities.isWebGL2 && window.devicePixelRatio > 1) return;
        
        console.log("Anti Aliasing Pass");

        const antiAliasing = new SMAAPass(this._parent._viewport.width, this._parent._viewport.height);
        this._composer.addPass(antiAliasing);
    }

    render() {
        this._composer.render(this._parent._time.elapsedTime);
    }
}