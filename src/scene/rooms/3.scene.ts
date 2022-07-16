import * as Phaser from 'phaser';
import { GameState } from '../../global';
import { Block, BlockType } from '../../object/block';
import { Player } from '../../object/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'component-3',
};

function lineOfBlocks(
  scene: Phaser.Scene,
  x: number, y: number,
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
    
    this.staticObjects = [
      ...lineOfBlocks(this, 0, 800, 'single_metal_block_floor', BlockType.SOLID, 30),
    ];

    // must create player after other objects so collisions work
    this.player = new Player(this, 400, 400, 'single_metal_block_floor');

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