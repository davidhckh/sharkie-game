import Object from "./object.class.js";
import Game from "./game.class.js"

export default class BackgroundObject extends Object {

    width = 1920;
    x = 0;
    y = 0;
    hasHitbox = false;

    constructor(img, x) {
        super();
        
        this.game = new Game();

        this.height = this.game.canvas.height;

        this.loadImage(img);
        
        this.x = x;
    };
};