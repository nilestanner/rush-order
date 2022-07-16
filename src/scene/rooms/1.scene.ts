import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'room-1',
};

/**
 * Gaps between objects
 */
export class Room extends Phaser.Scene {

  public staticObjects: Array<Block> = [];
  public movables: Array<Block> = [];
  public player: Player;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')
    
    this.staticObjects = [
      // new Block(this, 800, 400, 'single_block_floor', BlockType.SOLID),
      // new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),
      // 5 in a row
      new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),
      // new Block(this, 470, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 800, 500, 'single_block_floor', BlockType.SOLID),
      // new Block(this, 610, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 1200, 500, 'single_block_floor', BlockType.SOLID),
      // new Block(this, 750, 500, 'single_block_floor', BlockType.SOLID),

      new Block(this, 400, 600, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 700, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 800, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 900, 'single_block_floor', BlockType.SOLID),
    ];
    this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE));

    // must create player after other objects so collisions work
    this.player = new Player(this, 400, 400, 'single_metal_block_floor');

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();
  }
}