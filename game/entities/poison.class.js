import Object from "../object.class.js";
import Game from "../game.class.js";

export default class Poison extends Object {

    name = 'poison';
    height = 164;
    width = 120;

    isCollected = false;

    hasHitbox = true;
    hitboxRight = 0;
    hitboxLeft = 0;
    hitboxTop = 0;
    hitboxBottom = 0;

    POISON_ANIMATION = {
        frames: 8,
        path: '../assets/items/poison-animated/'
    };

    /**
     * constructor
     */
    constructor(x, y) {
        super();

        this.game = new Game();

        this.x = x;
        this.y = y;

        this.load()

        this.playAnimation(this.POISON_ANIMATION);
    };

    /**load assets */
    load() {
        this.loadImage('../assets/items/poison-animated/0.png');
        this.loadAnimation(this.POISON_ANIMATION);
    }


    collect() {
        this.isCollected = true;

        /**update UI */
        this.game.ui.addPoison();

        this.remove();
        this.playSound();
    };

    /**play sound
     * play different sound when all poison is collected
     */
    playSound() {
        if(this.game.ui.totalPoison == this.game.ui.collectedPoison) {
            this.game.sounds.playSound('../assets/sounds/all-poison-collected.mp3', false, 0.4);
        } else {
            this.game.sounds.playSound('../assets/sounds/poison-collected.wav');
        };
    };

    /**remove from draw array */
    remove() {
        this.game.world.level.poison.splice(this.game.world.level.poison.indexOf(this), 1)
    };;
};