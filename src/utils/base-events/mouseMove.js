import EventConfig from '@/utils/core/EventConfig';

export default function mouseMove(event) {


    window.$bus.emit(EventConfig.TICK_RENDER);
}