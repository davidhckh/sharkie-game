import World from "./world.class.js";
import Drawer from "./drawer.class.js";
import Events from "./events.class.js";
import UI from "./ui.class.js";

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

    win() {
        this.world.level.character.freeze = true

        this.ui.showWinContainer()
    }

    restart() {
        this.events.callbacks.base = {}
        this.world = new World()
        this.ui = new UI()
    }

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
        this.bubble = new Image()
        this.bubble.src = '../assets/sharkie/attack/bubble-tap/bubble.png';

        this.poisonBubble = new Image()
        this.poisonBubble.src = '../assets/sharkie/attack/bubble-tap/poison-bubble.png';

        /**load barriers */
        this.barrier0 = new Image()
        this.barrier1 = new Image()
        this.barrier2 = new Image()
        this.barrier3 = new Image()
        this.barrier0.src = '../assets/barriers/0.png'
        this.barrier1.src = '../assets/barriers/1.png'
        this.barrier2.src = '../assets/barriers/2.png'
        this.barrier3.src = '../assets/barriers/3.png'
    }
};