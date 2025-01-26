import Phaser from "phaser";

import PreloadScene from "./scenes/PreloadScene";
import PlayScene from "./scenes/PlayScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 700,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { x: 0, y: 200 },
    } as Phaser.Types.Physics.Arcade.ArcadeWorldConfig,
  },
  scene: [PreloadScene, PlayScene],
};

new Phaser.Game(config);
