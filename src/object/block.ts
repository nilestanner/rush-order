import { GameObjects, Scene } from 'phaser';
import { RunScene } from '../scene/start/start.scene';
import { RunSceneTest1 } from '../scene/start/subScene1Test';
import { ConveyorBelt } from './conveyor_belt';

export enum BlockType {
  SOLID = 'solid',
  MOVEABLE = 'moveable',
  BACKGROUND = 'background',
}

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
    this.displayHeight = 64;
    this.displayWidth = 64;
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