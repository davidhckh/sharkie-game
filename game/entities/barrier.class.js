import MovableObject from "../movable-object.class.js";
import Game from "../game.class.js";

export default class Barrier extends MovableObject {

    name = 'barrier'
    hasHitbox = true

    /**
     * constructor
     */
    constructor(x, y, type) {
        super();

        this.game = new Game()

        this.x = x

        if (type == 0) {
            this.setupBarrier0()
        } else if (type == 1) {
            this.setupBarrier1()
        } else if (type == 2) {
            this.setupBarrier2()
        } else if (type == 3) {
            this.setupBarrier3(y)
        }
    };

    setupBarrier0() {
        this.img = this.game.barrier0
        this.height = 302
        this.width = 1682

        this.y = 1080 - 302

        this.hitboxRight = 60
        this.hitboxLeft = 100
        this.hitboxTop = 90
        this.hitboxBottom = 0

    }

    setupBarrier1() {
        this.img = this.game.barrier1
        this.height = 426
        this.width = 1682

        this.y = 0

        this.hitboxRight = 60
        this.hitboxLeft = 50
        this.hitboxTop = 0
        this.hitboxBottom = 180
    }

    setupBarrier2() {
        this.img = this.game.barrier2
        this.height = 649
        this.width = 1415

        this.y = 1080 - 649

        this.hitboxRight = 100
        this.hitboxLeft = 230
        this.hitboxTop = 200
        this.hitboxBottom = 0
    }

    setupBarrier3(y) {
        this.img = this.game.barrier3
        this.height = 906
        this.width = 441

        this.y = y

        this.hitboxRight = 80
        this.hitboxLeft = 100
        this.hitboxTop = 30
        this.hitboxBottom = 90
    }
}