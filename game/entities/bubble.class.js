import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Pufferfish extends MovableObject {

    name = 'bubble';
    height = 90;
    width = 90;
    speed = 2;

    hitboxRight = 20;
    hitboxLeft = 20;
    hitboxTop = 20;
    hitboxBottom = 20;

    poisonBubble = false;

    /**
     * constructor
     */
    constructor(index) {
        super();

        this.game = new Game();

        this.character = this.game.world.level.character;
        /**get flight direction */
        this.left = this.character.drawReverse;
        /**get index in bubble array */
        this.index = index;

        this.loadBubble();
        this.setPosition();
        this.move();
        this.collisionCheck();

        /**self destruct after 4 seconds */
        this.selfDestructionTimeout = setTimeout(() => {
            this.selfDestruct();
        }, 4000);
    };

    /**load texture (normal or poison) */
    loadBubble() {
        if (this.character.poisonBubbles) {
            this.img = this.game.poisonBubble;
            this.poisonBubble = true;
        } else {
            this.img = this.game.bubble;
        };
    };

    /**set starting direction based on character draw direction*/
    setPosition() {
        if (this.character.drawReverse) {
            this.x = this.character.x + 50;
            this.y = this.character.y + this.character.height / 2 + 20;
        } else {
            this.x = this.character.x + this.character.width - 130;
            this.y = this.character.y + this.character.height / 2 + 20;
        };
    };

    /**start movement from sharkie's facing direction*/
    move() {
        if (this.left) {
            gsap.to(this, { duration: 4, x: this.x - 2100 });
        } else {
            gsap.to(this, { duration: 4, x: this.x + 2100 });
        };
    };

    /**check collision with other entities every 50ms*/
    collisionCheck() {
        this.collisionInterval = setInterval(() => {
            /**enemies */
            this.game.world.level.enemies.forEach(enemy => {
                this.checkCollisionsWith(enemy);
            });
            /**barriers */
            this.game.world.level.barriers.forEach(barrier => {
                this.checkCollisionsWith(barrier);
            });
            /**boss */
            this.checkCollisionsWith(this.game.world.level.boss);
        }, 50);
    };

    /**when bubble is colliding with other entity */
    checkCollisionsWith(object) {
        if (this.isCollidingWith(object)) {
            /**self destruct */
            if (object.name == 'jellyfish' || object.name == 'pufferfish' || object.name == 'barrier' || object.name == 'boss') {
                this.selfDestruct();
            };
            /**kill jellyfish */
            if (object.name == 'jellyfish' && object.type == 'regular' && !object.isDead) {
                object.die();
            };
            /**hurt boss */
            if (object.name == 'boss' && this.poisonBubble) {
                object.takeDmg();
            };
            /**electric jellyfish pop sound */
            if(object.name == 'jellyfish' && object.type == 'electric') {
                this.game.sounds.playSound('../assets/sounds/short-electric-shock.mp3');
            };
        };
    };

    /**self desturct after 4 seconds */
    selfDestruct() {
        this.game.world.bubbles.splice(this.game.world.bubbles.indexOf(this), 1);
        clearInterval(this.collisionInterval);
        clearTimeout(this.selfDestructionTimeout);
        this.game.sounds.playSound('../assets/sounds/bubble-pop.wav');
    };
};