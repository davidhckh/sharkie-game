import Game from "../game.class.js";
import MovableObject from "../moving-Object.class.js";

export default class Pufferfish extends MovableObject {

    color = Math.floor(1 + Math.random() * 2)
    height = 260


    SWIM_ANIMATION = {
        frames: 4,
        path: '../assets/jellyfish/' + this.type +'/' + this.color + '-'
    }



    /**
     * constructor
     */
    constructor(x, y, type) {
        super();

        this.game = new Game()

        this.x = x
        this.y = y
        this.type = type
        this.SWIM_ANIMATION.path = '../assets/jellyfish/' + this.type +'/' + this.color + '-'



        this.load()

        this.playAnimation(this.SWIM_ANIMATION)
    };

    load() {
        this.loadImage('../assets/jellyfish/' + this.type + '/' +  this.color + '-0.png');
        this.loadAnimation(this.SWIM_ANIMATION)
    }

    update() {

    }
};