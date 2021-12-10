export default class Object {
    
    drawReverse = false;

    /**hitbox padding */
    hasHitbox = true;
    hitboxBottom = 0;
    hitboxLeft = 0;
    hitboxRight = 0;
    hitboxTop = 0;


    /**load image and replace animation */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

        clearInterval(this.animationInterval);
    };

    /**load animation and add to animation cache on load */
    loadAnimation(animation) {
        for (let i = 0; i < animation.frames; i++) {
            animation.cache = [];
            let img = new Image();
            img.src = animation.path + i + '.png';
            animation.cache[i] = img;
            img.onload = function () {
                animation.cache[i] = img;
            };
        };
    };

    /**start animation with delay, if needed */
    playAnimation(animation, delay = 0) {
        setTimeout(() => {
            /**reset current animation */
            this.currentFrame = 0;
            this.currentMaximumFrame = animation.currentAnimationTotalFrames;

            /**end current animation */
            clearInterval(this.animationInterval);

            /**next frame */
            this.nextFrame(animation)
            this.animationInterval = setInterval(() => {
                this.nextFrame(animation);
            }, 150);
        }, delay);
    };

    /**play next frame */
    nextFrame(animation) {
        /**update image, get image from cache */
        if (animation.cache[this.currentFrame]) {
            this.img = animation.cache[this.currentFrame];
        };

        /**update current frame */
        if (this.currentFrame == animation.frames - 1) {
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        };
    };

    /**start reverse animation */
    playReverseAnimation(animation) {
        /**reset current animation */
        this.currentFrame = animation.frames;
        this.currentMinimumFrame = 0;

        /**end current animation */
        clearInterval(this.animationInterval);

        /**next frame */
        this.nextFrameReverse(animation);
        this.animationInterval = setInterval(() => {
            this.nextFrameReverse(animation);
        }, 150);
    };

    /**play next frame from reverse animation */
    nextFrameReverse(animation) {
        /**update image, get image from cache */
        if (animation.cache[this.currentFrame]) {
            this.img = animation.cache[this.currentFrame];
        };

        /**update current frame */
        if (this.currentFrame == 0) {
            this.currentFrame = animation.frames;
        } else {
            this.currentFrame--;
        };
    };
};