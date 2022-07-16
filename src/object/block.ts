
import { GameObjects, Scene } from 'phaser';

export enum BlockType {
  SOLID = 'solid',
  MOVEABLE = 'moveable',
  BACKGROUND = 'background',
}

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

    } else if (type === BlockType.SOLID) {
    }
    scene.add.existing(this);
  }
  
}