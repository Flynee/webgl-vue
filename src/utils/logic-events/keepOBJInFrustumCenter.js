import * as THREE from 'three';
import EventConfig from '@/utils/core/EventConfig';

export default function keepOBJInFrustumCenter() {
    const cad = window.cad;

    if (cad && cad.camera.isOrthographicCamera) {//防止近处裁剪

        let sphereSize = cad.camera.far / 2;
      
        const p = cad.camera.position.clone();//.multiplyScalar(1/scalar);
        const t = cad.control.target.clone();//.multiplyScalar(1/scalar);
        const c = new THREE.Vector3(0, 0, 0);
        
        let pt_len = p.distanceTo(c);
        let d = p.sub(t).normalize();

        if (pt_len < sphereSize || pt_len > sphereSize) {
            cad.camera.position.add(d.multiplyScalar((sphereSize - pt_len)));
        }

        window.$bus.emit(EventConfig.TICK_RENDER);

    }
}