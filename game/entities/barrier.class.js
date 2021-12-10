import MovableObject from "../movable-object.class.js";
import Game from "../game.class.js";

export default class Barrier extends MovableObject {

    name = 'barrier';
    hasHitbox = true;

    /**
     * constructor
     */
    constructor(x, y, type) {
        super();

        this.game = new Game();

        this.x = x;

        /**setup barrier required */
        if (type == 0) {
            this.setupBarrier0();
        } else if (type == 1) {
            this.setupBarrier1();
        } else if (type == 2) {
            this.setupBarrier2();
        } else if (type == 3) {
            this.setupBarrier3(y);
        };
    };

    /**setup:
     * img
     * height
     * width
     * position
     * hitbox paddings
     */
    setupBarrier0() {
        this.img = this.game.barrier0;
        this.height = 302;
        this.width = 1682;

        this.y = 1080 - 302;

        this.hitboxRight = 60;
        this.hitboxLeft = 100;
        this.hitboxTop = 90;
        this.hitboxBottom = 0;
    };

    setupBarrier1() {
        this.img = this.game.barrier1;
        this.height = 321;
        this.width = 1265;

        this.y = 0;

        this.hitboxRight = 40;
        this.hitboxLeft = 50;
        this.hitboxTop = 0;
        this.hitboxBottom = 140;
    };

    setupBarrier2() {
        this.img = this.game.barrier2;
        this.height = 415;
        this.width = 906;

        this.y = 1080 - 415;

        this.hitboxRight = 70;
        this.hitboxLeft = 160;
        this.hitboxTop = 150;
        this.hitboxBottom = 0;
    };

    setupBarrier3(y) {
        this.img = this.game.barrier3;
        this.height = 781;
        this.width = 380;

        this.y = y;

        this.hitboxRight = 80;
        this.hitboxLeft = 100;
        this.hitboxTop = 50;
        this.hitboxBottom = 90;
    };
};