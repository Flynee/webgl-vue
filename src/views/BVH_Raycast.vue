<template>
  <div class="home">
    <div id="div3d"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import {ArcballControls} from '@/utils/ArcballControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  name: 'Home',

  mounted() {
    this.initScene();
  },

  methods: {
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(1, 1, 1);
        const frustumSize = 100;//10; //设置显示相机前方1000高的内容
        const aspect = window.innerWidth / window.innerHeight; //计算场景的宽高比
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / - 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / - 2,
            0,
            1000,
            
        );
        this.renderer = new THREE.WebGLRenderer();
        const group = new THREE.Group();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector('#div3d').appendChild(this.renderer.domElement);
        this.scene.add(group);

        // ambidentLight
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        group.add(ambientLight);

        this.control = new ArcballControls(this.camera, this.renderer.domElement, this.scene);
        this.control.enableZoom = true;
        this.control.cursorZoom = true;

        this.camera.position.set(100,100,100);

        const that = this;

        function tick() {
            that._updateOrthoFrustumCulled();
            that.control.update();
            requestAnimationFrame(tick);
            
            that.renderer.render(that.scene, that.camera);

        }
        tick();



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
            that.scene.add(root);
        });

        window.cad = {
            scene: that.scene,
            control: that.control,
            camera: that.camera,
        }

    },
    _updateOrthoFrustumCulled() {
        if (this.camera.isOrthographicCamera) {//防止近处裁剪

            let sphereSize = this.camera.far / 2;
          
            const p = this.camera.position.clone();//.multiplyScalar(1/scalar);
            const t = this.control.target.clone();//.multiplyScalar(1/scalar);
            const c = new THREE.Vector3(0, 0, 0);
            
            let pt_len = p.distanceTo(c);
            let d = p.sub(t).normalize();

            if (pt_len < sphereSize || pt_len > sphereSize) {
                this.camera.position.add(d.multiplyScalar((sphereSize - pt_len)));
            }

        }
    },

  }
}
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
#div3d {
  width: 100%;
  height: 100%;
}

</style>
