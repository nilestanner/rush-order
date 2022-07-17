import * as Phaser from 'phaser';
import { RunScene } from './start.scene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'boot',
};

// this is the first scene, we might have a loading screen here but for now this just loads assets
export class BootScene extends Phaser.Scene {

  constructor() {
    super(sceneConfig);
  }

  preload() {

    this.load.image('single_block_floor', './assets/factory/tiles/platformIndustrial_001.png');
    this.load.image('open_side_block_floor', 'assets/factory/tiles/platformIndustrial_002.png');
    this.load.image('middle_block_floor', 'assets/factory/tiles/platformIndustrial_003.png');
    this.load.image('middle_conrete_block_floor', 'assets/factory/tiles/platformIndustrial_005.png');
    this.load.image('corner_slant_floor', 'assets/factory/tiles/platformIndustrial_006.png');
    this.load.image('end_slant_floor', 'assets/factory/tiles/platformIndustrial_015.png');
    this.load.image('end_rounded_floor', 'assets/factory/tiles/platformIndustrial_017.png');
    this.load.image('single_conrete_block_floor', 'assets/factory/tiles/platformIndustrial_019.png');

    this.load.image('single_metal_block_floor', 'assets/factory/tiles/platformIndustrial_029.png');
    this.load.image('metal_crate_block_floor', 'assets/factory/tiles/platformIndustrial_057.png');

    //player animation
    this.load.atlas('player_idle', 'assets/sprites/player_idle.png', 'assets/sprites/player_idle.json');
    this.load.atlas('player_run', 'assets/sprites/player_run.png', 'assets/sprites/player_run.json');

    // other animated GameObjects
    this.load.atlas('card', 'assets/sprites/card.png', 'assets/sprites/card.json');
    this.load.atlas('cash', 'assets/sprites/cash.png', 'assets/sprites/cash.json');
    this.load.atlas('conveyor_belt', 'assets/sprites/conveyor_belt.png', 'assets/sprites/conveyor_belt.json');
    this.load.atlas('crusher', 'assets/sprites/crusher.png', 'assets/sprites/crusher.json');
    this.load.atlas('flip_platform', 'assets/sprites/flip_platform.png', 'assets/sprites/flip_platform.json');
    this.load.atlas('hammer', 'assets/sprites/hammer.png', 'assets/sprites/hammer.json');

    this.load.audio('intense', 'assets/music/intense.mp3');
  }

  public create() {
    
  }

  public update() {
    this.scene.start('test1');
  }
}