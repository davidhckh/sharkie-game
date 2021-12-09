import EventEmitter from "./event-emitter.class.js";

export default class Events extends EventEmitter {

    constructor() {
        super();

        /**
         * trigger events in event emitter
        */
        window.addEventListener('keydown', () => {
            this.trigger('keydown');
        });

        window.addEventListener('keyup', () => {
            this.trigger('keyup');
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.trigger('restart');
        });

        document.getElementById('dead-restart-button').addEventListener('click', () => {
            this.trigger('restart');
        });

        document.getElementById('sound-button').addEventListener('click', () => {
            this.trigger('mute-sounds');
        });

        document.getElementById('play-button').addEventListener('click', () => {
            this.trigger('play');
        });

        document.getElementById('music-button').addEventListener('click', () => {
            this.trigger('mute-music');
        });
    };
};