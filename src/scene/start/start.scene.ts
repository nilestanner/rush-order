import * as Phaser from 'phaser';
import { Block, BlockType } from '../../object/block';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class StartScene extends Phaser.Scene {
  private square: Block;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    console.log('scene start')
    this.square = new Block(this, 400, 400, 'single_metal_block_floor', BlockType.MOVEABLE)
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.up.isDown) {
      this.square
      this.square.body.setVelocityY(-500);
    } else if (cursorKeys.down.isDown) {
      this.square.body.setVelocityY(500);
    } else {
      this.square.body.setVelocityY(0);
    }

    if (cursorKeys.right.isDown) {
      this.square.body.setVelocityX(500);
    } else if (cursorKeys.left.isDown) {
      this.square.body.setVelocityX(-500);
    } else {
      this.square.body.setVelocityX(0);
    }
  }
}