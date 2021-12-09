import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";
import Bubble from './bubble.class.js'


export default class Character extends MovableObject {

    name = 'character'
    speed = 12
    height = 600
    width = 489
    health = 100

    y = 10
    x = 200

    poisonBubbles = false

    left = false
    right = false

    speedY = 0
    acceleration = 0.5

    hitboxLeft = 95
    hitboxRight = 95
    hitboxTop = 290
    hitboxBottom = 130

    isSwimming = false
    isShooting = false
    isHitting = false
    isInvincible = false

    barrierRight = false
    barrierLeft = false
    barrierTop = false
    barrierBottom = false

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

    NORMAL_HURT_ANIMATION = {
        frames: 1,
        path: '../assets/sharkie/hurt/'
    }

    ELECTRIC_HURT_ANIMATION = {
        frames: 2,
        path: '../assets/sharkie/hurt/electric/'
    }

    POISON_HURT_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/hurt/poison/'
    }

    DEATH_ANIMATION = {
        frames: 8,
        path: '../assets/sharkie/dead/'
    }

    constructor() {
        super();

        /**get singleton */
        this.game = new Game()

        /**setup*/
        this.load()
        this.onKeyUp()
        this.onKeyDown()

        /**play idle */
        this.playAnimation(this.IDLE_ANIMATION)

        /**checkCollisions */
        setInterval(() => {
            this.checkAllCollisions()
        }, 50)
    };

    /**load assets */
    load() {
        this.loadImage('../assets/sharkie/swim/1.png')
        this.loadImage('')
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.IDLE_ANIMATION)
        this.loadAnimation(this.SLAP_ANIMATION)
        this.loadAnimation(this.BUBBLE_ANIMATION)
        this.loadAnimation(this.NORMAL_HURT_ANIMATION)
        this.loadAnimation(this.ELECTRIC_HURT_ANIMATION)
        this.loadAnimation(this.POISON_HURT_ANIMATION)
        this.loadAnimation(this.DEATH_ANIMATION)
    }


    onKeyUp() {
        /**stop swimming on key up */
        this.game.events.on('keyup', () => {
            if (event.code == 'ArrowRight') {
                this.stopSwimming('right')
            } else if (event.code == 'ArrowLeft') {
                this.stopSwimming('left')
            }
        })
    }

    onKeyDown() {
        /**start swimming, jump, slap and shoot on key down */
        this.game.events.on('keydown', () => {
            if (event.code == 'ArrowRight' && !event.repeat && !this.freeze) {
                this.startSwimming('right')
            } else if (event.code == 'ArrowLeft' && !event.repeat && !this.freeze) {
                this.startSwimming('left')
            } else if (event.code == 'Space' && !event.repeat && !this.freeze) {
                this.jump()
            } else if (event.key == 'y' && !event.repeat && !this.freeze) {
                this.slap()
            } else if (event.key == 'x' && !event.repeat && !this.freeze) {
                this.shootBubble()
            }
        })
    }

    takeDmg(amount, type) {
        if (this.health - amount <= 0) {
            this.die()
        } else if (!this.isInvincible) {
            this.health -= amount
            this.game.ui.updateHealthbar()
            this.becomeInvincible()
            this.jump()

            if (type == 'electric') {
                this.playAnimation(this.ELECTRIC_HURT_ANIMATION)
                this.game.sounds.playSound('../assets/sounds/electro-shock.mp3')
            } else if (type == 'poison') {
                this.playAnimation(this.POISON_HURT_ANIMATION)
                this.game.sounds.playSound('../assets/sounds/small-hit.wav')
            } else {
                this.playAnimation(this.NORMAL_HURT_ANIMATION)
                this.game.sounds.playSound('../assets/sounds/small-hit.wav')
            }
        }
    }

    becomeInvincible() {
        this.isInvincible = true
        setTimeout(() => {
            if(!this.isDead) {
                this.isInvincible = false

                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION)
                } else {
                    this.playAnimation(this.IDLE_ANIMATION)
                }
            }
        }, 1000)
    }

    checkAllCollisions() {
        this.game.world.level.enemies.forEach(enemy => {
            this.checkCollisionsWith(enemy)
        })
        this.game.world.level.coins.forEach(item => {
            this.checkCollisionsWith(item)
        })
        this.game.world.level.poison.forEach(item => {
            this.checkCollisionsWith(item)
        })
        this.game.world.level.barriers.forEach(barrier => {
            this.checkCollisionsWith(barrier)
        })
        this.checkCollisionsWith(this.game.world.level.boss)
    }

    checkCollisionsWith(object) {
        if (this.isCollidingWith(object) && !this.freeze) {
            if (object.name == 'jellyfish' && !object.isDead) {
                if (object.type == 'electric') {
                    this.takeDmg(30, 'electric')
                } else {
                    this.takeDmg(20, 'regular')
                }
            } else if (object.name == 'pufferfish') {
                this.onCollisionWithPufferfish(object)
            } else if ((object.name == 'coin' || object.name == 'poison') && !object.isCollected) {
                object.collect()
            } else if (object.name == 'boss') {
                this.takeDmg(30, 'regular')
            }
        }
    }

    onCollisionWithPufferfish(pufferfish) {
        if (pufferfish.isBig) {
            this.takeDmg(15, 'poison')
        } else if (this.isHitting) {
            pufferfish.die()
        }
    }

    jump() {
        this.game.sounds.playSound('../assets/sounds/jump.wav', false, 0.4)
        this.speedY = 15
    }

    die() {
        this.health = 0
        this.playAnimation(this.DEATH_ANIMATION)
        this.game.ui.updateHealthbar()
        this.freeze = true
        this.isDead = true
        this.jump()
        this.game.sounds.playSound('../assets/sounds/small-hit.wav')
        setTimeout(() => {
            this.loadImage('../assets/sharkie/dead/7.png')
        }, 1050)
        this.game.lose()
    }

    slap() {
        if (!this.isShooting && !this.isHitting && !this.isInvincible) {
            this.isHitting = true
            this.playAnimation(this.SLAP_ANIMATION)
            this.game.sounds.playSound('../assets/sounds/slap.mp3', false, 0.4, 200)
            setTimeout(() => {
                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION)
                } else {
                    this.playAnimation(this.IDLE_ANIMATION)
                }
                this.isHitting = false
            }, 600)
        }
    }

    shootBubble() {
        if (!this.isShooting && !this.isHitting && !this.isInvincible) {
            this.game.sounds.playSound('../assets/sounds/bubble-creation.wav', false, 0.2, 500)
            this.isShooting = true
            this.playAnimation(this.BUBBLE_ANIMATION)
            setTimeout(() => {
                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION)
                } else {
                    this.playAnimation(this.IDLE_ANIMATION)
                }
                this.isShooting = false
                this.game.world.bubbles.push(new Bubble(this.game.world.bubbles.length))
            }, 600)
        }
    }
    startSwimming(direction) {
        if (!this.isHitting && !this.isShooting && !this.isInvincible && !this.isDead) {
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
        if (direction == 'left') {
            this.left = false
        } else if (direction == 'right') {
            this.right = false
        }

        /**disable animation */
        if (!this.left && !this.right && !this.isShooting && !this.isHitting && !this.isInvincible && !this.isDead) {
            this.playAnimation(this.IDLE_ANIMATION)
        }

        this.isSwimming = false
    }

    updateSwim() {
        this.checkBarrierCollisions()

        /**update sharkie position and camera_x */
        if (this.right && !this.barrierRight && this.x < this.game.world.level.boss.introAtX) {
            this.x += this.speed
            this.game.world.camera_x -= this.speed
        } else if ((this.left && !this.barrierLeft) && this.game.world.camera_x < 0) {
            this.x -= this.speed
            this.game.world.camera_x += this.speed
        }
    }

    applyPhysics() {
        if (this.speedY <= 0) {
            /**is sinking */
            this.applySink()
        } else {
            /**is jumping */
            this.applyJump()
        }
    }

    applySink() {
        if ((this.y <= 530 && !this.barrierBottom)) {
            this.y -= this.speedY
            if (this.speedY > -8) {
                this.speedY -= this.acceleration
            }
        }

    }

    applyJump() {
        if (!this.barrierTop) {
            this.y -= this.speedY
        } else {
            this.speedY = 0
        }
        this.speedY -= this.acceleration

        /**maximum jump height */
        if (this.y < -250) {
            this.y = -250
        }
    }

    checkBarrierCollisions() {
        this.barrierRight = false
        this.barrierLeft = false
        this.barrierTop = false
        this.barrierBottom = false

        this.game.world.level.barriers.forEach((barrier) => {
            if (this.isCollidingWith(barrier)) {
                if (this.x + this.width - this.hitboxRight <= barrier.x + this.speed + barrier.hitboxLeft) {
                    this.barrierRight = true
                } else if (this.x + this.hitboxLeft >= barrier.x + barrier.width - barrier.hitboxRight - this.speed) {
                    this.barrierLeft = true
                } else if (this.y + this.height - this.hitboxBottom <= barrier.y + barrier.hitboxTop + this.speed) {
                    this.barrierBottom = true
                } else if (this.y + this.hitboxTop <= barrier.y + barrier.height - barrier.hitboxBottom) {
                    this.barrierTop = true
                }
            }
        })
    }

    update() {
        if (!this.freeze) {
            this.updateSwim()
            this.applyPhysics()
        } else if(this.isDead) {
            this.applyPhysics()
        }
    }
};