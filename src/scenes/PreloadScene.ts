import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("dino-idle-2", "assets/dino-idle-2.png");
    this.load.spritesheet("dino-run", "assets/dino-run.png", {
      frameWidth: 352 / 4,
      frameHeight: 94,
    });
    this.load.image("dino-hurt", "assets/dino-hurt.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/game-over.png");
    this.load.spritesheet("dino-down", "assets/dino-down.png", {
      frameWidth: 236 / 2,
      frameHeight: 58,
    });

    for (let i = 1; i <= 6; i++) {
      this.load.image(`cactus-${i}`, `assets/cactuses_${i}.png`);
    }
  }

  create() {
    this.scene.start("PlayScene");
  }
}

module.exports = PreloadScene;
