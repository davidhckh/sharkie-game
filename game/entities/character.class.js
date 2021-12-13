import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";
import Bubble from './bubble.class.js'


export default class Character extends MovableObject {
    /**details */
    name = 'character';
    speed = 12;
    height = 600;
    width = 489;
    health = 100;

    y = 10;
    x = 200;

    poisonBubbles = false;

    left = false;
    right = false;

    freeze = true;

    /**for physics */
    speedY = 0;
    acceleration = 0.5;

    /**hitbox padding */
    hitboxLeft = 95;
    hitboxRight = 95;
    hitboxTop = 290;
    hitboxBottom = 130;

    /**states */
    isSwimming = false;
    isShooting = false;
    isHitting = false;
    isInvincible = false;

    /**collision with barrier */
    barrierRight = false;
    barrierLeft = false;
    barrierTop = false;
    barrierBottom = false;

    /**animations */
    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/swim/'
    };

    IDLE_ANIMATION = {
        frames: 18,
        path: '../assets/sharkie/idle/'
    };

    SLAP_ANIMATION = {
        frames: 3,
        path: '../assets/sharkie/attack/fin-slap/'
    };

    BUBBLE_ANIMATION = {
        frames: 4,
        path: '../assets/sharkie/attack/bubble-tap/'
    };

    NORMAL_HURT_ANIMATION = {
        frames: 1,
        path: '../assets/sharkie/hurt/'
    };

    ELECTRIC_HURT_ANIMATION = {
        frames: 2,
        path: '../assets/sharkie/hurt/electric/'
    };

    POISON_HURT_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/hurt/poison/'
    };

    DEATH_ANIMATION = {
        frames: 8,
        path: '../assets/sharkie/dead/'
    };

    constructor() {
        super();

        /**get singleton */
        this.game = new Game();

        /**setup*/
        this.load();
        this.onKeyUp();
        this.onKeyDown();

        /**play idle */
        this.playAnimation(this.IDLE_ANIMATION);

        /**checkCollisions */
        setInterval(() => {
            this.checkAllCollisions();
        }, 50);
    };

    /**load assets */
    load() {
        this.loadImage('../assets/sharkie/swim/1.png');
        this.loadAnimation(this.SWIM_ANIMATION);
        this.loadAnimation(this.IDLE_ANIMATION);
        this.loadAnimation(this.SLAP_ANIMATION);
        this.loadAnimation(this.BUBBLE_ANIMATION);
        this.loadAnimation(this.NORMAL_HURT_ANIMATION);
        this.loadAnimation(this.ELECTRIC_HURT_ANIMATION);
        this.loadAnimation(this.POISON_HURT_ANIMATION);
        this.loadAnimation(this.DEATH_ANIMATION);
    };


    onKeyUp() {
        /**stop swimming on key up (arrow right or left)*/
        this.game.events.on('keyup', () => {
            if (event.code == 'ArrowRight') {
                this.stopSwimming('right');
            } else if (event.code == 'ArrowLeft') {
                this.stopSwimming('left');
            };
        });
    };

    onKeyDown() {
        /**start swimming, jump, slap and shoot on key down */
        this.game.events.on('keydown', () => {
            if (event.code == 'ArrowRight' && !event.repeat && !this.freeze) {
                this.startSwimming('right');
            } else if (event.code == 'ArrowLeft' && !event.repeat && !this.freeze) {
                this.startSwimming('left');
            } else if ((event.code == 'Space' || event.code == 'ArrowUp') && !event.repeat && !this.freeze) {
                this.jump();
            } else if (event.key == 'y' && !event.repeat && !this.freeze) {
                this.slap();
            } else if (event.key == 'x' && !event.repeat && !this.freeze) {
                this.shootBubble();
            };
        });
    };

    /**take dmg */
    takeDmg(amount, type) {
        /**die if health <= 0 */
        if (this.health - amount <= 0) {
            this.die();
        } else if (!this.isInvincible) {
            /**update health */
            this.health -= amount;
            this.game.ui.updateHealthbar();

            /**become invincible and jump */
            this.becomeInvincible();
            this.jump();
            
            this.playDmgAnimation(type);
        };
    };

    /**play dmg animation and play sound
     * - electric
     * - poison
     * - normal hit
     */
    playDmgAnimation(type) {
        if (type == 'electric') {
            this.playAnimation(this.ELECTRIC_HURT_ANIMATION);
            this.game.sounds.playSound('../assets/sounds/electro-shock.mp3');
        } else if (type == 'poison') {
            this.playAnimation(this.POISON_HURT_ANIMATION);
            this.game.sounds.playSound('../assets/sounds/small-hit.wav');
        } else {
            this.playAnimation(this.NORMAL_HURT_ANIMATION);
            this.game.sounds.playSound('../assets/sounds/small-hit.wav');
        };
    };

    /** become invincible, unset after 1 sec and continue swim or idle animation*/
    becomeInvincible() {
        this.isInvincible = true;

        setTimeout(() => {
            if (!this.isDead) {
                this.isInvincible = false;

                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION);
                } else {
                    this.playAnimation(this.IDLE_ANIMATION);
                };
            };
        }, 1000);
    };

    /**check all collision with entities */
    checkAllCollisions() {
        /**enemies */
        this.game.world.level.enemies.forEach(enemy => {
            this.checkCollisionsWith(enemy);
        });
        /**coins */
        this.game.world.level.coins.forEach(item => {
            this.checkCollisionsWith(item);
        });
        /**poison */
        this.game.world.level.poison.forEach(item => {
            this.checkCollisionsWith(item);
        });
        /**barriers */
        this.game.world.level.barriers.forEach(barrier => {
            this.checkCollisionsWith(barrier);
        });
        /**boss */
        this.checkCollisionsWith(this.game.world.level.boss);
    };

    /**events happening on collision */
    checkCollisionsWith(object) {
        if (this.isCollidingWith(object) && !this.freeze) {
            /**jellyfishes */
            if (object.name == 'jellyfish' && !object.isDead) {
                if (object.type == 'electric') {
                    this.takeDmg(30, 'electric');
                } else {
                    this.takeDmg(20, 'regular');
                };
                /**pufferfishes */
            } else if (object.name == 'pufferfish') {
                this.onCollisionWithPufferfish(object);
                /**coin and poison */
            } else if ((object.name == 'coin' || object.name == 'poison') && !object.isCollected) {
                object.collect();
                /**boss */
            } else if (object.name == 'boss') {
                this.takeDmg(30, 'regular');
            };
        };
    };

    /**either take dmg or kill pufferfish on collision */
    onCollisionWithPufferfish(pufferfish) {
        if (pufferfish.isBig) {
            this.takeDmg(15, 'poison');
        } else if (this.isHitting) {
            pufferfish.die();
        };
    };

    /**jump character and play sound */
    jump() {
        this.game.sounds.playSound('../assets/sounds/jump.wav', false, 0.4);
        this.speedY = 15;
    };

    /**die */
    die() {
        /**animation */
        this.playAnimation(this.DEATH_ANIMATION);

        /**update health */
        this.health = 0;
        this.game.ui.updateHealthbar();

        /**update variables */
        this.freeze = true;
        this.isDead = true;

        this.jump();

        /**play sound and stick to last image of death animation */
        this.game.sounds.playSound('../assets/sounds/small-hit.wav');
        setTimeout(() => {
            this.loadImage('../assets/sharkie/dead/7.png');
        }, 1050);

        /**lose game */
        this.game.lose();
    };

    /**slap if possible */
    slap() {
        if (!this.isShooting && !this.isHitting && !this.isInvincible) {
            /**animation */
            this.playAnimation(this.SLAP_ANIMATION);

            this.isHitting = true;

            this.game.sounds.playSound('../assets/sounds/slap.mp3', false, 0.4, 200);

            /**continue swim or idle animation after */
            setTimeout(() => {
                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION);
                } else {
                    this.playAnimation(this.IDLE_ANIMATION);
                };
                this.isHitting = false;
            }, 600);
        };
    };

    shootBubble() {
        if (!this.isShooting && !this.isHitting && !this.isInvincible) {
            /**animation and sound */
            this.playAnimation(this.BUBBLE_ANIMATION);
            this.game.sounds.playSound('../assets/sounds/bubble-creation.wav', false, 0.2, 500);

            this.isShooting = true;

            /**continue swim or idle animation after and create bubble based on view direction*/
            setTimeout(() => {
                if (this.isSwimming) {
                    this.playAnimation(this.SWIM_ANIMATION);
                } else {
                    this.playAnimation(this.IDLE_ANIMATION);
                };
                this.isShooting = false;
                this.game.world.bubbles.push(new Bubble(this.game.world.bubbles.length));
            }, 600);
        };
    };

    /**start swimming in direction */
    startSwimming(direction) {
        /**animation */
        if (!this.isHitting && !this.isShooting && !this.isInvincible && !this.isDead) {
            this.playAnimation(this.SWIM_ANIMATION);
        };

        /**activate direciton boolean */
        this.left = direction == 'left';
        this.right = direction == 'right';

        /**draw reverse */
        this.drawReverse = direction == 'left';

        this.isSwimming = true;
    };

    /**stop swimming */
    stopSwimming(direction) {
        /**disable direction boolean */
        if (direction == 'left') {
            this.left = false;
        } else if (direction == 'right') {
            this.right = false;
        };

        /**disable animation */
        if (!this.left && !this.right && !this.isShooting && !this.isHitting && !this.isInvincible && !this.isDead) {
            this.playAnimation(this.IDLE_ANIMATION);
        };

        this.isSwimming = false;
    };

    /**update swim every frame */
    updateSwim() {
        /**check barrier collisions first */
        this.checkBarrierCollisions();

        /**update sharkie position and camera_x  if possible*/
        if (this.right && !this.barrierRight && this.x < this.game.world.level.boss.introAtX) {
            this.x += this.speed;
            this.game.world.camera_x -= this.speed;
        } else if ((this.left && !this.barrierLeft) && this.game.world.camera_x < 0) {
            this.x -= this.speed;
            this.game.world.camera_x += this.speed;
        };
    };

    /*apply physics */
    applyPhysics() {
        if (this.speedY <= 0) {
            /**is sinking */
            this.applySink();
        } else {
            /**is jumping */
            this.applyJump();
        };
    };

    /**apply sink */
    applySink() {
        if ((this.y <= 530 && !this.barrierBottom)) {
            this.y -= this.speedY;
            if (this.speedY > -8) {
                this.speedY -= this.acceleration;
            };
        };
    };

    /** apply jump if possible*/
    applyJump() {
        if (!this.barrierTop) {
            this.y -= this.speedY;
        } else {
            this.speedY = 0;
        };
        this.speedY -= this.acceleration;

        /**maximum jump height */
        if (this.y < -250) {
            this.y = -250;
        };
    };

    /**check barrier collisions and updat booleans */
    checkBarrierCollisions() {
        this.barrierRight = false;
        this.barrierLeft = false;
        this.barrierTop = false;
        this.barrierBottom = false;

        this.game.world.level.barriers.forEach((barrier) => {
            if (this.isCollidingWith(barrier)) {
                if (this.x + this.width - this.hitboxRight <= barrier.x + this.speed + barrier.hitboxLeft) {
                    this.barrierRight = true;
                } else if (this.x + this.hitboxLeft >= barrier.x + barrier.width - barrier.hitboxRight - this.speed) {
                    this.barrierLeft = true;
                } else if (this.y + this.height - this.hitboxBottom <= barrier.y + barrier.hitboxTop + this.speed) {
                    this.barrierBottom = true;
                } else if (this.y + this.hitboxTop <= barrier.y + barrier.height - barrier.hitboxBottom) {
                    this.barrierTop = true;
                };
            };
        });
    };

    /**updatge on every frame */
    update() {
        if (!this.freeze) {
            this.updateSwim();
            this.applyPhysics();
        } else if (this.isDead) {
            this.applyPhysics();
        };
    };
};