import BackgroundObject from "./Background-Object.js";
import Character from "./Entities/Character.js";
import Pufferfish from "./Entities/Pufferfish.js";
import Game from "./Game.js";

export default class World {
    character = new Character();
    pufferfishes = [ 
        new Pufferfish(200, 80),
    ];
    background = [
        new BackgroundObject('./assets/landscape/bg/1.png', 0,),
        new BackgroundObject('./assets/landscape/light/1.png', 0,),
        new BackgroundObject('./assets/landscape/bg-1/1.png', 0,),
        new BackgroundObject('./assets/landscape/bg-0/1.png', 0,),
        new BackgroundObject('./assets/landscape/floor/1.png', 0,),
    ];

    /**
     * constructor
     */
    constructor() {
        this.game = new Game();
    };

    update() {
        /**clear canvas */
        this.game.drawer.clear();

        /**draw entities */
        this.game.drawer.drawAll(this.background);
        this.game.drawer.drawAll(this.pufferfishes);
        this.game.drawer.draw(this.character);

        /**update character */
        if(this.character) {
            this.character.update()
        }

        /**update pufferfishes*/
        this.pufferfishes.forEach(fish => {
            fish.update()
        })
    };
};