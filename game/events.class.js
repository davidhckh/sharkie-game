import EventEmitter from "./utils/event-emitter.class.js";

export default class Events extends EventEmitter {

    constructor() {
        super()

        window.addEventListener('keydown', () => {
            this.trigger('keydown')
        })

        window.addEventListener('keyup', () => {
            this.trigger('keyup')
        })
    }
}