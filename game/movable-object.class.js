import Object from './object.class.js'

export default class MovableObject extends Object {
    height = 160;
    x = 0;
    y = 0;
    speed = Math.random() * 5000;
    hasHitbox = true;

    constructor(x, y) {
        super()

        this.x = x
        this.y = y
    }

    /**character.isColliding(enemy) */
    isCollidingWith(object) {
        return this.x + this.width - this.hitboxRight > object.x &&
            this.x -  this.hitboxLeft < object.x &&
            this.y - this.hitboxTop + this.height > object.y &&
            this.y + this.hitboxBottom< object.y + object.height
    }

}