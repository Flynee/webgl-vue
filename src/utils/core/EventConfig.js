const EventConfig = {
    INIT_3D: 'init3d',
    TICK_LOGIC: 'ticklogic',
    TICK_RENDER: 'tickrender',
    
    POINTER_MOVE: 'pointermove',
    POINTER_DOWN: 'pointerdown',
    POINTER_UP: 'pointerup',
    CLICK: 'click',
    DB_CLICK: 'dbclick',
    WHEEL: 'wheel'
}

Object.freeze(EventConfig);
export default EventConfig;