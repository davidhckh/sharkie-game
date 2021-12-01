import Object from "./Object.js";
import Game from "./Game.js"

export default class BackgroundObject extends Object {

    x = 0;
    y = 0;

    constructor(img, x) {
        super()
        
        this.game = new Game()

        this.height = this.game.canvas.height / 6;

        this.loadImage(img);
        this.x = x;
    };
};