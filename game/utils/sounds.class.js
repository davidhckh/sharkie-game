import Game from '../game.class.js'

export default class Sounds {

    mainMusic = new Audio('../assets/sounds/game-music.mp3')
    bossMusic = new Audio('../assets/sounds/boss-music.mp3')

    constructor() {
        this.game = new Game()

        this.mainMusic.loop = true
        this.bossMusic.loop = true

        this.playMainMusic()
    }

    playSound(path, loop = false, volume = 0.5, delay = 0) {
        let audio = new Audio(path)
        audio.volume = volume
        audio.loop = loop

        setTimeout(() => {
            audio.play()
        }, delay)
    }

    playMainMusic() {
        this.mainMusic.play()
        this.fadeInMusic(this.mainMusic)
    }

    playBossMusic() {
        this.fadeOutMusic(this.mainMusic)

        this.bossMusic.play()
        this.fadeInMusic(this.bossMusic)
    }
    
    fadeOutAllMusic() {
        this.fadeOutMusic(this.mainMusic)
        this.fadeOutMusic(this.bossMusic)
    }

    fadeInMusic(music) {
        gsap.fromTo(music, {volume: 0}, {volume: .5, duration: 3})
    }

    fadeOutMusic(music) {
        gsap.to(music, {volume: 0, duration: 3})
    }
}