import EventConfig from '@/utils/core/EventConfig';
import tick from '@/utils/core/tick';
import tickLogic from '@/utils/core/tickLogic';
import tickRender from '@/utils/core/tickRender';

export default function listen() {
    window.$bus.on(EventConfig.INIT_3D, tick);
    window.$bus.on(EventConfig.TICK_LOGIC, tickLogic);
    window.$bus.on(EventConfig.TICK_RENDER, tickRender);

    window.$bus.on(EventConfig.POINTER_MOVE, tick);
    window.$bus.on(EventConfig.WHEEL, tick);

}