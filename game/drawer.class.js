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

        this.drawHitbox(object)

        if(object.drawReverse) {
            object.x = object.x * -1
            this.ctx.restore()
        }
    };

    drawAll(array) {
        array.forEach(object => {
            this.draw(object)
        });
    };

    clear() {
        this.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    };

    drawHitbox(object) {
        if(object.hasHitbox) {
            this.ctx.beginPath()
            this.ctx.lineWidth = '5'
            this.ctx.strokeStyle = 'blue'
            this.ctx.rect(object.x + object.hitbox_padding_left, 
                object.y + object.hitbox_padding_top, 
                object.width - object.hitbox_padding_right, 
                object.height - object.hitbox_padding_bottom)
            this.ctx.stroke()
        }
    }
};