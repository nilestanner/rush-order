import * as Phaser from 'phaser';
import { BootScene } from './scene/boot.scene';
import { RunScene } from './scene/start.scene';
import { RunSceneTest1 } from './scene/subScene1Test';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  scene: [BootScene, RunScene, RunSceneTest1],
  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
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

