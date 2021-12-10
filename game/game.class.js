import World from "./world.class.js";
import Drawer from "./utils/drawer.class.js";
import Events from "./utils/events.class.js";
import UI from "./ui.class.js";
import Sounds from "./utils/sounds.class.js";

export default class Game {

    static instance;

    constructor(canvas) {
        /**Singleton */
        if (Game.instance) {
            return Game.instance;
        };
        Game.instance = this;

        /**Setup everything */
        this.loadAssets()

        this.canvas = canvas;
        this.drawer = new Drawer();
        this.events = new Events()
        this.world = new World()
        this.ui = new UI()

        this.update();
    }

    /** on win */
    win() {
        /** freeze character */
        this.world.level.character.freeze = true;

        /**play win sound */
        this.sounds.playSound('../assets/sounds/win.mp3', false, 0.4, 2000);

        /**show win container */
        this.ui.showWinContainer();

        /**clear boss interval */
        clearInterval(this.world.level.boss.attackInterval);
    }

    /**on death */
    lose() {
        /**freeze character */
        this.world.level.character.freeze = true;

        /**clear gsap */
        gsap.globalTimeline.clear();

        clearInterval(this.world.level.boss.attackInterval);

        /**show deatth container */
        this.ui.showDeadContainer();

        /**play dead sound and fade out music */
        this.sounds.playSound('../assets/sounds/dead-sound.mp3', false, 0.4);
        this.sounds.fadeOutAllMusic();
    };

    /**start new game, after death or win */
    restart() {
        /**clear keyup and keydown event callbacks */
        this.events.callbacks.base = {};

        /**new world */
        this.world = new World();

        /**reset UI */
        this.ui = new UI();

        /**play music */
        this.sounds.playMainMusic();

        /**unfreeze character */
        this.world.level.character.freeze = false;
    };

    /**update on every frame */
    update() {
        if (this.world) {
            this.world.update();
        };

        window.requestAnimationFrame(() => {
            this.update();
        });
    };

    loadAssets() {
        /**load bubbles */
        this.bubble = new Image();
        this.bubble.src = '../assets/sharkie/attack/bubble-tap/bubble.png';

        this.poisonBubble = new Image();
        this.poisonBubble.src = '../assets/sharkie/attack/bubble-tap/poison-bubble.png';

        /**load barriers */
        this.barrier0 = new Image();
        this.barrier1 = new Image();
        this.barrier2 = new Image();
        this.barrier3 = new Image();
        this.barrier0.src = '../assets/barriers/0.png';
        this.barrier1.src = '../assets/barriers/1.png';
        this.barrier2.src = '../assets/barriers/2.png';
        this.barrier3.src = '../assets/barriers/3.png';
    };
};