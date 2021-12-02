import Game from "./game.class.js";

export default class Drawer {
    constructor() {
        this.game = new Game();

        this.ctx = canvas.getContext('2d');
    };

    draw(object) {
        if(object.drawReverse) {
            this.ctx.save()
            this.ctx.translate(object.width, 0)
            this.ctx.scale(-1, 1)
            object.x = object.x * -1
        }

        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);

        if(object.drawReverse) {
            object.x = object.x * -1
            this.ctx.restore()
        }
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