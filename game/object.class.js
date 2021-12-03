export default class Object{
    drawReverse = false

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

        let self = this
        this.img.onload = function () {
            self.adjustImageWidth();
            console.log(self.image.width)
        };
    };

    /**adjust image width to original image aspect ratios (based on this.height) */
    adjustImageWidth() {
        console.log(this)
        this.width = width * (this.height / this.img.height);
        //this. width = 500
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

    playAnimation(animation) {
        this.currentFrame = 0
        this.currentMaximumFrame = animation.currentAnimationTotalFrames
        clearInterval(this.animationInterval)
        let self = this

        nextFrame()
        this.animationInterval = setInterval(() => {
            nextFrame()
        },150)

        function nextFrame() {
            if(animation.cache[self.currentFrame]) {
                self.img = animation.cache[self.currentFrame]
            }

            if(self.currentFrame == animation.frames - 1) {
                self.currentFrame = 0
            } else {
                self.currentFrame++
            }
        }
    }

    playReverseAnimation(animation) {
        this.currentFrame = animation.frames
        this.currentMinimumFrame = 0 
        clearInterval(this.animationInterval)
        let self = this

        nextFrame()
        this.animationInterval = setInterval(() => {
            nextFrame()
        }, 150)

        function nextFrame() {
            if(animation.cache[self.currentFrame]) {
                self.img = animation.cache[self.currentFrame]
            }

            if(self.currentFrame == 0) {
                self.currentFrame = animation.frames
            } else {
                self.currentFrame--
            }
        }
    }
}