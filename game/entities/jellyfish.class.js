import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'jellyfish'
    color = Math.floor(1 + Math.random() * 2)
    height = 260
    y = 640 - this.height
    speed = 2
    hitboxLeft = 0
    hitboxRight = 0
    hitboxTop = 0
    hitboxBottom = 0
    
    SWIM_ANIMATION = {
        frames: 4,
        path: '../assets/jellyfish/' + this.type +'/' + this.color + '-'
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




        this.load()

        this.playAnimation(this.SWIM_ANIMATION)

        this.move()
        setInterval(() => {
            this.move()
        },this.speed * 2000)
    };

    load() {
        this.loadImage('../assets/jellyfish/' + this.type + '/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
    }
    
    move() {
        // gsap.to(this, { duration: this.speed, delay: 0, y: 980 - this.height, ease:  Power1.easeInOut })
        // gsap.to(this, { duration: this.speed, delay: this.speed, y: 100, ease: Power1.easeInOut })
    }

    update() {
        
    }
};