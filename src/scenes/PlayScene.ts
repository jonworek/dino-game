import Phaser from "phaser";
import Player from "../entities/Player";

export default class PlayScene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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

    this.registerKeyboardInputs();
  }

  registerKeyboardInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    this.player = new Player(this, 0, this.height);
  }

  createEnvironment() {
    this.add
      .tileSprite(0, this.height, this.width, 26, "ground")
      .setOrigin(0, 1);
  }

  update(time: number, delta: number) {
    if (this.player.y === this.height) {
      if (this.cursors.space.isDown || this.cursors.up.isDown) {
        this.player.jump();
      }

      // lateral movement
      if (this.cursors.right.isDown && !this.cursors.left.isDown) {
        this.player.moveRight();
      } else if (this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.moveLeft();
      } else {
        this.player.setVelocityX(0);
      }
    }
  }
}

module.exports = PlayScene;
