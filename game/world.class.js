import BackgroundObject from "./background-object.class.js";
import Game from "./game.class.js";
import Level from "./level.class.js";

export default class World {
  backgroundLayers = [];
  camera_x = 0;
  camera_target_x = 0;
  current_world_repetitions = 0;
  level = new Level();
  bubbles = [];

  constructor() {
    this.game = new Game();
    this.initializeBackgroundLayers();
  }

  /**initialize background layers with parallax */
  initializeBackgroundLayers() {
    this.level.backgroundLayers.forEach((layer) => {
      this.backgroundLayers.push({
        parallax: layer.parallax,
        objects: [],
      });
    });
  }

  /**lerp camera position for smooth movement */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  /**update on every frame */
  update() {
    this.game.drawer.clear();

    /**lerp camera position for smooth movement */
    this.camera_x = this.lerp(this.camera_x, this.camera_target_x, 0.06);

    this.repeatBackground();
    this.draw();

    /**update character */
    if (this.level.character) {
      this.level.character.update();
      this.level.character.updateAnimation(this.game.deltaTime);
    }

    /**update boss */
    if (this.level.boss) {
      this.level.boss.update();
      this.level.boss.updateAnimation(this.game.deltaTime);
    }

    /**update enemies */
    this.level.enemies.forEach((enemy) => {
      enemy.updateAnimation(this.game.deltaTime);
    });

    /**update coins */
    this.level.coins.forEach((coin) => {
      coin.updateAnimation(this.game.deltaTime);
    });

    /**update poison */
    this.level.poison.forEach((poison) => {
      poison.updateAnimation(this.game.deltaTime);
    });
  }

  /**kill all enemies, when boss introduces */
  killAllEnemies() {
    this.level.enemies.forEach((enemy) => {
      enemy.die();
    });
  }

  /**draw all elements on each frame */
  draw() {
    /**draw background layers with parallax */
    this.drawBackgroundLayers();

    /**draw game elements with camera translation */
    this.game.drawer.ctx.translate(this.camera_x, 0);

    this.game.drawer.drawAll(this.level.coins);
    this.game.drawer.drawAll(this.level.poison);
    this.game.drawer.drawAll(this.level.enemies);
    this.game.drawer.drawAll(this.bubbles);
    this.game.drawer.draw(this.level.character);
    this.game.drawer.drawAll(this.level.barriers);
    this.game.drawer.draw(this.level.boss);

    /**flip back */
    this.game.drawer.ctx.translate(-this.camera_x, 0);
  }

  /**draw background layers with individual parallax speeds */
  drawBackgroundLayers() {
    this.backgroundLayers.forEach((layer) => {
      const parallaxOffset = this.camera_x * layer.parallax;
      this.game.drawer.ctx.translate(parallaxOffset, 0);
      this.game.drawer.drawAll(layer.objects);
      this.game.drawer.ctx.translate(-parallaxOffset, 0);
    });
  }

  /**repeat background layers when camera_x is smaller than -1920 */
  repeatBackground() {
    if (this.camera_x <= -this.current_world_repetitions * 1920) {
      let increase_x_by = this.current_world_repetitions * 1920 * 2;

      /**add new background objects to each layer */
      this.level.backgroundLayers.forEach((layer, layerIndex) => {
        layer.images.forEach((image) => {
          this.backgroundLayers[layerIndex].objects.push(
            new BackgroundObject(image.path, image.position + increase_x_by)
          );
        });
      });

      this.current_world_repetitions++;
    }
  }
}
