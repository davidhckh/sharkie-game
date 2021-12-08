import Game from "../game.class.js";
import MovableObject from "../movable-object.class.js";

export default class Boss extends MovableObject {

    name = 'boss'
    height = 1131
    width = 968
    y = 0
    damage = 50
    health = 100
    speed = 7
    hasHitbox = true
    isIntroducing = false
    isIntroduced = false
    drawReverse = false
    introAtX = 9500

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

    HURT_ANIMATION = {
        frames: 4,
        path: '../assets/boss/hurt/'
    }

    DEAD_ANIMATION = {
        frames: 9,
        path: '../assets/boss/dead/'
    }


    /**
     * constructor
     */
    constructor() {
        super();

        this.game = new Game()

        this.x = this.introAtX

        this.healthbar = document.getElementById('final-boss-health-bar')

        this.load()
    };

    load() {
        this.loadImage('')
        this.loadAnimation(this.SWIM_ANIMATION)
        this.loadAnimation(this.INTRO_ANIMATION)
        this.loadAnimation(this.ATTACK_ANIMATION)
        this.loadAnimation(this.HURT_ANIMATION)
        this.loadAnimation(this.DEAD_ANIMATION)
    }

    introduce() {
        this.isIntroducing = true

        this.playAnimation(this.INTRO_ANIMATION)
        this.playAnimation(this.SWIM_ANIMATION, 900)

        gsap.to(this, { duration: 2, delay: 0.5, y: -200 })

        this.freezeCharacterForIntro()
        this.game.ui.fadeInBossHealthbar()
        this.game.world.killAllEnemies()
    }

    freezeCharacterForIntro() {
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
        }, 2500)
    }

    attack() {
        if (!this.isTakingDmg && !this.isDead && !this.game.world.level.character.isDead) {
            if (this.game.world.level.character.y + (this.game.world.level.character.height / 2) < 1080 / 2) {
                gsap.to(this, { y: -400, delay: 0.25, duration: .5 })
                gsap.to(this, { y: -200, delay: 0.75, duration: .5 })
            } else {
                gsap.to(this, { y: 100, delay: 0.25, duration: .5 })
                gsap.to(this, { y: -200, delay: 0.75, duration: .5 })
            }

            if (this.drawReverse) {
                gsap.to(this, { x: this.x + 400, delay: 0.25, duration: .5 })
            } else {
                gsap.to(this, { x: this.x - 400, delay: 0.25, duration: .5 })
            }

            this.playAnimation(this.ATTACK_ANIMATION)

            this.swimTimeout = setTimeout(() => {
                this.playAnimation(this.SWIM_ANIMATION)
            }, 750)
        }
    }

    takeDmg() {
        if (!this.isTakingDmg && this.isIntroduced && !this.isDead) {
            this.playAnimation(this.HURT_ANIMATION)

            this.dmgSwimTimeout = setTimeout(() => {
                this.playAnimation(this.SWIM_ANIMATION)
            }, 600)

            clearTimeout(this.swimTimeout)

            this.isTakingDmg = true
            setTimeout(() => {
                this.isTakingDmg = false
            }, 600)

            this.health -= 20
            this.game.ui.updateBossHealthbar()

            if (this.health == 0) {
                this.die()
            }
        }
    }

    die() {
        clearTimeout(this.swimTimeout)
        clearTimeout(this.dmgSwimTimeout)

        this.drawReverse = false

        this.playAnimation(this.DEAD_ANIMATION)

        gsap.globalTimeline.clear()
        gsap.to(this, { y: -200, duration: 0.2})
        gsap.to(this, { y: -this.height, delay: 0.7, duration: 8})

        this.isDead = true

        setTimeout(() => {
            this.loadImage('../assets/boss/dead/8.png')
        }, 1350);

        this.game.win()
    }

    updateIntro() {
        if (this.game.world.level.character.x >= this.x - 900 && !this.isIntroducing) {
            this.introduce()
        }
    }

    updateMovement() {
        if (this.isIntroduced && !this.isTakingDmg && !this.isDead && !this.game.world.level.character.isDead) {
            if (!this.drawReverse) {
                this.x -= this.speed
            } else {
                this.x += this.speed
            }

            if (this.x < 200 || this.x + (this.width / 2) - this.hitboxRight < this.game.world.level.character.x) {
                this.drawReverse = true
            } else if (this.x >= this.introAtX || this.x + this.hitboxRight  + (this.width / 2) > this.game.world.level.character.x) {
                this.drawReverse = false
            }
        }
    }

    update() {
        this.updateIntro()
        this.updateMovement()
    }
};