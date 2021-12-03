import Game from "../game.class.js";
import MovableObject from "../moving-Object.class.js";

export default class Pufferfish extends MovableObject {

    color = Math.floor(1 + Math.random() * 3)
    isBig = false
    radius = 1.5

    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim/' + this.color + '-'
    }

    SWIM_BIG_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim-big/' + this.color + '-'
    }

    TRANSITION_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/transition/' + this.color + '-'
    }


    /**
     * constructor
     */
    constructor(x, y, radius) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y
        this.radius = radius

        this.load()

        this.playAnimation(this.SWIM_ANIMATION)

        setTimeout(() => {
            this.getBig()
        }, this.speed)
    };

    load() {
        this.loadImage('../assets/puffer/swim/' +  this.color + '-0.png');
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
        this.x += Math.cos(this.game.time.elapsed) * this.radius
        this.y += Math.sin(this.game.time.elapsed) * this.radius
    }

    update() {
        this.moveInCircle()
    }
};