import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Game from "../core/Game";
import World from "../world/World";
import GUI from "lil-gui";
import Lights from "./Lights";

export default class Application {
    _scene: THREE.Scene;
    _camera!: THREE.PerspectiveCamera;
    _renderer!: THREE.WebGLRenderer;
    _viewport: { width: number, height: number };
    _clock: THREE.Clock;
    _canvas: HTMLCanvasElement;
    _controls!: OrbitControls;
    _lights: Lights;
    _debug!: GUI;

    _game: Game;
    _world: World;

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

        this._lights = new Lights(this); 
        this._game = new Game(this);
        this._world = new World(this);

        this._tick();
    }

    _setDebug = () => {
        this._debug = new GUI({ width: 350 });

        this._debug.close();
    }

    _setRenderer = () => {
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            alpha: true,
            antialias: true
        })

        this._renderer.setSize(this._viewport.width, this._viewport.height)
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /** Enable Shadows */
        this._renderer.shadowMap.enabled = true
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap
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
        })
    }

    _tick = () => {
        const elapsedTime = this._clock.getElapsedTime();

        this._world.update(elapsedTime);
        this._game.update(elapsedTime);

        this._controls.update();

        this._renderer.render(this._scene, this._camera);

        requestAnimationFrame(this._tick);
    }
}