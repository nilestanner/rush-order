import { GameObjects, Scene } from 'phaser';


export class Door extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);
    this.scene.physics.add.existing(this, true);
    scene.add.existing(this);
    this.scene.anims.create({
      key: 'door_animation',
      frames: this.anims.generateFrameNames('crusher'),
      frameRate: 5,
    });
  }

  open() {
    this.anims.play('door_animation', true);
    this.body.destroy();
  }
  
}