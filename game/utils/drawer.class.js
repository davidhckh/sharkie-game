import Game from "../game.class.js";

export default class Drawer {
    constructor() {
        this.game = new Game();

        this.ctx = canvas.getContext('2d');
    };

    /**draw object */
    draw(object) {
        if (object.drawReverse) {
            this.drawReverse(object);
        } else {
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        };

        //this.drawHitbox(object);
    };

    /**draw item reverse */
    drawReverse(object) {
        /**flip */
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;

        /**draw */
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);

        /**flip back */
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /** draw all items from array */
    drawAll(array) {
        array.forEach(object => {
            this.draw(object);
        });
    };

    /**clear canvas */
    clear() {
        this.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    };

    /**draw hitbox with hitbox padding */
    drawHitbox(object) {
        if (object.hasHitbox) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'yellow';
            this.ctx.rect(
                object.x + object.hitboxLeft, /**left */
                object.y + object.hitboxTop,  /**top */
                object.width - object.hitboxLeft - object.hitboxRight, /**right */
                object.height - object.hitboxBottom - object.hitboxTop); /**bottom */
            this.ctx.stroke();
        };
    };
};