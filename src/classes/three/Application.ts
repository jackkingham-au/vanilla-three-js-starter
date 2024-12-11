import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Game from "../core/Game";
import World from "../world/World";
import Lights from "./Lights";


export default class Application {
    _scene: THREE.Scene;
    _camera!: THREE.PerspectiveCamera;
    _renderer!: THREE.WebGLRenderer;
    _viewport: { width: number, height: number };
    _clock: THREE.Clock;
    _canvas: HTMLCanvasElement;
    _controls!: OrbitControls;
    _lights!: Lights;
    _debug!: GUI;
    _time = {
        previous: 0,
        deltaTime: 0,
        elapsedTime: 0,
    }

    _game: Game;
    _world: World;

    // _postProcessing: PostProcessing;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._scene = new THREE.Scene();
        this._clock = new THREE.Clock();

        this._viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this._setRenderer();
        this._setCamera();
        this._setControls();
        this._setWindowResize();
        this._setDebug();

        this._game = new Game(this);
        this._world = new World(this);

        this._lights = new Lights(this);
        // this._postProcessing = new PostProcessing(this);

        this._tick();
    }

    _setDebug = () => {
        this._debug = new GUI({ width: 350 });

        const rendererFolder = this._debug.addFolder("Renderer");

        rendererFolder
            .add(this._renderer, "toneMapping", {
                "No Tone Mapping": THREE.NoToneMapping,
                "Linear Tone Mapping": THREE.LinearToneMapping,
                "Reinhard Tone Mapping": THREE.ReinhardToneMapping,
                "Cineon Tone Mapping": THREE.CineonToneMapping,
                "ACES Filmic Tone Mapping": THREE.ACESFilmicToneMapping,
                "AgX Tone Mapping": THREE.AgXToneMapping,
                "Neutral Tone Mapping": THREE.NeutralToneMapping,
                "Custom Tone Mapping": THREE.CustomToneMapping
            }).name("Tone Mapping");

        rendererFolder
            .add(this._renderer, "toneMappingExposure").name("Tone Mapping Exposure")
            .min(0).max(10).step(0.001);

        rendererFolder.close();
        this._debug.close();
    }

    _setRenderer = () => {
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            alpha: true,
            antialias: false,
        })

        this._renderer.setSize(this._viewport.width, this._viewport.height)
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /** Enable Shadows */
        this._renderer.shadowMap.enabled = true
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap

        this._renderer.toneMapping = THREE.CineonToneMapping;
        this._renderer.toneMappingExposure = 1.5;
    }

    _setCamera = () => {
        this._camera = new THREE.PerspectiveCamera(75, this._viewport.width / this._viewport.height, 0.1, 100)
        this._camera.position.set(5, 5, 5);

        this._scene.add(this._camera);
    }

    _setControls = () => {
        this._controls = new OrbitControls(this._camera, this._canvas)
        this._controls.enableDamping = true
    }

    _setWindowResize = () => {
        window.addEventListener('resize', () => {
            // Update sizes
            this._viewport.width = window.innerWidth
            this._viewport.height = window.innerHeight

            // Update camera
            this._camera.aspect = this._viewport.width / this._viewport.height
            this._camera.updateProjectionMatrix()

            // Update renderer
            this._renderer.setSize(this._viewport.width, this._viewport.height)
            this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            // Update post processing
            // this._postProcessing._composer.setSize(this._viewport.width, this._viewport.height);
            // this._postProcessing._composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })
    }

    _tick = () => {
        const elapsedTime = this._clock.getElapsedTime();

        this._time.deltaTime = elapsedTime - this._time.previous;
        this._time.previous = elapsedTime;
        this._time.elapsedTime = elapsedTime;

        this._world.update(elapsedTime);
        this._game.update(elapsedTime);

        this._controls.update();

        this._renderer.render(this._scene, this._camera);
        // this._postProcessing.render();

        requestAnimationFrame(this._tick);
    }
}
