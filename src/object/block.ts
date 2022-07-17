import { GameObjects, Scene } from 'phaser';
import { RunScene } from '../scene/start/start.scene';
import { ConveyorBelt } from './conveyor_belt';

export enum BlockType {
  SOLID = 'solid',
  MOVEABLE = 'moveable',
  BACKGROUND = 'background',
}

// blocks are 70 x 70
export class Block extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: RunScene;

  constructor(
    scene: RunScene,
    x: number,
    y: number,
    texture: string,
    type: BlockType = BlockType.SOLID,
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.physics.add.existing(this, type === BlockType.SOLID);
    if (type === BlockType.MOVEABLE) {
      this.body.setFriction(1000);
      this.body.setDamping(true);
      this.scene.physics.add.collider(this, this.scene.belts, this.handleConveyor);
    }
    scene.add.existing(this);
  }

  handleConveyor(block: Block, belt: ConveyorBelt) {
    if (belt.body.touching.up && block.body.touching.down){
      block.body.position.add(belt.speed);
    }
  }
  
}