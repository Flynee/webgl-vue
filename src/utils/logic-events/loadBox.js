
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventConfig from '@/utils/core/EventConfig';
import TickLogicEventType from '@/utils/core/TickLogicEventType';

import Log from '@/utils/log/Log';

const log = Log.getInstance();

export default function loadBox() {
    const cad = window.cad;
    if(!cad) {
        return;
    }
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(window.location.origin + '/box.glb', (gltf) => {
        const root = gltf.scene;
        root.children.forEach(child => {
            if (child.type == "Mesh") {
                child.material = new THREE.MeshBasicMaterial({color: 0xbf964e});
            }
            if (child.type == "LineSegments") {
                child.material = new THREE.MeshBasicMaterial({color: 0x000000});
            }

            if (child.type == "Points") {
                child.material = new THREE.MeshBasicMaterial({color: 0xE7E3B9});
            }
        
        });
        cad.scene.add(root);
        window.$bus.emit(EventConfig.TICK_LOGIC, TickLogicEventType.KEEP_OBJ_IN_FRUSTUM_CENTER);
        log.info('load a box!');
    });
}