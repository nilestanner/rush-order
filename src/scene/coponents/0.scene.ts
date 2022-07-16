import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'component-0',
};

/**
 * Just dsiplays a bunch of objects
 */
export class Component extends Phaser.Scene {

  public staticObjects: Array<Block> = [];
  public movables: Array<Block> = [];
  public player: Player;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')
    
    this.staticObjects = [
      new Block(this, 400, 600, 'single_block_floor', BlockType.SOLID),
      new Block(this, 500, 600, 'open_side_block_floor', BlockType.SOLID),
      new Block(this, 600, 600, 'middle_block_floor', BlockType.SOLID),
      new Block(this, 700, 600, 'middle_conrete_block_floor', BlockType.SOLID),
      new Block(this, 800, 600, 'corner_slant_floor', BlockType.SOLID),
      new Block(this, 900, 600, 'end_slant_floor', BlockType.SOLID),
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