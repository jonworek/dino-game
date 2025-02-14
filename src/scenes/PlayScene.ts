import Phaser from "phaser";
import Player from "../entities/Player";

export default class PlayScene extends Phaser.Scene {
  player: Player;
  ground: Phaser.GameObjects.TileSprite;

  obstacleSpawnTimer: Phaser.Time.TimerEvent;
  gameSpeed: number = 220;
  isGameRunning: boolean = true;

  gameOverText: Phaser.GameObjects.Image;
  restartText: Phaser.GameObjects.Image;
  gameOverContainer: Phaser.GameObjects.Container;

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

    this.spawnObstacle();

    this.gameOverText = this.add.image(0, -80, "game-over").setOrigin(0.5);
    this.restartText = this.add.image(0, 0, "restart").setOrigin(0.5);

    // Ensure the image is interactive
    this.restartText.setInteractive();

    // Log to verify the image is interactive
    console.log("restartText interactive:", this.restartText.input.enabled);

    // Attach the event listener
    this.restartText.on("pointerdown", this.handleRestart, this);

    this.gameOverContainer = this.add
      .container(this.width / 2, this.height / 2)
      .add([this.gameOverText, this.restartText])
      .setVisible(false);

    this.obstacleSpawnTimer = this.time.addEvent({
      delay: 5000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  handleRestart() {
    console.log("restarting");

    const restartDelay = 3;
    let countdown = restartDelay;

    const buildRestartText = (delay: number) => `restarting in ${delay}...`;

    let restartingText = this.add.text(10, 10, buildRestartText(countdown), {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ff0000",
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        restartingText.setText(buildRestartText(--countdown));
      },
      callbackScope: this,
      repeat: restartDelay - 1,
    });

    this.time.addEvent({
      delay: restartDelay * 1000,
      callback: () => {
        this.scene.restart();
        this.isGameRunning = true;
        this.physics.resume();
      },
      callbackScope: this,
    });
  }

  spawnObstacle() {
    console.log("spawning obstacle");
    const cactusNumber = Phaser.Math.Between(1, 6);
    console.log(`spawning cactus-${cactusNumber}`);
    const cactus = this.physics.add.sprite(
      this.width,
      this.height,
      `cactus-${cactusNumber}`
    );

    cactus.body.setAllowGravity(false);
    cactus.setOrigin(0, 1);
    cactus.setImmovable(true);
    cactus.setVelocityX(this.gameSpeed * -1); // units are pixels per second

    this.physics.add.collider(this.player, cactus, this.gameOver, null, this);
  }

  gameOver() {
    console.log("hit");

    this.isGameRunning = false;
    this.obstacleSpawnTimer.remove();
    //this.scene.pause();
    this.physics.pause();
    this.player.die();
    this.gameOverContainer.setVisible(true);
  }

  createPlayer() {
    this.player = new Player(this, 0, this.height);
  }

  createEnvironment() {
    this.ground = this.add
      .tileSprite(0, this.height, 20, 26, "ground")
      .setOrigin(0, 1);

    const rolloutEvent = this.time.addEvent({
      delay: 1000 / 60, // run once per frame at 60 fps
      loop: true,
      callback: () => {
        this.ground.width += 10;

        if (this.ground.width >= this.width) {
          console.log("finished rolling out");
          rolloutEvent.remove();
        }
      },
    });
  }

  update(time: number, delta: number) {
    if (!this.isGameRunning) return;

    this.ground.tilePositionX += this.gameSpeed * (delta / 1000);
  }
}

module.exports = PlayScene;
