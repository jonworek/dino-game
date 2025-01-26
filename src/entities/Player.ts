class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dino-idle-2");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 1);
    this.setCollideWorldBounds(true);
  }

  jump() {
    this.setVelocityY(-200);
  }

  moveRight() {
    this.setVelocityX(100);
  }

  moveLeft() {
    this.setVelocityX(-100);
  }
}

export default Player;