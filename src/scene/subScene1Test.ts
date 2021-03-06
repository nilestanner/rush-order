import * as Phaser from 'phaser';
import * as components from '../components';
import { Block, BlockType } from '../object/block';
import { Collectible, CollectibleType } from '../object/collectible';
import { ConveyorBelt } from '../object/conveyor_belt';
import { Door } from '../object/door';
import { Hammer } from '../object/hammer';
import { Player } from '../object/player';
import { RunScene } from './start.scene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'test1',
};

export class RunSceneTest1 extends RunScene {

  public staticObjects: Array<Block | Door> = [];
  public movables: Array<Block> = [];
  public collectibles: Array<Collectible> = [];
  public hammers: Array<Hammer> = [];
  public belts: Array<ConveyorBelt> = []
  public player: Player;
  public finalDoor: Door;
  public fallingBlocks: Array<Block> = [];

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start');
    const offsetX = 500;
    const offsetY = 500;
    const deltaOfFallingBlocks = 300;
    const fallingBlockLoopAround = 1200;

    this.finalDoor = new Door(this, (64 * 19) + offsetX, (64 * 2) + offsetY, 'crusher');
    
    this.staticObjects = [
      ...components.lineOfBlocks(this, 0 + offsetX, 0 + offsetY, 20, 'single_block_floor', BlockType.SOLID),
      new Block(this, 0 + offsetX, 64 + offsetY, 'single_block_floor', BlockType.SOLID),
      new Block(this, 0 + offsetX, 128 + offsetY, 'single_block_floor', BlockType.SOLID),
      ...components.lineOfBlocks(this, 0 + offsetX, 192 + offsetY, 20, 'single_block_floor', BlockType.SOLID),
      this.finalDoor,
      new Block(this, (64 * 3) + offsetX, 64 + offsetY, 'single_block_floor', BlockType.SOLID),
      new Block(this, (64 * 6) + offsetX, 64 + offsetY, 'single_block_floor', BlockType.SOLID),
      new Block(this, (64 * 9) + offsetX, 64 + offsetY, 'single_block_floor', BlockType.SOLID),
      new Block(this, (64 * 19) + offsetX, (64 * 1) + offsetY, 'single_block_floor', BlockType.SOLID),

      // Other side of falling block gap
      ...components.lineOfBlocks(this, (64 * 19) + offsetX + 9 * deltaOfFallingBlocks, fallingBlockLoopAround, 6, 'single_block_floor', BlockType.SOLID),
    ];
    this.collectibles = [
      new Collectible(this, (64 * 15) + offsetX, 64 + offsetY, 'card', CollectibleType.CARD),
    ]

    this.hammers = [
      new Hammer(this, (64 * 3) + offsetX, (64 * 2) + offsetY),
      new Hammer(this, (64 * 6) + offsetX, (64 * 2) + offsetY),
      new Hammer(this, (64 * 9) + offsetX, (64 * 2) + offsetY),
    ];

    this.fallingBlocks = [
      ...components.lineOfBlocks(
        this, 64 * (20 + 3) + offsetX, 200 + offsetY, 8, 'metal_crate_block_floor', BlockType.MOVEABLE, deltaOfFallingBlocks),
      ...components.lineOfBlocks(
        this, 64 * (20 + 3) + offsetX + 64, 200 + offsetY, 8, 'metal_crate_block_floor', BlockType.MOVEABLE, deltaOfFallingBlocks),
    ];
    
    this.fallingBlocks.forEach((b: any) => { // enable falling blocks to wrap arround
      b.startX = b.x;
      b.startY = b.y;
      b.update = (() => {
        const tooLow = b.body.y > fallingBlockLoopAround;
        if (tooLow) {
          // wrap around to the top
          b.setPosition(b.startX, b.startY);
        }
        b.body.setVelocity(0, 10);
      }).bind(b);
      return b;
    });
    
    this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE));
    this.movables.push(...this.fallingBlocks);

    // must create player after other objects so collisions work
    this.player = new Player(this, 50 + offsetX, 130 + offsetY, 'player_idle');

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.cameras.main.setBounds(0, 0, 100000, 100000);
    this.cameras.main.startFollow(this.player);

    // start music in 200ms;
    window.setTimeout(() => {

      this.game.sound.play('intense', {
        loop: true,
        rate: 0.9,
      });
    }, 300);
  }

  public update() {
    this.player.update();
    this.hammers.forEach(h => h.update());
    this.fallingBlocks.forEach(b => b.update());
  }
}