
let EXECUTING = false;
export default function tickRender() {
    if (EXECUTING) { // 防止上一帧未运行完毕
        return;
    }
    EXECUTING = true;
    requestAnimationFrame(()=> {
      
      
        const cad = window.cad;
        cad.control.update();
        cad.renderer.render(cad.scene, cad.camera);

        EXECUTING = false;
    });
    
}