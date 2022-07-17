import * as Phaser from 'phaser';
import * as components from '../components';
import { Block, BlockType } from '../object/block';
import { Collectible, CollectibleType } from '../object/collectible';
import { Door } from '../object/door';
import { ConveyorBelt } from '../object/conveyor_belt';
import { Hammer } from '../object/hammer';
import { Player } from '../object/player';
import { makeHammerHall } from '../mini-scenes/hammer-hall';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class RunScene extends Phaser.Scene {

  public staticObjects: Array<Block | Door> = [];
  public movables: Array<Block> = [];
  public collectibles: Array<Collectible> = [];
  public belts: Array<ConveyorBelt> = [];
  public hammers: Array<Hammer> = [];
  public player: Player;
  public finalDoor: Door;

  constructor(config = sceneConfig) {
    super(config);
  }

  public create() {
    console.log('scene start');

    const hammerHall = makeHammerHall(this, 500, 500);

    const parts = [hammerHall];

    parts.forEach((part) => {
      this.staticObjects.push(...part.staticObjects);
      this.movables.push(...part.movables);
      this.collectibles.push(...part.collectibles);
      this.belts.push(...part.belts);
    });

    // this.belts = [
    //   new ConveyorBelt(this, 400, 400, 'conveyor_belt', new Phaser.Math.Vector2(0.5,0)),
    //   new ConveyorBelt(this, 400, 800, 'conveyor_belt', new Phaser.Math.Vector2(0.5,0)),
    //   new ConveyorBelt(this, 500, 900, 'conveyor_belt', new Phaser.Math.Vector2(4,0)),
    //   new ConveyorBelt(this, 600, 1000, 'conveyor_belt', new Phaser.Math.Vector2(-0.5,0)),
    // ]
    
    // this.staticObjects = [
    //   new Block(this, 800, 400, 'single_block_floor', BlockType.SOLID),
    //   new Block(this, 400, 500, 'single_block_floor', BlockType.SOLID),

    //   new Block(this, 190, 430, 'single_block_floor', BlockType.SOLID),

    //   ...components.lineOfBlocks(this, 190, 500, 9, 'single_block_floor', BlockType.SOLID),

    // ];
    // this.collectibles = [
    //   new Collectible(this, 600, 350, 'cash', CollectibleType.CASH),
    //   new Collectible(this, 650, 350, 'card', CollectibleType.CARD),
    // ]

    // this.hammers = [
    //   new Hammer(this, 460, 430),
    // ];
    
    // this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE));
    // this.movables.push(new Block(this, 400, 300, 'metal_crate_block_floor', BlockType.MOVEABLE));
    // this.movables.push(new Block(this, 400, 700, 'metal_crate_block_floor', BlockType.MOVEABLE));

    // must create player after other objects so collisions work
    console.log(parts[0].entryPoint.x, parts[0].entryPoint.y)
    this.player = new Player(this, parts[0].entryPoint.x, parts[0].entryPoint.y + 64, 'player_idle');

    this.cameras.main.setBounds(0, 0, 100000, 100000);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();
    this.hammers.forEach(h => h.update());
  }
}