import Application from './classes/three/Application'

(window as any).application = new Application(
    document.querySelector('canvas.webgl') as HTMLCanvasElement
);