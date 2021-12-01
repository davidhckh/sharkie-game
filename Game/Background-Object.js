import Object from "./Object.js";

export default class BackgroundObject extends Object {

    height = 300;
    x = 0;
    y = 0;

    constructor(img, x) {
        super()
        
        this.loadImage(img);
        this.x = x;
    };
};