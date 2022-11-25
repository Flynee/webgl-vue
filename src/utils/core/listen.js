import EventConfig from '@/utils/core/EventConfig';
import init from '@/utils/core/init';
import tickLogic from '@/utils/core/tickLogic';
import tickRender from '@/utils/core/tickRender';
import mouseClick from '@/utils/base-events/mouseClick';
import mouseDBLClick from '@/utils/base-events/mouseDBLClick';
import mouseMove from '@/utils/base-events/mouseMove';
import mouseWheel from '@/utils/base-events/mouseWheel';
import windowResize from '@/utils/base-events/windowResize';

export default function listen() {
    window.$bus.on(EventConfig.INIT_3D, init);

    window.$bus.on(EventConfig.TICK_LOGIC, tickLogic);
    window.$bus.on(EventConfig.TICK_RENDER, tickRender);

    window.$bus.on(EventConfig.CLICK, mouseClick);
    window.$bus.on(EventConfig.DB_CLICK, mouseDBLClick);
    window.$bus.on(EventConfig.POINTER_MOVE, mouseMove);
    window.$bus.on(EventConfig.WHEEL, mouseWheel);
    window.$bus.on(EventConfig.RESIZE, windowResize);

}