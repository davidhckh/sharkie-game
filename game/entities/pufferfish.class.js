import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name='pufferfish';
    height = 160;
    width = 195;
    
    /**get one of 3 color types */
    color = Math.floor(1 + Math.random() * 3);
    isBig = false;
    damage = 20;
    drawReverse = true;

    /**hitbox padding */
    hitboxRight = 0;
    hitboxLeft = 0;
    hitboxTop = 0;
    hitboxBottom = 0 ;   

    /**animations */
    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim/' + this.color + '-'
    };

    SWIM_BIG_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/swim-big/' + this.color + '-'
    };

    TRANSITION_ANIMATION = {
        frames: 5,
        path: '../assets/puffer/transition/' + this.color + '-'
    };


    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game();

        this.x = x;
        this.y = y;

        this.setBigInterval();
        this.load();
        this.movement();

        this.playAnimation(this.SWIM_ANIMATION);
    };

    /**load assets */
    load() {
        this.loadImage('../assets/puffer/swim/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION);
        this.loadAnimation(this.TRANSITION_ANIMATION);
        this.loadAnimation(this.SWIM_BIG_ANIMATION);
    };

    /**starts movement interval  every 3 seconds and change draw direction*/
    movement() {
        let movement = () => {
            this.changeDrawDirection();

            if(this.drawReverse) {
                this.movementAnimation = gsap.to(this, { duration: 3, x: this.x + 800, ease: Power1.easeInOut});
            } else {
                this.movementAnimation = gsap.to(this, { duration: 3, x: this.x - 800, ease: Power1.easeInOut});
            };
        };
        gsap.set(movement, {delay: Math.random() * 3, onRepeat: movement, repeat: -1, repeatDelay: 3});
    };

    /**change draw direction every 3 seconds */
    changeDrawDirection() {
        if(this.drawReverse) {
            this.drawReverse = false;
        } else {
            this.drawReverse = true;
        };
    };

    /**die */
    die() {
        if(!this.isDeath) {
            /**clear intervals */
            this.clearIntervals();

            /**remove movement from gsap */
            if(this.movementAnimation) {
                this.movementAnimation.kill();
            };

            this.flyOutOfScene();

            /**remove from scene after 3 seconds */
            setTimeout(() => {
                clearInterval(this.flyOutInterval);
                this.remove();
            },300);
        };

        this.isDeath = true;
    };

    clearIntervals() {
        clearInterval(this.interval);
        clearInterval(this.movementInterval);
    };

    /**fly out of scene animation */
    flyOutOfScene() {
        this.flyOutInterval = setInterval(() => {
            this.y -= 100;
            this.x += 100;
        }, 1000 / 25);
    };

    /**remove from scene */
    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1);
    };

    /**set big or small interval every 2.5 seconds */
    setBigInterval() {
        let getBigOrSmall = () => {
            if(this.isBig) {
                this.getSmall();
            } else {
                this.getBig();
            };
        };
        gsap.set(getBigOrSmall, {delay: Math.random() * 2.5, onRepeat: getBigOrSmall,repeat: -1, repeatDelay: 2.5});
    };

    /**get big with transition */
    getBig() {
        this.isBig = true;

        this.playAnimation(this.TRANSITION_ANIMATION);
        this.playAnimation(this.SWIM_BIG_ANIMATION, 750);
    };

    /**get small with reverse transition */
    getSmall() {
        this.isBig = false;

        this.playReverseAnimation(this.TRANSITION_ANIMATION, true);
        this.playAnimation(this.SWIM_ANIMATION, 750);
    };
};