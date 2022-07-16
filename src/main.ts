import * as Phaser from 'phaser';
import { BootScene } from './scene/start/boot.scene';
import { RunScene } from './scene/start/start.scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  scene: [BootScene, RunScene],
  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        x: 0,
        y: 1_000, // toggle how strong gravity down is
      },
      tileBias: 100,
    },
  },

  parent: 'boot',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

