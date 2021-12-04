import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name='pufferfish'
    height = 160
    width = 195
    color = Math.floor(1 + Math.random() * 3)
    isBig = false
    damage = 20

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

    DEATH_ANIMATION = {
        frames: 3,
        path: '../assets/puffer/die/' + this.color + '-'
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
        this.setBigInterval()

        this.playAnimation(this.SWIM_ANIMATION)
    };

    /**load assets */
    load() {
        this.loadImage('../assets/puffer/swim/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.TRANSITION_ANIMATION)
        this.loadAnimation(this.SWIM_BIG_ANIMATION)
        this.loadAnimation(this.DEATH_ANIMATION)
    }

    die() {
        if(!this.isDeath) {
            clearInterval(this.interval)

            this.playAnimation(this.DEATH_ANIMATION)
    
            let interval = setInterval(() => {
                this.y -= 50
                this.x += 50
            },1000 / 25)
    
            setTimeout(() => {
                clearInterval(interval)
                this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1)
            },300)
        }

        this.isDeath = true
    }

    setBigInterval() {
        this.interval = setInterval(() => {
            if(this.isBig) {
                this.getSmall()
            } else {
                this.getBig()
            }
        },3000)
    }

    getBig() {
        this.playAnimation(this.TRANSITION_ANIMATION)

        setTimeout(() => {
            this.playAnimation(this.SWIM_BIG_ANIMATION)
            this.isBig = true
        },750)
    }

    getSmall() {
        this.isBig = false
        this.playReverseAnimation(this.TRANSITION_ANIMATION, true)

        setTimeout(() => {
            this.playAnimation(this.SWIM_ANIMATION)
        },750)
    }

    update() {

    }
};