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
        this.loadAssets()

        this.canvas = canvas;
        this.time = new Time();
        this.drawer = new Drawer();
        this.events = new Events()
        this.world = new World();

        this.setupCoins()
        this.setupPoison()
        this.update();
    }

    setupCoins() {
        this.coinCounter = document.getElementById('coin-amount-label')
        this.collectedCoins = 0
        this.totalCoins = this.world.level.coins.length

        this.updateCoins()
    }

    updateCoins() {
        this.coinCounter.innerHTML = this.collectedCoins + ' / ' + this.totalCoins
    }

    addCoin() {
        this.collectedCoins += 1
        this.updateCoins()
    }

    setupPoison() {
        this.poisonCounter = document.getElementById('poison-amount-label')
        this.collectedPoison = 0
        this.totalPoison = this.world.level.poison.length

        this.updatePoison()
    }

    updatePoison() {
        this.poisonCounter.innerHTML = this.collectedPoison + ' / ' + this.totalPoison
    }

    addPoison() {
        this.collectedPoison += 1
        this.updatePoison()
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
        /**load bubble */
        this.bubble = new Image()
        this.bubble.src = '../assets/sharkie/attack/bubble-tap/bubble.png';

        /**load coin */
        this.coin = new Image()
        this.coin.src = '../assets/items/coin.png'

        /**load poison */
        this.poisonLeft = new Image({ src: '../assets/items/poison.png' })
        this.poisonLeft.src = '../assets/items/poison.png'

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