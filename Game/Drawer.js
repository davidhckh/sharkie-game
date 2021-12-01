import Game from "./Game.js";

export default class Drawer {
    constructor() {
        this.game = new Game();

        this.ctx = canvas.getContext('2d');
        this.ctx.scale(6,6);
    };

    draw(object) {
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    };

    drawAll(array) {
        array.forEach(object => {
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        });
    };

    clear() {
        this.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    };
};