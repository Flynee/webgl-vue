
import Log from "@/utils/log/Log";


const log = Log.getInstance();
let EXECUTING = false;
export default function tickRender() {
    if (EXECUTING) { // 防止上一帧未运行完毕
        log.warn('tickRender is running!');
        return;
    }
    EXECUTING = true;
    requestAnimationFrame(()=> {
      
        console.info('render')
        const cad = window.cad;
        cad.control.update();

        cad.renderer.autoClear = true;
        cad.renderer.autoClearDepth = true;

        cad.renderer.render(cad.scene, cad.camera);

        EXECUTING = false;
    });
    
}