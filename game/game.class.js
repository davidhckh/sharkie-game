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
        this.loadItems()

        this.canvas = canvas;
        this.time = new Time();
        this.drawer = new Drawer();
        this.events = new Events()
        this.world = new World();

        this.coinCounter = document.getElementById('coin-amount-label')
        this.collectedCoins = 0
        this.totalCoins = this.world.level.coins.length

        this.poisonCounter = document.getElementById('poison-amount-label')
        this.collectedPoison = 0

        this.updateCoins()
        this.update();
    }

    updateCoins() {
        this.coinCounter.innerHTML = this.collectedCoins + ' / ' + this.totalCoins
    }

    addCoin() {
        this.collectedCoins += 1
        this.updateCoins()
    }

    updatePoison() {
        this.poisonCounter.innerHTML = this.collectedPoison
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

    loadItems() {
        /**load bubble */
        this.bubble = new Image()
        this.bubble.src = '../assets/sharkie/attack/bubble-tap/bubble.png';

        /**load coin */
        this.coin = new Image()
        this.coin.src = '../assets/items/coin.png'

        /**load poison */
        this.poisonLeft = new Image()
        this.poisonLeft.src = '../assets/items/poison.png'
    }
};