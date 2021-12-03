import Object from './object.class.js'

export default class MovableObject extends Object {
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
        return  this.x + this.width - this.hitboxRight > object.x && /**right */
                this.y + this.height - this.hitboxBottom > object.y && /** bottom */
                this.x  - this.hitboxLeft < object.x && /**left */
                this.y + this.hitboxTop < object.y + object.height /**top */
    }

}