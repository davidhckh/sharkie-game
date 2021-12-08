export default class Sounds {
    
    constructor() {
        setTimeout(() => {
            this.playSound(this.jump)
        }, 3000)
    }

    playSound(path, loop = false,volume = 1) {
        let audio = new Audio(path)
        audio.volume = volume
        audio.loop = loop

        audio.play()
    }


}