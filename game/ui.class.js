import Sounds from "./utils/sounds.class.js"
import Game from "./game.class.js"

export default class UI {
    constructor() {
        this.game = new Game()

        this.onPlay()
        this.setup()
        this.onMuteSounds()
        this.onMuteMusic()
    }

    defineElements() {
        this.coinCounter = document.getElementById('coin-amount-label')
        this.poisonCounter = document.getElementById('poison-amount-label')
        this.winContainer = document.getElementById('win-container')
        this.deadContainer = document.getElementById('dead-container')
        this.healthbar = document.getElementById('health-bar')
        this.bossHealthbar = document.getElementById('final-boss-health-bar')
        this.soundButton = document.getElementById('sound-button')
        this.musicButton = document.getElementById('music-button')
    }

    setup() {
        this.defineElements()
        this.setupCoins()
        this.setupPoison()
        this.updateHealthbar()
        this.restartButtonClick()
        this.updateBossHealthbar()
        this.setupSoundsButton()
        this.setupMusicButton()

        this.winContainer.classList.add('hide')
        this.deadContainer.classList.add('hide')
    }

    /**on play button click */ 
    onPlay() {
        this.game.events.on('play', () => {
            if(!this.game.sounds) {
                this.game.sounds = new Sounds();
                this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2)
    
                this.game.world.level.character.freeze = false
    
                gsap.to(document.getElementById('opening-screen'), {opacity: 0, duration: .4})
    
                setTimeout(() => {
                    document.getElementById('opening-screen').classList.add('hide');
                }, 500)
            }
        })
    }

    setupSoundsButton() {
        if(localStorage.getItem('soundsMuted') == 'true') {
            this.soundButton.style.background ='gray'
        }
    }

    onMuteSounds() {
        this.game.events.on('mute-sounds', () => {
            if(this.game.sounds.soundsMuted) {
                this.game.sounds.soundsMuted = false
                this.soundButton.style.background = 'rgb(54, 162, 250)'
                this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2)
                localStorage.setItem('soundsMuted', false)
            } else {
                this.game.sounds.soundsMuted = true
                this.soundButton.style.background ='gray'
                localStorage.setItem('soundsMuted', true)
            }
        })
    }

    setupMusicButton() {
        if(localStorage.getItem('musicMuted') == 'true') {
            this.musicButton.style.background = 'gray'
        }
    }

    onMuteMusic() {
        this.game.events.on('mute-music', () => {
            if(this.game.sounds.musicMuted) {
                this.game.sounds.musicMuted = false
                this.musicButton.style.background = 'rgb(54, 162, 250)'
                this.game.sounds.resumeMusic()
                localStorage.setItem('musicMuted', false)
            } else {
                this.game.sounds.musicMuted = true
                this.musicButton.style.background ='gray'
                this.game.sounds.pauseAllMusic()
                localStorage.setItem('musicMuted', true)
            }
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2)
        })
    }

    /**Win Screen */
    showWinContainer() {
        this.winContainer.classList.remove('hide')
        gsap.fromTo(this.winContainer, { opacity: 0 }, { opacity: 1, delay: 2, duration: .3 })
        gsap.fromTo(document.getElementById('win-sharkie'), { y: this.game.canvas.height / 2 }, { y: 0, duration: 0.4, delay: 2, ease: Power1.easeOut })

        document.getElementById('win-collected-coins-label').innerHTML = 'You collected ' + this.collectedCoins + ' out of ' + this.totalCoins + ' coins!'
    }

    showDeadContainer() {
        this.deadContainer.classList.remove('hide')
        gsap.fromTo(this.deadContainer, { opacity: 0 }, { opacity: 1, delay: 2, duration: 1 })
    }

    restartButtonClick() {
        this.game.events.on('restart', () => {
            this.game.restart()
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2)
        })
    }

    updateHealthbar() {
        let character = this.game.world.level.character
        this.healthbar.style.width = character.health + '%'

        if (character.health > 50) {
            this.healthbar.style.background = 'linear-gradient(#b5ff2b, #82c900)'
        } else if (character.health <= 50 && character.health > 30) {
            this.healthbar.style.background = 'linear-gradient(#FFE47C, #FFCF00)'
        } else {
            this.healthbar.style.background = 'linear-gradient(#FF9C75, #FF4B00)'
        }
    }

    updateBossHealthbar() {
        let boss = this.game.world.level.boss

        this.bossHealthbar.style.width = boss.health + '%'

        if (boss.health > 50) {
            this.bossHealthbar.style.background = 'linear-gradient(#b5ff2b, #82c900)'
        } else if (boss.health <= 50 && boss.health > 30) {
            this.bossHealthbar.style.background = 'linear-gradient(#FFE47C, #FFCF00)'
        } else {
            this.bossHealthbar.style.background = 'linear-gradient(#FF9C75, #FF4B00)'
        }

        if (!this.game.world.level.boss.isIntroducing) {
            document.getElementById('final-boss-health-bar-container').classList.add('hide')
        }
    }

    fillHealthbar() {
        this.healthbar.style.width = '100%'
        this.updateHealthbar()
    }

    fadeInBossHealthbar() {
        let container = document.getElementById('final-boss-health-bar-container')

        container.classList.remove('hide')
        gsap.fromTo(container, { opacity: 0, }, { opacity: 1, duration: 0.5, delay: 1.6 })

        this.updateBossHealthbar()
    }

    /**
     * Coins
     */
    setupCoins() {
        this.collectedCoins = 0
        this.totalCoins = this.game.world.level.coins.length

        this.updateCoins()
    }

    updateCoins() {
        this.coinCounter.innerHTML = this.collectedCoins + ' / ' + this.totalCoins
    }

    addCoin() {
        this.collectedCoins += 1
        this.updateCoins()
    }

    /**Poison */
    setupPoison() {
        let poisonContainer = document.getElementById('poison-container')
        
        this.collectedPoison = 0
        this.totalPoison = this.game.world.level.poison.length

        poisonContainer.classList.remove('unlocked-poison')

        this.updatePoison()
    }

    updatePoison() {
        this.poisonCounter.innerHTML = this.collectedPoison + ' / ' + this.totalPoison

        if (this.collectedPoison == this.totalPoison) {
            this.unlockPoisonBubbles()
        }
    }

    addPoison() {
        this.collectedPoison += 1
        this.updatePoison()
    }

    unlockPoisonBubbles() {
        let poisonContainer = document.getElementById('poison-container')

        poisonContainer.classList.add('unlocked-poison')

        this.game.world.level.character.poisonBubbles = true
    }
}