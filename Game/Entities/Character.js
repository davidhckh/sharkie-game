import Game from "../Game.js";
import KeyboardObject from "../Keyboard-Object.js";
import EventEmitter from "../Utils/EventEmitter.js";

export default class Character extends KeyboardObject {

    height = 110;
    y = 90;
    x = 10;

    SWIM_ANIMATION = {
        frames: 5,
        path: '../assets/sharkie/swim/'
    }
    
    constructor() {
        super();

        this.game = new Game()

        this.loadImage('../assets/sharkie/swim/1.png');
        this.loadAnimation(this.SWIM_ANIMATION)

        this.playAnimation(this.SWIM_ANIMATION)
    };

    update() {
        this.y = Math.cos(this.game.time.elapsed) * 5
    }
};