import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'jellyfish'
    color = Math.floor(1 + Math.random() * 2)
    height = 260
    width = 183
    y = 100
    damage = 50
    hasHitbox = true

    hitboxRight = 0
    hitboxLeft = 0
    hitboxTop = 0
    hitboxBottom = 0    

    isDead = false
    
    SWIM_ANIMATION = {
        frames: 4,
    }

    DEATH_ANIMATION = {
        frames: 4,
    }

    /**
     * constructor
     */
    constructor(x, type) {
        super();

        this.game = new Game()

        this.x = x
        this.type = type
        this.SWIM_ANIMATION.path = '../assets/jellyfish/' + this.type +'/' + this.color + '-'
        this.DEATH_ANIMATION.path = '../assets/jellyfish/' + this.type +'-dead/' + this.color + '-'

        this.load()

        this.playAnimation(this.SWIM_ANIMATION)

        this.move()
    };

    load() {
        this.loadImage('../assets/jellyfish/' + this.type + '/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.DEATH_ANIMATION)
    }
    
    move() {
        if(this.type == 'electric') {
            gsap.to(this, { duration: 3, y: 980 - this.height, ease:  Power1.easeInOut, repeat: -1, yoyo: true })
            gsap.to(this, { duration: 1, x: this.x + 300, ease:  Power1.easeInOut, repeat: -1, yoyo: true })
        } else {
            this.movementAnimation = gsap.to(this, { duration: 2, y: 980 - this.height, ease:  Power1.easeInOut, repeat: -1, yoyo: true })
        }
    }

    die() {
        this.isDead = true
        this.playAnimation(this.DEATH_ANIMATION)
        this.movementAnimation.kill()
        gsap.to(this, {duration: 2, y: this.y - 1080, ease: Power1.easeInOut})

        setTimeout(() => {
            this.remove()
        }, 2000)
    }

    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1)
    }
};