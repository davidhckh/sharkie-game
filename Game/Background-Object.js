export default class BackgroundObject {

    height = 300;
    x = 0;
    y = 0;

    constructor(img, x) {
        this.loadImage(img);
        this.x = x;
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

        let self = this;
        this.img.onload = function () {
            self.adjustImageWidth(self.img);
        };
    };

    /**adjust image width to original image aspect ratios (based on this.height) */
    adjustImageWidth(img) {
        this.width = this.img.width * (this.height / this.img.height);
    };
};