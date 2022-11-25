import TickLogicEventType from '@/utils/core/TickLogicEventType';

import Log from "@/utils/log/Log";
import keepOBJInFrustumCenter from "@/utils/logic-events/keepOBJInFrustumCenter";
import updateWindow from "@/utils/logic-events/updateWindow";


const log = Log.getInstance();
let EXECUTING = false;
export default function tickLogic(eventType) {
    if (EXECUTING) { // 防止上一帧未运行完毕
        log.warn('tickLogic is running!');
        return;
    }
    EXECUTING = true;
    requestAnimationFrame(()=> {
        const type = eventType;

        // 让 obj 处于视锥体中央
        if(type === TickLogicEventType.KEEP_OBJ_IN_FRUSTUM_CENTER) {
            keepOBJInFrustumCenter();
        }
        
        // window 窗口发生变化
        if(type === TickLogicEventType.WINDOW_RESIZE) {
            updateWindow();
        }


        
        
        
        

        EXECUTING = false;
    });

}