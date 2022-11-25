import EventConfig from '@/utils/core/EventConfig';


export default function mouseWheel(event) {


    window.$bus.emit(EventConfig.TICK_RENDER);

}