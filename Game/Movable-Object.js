import Object from './Object.js'

export default class MovableObject extends Object {
    width = 150;
    height = 250;
    x = 0;
    y = 0;
    currentAnimationFrame = 0
    currentAnimationTotalFrames = 0
    currentAnimationPath = ''

    moveRight() {
        console.log('Moving right');
    };

    moveLeft() {
        console.log('Moving left');
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

        let self = this
        setInterval(function () {
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
};