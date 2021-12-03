import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'bubble'
    height = 90
    width = 90
    speed = 2
    

    /**
     * constructor
     */
    constructor(index) {
        super();

        this.game = new Game()

        this.character = this.game.world.level.character
        this.left = this.character.drawReverse
        this.index = index

        this.setPosition()
        this.move()
        this.load()

        setTimeout(() => {
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

    load() {
        this.loadImage('../assets/sharkie/attack/bubble-tap/bubble.png');
    }

    selfDestruct() {
        this.game.world.bubbles.splice( this.game.world.bubbles.indexOf(this), 1)
    }
};