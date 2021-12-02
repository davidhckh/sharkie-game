import Game from "../game.class.js";
import MovableObject from "../moving-Object.class.js";

export default class Pufferfish extends MovableObject {

    type = Math.floor(1 + Math.random() * 3)
    isBig = false

    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim/' + this.type + '-'
    }

    SWIM_BIG_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim-big/' + this.type + '-'
    }

    TRANSITION_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/transition/' + this.type + '-'
    }


    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y

        this.load()

        this.playAnimation(this.SWIM_ANIMATION)

        setTimeout(() => {
            this.getBig()
        }, this.speed)
    };

    load() {
        this.loadImage('../assets/puffer/swim/' +  this.type + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.TRANSITION_ANIMATION)
        this.loadAnimation(this.SWIM_BIG_ANIMATION)
    }

    getBig() {
        this.isBig = true
        this.playAnimation(this.TRANSITION_ANIMATION)

        setTimeout(() => {
            this.playAnimation(this.SWIM_BIG_ANIMATION)
        },750)

        setTimeout(() => {
            this.getSmall()
        },3000)
    }

    getSmall() {
        this.big = false
        this.playReverseAnimation(this.TRANSITION_ANIMATION, true)

        setTimeout(() => {
            this.playAnimation(this.SWIM_ANIMATION)
        },750)

        setTimeout(() => {
            this.getBig()
        },3000)
    }

    moveInCircle() {
        let angle = (this.game.time.elapsed) * (1 + (this.speed / 10000))
        let radius = 1.5

        this.x += Math.cos(angle) * radius
        this.y += Math.sin(angle) * radius
    }

    update() {
        this.moveInCircle()
    }
};