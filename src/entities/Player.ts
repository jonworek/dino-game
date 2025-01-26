class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  maxSpeed: number = 200;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dino-idle-2");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 1);
    this.setCollideWorldBounds(true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.events.on("update", this.update, this);
  }

  update() {
    if (this.y === (this.scene.game.config.height as number)) {
      if (this.cursors.space.isDown || this.cursors.up.isDown) {
        this.jump();
      }

      // lateral movement
      if (this.cursors.right.isDown && !this.cursors.left.isDown) {
        this.moveRight();
      } else if (this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.moveLeft();
      } else {
        this.setVelocityX(0);
      }
    }
  }

  jump() {
    this.setVelocityY(-300);
  }

  moveRight() {
    this.setVelocityX(this.maxSpeed);
  }

  moveLeft() {
    this.setVelocityX(-this.maxSpeed);
  }
}

export default Player;
