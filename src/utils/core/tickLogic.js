import keepOBJInFrustumCenter from "../keepOBJInFrustumCenter";

let EXECUTING = false;
export default function tickLogic() {
    if (EXECUTING) { // 防止上一帧未运行完毕
        return;
    }
    EXECUTING = true;
    requestAnimationFrame(()=> {

        
        
        
        
        
        keepOBJInFrustumCenter();

        EXECUTING = false;
    });

}