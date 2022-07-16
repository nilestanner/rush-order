
import { GameObjects, Physics, Scene } from 'phaser';

export class Hammer extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: Phaser.Scene;

  constructor(
    scene: Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, 'hammer');
    this.scene = scene;
    this.scene.physics.add.existing(this, true);
    scene.add.existing(this);

    this.scene.anims.create({
      key: 'hammer_animation',
      frames: this.anims.generateFrameNames('hammer'),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.play('hammer_animation', true);
  }

  canSquish(object: Phaser.GameObjects.Sprite): boolean {
    return true;
  }

  update(): void {
    if (this.anims.currentFrame.index > 4) {
      this.body.setSize(this.width, 30, false);
    } else {
      this.body.setSize(this.width, 60, false);
    }
  }
}