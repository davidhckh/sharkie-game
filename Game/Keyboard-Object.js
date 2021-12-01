import Game from "./Game.js"
import Object from "./Object.js"

export default class KeyboardObject extends Object{
    LEFT
    RIGHT

    constructor() {

        super()

        this.game = new Game()

        this.game.events.on('keyup', () => {
            console.log(event)
        })

    }
}