class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  maxSpeed: number = 200;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dino-run", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(this.width - 40, this.height);

    this.setOrigin(0, 1);
    this.setCollideWorldBounds(true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // this ensures the update() method is called every time the scene updates
    this.scene.events.on("update", this.update, this);

    this.registerAnimations();
    this.play("dino-run", true);
  }

  update(time: number, delta: number) {
    if (!this.scene?.physics?.world) return;
    if (this.scene?.physics.world.isPaused) return;

    this.handleInput();
  }

  handleInput() {
    if ((this.body as Phaser.Physics.Arcade.Body)?.onFloor()) {
      this.setAngle(0);

      if (this.cursors.down.isDown) {
        this.crouch();
        return;
      }

      if (!this.anims.isPlaying) {
        // play the 'dino-run' animation if not already playing
        this.setTexture("dino-run", 0);
        this.anims.resume();
      }

      this.body.setSize(this.width, this.height);

      if (
        this.cursors.space.isDown ||
        this.cursors.up.isDown ||
        this.scene.input.activePointer.isDown
      ) {
        this.jump();
        return;
      }

      // lateral movement
      if (this.cursors?.right.isDown && !this.cursors?.left.isDown) {
        this.moveRight();
      } else if (this.cursors?.left.isDown && !this.cursors?.right.isDown) {
        this.moveLeft();
      } else {
        this.setVelocityX(0);
      }
    } else {
      // stop the 'dino-run' animation while in the air
      this.anims?.pause();
    }
  }

  registerAnimations() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNames("dino-run"),
      frameRate: 20,
      repeat: -1,
    });
  }

  crouch() {
    this.setTexture("dino-down");
    this.body.setSize(this.width, this.height);
    this.setVelocityY(1000);
    this.anims?.pause();
    console.log("crouch");
    this.setVelocityX(0);
  }

  jump() {
    console.log("jump");
    this.setTexture("dino-run", 0);
    this.setAngle(-5);
    this.setVelocityY(-300);
  }

  moveRight() {
    this.setVelocityX(this.maxSpeed);
  }

  moveLeft() {
    this.setVelocityX(-this.maxSpeed);
  }

  die() {
    this.anims.stop();
    this.setTexture("dino-hurt");
  }
}

export default Player;
