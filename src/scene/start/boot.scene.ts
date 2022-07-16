import * as Phaser from 'phaser';
import { StartScene } from './start.scene';

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
  }

  public create() {
    
  }

  public update() {
    console.log('go to main')
    this.scene.start('main')
  }
}