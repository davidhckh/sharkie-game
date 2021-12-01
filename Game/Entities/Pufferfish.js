import MovableObject from "../Movable-Object.js";

export default class Pufferfish extends MovableObject {

    height = 50;
    y = 10 + Math.random() * 250;
    x = 100 + Math.random() * 300;
    type = Math.floor(1 + Math.random() * 3)
    
    constructor() {
        super();

        this.loadImage('../assets/puffer/swim/1-' +  this.type + '.png');
    };
};