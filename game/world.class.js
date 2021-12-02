import BackgroundObject from "./background-object.class.js";
import Character from "./entities/character.class.js";
import Pufferfish from "./entities/pufferfish.class.js";
import Game from "./game.class.js";

export default class World {
    character = new Character();
    pufferfishes = [
        new Pufferfish(1000, 600),
    ];
    backgroundFiles = [
        {
            path: './assets/landscape/bg/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg/2.png',
            position: 1920
        },
        {
            path: './assets/landscape/bg-1/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg-1/2.png',
            position: 1920
        },
        {
            path: './assets/landscape/light/2.png',
            position: 1920
        },
        {
            path: './assets/landscape/light/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg-0/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg-0/2.png',
            position: 1920
        },
        {
            path: './assets/landscape/floor/1.png',
            position: 0
        },
        {
            path: './assets/landscape/floor/2.png',
            position: 1920
        },
    ]

    background = [];
    camera_x = 0
    current_world_repetitions = 0

    /**
     * constructor
     */
    constructor() {
        this.game = new Game();
    };

    /**update every frame */
    update() {
        /**clear canvas */
        this.game.drawer.clear();

        /**repeat background world */
        this.repeatBackground()

        /**draw entities with camera position */
        this.draw()

        /**update character */
        if (this.character) {
            this.character.update()
        }

        /**update pufferfishes*/
        this.pufferfishes.forEach(fish => {
            fish.update()
        })

    };

    draw() {
        this.game.drawer.ctx.translate(this.camera_x, 0)
        this.game.drawer.drawAll(this.background);
        this.game.drawer.drawAll(this.pufferfishes);
        this.game.drawer.draw(this.character);
        this.game.drawer.ctx.translate(-this.camera_x, 0)
    }

    /**repeat background when camera_x is smaller than -1920 */
    repeatBackground() {
        if (this.camera_x <= -this.current_world_repetitions * 1920) {
            let increase_x_by = this.current_world_repetitions * 1920 * 2

            for(let i = 0; i < this.backgroundFiles.length; i++) {
                this.background.push(
                    new BackgroundObject(this.backgroundFiles[i].path, this.backgroundFiles[i].position + increase_x_by)
                )
            }

            this.current_world_repetitions ++
            console.log(this.background)
        }
    }
};