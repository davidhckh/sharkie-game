import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Boss extends MovableObject {

    name = 'boss'
    height = 1131
    width = 968
    y = 0
    damage = 50
    hasHitbox = true
    isIntroducded = false

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

        this.x = 3600

        this.load()
    };

    introduce() {
        this.isIntroducded = true
        this.playAnimation(this.INTRO_ANIMATION)
        gsap.to(this, {duration: 2, delay: 0.5, y: -200})
        this.game.world.level.character.freeze = true

        setTimeout(() => {
            this.playAnimation(this.SWIM_ANIMATION)
        },900)

        setTimeout(() => {
            this.game.world.level.character.freeze = false
            this.attack()
        }, 2500)
    }

    attack() {
        if(this.game.world.level.character.y + (this.game.world.level.character.height / 2) < 1080 / 2) {
            gsap.to(this, {y: -400, delay: 0.25, duration: .5})
        } else {
            gsap.to(this, {y: 100, delay: 0.25, duration: .5})
        }
        gsap.to(this, {x: this.x - 400, delay: 0.25, duration: .5})

        this.playAnimation(this.ATTACK_ANIMATION)
        setTimeout(() => {
            this.playAnimation(this.SWIM_ANIMATION)
        },750)
    }

    load() {
        this.loadImage('')
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.INTRO_ANIMATION)
        this.loadAnimation(this.ATTACK_ANIMATION)
    }

    remove() {
        this.game.world.level.enemies.splice(this.game.world.level.enemies.indexOf(this), 1)
    }

    update() {
        if(this.game.world.level.character.x >= this.x - 1000 && !this.isIntroducded) {
            this.introduce()
        }
    }
};