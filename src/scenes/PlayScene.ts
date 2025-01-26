import Phaser from "phaser";
import Player from "../entities/Player";

export default class PlayScene extends Phaser.Scene {
  player: Player;

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
    this.player = new Player(this, 0, this.height);
    //new Player(this, 300, this.height).setFlipX(true);
  }

  createEnvironment() {
    this.add
      .tileSprite(0, this.height, this.width, 26, "ground")
      .setOrigin(0, 1);
  }

  update(time: number, delta: number) {
    //console.log('time', time, 'delta', delta);
  }
}

module.exports = PlayScene;
