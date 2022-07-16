import * as Phaser from 'phaser';
import { BootScene } from './scene/start/boot.scene';
import { StartScene } from './scene/start/start.scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  scene: [BootScene, StartScene],
  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,

    },
  },

  parent: 'boot',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

