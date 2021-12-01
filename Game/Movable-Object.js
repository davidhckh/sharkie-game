export default class MovableObject {
    x = 0;
    y = 0;
    width = 150;
    height = 250;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

        let self = this;
        this.img.onload = function () {
            self.adjustImageWidth(self.img);
        };
    };

    moveRight() {
        console.log('Moving right');
    };

    moveLeft() {
        console.log('Moving left');
    };

    /**adjust image width to original image aspect ratios (based on this.height) */
    adjustImageWidth(img) {
        this.width = this.img.width * (this.height / this.img.height);
    };
};