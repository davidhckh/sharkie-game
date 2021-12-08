export default class Sounds {
    
    constructor() {
        setTimeout(() => {
            this.playSound(this.jump)
        }, 3000)
    }

    playSound(path, loop = false, volume = 0.5, delay = 0) {
        let audio = new Audio(path)
        audio.volume = volume
        audio.loop = loop

        setTimeout(() => {
            audio.play()
        }, delay)
    }


}