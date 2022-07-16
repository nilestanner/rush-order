
import { GameObjects, Scene } from 'phaser';
import { RunScene } from '../scene/start/start.scene';
import { Block } from './block';


export class Player extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: RunScene;
  public blockedRight = false;
  public blockedLeft = false;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);
    
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this, this.scene.movables);
    this.scene.physics.add.collider(this, this.scene.staticObjects);
    scene.add.existing(this);
  }

  update() {
    const cursorKeys = this.scene.input.keyboard.createCursorKeys();
    if (this.body.touching.down) {
      if (cursorKeys.up.isDown) {
        this.body.setVelocityY(-500);
      } else if (cursorKeys.down.isDown) {
        this.body.setVelocityY(500);
      } else {
        this.body.setVelocityY(0);
      }
    }

    // allow user to move left and right always
    if (cursorKeys.right.isDown && !this.blockedRight) {
      this.body.setVelocityX(500);
      this.blockedLeft = false;
    } else if (cursorKeys.left.isDown && !this.blockedLeft) {
      this.body.setVelocityX(-500);
      this.blockedRight = false;
    } else {
      this.body.setVelocityX(0);
    }
  }

}