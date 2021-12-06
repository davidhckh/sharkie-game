import Object from "../object.class.js";
import Game from "../game.class.js";

export default class Coin extends Object {

    name = 'coin'
    height = 90
    width = 90

    isCollected = false

    hasHitbox = true

    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y

        this.img = this.game.coin
    };

    collect() {
        this.isCollected = true
        this.game.addCoin()
        this.remove()
    }

    remove() {
        this.game.world.level.coins.splice(this.game.world.level.coins.indexOf(this), 1)
    }
}