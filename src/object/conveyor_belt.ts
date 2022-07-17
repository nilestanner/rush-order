
import { GameObjects, Scene } from 'phaser';
import { RunScene } from '../scene/start.scene';
import { Block } from './block';
import { Player } from './player';

export class ConveyorBelt extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: RunScene;
  speed: Phaser.Math.Vector2;

  constructor(
    scene: RunScene,
    x: number,
    y: number,
    texture: string,
    speed: Phaser.Math.Vector2,
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.speed = speed;
    this.scene.physics.add.existing(this, true);
    scene.add.existing(this);

    console.log(8 * Math.abs(this.speed.x))
    this.scene.anims.create({
      key: 'conveyor_belt_animation',
      frames: this.anims.generateFrameNames('conveyor_belt'),
      frameRate: 8 * Math.abs(this.speed.x),
      repeat: -1,
      
    });
    if (this.speed.x > 0) {
      this.anims.play('conveyor_belt_animation', true);
    } else {
      this.anims.playReverse('conveyor_belt_animation', true);
    }
    

    this.scene.physics.add.collider(this, this.scene.player, this.handleConveyor);
    this.scene.physics.add.collider(this, this.scene.movables, this.handleConveyor);
  }

  handleConveyor(belt: ConveyorBelt, obj: Player | Block) {
    if (belt.body.touching.up && obj.body.touching.down){
      obj.body.position.add(belt.speed);
    }
  }

  
}