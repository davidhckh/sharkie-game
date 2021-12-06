import Character from "./entities/character.class.js";
import Jellyfish from "./entities/jellyfish.class.js";
import Pufferfish from "./entities/pufferfish.class.js";
import Coin from "./entities/coin.class.js";
import Poison from "./entities/poison.class.js";
import Barrier from "./entities/barrier.class.js";

export default class Level {
    /**
     * Character
     */
    character = new Character();

    /**
     * Enemies
     */
    enemies = [
        new Pufferfish(6800, 600),
        new Jellyfish(5600, 'regular'), 
        new Jellyfish(6200, 'electric'),
    ];

    /**
     * Coins
     */
    coins = [
        new Coin(300, 900),
    ]

    /**
     * Poison
     */
    poison = [
        new Poison(860, 750),
        new Poison(2500, 850),
    ]

    /**Barriers */
    barriers = [
        new Barrier(750, -100, 0),
        new Barrier(750, -100, 1),
        new Barrier(2750, -100, 2),
        new Barrier(4350, 400, 3),
        new Barrier(5000, -100, 3),
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