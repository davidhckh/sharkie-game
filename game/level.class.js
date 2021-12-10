import Character from "./entities/character.class.js";
import Jellyfish from "./entities/jellyfish.class.js";
import Pufferfish from "./entities/pufferfish.class.js";
import Coin from "./entities/coin.class.js";
import Poison from "./entities/poison.class.js";
import Barrier from "./entities/barrier.class.js";
import Boss from "./entities/boss.class.js";

/**
 * Level design
 * put following here:
 * - character
 * - boss
 * - enemies
 * - coins
 * - poision
 * - barriers
 * - background objects
 */

export default class Level {
    /**
     * Character
     */
    character = new Character();

    /**
     * Boss
     */
    boss = new Boss()

    /**
     * Enemies
     */
    enemies = [
        new Pufferfish(1930, 550),
        new Pufferfish(3700, 140),
        new Pufferfish(3680, 340),
        new Jellyfish(2300, 'regular'), 
        new Jellyfish(4500, 'regular'), 
        new Jellyfish(4700, 'regular'), 
        new Jellyfish(4900, 'regular'), 
        new Jellyfish(5100, 'regular'), 
        new Pufferfish(6400, 400),
        new Jellyfish(6850, 'electric'),
    ];

    /**
     * Coins
     */
    coins = [
        new Coin(1200, 400),
        new Coin(1400, 400),
        new Coin(1800, 400),
        new Coin(2000, 400),
        new Coin(3150, 330),
        new Coin(3300, 330),
        new Coin(3450, 330),
        new Coin(3150, 190),
        new Coin(3450, 190),
        new Coin(4540, 500),
        new Coin(4740, 500),
        new Coin(4940, 500),
        new Coin(5140, 500),
        new Coin(7050, 300),
        new Coin(7050, 500),
        new Coin(7050, 700),
        new Coin(7700, 450),
        new Coin(7900, 450),
        new Coin(8100, 450),
        new Coin(8300, 450),
    ];

    /**
     * Poison
     */
    poison = [
        new Poison(1585, 330),
        new Poison(2300, 50),
        new Poison(3285, 145),
        new Poison(4825, 780),
        new Poison(7035, 50),
    ];

    /**Barriers */
    barriers = [
        new Barrier(750, 400, 0),
        new Barrier(950, -100, 1),
        new Barrier(2500, -100, 3),
        new Barrier(3100, -100, 2),
        new Barrier(3800, 350, 3),
        new Barrier(5350, 400, 1),
        new Barrier(6000, 0, 2),
        new Barrier(7200, 400, 0),
        new Barrier(7400, -100, 1),
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
    ];
};