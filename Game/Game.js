import World from "./World.js";
import Drawer from "./Drawer.js";
import Time from './Utils/Time.js'

export default class Game {

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
        this.world = new World();

        this.update();
    }

    update() {
        if (this.world) {
            this.world.update();

            /**just for testing */
            this.world.character.y = Math.cos(this.time.elapsed / 1000) * 5;
        };

        window.requestAnimationFrame(() => {
            this.update();
        });
    };
};