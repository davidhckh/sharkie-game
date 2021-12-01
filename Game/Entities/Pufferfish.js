import MovableObject from "../Movable-Object.js";

export default class Pufferfish extends MovableObject {

    height = 28;
    y = 10 + Math.random() * 150;
    x = 100 + Math.random() * 200;
    type = Math.floor(1 + Math.random() * 3)
    
    constructor() {
        super();

        this.loadImage('../assets/puffer/swim/1-' +  this.type + '.png');
    };
};