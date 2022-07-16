import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';
import { Collectible, CollectibleType } from '../../object/collectible';
import { ConveyorBelt } from '../../object/conveyor_belt';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class RunScene extends Phaser.Scene {

  public staticObjects: Array<Block> = [];
  public movables: Array<Block> = [];
  public collectibles: Array<Collectible> = [];
  public belts: Array<ConveyorBelt> = [];
  public player: Player;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')

    this.belts = [
      new ConveyorBelt(this, 400, 400, 'conveyor_belt', new Phaser.Math.Vector2(0.5,0)),
      new ConveyorBelt(this, 400, 800, 'conveyor_belt', new Phaser.Math.Vector2(0.5,0)),
      new ConveyorBelt(this, 500, 900, 'conveyor_belt', new Phaser.Math.Vector2(4,0)),
      new ConveyorBelt(this, 600, 1000, 'conveyor_belt', new Phaser.Math.Vector2(-0.5,0)),
    ]
    
    this.staticObjects = [
      new Block(this, 800, 400, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),

      new Block(this, 190, 430, 'single_block_floor', BlockType.SOLID),
     
      new Block(this, 190, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 260, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 330, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 470, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 540, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 610, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 680, 500, 'single_block_floor', BlockType.SOLID),
      new Block(this, 750, 500, 'single_block_floor', BlockType.SOLID),

    ];
    this.collectibles = [
      new Collectible(this, 600, 350, 'cash', CollectibleType.CASH),
      new Collectible(this, 650, 350, 'card', CollectibleType.CARD),
    ]
    
    this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE));
    this.movables.push(new Block(this, 400, 300, 'metal_crate_block_floor', BlockType.MOVEABLE));
    this.movables.push(new Block(this, 400, 700, 'metal_crate_block_floor', BlockType.MOVEABLE));

    // must create player after other objects so collisions work
    this.player = new Player(this, 400, 400, 'player_idle');

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();
  }
}