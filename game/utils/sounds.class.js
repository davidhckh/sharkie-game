import Game from '../game.class.js'

export default class Sounds {

    mainMusic = new Audio('../assets/sounds/game-music.mp3')
    bossMusic = new Audio('../assets/sounds/boss-music.mp3')

    constructor() {
        this.game = new Game()

        this.mainMusic.loop = true
        this.bossMusic.loop = true

        this.soundsMuted = localStorage.getItem('soundsMuted') == 'true'
        this.musicMuted = localStorage.getItem('musicMuted') == 'true'

        this.playMainMusic()
    }

    playSound(path, loop = false, volume = 0.5, delay = 0) {
        if (!this.soundsMuted) {
            let audio = new Audio(path)
            audio.volume = volume
            audio.loop = loop

            setTimeout(() => {
                audio.play()
            }, delay)
        }
    }

    playMainMusic() {
        if (!this.musicMuted) {
            this.mainMusic.play()
            this.fadeInMusic(this.mainMusic)
        }
    }

    playBossMusic() {
        if (!this.musicMuted) {
            this.fadeOutMusic(this.mainMusic)

            this.bossMusic.play()
            this.fadeInMusic(this.bossMusic)
        }
    }

    fadeOutAllMusic() {
        this.fadeOutMusic(this.mainMusic)
        this.fadeOutMusic(this.bossMusic)
    }

    pauseAllMusic() {
        this.bossMusic.pause()
        this.mainMusic.pause()
    }

    resumeMusic() {
        if (this.game.world.level.boss.isIntroduced || this.game.world.level.boss.isIntroducing) {
            this.playBossMusic()
        } else {
            this.playMainMusic()
        }
    }

    fadeInMusic(music) {
        gsap.fromTo(music, { volume: 0 }, { volume: .5, duration: 3 })
    }

    fadeOutMusic(music) {
        gsap.to(music, { volume: 0, duration: 3 })
    }
}