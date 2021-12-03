import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";
import Bubble from './bubble.class.js'


export default class Character extends MovableObject {

    name = 'character'
    speed = 10
    height = 600
    width = 489

    y = 10
    x = 200

    left = false
    right = false

    speedY = 0
    acceleration = 0.5

    hitboxLeft = 95
    hitboxRight = 95
    hitboxTop = 290
    hitboxBottom = 130

    isSwimming = false
    isAttacking = false

    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/swim/'
    }

    IDLE_ANIMATION = {
        frames: 18,
        path: '../assets/sharkie/idle/'
    }

    SLAP_ANIMATION = {
        frames: 3,
        path: '../assets/sharkie/attack/fin-slap/'
    }

    BUBBLE_ANIMATION = {
        frames: 4,
        path: '../assets/sharkie/attack/bubble-tap/'
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

        /**checkCollisions */
        setInterval(() => {
            this.game.world.level.enemies.forEach(enemy => {
                this.checkCollisionsWith(enemy)
            })
        }, 50)
    };

    checkCollisionsWith(object) {
        if(this.isCollidingWith(object)) {
            console.log('Character is colliding with ' + object.name)
        }
    }

    activateKeyboard() {
        /**stop swimming on key up */
        this.game.events.on('keyup', () => {
            if(event.code == 'ArrowRight') {
                this.stopSwimming('right')
            } else if(event.code == 'ArrowLeft') {
                this.stopSwimming('left')
            }
        })

        /**start swimming, jump, slap and shoot on key down */
        this.game.events.on('keydown', () => {
            if(event.code == 'ArrowRight' && !event.repeat) {
                this.startSwimming('right')
            } else if(event.code == 'ArrowLeft' && !event.repeat) {
                this.startSwimming('left')
            } else if(event.code == 'Space' && !event.repeat) {
                this.speedY = 15
                this.isJumping = true
            } else if(event.key == 'y' && !event.repeat) {
                if(!this.isAttacking) {
                    this.slap()
                }
            } else if(event.key == 'x' && !event.repeat) {
                this.shootBubble()
            }
        })
    }

    slap() {
        if(!this.isAttacking) {
            this.isAttacking = true
            this.playAnimation(this.SLAP_ANIMATION)
            setTimeout(() => { 
                if(this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION)
                } else {
                    this.playAnimation(this.IDLE_ANIMATION)
                }
                this.isAttacking = false
            }, 600)
        }
    }

    shootBubble() {
        if(!this.isAttacking) {
            this.isAttacking = true
            this.playAnimation(this.BUBBLE_ANIMATION)
            setTimeout(() => { 
                if(this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION)
                } else {
                    this.playAnimation(this.IDLE_ANIMATION)
                }
                this.isAttacking = false
                this.game.world.bubbles.push(new Bubble(this.game.world.bubbles.length))
            }, 600)
        }
    }

    /**load assets */
    load() {
        this.loadImage('../assets/sharkie/swim/1.png');
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.IDLE_ANIMATION)
        this.loadAnimation(this.SLAP_ANIMATION)
        this.loadAnimation(this.BUBBLE_ANIMATION)
    }

    startSwimming(direction) {
        if(!this.isAttacking) {
            this.playAnimation(this.SWIM_ANIMATION)
        }

        /**activate direciton boolean */
        this.left = direction == 'left'
        this.right = direction == 'right'

        /**draw reverse */
        this.drawReverse = direction == 'left'

        this.isSwimming = true
    }

    stopSwimming(direction) {
        /**disable direction boolean */
        if(direction == 'left') {
            this.left = false
        } else if (direction == 'right') {
            this.right = false
        }

        /**disable animation */
        if(!this.left && !this.right && !this.isAttacking) {
            this.playAnimation(this.IDLE_ANIMATION)
        }

        this.isSwimming = false
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