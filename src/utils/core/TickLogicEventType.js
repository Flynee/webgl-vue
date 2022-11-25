const TickLogicEventType = {
    WINDOW_RESIZE: '0',
    KEEP_OBJ_IN_FRUSTUM_CENTER: '1', // 让obj 处于frustum 中央
    SELECT_OBJ: '2', // 鼠标拾取物体
}

Object.freeze(TickLogicEventType);
export default TickLogicEventType;