import * as Phaser from 'phaser';
import { GameState } from '../../global';
import { Block, BlockType } from '../../object/block';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'component-4',
};

function lineOfBlocks(
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: string,
  blockType: BlockType,
  numBlocks?: number,
  deltaX: number=70,
  deltaY: number=0
) {
  const blocks = [];

  for (let i = 0; i < numBlocks; i++) {
    blocks.push(new Block(scene, x + i*deltaX, y + i*deltaY, texture, blockType));
  }

  return blocks;
}

/**
 * A stacking puzzle
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
    
    const startX = 100;
    const startY = 800;
    const numStairs = 5;
    const stair2x = numStairs * 70 + startX;
    const stair2y = startY - (numStairs-1)* 70;
    this.staticObjects = [
      ...lineOfBlocks(this, startX, startY, 'single_metal_block_floor', BlockType.SOLID, numStairs, 70, -70),
      ...lineOfBlocks(this, stair2x, stair2y, 'single_metal_block_floor', BlockType.SOLID, numStairs, 70, 70),
      ...lineOfBlocks(this, startX + numStairs * 2 * 70, startY, 'single_metal_block_floor', BlockType.SOLID, 18, 70, 0),
    ];

    // must create player after other objects so collisions work
    this.player = new Player(this, 100, 700, 'single_metal_block_floor');

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();

    if (this.player.x > 2000) { // TODO border of map
      this.scene.start(GameState.nextRoom());
    }
    // TODO go backward?
  }
}