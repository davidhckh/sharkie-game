import Object from './Object.js'

export default class MovableObject extends Object {
    height = 28;
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