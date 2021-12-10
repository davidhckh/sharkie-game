import Game from "../game.class.js";
import EventEmitter from "./event-emitter.class.js";

export default class Events extends EventEmitter {

    constructor() {
        super();

        this.game = new Game();

        /**
         * trigger events in event emitter
        */
        /**key down and up for character controls */
        window.addEventListener('keydown', () => {
            this.trigger('keydown');
        });

        window.addEventListener('keyup', () => {
            this.trigger('keyup');
        });

        /**restart */
        document.getElementById('restart-button').addEventListener('click', () => {
            this.trigger('restart');
        });

        document.getElementById('dead-restart-button').addEventListener('click', () => {
            this.trigger('restart');
        });

        /**mute sounds */
        document.getElementById('sound-button').addEventListener('click', () => {
            this.game.ui.muteSounds();
        });

        /**mute music */
        document.getElementById('music-button').addEventListener('click', () => {
            this.game.ui.muteMusic();
        });
        
        /**play button on start screen */
        document.getElementById('play-button').addEventListener('click', () => {
            this.game.ui.playClick();
        });

        /**open controls on top, right button click */
        document.getElementById('control-button').addEventListener('click', () => {
            this.game.ui.openControls();
        });

        /**tutorial */
        document.getElementById('controls-ok-button').addEventListener('click', () => {
            this.game.ui.showQuest();
        });

        document.getElementById('quest-ok-button').addEventListener('click', () => {
            this.game.ui.closeTutorial();
        });
    };
};