import EventConfig from '@/utils/core/EventConfig';

export default function updateWindow() {
    const canvas = cad.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      cad.renderer.setSize(width, height, false);
    }
    cad.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    cad.camera.updateProjectionMatrix();

    window.$bus.emit(EventConfig.TICK_RENDER);
    console.debug('resize');
}