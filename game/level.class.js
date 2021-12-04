import Character from "./entities/character.class.js";
import Jellyfish from "./entities/jellyfish.class.js";
import Pufferfish from "./entities/pufferfish.class.js";
import Coin from "./entities/coin.class.js";

export default class Level {
    /**
     * Character
     */
    character = new Character();

    /**
     * Enemies
     */
    enemies = [
        new Pufferfish(2800, 600),
        new Jellyfish(1800, 'regular'),
        new Jellyfish(1000, 'regular'),
        new Jellyfish(1200, 'regular'),
        new Jellyfish(1400, 'regular'),
        new Jellyfish(1600, 'regular'),
        new Jellyfish(2000, 'electric'),
    ];

    /**
     * Coins
     */
    coins = [
        new Coin(800, 500),
        new Coin(1000, 500),
        new Coin(1200, 500), 
        new Coin(1400, 500),
        new Coin(1600, 500),
    ]

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