import Object from "../object.class.js";
import Game from "../game.class.js";

export default class Poison extends Object {

    name = 'poison'
    height = 164
    width = 120

    isCollected = false

    hasHitbox = true
    hitboxRight = 0
    hitboxLeft = 0
    hitboxTop = 0
    hitboxBottom = 0

    POISON_ANIMATION = {
        frames: 8,
        path: '../assets/items/poison-animated/'
    }

    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y

        this.loadImage('../assets/items/poison-animated/0.png')
        this.loadAnimation(this.POISON_ANIMATION)
        this.playAnimation(this.POISON_ANIMATION)
    };


    collect() {
        this.isCollected = true
        this.game.addPoison()
        this.remove()
    }

    remove() {
        this.game.world.level.poison.splice(this.game.world.level.poison.indexOf(this), 1)
    }
}