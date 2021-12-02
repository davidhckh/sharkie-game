import Object from './object.class.js'

export default class MovableObject extends Object {
    height = 160;
    x = 0;
    y = 0;
    speed = Math.random() * 5000

    constructor(x, y) {
        super()

        this.x = x
        this.y = y
    }

    moveRight() {
        console.log('Moving right');
    };

    moveLeft() {
        console.log('Moving left');
    };
};