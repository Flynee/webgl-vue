<template>
  <div class="home">
    <div id="div3d"></div>
  </div>
</template>

<script>
import {ArcballControls} from '@/utils/ArcballControls';
import * as THREE from 'three';
import {animation} from '@/utils/animation';

export default {
  name: 'Home',

  mounted() {
    this.initScene();
    animation.start2(this.scene);
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
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
      const that = this;
      window.rendererCBS = [];

      function animate() {
           window.rendererCBS.forEach(cb => {
              const fn = cb[0];
             if (fn instanceof Function) {
                const args = cb.slice(1);
                fn(...args);
             }
           });
          that.control.update();
          requestAnimationFrame(animate);
          
          that.renderer.render(that.scene, that.camera);

      }
      animate();

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
}
#div3d {
  width: 100%;
  height: 100%;
}
</style>
