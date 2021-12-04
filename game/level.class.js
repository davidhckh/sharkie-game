import Character from "./entities/character.class.js";
import Jellyfish from "./entities/jellyfish.class.js";
import Pufferfish from "./entities/pufferfish.class.js";

export default class Level {
    /**
     * Character
     */
    character = new Character();

    /**
     * Enemies
     */
    enemies = [
        new Pufferfish(1800, 600),
        new Jellyfish(800, 'regular'),
        new Jellyfish(1000, 'electric'),
    ];

    /**
     * Background
     */
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
            path: './assets/landscape/bg-0/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg-0/2.png',
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
            path: './assets/landscape/bg-1/1.png',
            position: 0
        },
        {
            path: './assets/landscape/bg-1/2.png',
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
}