import Game from "../game.class.js";
import EventEmitter from "./event-emitter.class.js";

export default class Events extends EventEmitter {

    constructor() {
        super();

        this.game = new Game();

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
            this.game.ui.muteSounds();
        });

        document.getElementById('play-button').addEventListener('click', () => {
            this.game.ui.playClick();
        });

        document.getElementById('music-button').addEventListener('click', () => {
            this.game.ui.muteMusic();
        });
        
        document.getElementById('control-button').addEventListener('click', () => {
            this.game.ui.openControls();
        });

        document.getElementById('controls-ok-button').addEventListener('click', () => {
            this.game.ui.showQuest();
        });

        document.getElementById('quest-ok-button').addEventListener('click', () => {
            this.game.ui.closeTutorial();
        });
    };
};