export default class Object{
    drawReverse = false

    hasHitbox = true
    hitboxBottom = 0
    hitboxLeft = 0
    hitboxRight = 0
    hitboxTop = 0


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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

    playAnimation(animation, delay = 0) {
        setTimeout(() => {
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
        }, delay)
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