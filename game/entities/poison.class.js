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

    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y

        this.setImage()
    };

    setImage() {
        this.img = this.game.poisonLeft

        if(Math.floor(Math.random() * 2) == 0) {
            this.drawReverse = true
        }
    }

    collect() {
        this.isCollected = true
        this.game.addPoison()
        this.remove()
    }

    remove() {
        this.game.world.level.poison.splice(this.game.world.level.poison.indexOf(this), 1)
    }
}