<template>
  <div class="home">
    <div id="div3d"></div>
  </div>
</template>

<script>
import {ArcballControls} from '@/utils/ArcballControls';
import * as THREE from 'three';


export default {
  name: 'Home',

  mounted() {
    this.initScene();
  },

  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      const frustumSize = 10;//10; //设置显示相机前方1000高的内容
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

      // directionalLight
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
      directionalLight.position.set(20, 20, 20);
      directionalLight.target.position.set(0, 0, 0);
      group.add(directionalLight);
      group.add(directionalLight.target);

      
      // gridHelper
      const gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, 0x66666);
      group.add(gridHelper);

      // axes helper
      const axesHelper = new THREE.AxesHelper(5);
      const xAxisColor = new THREE.Color('#ff0000');
      const yAxisColor = new THREE.Color('#00ff00');
      const zAxisColor = new THREE.Color('#0000ff');
      axesHelper.setColors(xAxisColor, yAxisColor, zAxisColor);
      this.scene.add(axesHelper);
  
      
      
      this.control = new ArcballControls(this.camera, this.renderer.domElement, this.scene);
      this.control.enableZoom = true;
      this.control.cursorZoom = true;

      this.camera.position.set(0, 8, 20);
    
    // ///////////////////////////////////// 添加射线拾取 /////////////////////////////////////////////////////
        const geometry = new THREE.BoxGeometry();
        const mat = new THREE.MeshLambertMaterial();
        const mesh = new THREE.Mesh(geometry, mat);
        this.scene.add(mesh);
        const pickPosition = {x: 0, y: 0};
        const canvas = this.renderer.domElement;

        function getCanvasRelativePosition(event) {
            const rect = canvas.getBoundingClientRect();
            return {
            x: (event.clientX - rect.left) * canvas.width  / rect.width,
            y: (event.clientY - rect.top ) * canvas.height / rect.height,
            };
        }

        function setPickPosition(event) {
            const pos = getCanvasRelativePosition(event);
            pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
            pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
        }

        function clearPickPosition() {
            pickPosition.x = -100000;
            pickPosition.y = -100000;
        }
        window.addEventListener('mousemove', setPickPosition);
        window.addEventListener('mouseout', clearPickPosition);
        window.addEventListener('mouseleave', clearPickPosition);

        class PickHelper {
            constructor() {
            this.raycaster = new THREE.Raycaster();
            this.pickedObject = null;
            this.pickedObjectSavedColor = 0;
            }
            pick(normalizedPosition, scene, camera, time) {
            // restore the color if there is a picked object
            if (this.pickedObject && this.pickedObject.type === 'Mesh') {
                this.pickedObject.material.color.setHex(this.pickedObjectSavedColor);
                this.pickedObject = undefined;
            }

            // cast a ray through the frustum
            this.raycaster.setFromCamera(normalizedPosition, camera);
            // get the list of objects the ray intersected
            const intersectedObjects = this.raycaster.intersectObjects(scene.children);
            if (intersectedObjects.length) {
                // pick the first object. It's the closest one
                this.pickedObject = intersectedObjects[0].object;
                if (this.pickedObject.type !== 'Mesh') {
                    return;
                }
                    console.debug(this.pickedObject);
                // save its color
                this.pickedObjectSavedColor = this.pickedObject.material.color.getHex();
                // set its emissive color to flashing red/yellow
                this.pickedObject.material.color.setHex(0x00ff00);

            }
            }
        }

        const pickHelper = new PickHelper();
        clearPickPosition();
    // ///////////////////////////////////// 添加射线拾取 /////////////////////////////////////////////////////
      const that = this;

      function tick(time) {
            time *= 0.001;

            pickHelper.pick(pickPosition, that.scene, that.camera, time);
            that.control.update();
            requestAnimationFrame(tick);
            
            that.renderer.render(that.scene, that.camera);

      }
      tick();

      // save
      window.scene = this.screen;
      window.camera = this.camera;
      window.renderer = this.renderer;
      window.control = this.control;

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
