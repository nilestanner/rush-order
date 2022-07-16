
import { GameObjects, Scene } from 'phaser';

export enum CollectibleType  {
  CASH = 'cash', 
  CARD = 'card',
}

export class Collectible extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: Phaser.Scene;
  type: CollectibleType;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    type: CollectibleType,
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.type = type;
    this.scene.physics.add.existing(this, true);
    scene.add.existing(this);

    if (type === CollectibleType.CASH) {
      this.scene.anims.create({
        key: 'cash_animation',
        frames: this.anims.generateFrameNames('cash'),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.play('cash_animation', true);
    } else if (type === CollectibleType.CARD) {
      this.scene.anims.create({
        key: 'card_animation',
        frames: this.anims.generateFrameNames('card'),
        frameRate: 4,
        repeat: -1,
      });
      this.anims.play('card_animation', true);
    }
  }
}