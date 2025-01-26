import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("dino-idle-2", "assets/dino-idle-2.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}

module.exports = PreloadScene;
