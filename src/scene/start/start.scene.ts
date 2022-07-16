import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class RunScene extends Phaser.Scene {

  public staticObjects: Array<Block> = [];
  public movables: Array<Block> = [];
  public player: Player;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')
    
    this.staticObjects = [
      new Block(this, 800, 400, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),
      // 5 in a row
      new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 470, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 540, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 610, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 680, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 750, 500, 'single_block_floor', BlockType.SOLID),
    ];
    this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE));

    // must create player after other objects so collisions work
    this.player = new Player(this, 400, 400, 'player_idle');

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();
  }
}