export default class MovableObject {
    width = 150;
    height = 250;
    x = 0;
    y = 0;
    currentAnimationFrame = 0
    currentAnimationTotalFrames = 0
    currentAnimationPath = ''


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

    playAnimation(path, frames) {
        this.currentAnimationPath = path

        this.currentAnimationFrame = 0
        this.currentAnimationTotalFrames = frames

        let self = this

        setInterval(function() {
            if(self.currentAnimationTotalFrames > this.currentAnimationFrame) {
                this.currentAnimationFrame += 1
            } else {
                this.currentAnimationFrame = 1
            }
            self.img.src = path + this.currentAnimationFrame + '.png'
        },150)
    }

    /**adjust image width to original image aspect ratios (based on this.height) */
    adjustImageWidth(img) {
        this.width = this.img.width * (this.height / this.img.height);
    };
};