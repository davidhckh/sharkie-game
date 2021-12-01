import EventEmitter from "./Utils/EventEmitter.js";

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