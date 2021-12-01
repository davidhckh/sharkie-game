import World from "./World.js";
import Drawer from "./Drawer.js";
import Time from './Utils/Time.js'
import Events from "./Events.js";

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
    };
};