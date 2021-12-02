import BackgroundObject from "./background-object.class.js";
import Character from "./entities/character.class.js";
import Pufferfish from "./entities/pufferfish.class.js";
import Game from "./game.class.js";

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

    camera_x

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