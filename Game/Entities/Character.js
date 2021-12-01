import Game from "../Game.js";
import MovableObject from "../Movable-Object.js";

export default class Character extends MovableObject {

    height = 180;
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
        this.y = Math.cos(this.game.time.elapsed / 1000) * 5
    }
};