<template>
  <div class="home">
      <canvas id="div3d" style="width:100%; height:100%;"></canvas>
  </div>
</template>

<script>
import EventConfig from '@/utils/core/EventConfig.js';
import listen from '@/utils/core/listen'

export default {
  name: 'Home',

  created() {
    listen();
  },
  mounted() {
    this._init3D();
    this.initBaseEvents();
  },

  methods: {
    _init3D() {
        window.$bus.emit(EventConfig.INIT_3D);
    },

    initBaseEvents() {
        document.addEventListener('pointermove', (event)=>{
            window.$bus.emit(EventConfig.POINTER_MOVE, event);
        });
        document.addEventListener('click', (event)=>{
            window.$bus.emit(EventConfig.CLICK, event);
        });
        document.addEventListener('dblclick', (event)=>{
            window.$bus.emit(EventConfig.DB_CLICK, event);
        });
        document.addEventListener('pointerdown', (event)=>{
            window.$bus.emit(EventConfig.POINTER_DOWN, event);
        });
        document.addEventListener('pointerup', (event)=>{
            window.$bus.emit(EventConfig.POINTER_UP, event);
        });
        document.addEventListener('wheel', (event)=>{
            window.$bus.emit(EventConfig.WHEEL, event);
        });
        window.addEventListener('resize', (event)=>{
            window.$bus.emit(EventConfig.RESIZE, event);
        });
    },

  }
}
</script>
<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
}
#div3d {
  position:absolute;
  width: 100%;
  height: 100%;
}


</style>
