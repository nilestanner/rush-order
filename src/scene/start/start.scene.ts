import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class StartScene extends Phaser.Scene {
  private player: Block;
  private staticObjects: Array<Block> = [];
  private movables: Array<Block> = [];

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')
    this.player = new Block(this, 400, 400, 'single_metal_block_floor', BlockType.MOVEABLE);
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
    this.movables.push(new Block(this, 600, 430, 'metal_crate_block_floor', BlockType.MOVEABLE))

    this.physics.add.collider(this.staticObjects, this.movables);
    this.physics.add.collider(this.player, [...this.movables, ...this.staticObjects]);
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    if (this.staticObjects.some(s => this.physics.collide(this.player, s))) {
      if (cursorKeys.up.isDown) {
        this.player.body.setVelocityY(-500);
      } else if (cursorKeys.down.isDown) {
        this.player.body.setVelocityY(500);
      } else {
        this.player.body.setVelocityY(0);
      }
    }

    // allow user to move left and right always
    if (cursorKeys.right.isDown) {
      this.player.body.setVelocityX(500);
    } else if (cursorKeys.left.isDown) {
      this.player.body.setVelocityX(-500);
    } else {
      this.player.body.setVelocityX(0);
    }
  }
}