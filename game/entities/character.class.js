import Game from "../game.class.js";
import Object from "../object.class.js";


export default class Character extends Object {
    left = false
    right = false

    speed = 1.5
    height = 110;
    y = 10;
    x = 100;

    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/swim/'
    }

    IDLE_ANIMATION = {
        frames: 18,
        path: '../assets/sharkie/idle/'
    }
    
    constructor() {
        super();

        /**get singleton */
        this.game = new Game()

        /**setup*/
        this.load()
        this.activateKeyboard()

        /**play idle */
        this.playAnimation(this.IDLE_ANIMATION)
    };

    activateKeyboard() {
        /**move event emitter */
        this.game.events.on('keyup', () => {
            if(event.code == 'ArrowRight') {
                this.stopSwimming('right')
            } else if(event.code == 'ArrowLeft') {
                this.stopSwimming('left')
            }
        })

        /**move event emitter */
        this.game.events.on('keydown', () => {
            if(event.code == 'ArrowRight' && !event.repeat) {
                this.startSwimming('right')
            } else if(event.code == 'ArrowLeft' && !event.repeat) {
                this.startSwimming('left')
            }
        })
    }

    /**load assets */
    load() {
        this.loadImage('../assets/sharkie/swim/1.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.IDLE_ANIMATION)
    }

    startSwimming(direction) {
        this.playAnimation(this.SWIM_ANIMATION)

        /**activate direciton boolean */
        this.left = direction == 'left'
        this.right = direction == 'right'

        /**draw reverse */
        this.drawReverse = direction == 'left'
    }

    stopSwimming(direction) {
        /**disable direction boolean */
        if(direction == 'left') {
            this.left = false
        } else if (direction == 'right') {
            this.right = false
        }

        /**disable animation */
        if(!this.left && !this.right) {
            this.playAnimation(this.IDLE_ANIMATION)
        }
    }

    update() {
        //this.y = Math.cos(this.game.time.elapsed) * 5

        /**update position */
        if(this.right) {
            this.x += this.speed
        } else if(this.left) {
            this.x -= this.speed
        }
    }
};