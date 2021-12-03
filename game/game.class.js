import World from "./world.class.js";
import Drawer from "./drawer.class.js";
import Time from './utils/time.class.js'
import Events from "./events.class.js";

export default class Game {

    static instance;

    constructor(canvas) {
        /**Singleton */
        if (Game.instance) {
            return Game.instance;
        };
        Game.instance = this;

        /**Setup everything */
        this.canvas = canvas;
        this.time = new Time();
        this.drawer = new Drawer();
        this.events = new Events()
        this.world = new World();

        this.update();
    }

    update() {
        if (this.world) {
            this.world.update();
        };

        window.requestAnimationFrame(() => {
            this.update();
        });

        //console.log(this.world)
    };
};