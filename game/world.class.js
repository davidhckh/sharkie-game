import BackgroundObject from "./background-object.class.js";
import Game from "./game.class.js";
import Level from "./level.class.js";

export default class World {
    background = [];
    camera_x = 0;
    current_world_repetitions = 0;
    level = new Level();
    bubbles = [];

    constructor() {
        this.game = new Game();
    };

    /**update on every frame */
    update() {
        this.game.drawer.clear();

        this.repeatBackground();
        this.draw();

        /**update character */
        if (this.level.character) {
            this.level.character.update();
        };

        /**update boss */
        if (this.level.boss) {
            this.level.boss.update();
        };
    };

    /**kill all enemies, when boss introduces */
    killAllEnemies() {
        this.level.enemies.forEach((enemy) => {
            enemy.die();
        });
    };

    /**draw all elements on each frame */
    draw() {
        /**flip */
        this.game.drawer.ctx.translate(this.camera_x, 0);

        /**draw elements */
        this.game.drawer.drawAll(this.background);
        this.game.drawer.drawAll(this.level.coins);
        this.game.drawer.drawAll(this.level.poison);
        this.game.drawer.drawAll(this.level.enemies);
        this.game.drawer.drawAll(this.bubbles);
        this.game.drawer.draw(this.level.character);
        this.game.drawer.drawAll(this.level.barriers);
        this.game.drawer.draw(this.level.boss);

        /**flip back */
        this.game.drawer.ctx.translate(-this.camera_x, 0);
    };

    /**repeat background when camera_x is smaller than -1920 */
    repeatBackground() {
        if (this.camera_x <= -this.current_world_repetitions * 1920) {
            let increase_x_by = this.current_world_repetitions * 1920 * 2;

            /**new add new background object to background array */
            for (let i = 0; i < this.level.backgroundFiles.length; i++) {
                this.background.push(
                    new BackgroundObject(this.level.backgroundFiles[i].path, this.level.backgroundFiles[i].position + increase_x_by)
                );
            };

            this.current_world_repetitions++;
        };
    };
};