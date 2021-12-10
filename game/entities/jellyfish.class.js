import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'jellyfish';
    height = 260;
    width = 183;
    y = 100;
    damage = 50;

    /**shuffle color (2 color variations) */
    color = Math.floor(1 + Math.random() * 2);

    /**hitbox padding */
    hitboxRight = 0;
    hitboxLeft = 0;
    hitboxTop = 0;
    hitboxBottom = 0;
    hasHitbox = true;

    isDead = false;

    /**animations */
    SWIM_ANIMATION = {
        frames: 4,
    };

    DEATH_ANIMATION = {
        frames: 4,
    };

    /**
     * constructor
     */
    constructor(x, type) {
        super();

        this.game = new Game();

        this.x = x;
        /**set type and load type images */
        this.type = type;
        this.SWIM_ANIMATION.path = '../assets/jellyfish/' + this.type + '/' + this.color + '-';
        if (this.type == 'regular') {
            this.DEATH_ANIMATION.path = '../assets/jellyfish/' + this.type + '-dead/' + this.color + '-';
        };

        this.load();
        this.playAnimation(this.SWIM_ANIMATION);
        this.move();
    };

    /**load assets */
    load() {
        this.loadImage('../assets/jellyfish/' + this.type + '/' + this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION);

        if (this.type == 'regular') {
            this.loadAnimation(this.DEATH_ANIMATION);
        };
    };

    /**movement patters -- different depending on types  */
    move() {
        if (this.type == 'electric') {
            gsap.to(this, { duration: 3, y: 980 - this.height, ease: Power1.easeInOut, repeat: -1, yoyo: true });
            gsap.to(this, { duration: 1, x: this.x + 300, ease: Power1.easeInOut, repeat: -1, yoyo: true });
        } else {
            this.movementAnimation = gsap.to(this, { duration: 2, delay: Math.random() * 3, y: 980 - this.height, ease: Power1.easeInOut, repeat: -1, yoyo: true });
        };
    };

    /**on death */
    die() {
        this.isDead = true;

        if (this.type == 'regular') {
            this.playAnimation(this.DEATH_ANIMATION);
        };

        /**stop movement */
        if (this.movementAnimation) {
            this.movementAnimation.kill();
        };

        /**move towards top during death animation */
        gsap.to(this, { duration: 2, y: this.y - 1080, ease: Power1.easeInOut });

        setTimeout(() => {
            this.remove();
        }, 2000);
    };

    /**remove from enemies array to stop drawing this */
    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1);
    };
};