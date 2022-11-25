import * as THREE from 'three';
import {ArcballControls} from '@/utils/ArcballControls';
import EventConfig from "./EventConfig";
import Log from '@/utils/log/Log';
import loadBox from '@/utils/logic-events/loadBox';

const log = Log.getInstance();

export default function init() {
    window.cad = {
        scene: null,
        control: null,
        camera: null,
        renderer: null
    }
    const lights = initLights();
    const group = new THREE.Group();

    cad.scene = initScene();
    cad.camera = initCamera();
    cad.renderer = initRenderer();
    cad.control = initControl(cad.camera, cad.renderer.domElement, cad.scene);

    lights.forEach(light => {
        group.add(light);
    });

    cad.scene.add(group);

    Object.freeze(window.cad);

    loadBox();
    log.info('init3d finished!');

    window.$bus.emit(EventConfig.TICK);
}

function initScene() {
    const scene = new THREE.Scene();
    return scene;
}

function initCamera() {
    const fs = 10;
    const as = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
        fs * as / - 2,
        fs * as / 2,
        fs / 2,
        fs / - 2,
        0,
        1000,
    );
    camera.position.set(5,5,5);

    return camera;
}

function initRenderer() {
    const canvas = document.querySelector('#div3d'); 
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}

function initLights () {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

    return [ambientLight];
}

function initControl(camera, dom, scene) {
    const control = new ArcballControls(camera, dom, scene);
    control.enableZoom = true;
    control.cursorZoom = true;

    return control;
}

function initStats() {

}