import EventEmitter from "./Utils/EventEmitter.js";

export default class Object{
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

    loadAnimation(animation) {
        for(let i = 0; i < animation.frames; i++) {
            animation.cache = []
            let img = new Image()
            img.src = animation.path + i + '.png'
            animation.cache[i] = img
            img.onload = function() {
                animation.cache[i] = img
            }
        }
    }

    playAnimation(animation, reverse) {
        this.currentFrame = 0
        this.currentMaximumFrame = animation.currentAnimationTotalFrames
        clearInterval(this.animationInterval)

        let self = this
        this.animationInterval = setInterval(() => {
            if(animation.cache[self.currentFrame]) {
                self.img = animation.cache[self.currentFrame]
            }

            if(self.currentFrame == animation.frames - 1) {
                self.currentFrame = 0
            } else {
                self.currentFrame++
            }
        }, 150)
    }

    playReverseAnimation(animation, reverse) {
        this.currentFrame = animation.frames
        this.currentMinimumFrame = 0 
        clearInterval(this.animationInterval)

        let self = this
        this.animationInterval = setInterval(() => {
            if(animation.cache[self.currentFrame]) {
                self.img = animation.cache[self.currentFrame]
            }

            if(self.currentFrame == 0) {
                self.currentFrame = animation.frames
            } else {
                self.currentFrame--
            }
        }, 150)
    }
}