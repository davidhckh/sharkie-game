import Game from './game.class.js';
import Object from './object.class.js'

export default class MovableObject extends Object {
    x = 0;
    y = 0;

    constructor(x, y) {
        super();

        this.game = new Game();

        this.x = x;
        this.y = y;
    };

    /**
     * check if object is colliding with other entity (include hitbox padding)
     * character.isColliding(enemy) */
    isCollidingWith(object) {
        return (
            this.x + this.hitboxLeft < object.x + object.width - object.hitboxRight && /**left -> right */
            this.x + this.width - this.hitboxRight > object.x + object.hitboxLeft && /**right -> left */
            this.y + this.hitboxTop < object.y + object.height - object.hitboxBottom && /**top -> bottom */
            this.y + this.height - this.hitboxBottom > object.y + object.hitboxTop /**bottom -> top */
        );
    };
};