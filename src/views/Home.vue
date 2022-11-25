<template>
  <div class="home">
    <div id="div3d"></div>
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
