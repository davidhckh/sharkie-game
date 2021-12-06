import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'bubble'
    height = 90
    width = 90
    speed = 2

    hitboxRight = 20
    hitboxLeft = 20
    hitboxTop = 20
    hitboxBottom = 20    

    /**
     * constructor
     */
    constructor(index) {
        super();

        this.game = new Game()

        this.character = this.game.world.level.character
        this.img = this.game.bubble
        this.left = this.character.drawReverse
        this.index = index

        this.setPosition()
        this.move()

        this.collisionInterval = setInterval(() => {
            this.game.world.level.enemies.forEach(enemy => {
                this.checkCollisionsWith(enemy)
            })
        }, 50)

        this.selfDestructionTimeout = setTimeout(() => {
            this.selfDestruct()
        }, 4000)
    };

    setPosition() {
        if(this.character.drawReverse) {
            this.x = this.character.x  + 50
            this.y = this.character.y  + this.character.height / 2 + 20
        } else {
            this.x = this.character.x + this.character.width - 130
            this.y = this.character.y  + this.character.height / 2 + 20
        }
    }

    move() {
        if(this.left) {
            gsap.to(this, { duration: 4, x: this.x - 2100})
        } else {
            gsap.to(this, { duration: 4, x: this.x + 2100})
        }
    }

    checkCollisionsWith(object) {
        if(this.isCollidingWith(object)) {
            if(object.name == 'jellyfish' || object.name == 'pufferfish') {
                this.selfDestruct()
            }
            if(object.name == 'jellyfish' && object.type == 'regular' && !object.isDead) {
                object.die()
            } 
        }
    }

    selfDestruct() {
        this.game.world.bubbles.splice( this.game.world.bubbles.indexOf(this), 1)
        clearInterval(this.collisionInterval)
        clearTimeout(this.selfDestructionTimeout)
    }
};