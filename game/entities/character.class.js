import Game from "../game.class.js";
import Object from "../object.class.js";


export default class Character extends Object {
    left = false
    right = false
    speed = 10
    height = 600
    y = 10
    x = 200
    speedY = 0
    acceleration = 0.5

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
        /**stop swimming on key up */
        this.game.events.on('keyup', () => {
            if(event.code == 'ArrowRight') {
                this.stopSwimming('right')
            } else if(event.code == 'ArrowLeft') {
                this.stopSwimming('left')
            }
        })

        /**start swimming and jump on key down */
        this.game.events.on('keydown', () => {
            if(event.code == 'ArrowRight' && !event.repeat) {
                this.startSwimming('right')
            } else if(event.code == 'ArrowLeft' && !event.repeat) {
                this.startSwimming('left')
            } else if(event.code == 'Space' && !event.repeat) {
                this.speedY = 15
                this.isJumping = true
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

    updateSwim() {
        /**update sharkie position and camera_x */
        if(this.right) {
            this.x += this.speed
            this.game.world.camera_x -= this.speed
        } else if(this.left && this.game.world.camera_x < 0) {
            this.x -= this.speed
            this.game.world.camera_x += this.speed
        }
    }

    applyPhysics() {
        /**maximum jump height */
        if(this.y < -250) {
            this.y = -250
        }

        /**apply physics and jump */
        if(this.y <= 500 || this.isJumping) {
            this.y -= this.speedY
            if(this.speedY > -8) {
                this.speedY -= this.acceleration
            }
        }

        if(this.speedY < 0) {
            this.isJumping = false
        }
    }

    update() {
        this.updateSwim()
        this.applyPhysics()
    }
};