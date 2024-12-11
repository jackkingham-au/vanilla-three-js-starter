import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'
import { FBXLoader as THREEFBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader as THREEGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

type SupportedFileType = typeof FileLoader.SUPPORT_FILE_TYPES[number]
type SupportedLoader = THREEFBXLoader | THREEGLTFLoader

const DRACO_LOADER_PATH = '/draco/';
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(DRACO_LOADER_PATH);

export default class FileLoader {
    static SUPPORT_FILE_TYPES = ["FBX", "GLB", "GLTF"];

    _loader: SupportedLoader;
    _manager: THREE.LoadingManager;
    _filePath: string
    _fileType: SupportedFileType

    constructor(path: string) {
        this._filePath = path;

        this._fileType = FileLoader._getFileType(this._filePath);
        this._manager = new THREE.LoadingManager();

        const Loader = FileLoader._getLoaderByFileType(this._fileType)!;
        this._loader = new Loader(this._manager);

        if (["GLB", "GLTF"].includes(this._fileType)) {
            (this._loader as any).setDRACOLoader(dracoLoader);
        }
    }

    load = (callback: (data: any) => void) => {
        this._loader.load(this._filePath, callback as any);
    }

    static _getFileType = (path: string): SupportedFileType => {
        const fileType = path.split('.').pop()?.toUpperCase();

        if (!fileType || !FileLoader.SUPPORT_FILE_TYPES.includes(fileType as SupportedFileType)) throw new Error('FileLoader not supported for this file type: ' + fileType);

        return fileType as SupportedFileType;
    }

    static _getLoaderByFileType = (fileType: SupportedFileType) => {
        switch (fileType) {
            case "GLTF": return THREEGLTFLoader;
            case "GLB": return THREEGLTFLoader;
            case "FBX": return THREEFBXLoader;
        }
    }
}
