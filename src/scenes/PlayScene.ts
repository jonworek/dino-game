import Phaser from "phaser";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  get width() {
    return this.game.config.width as number;
  }

  get height() {
    return this.game.config.height as number;
  }

  preload() {
    // Load assets here
  }

  create() {
    this.createEnvironment();
    this.createPlayer();
  }

  createPlayer() {
    this.physics.add.sprite(0, this.height, "dino-idle-2").setOrigin(0, 1);
  }

  createEnvironment() {
    this.add.tileSprite(0, this.height, this.width, 26, "ground").setOrigin(0, 1);
  }

  update(time: number, delta: number) {
    // Game loop logic here
  }
}

module.exports = PlayScene;
