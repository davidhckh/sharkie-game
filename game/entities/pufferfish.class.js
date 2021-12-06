import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name='pufferfish'
    height = 160
    width = 195
    color = Math.floor(1 + Math.random() * 3)
    isBig = false
    damage = 20
    hasHitbox = true

    hitboxRight = 0
    hitboxLeft = 0
    hitboxTop = 0
    hitboxBottom = 0    

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
    constructor(x, y) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y

        this.load()
        this.setBigInterval()
        this.movement()

        this.playAnimation(this.SWIM_ANIMATION)
    };

    /**load assets */
    load() {
        this.loadImage('../assets/puffer/swim/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.TRANSITION_ANIMATION)
        this.loadAnimation(this.SWIM_BIG_ANIMATION)
    }

    movement() {
        this.movementAnimation = gsap.to(this, { duration: 3, delay: Math.random(), x: this.x  - 800, ease:  Power1.easeInOut, repeat: -1, yoyo: true })

        this.movementInterval = setInterval(() => {
            this.changeDrawDirection()
        }, 3000) 
    }

    changeDrawDirection() {
        if(this.drawReverse) {
            this.drawReverse = false
        } else {
            this.drawReverse = true
        }
    }

    die() {
        if(!this.isDeath) {
            clearInterval(this.interval)
            clearInterval(this.movementInterval)

            this.movementAnimation.kill()
            this.flyOutOfScene()

            setTimeout(() => {
                clearInterval(this.flyOutInterval)
                this.remove()
            },300)
        }

        this.isDeath = true
    }

    flyOutOfScene() {
        this.flyOutInterval = setInterval(() => {
            this.y -= 100
            this.x += 100
        }, 1000 / 25)
    }

    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1)
    }

    setBigInterval() {
        this.interval = setInterval(() => {
            if(this.isBig) {
                this.getSmall()
            } else {
                this.getBig()
            }
        },2500)
    }

    getBig() {
        this.isBig = true

        this.playAnimation(this.TRANSITION_ANIMATION)
        this.playAnimation(this.SWIM_BIG_ANIMATION, 750)
    }

    getSmall() {
        this.isBig = false

        this.playReverseAnimation(this.TRANSITION_ANIMATION, true)
        this.playAnimation(this.SWIM_ANIMATION, 750)
    }
};