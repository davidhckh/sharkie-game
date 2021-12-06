import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Boss extends MovableObject {

    name = 'boss'
    height = 1131
    width = 968
    y = 0
    damage = 50
    speed = 5
    hasHitbox = true
    isIntroducing = false
    isIntroduced = false
    drawReverse = false
    introAtX = 5000

    hitboxRight = 70
    hitboxLeft = 60
    hitboxTop = 500
    hitboxBottom = 200

    SWIM_ANIMATION = {
        frames: 13,
        path: '../assets/boss/floating/'
    }

    INTRO_ANIMATION = {
        frames: 7,
        path: '../assets/boss/intro/'
    }

    ATTACK_ANIMATION = {
        frames: 6,
        path: '../assets/boss/attack/'
    }


    /**
     * constructor
     */
    constructor() {
        super();

        this.game = new Game()

        this.x = this.introAtX

        this.healtbar = document.getElementById('final-boss-healt-bar-container')

        this.load()
    };

    load() {
        this.loadImage('')
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.INTRO_ANIMATION)
        this.loadAnimation(this.ATTACK_ANIMATION)
    }

    introduce() {
        this.isIntroducing = true

        this.playAnimation(this.INTRO_ANIMATION)
        this.playAnimation(this.SWIM_ANIMATION, 900)

        gsap.to(this, {duration: 2, delay: 0.5, y: -200})

        this.freezeCharacer()
        this.fadeInHealthbar()
    }

    freezeCharacer() {
        this.game.world.level.character.freeze = true

        setTimeout(() => {
            this.game.world.level.character.freeze = false
        }, 1750)

        setTimeout(() => {
            this.attack()
            this.isIntroduced = true

            setInterval(() => {
                this.attack()
            }, 2000)
        },2500)
    }

    fadeInHealthbar() {
        this.healtbar.classList.remove('hide')
        gsap.fromTo(this.healtbar, {opacity: 0,}, {opacity: 1, duration: 0.5, delay: 1.6})
    }

    attack() {
        if(this.game.world.level.character.y + (this.game.world.level.character.height / 2) < 1080 / 2) {
            gsap.to(this, {y: -400, delay: 0.25, duration: .5})
            gsap.to(this, {y: -200, delay: 0.75, duration: .5})
        } else {
            gsap.to(this, {y: 100, delay: 0.25, duration: .5})
            gsap.to(this, {y: -200, delay: 0.75, duration: .5})
        }

        if(this.drawReverse) {
            gsap.to(this, {x: this.x + 400, delay: 0.25, duration: .5})
        } else {
            gsap.to(this, {x: this.x - 400, delay: 0.25, duration: .5})
        }

        this.playAnimation(this.ATTACK_ANIMATION)
        this.playAnimation(this.SWIM_ANIMATION, 750)
    }

    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1)
    }

    updateIntro() {
        if(this.game.world.level.character.x >= this.x - 900 && !this.isIntroducing) {
            this.introduce()
        }
    }

    updateMovement() {
        if(this.isIntroduced) {
            if(!this.drawReverse) {
                this.x -= this.speed
            } else {
                this.x += this.speed
            }
    
            if(this.x < 200) {
                this.drawReverse = true
            } else if(this.x >= this.introAtX) {
                this.drawReverse = false
            }
        }
    }

    update() {
        this.updateIntro()
        this.updateMovement()
    }
};