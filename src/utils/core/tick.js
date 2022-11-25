import * as THREE from 'three';
import EventConfig from "./EventConfig";
import {ArcballControls} from '@/utils/ArcballControls';
import tickLogic from '@/utils/core/tickLogic'
import tickRender from '@/utils/core/tickRender'
import loadBox from '@/utils/loadBox';
import Log from '@/utils/Log';

let INIT_SCENE = false;
let EXECUTING = false;
const log = Log.getInstance();

export default function tick() {
    if (EXECUTING) { // 防止上一帧未运行完毕
        return;
    }
    EXECUTING = true;
    if (!INIT_SCENE) {
        log.info('init...');
        initScene();
        INIT_SCENE = true;
        loadBox();
    }
    requestAnimationFrame(()=> {
        window.$bus.emit(EventConfig.TICK_LOGIC, tickLogic);
        window.$bus.emit(EventConfig.TICK_RENDER, tickRender);
        EXECUTING = false;
    });

}

function initScene() {
    window.cad = {
        scene: null,
        control: null,
        camera: null,
        renderer: null
    }

    cad.scene = new THREE.Scene();
    cad.scene.background = new THREE.Color(1, 1, 1);
    const frustumSize = 100;//10; //设置显示相机前方1000高的内容
    const aspect = window.innerWidth / window.innerHeight; //计算场景的宽高比
    cad.camera = new THREE.OrthographicCamera(
        frustumSize * aspect / - 2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / - 2,
        0,
        1000,
        
    );
    cad.renderer = new THREE.WebGLRenderer();
    const group = new THREE.Group();
    cad.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#div3d').appendChild(cad.renderer.domElement);
    cad.scene.add(group);

    // ambidentLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    group.add(ambientLight);

    cad.control = new ArcballControls(cad.camera, cad.renderer.domElement, cad.scene);
    cad.control.enableZoom = true;
    cad.control.cursorZoom = true;
    cad.camera.position.set(5,5,5);

    Object.freeze(window.cad);
}