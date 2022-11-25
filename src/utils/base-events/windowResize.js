import EventConfig from '@/utils/core/EventConfig';
import TickLogicEventType from '@/utils/core/TickLogicEventType';

export default function windowResize(event) {


    window.$bus.emit(EventConfig.TICK_LOGIC, TickLogicEventType.WINDOW_RESIZE);

}