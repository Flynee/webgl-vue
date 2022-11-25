export default class Log {
    constructor() {
        if(!Log.instance) {
            Log.instance = this
        }
        return Log.instance
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Log();
        }
        return this.instance;
    } 

    info(str) {
        console.info("[INFO]:\t" + str);
    }
    warn(str) {
        console.warn("[WARNING]:\t" + str);
    }
    error(str) {
        console.error("[ERROR]:\t" + str);
    }
    debug(str) {
        console.debug("[DEBUG]:\t" + str);
    }
}
