import MovableObject from "../Movable-Object.js";

export default class Character extends MovableObject {

    height = 180;
    y = 90;
    x = 10;
    
    constructor() {
        super();

        this.loadImage('../assets/sharkie/swim/1.png');
    };
};