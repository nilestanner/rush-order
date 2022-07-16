import { GameObjects, Scene } from 'phaser';

export enum BlockType {
  SOLID = 'solid',
  MOVEABLE = 'moveable',
  BACKGROUND = 'background',
}

// blocks are 70 x 70
export class Block extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    type: BlockType = BlockType.SOLID,
  ) {
    super(scene, x, y, texture);
    this.scene.physics.add.existing(this, type === BlockType.SOLID);
    if (type === BlockType.MOVEABLE) {
      this.body.setFriction(1000);
      this.body.setDamping(true);
    }
    scene.add.existing(this);
  }
  
}