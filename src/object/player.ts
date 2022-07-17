
import { GameObjects, Scene } from 'phaser';
import { RunScene } from '../scene/start/start.scene';
import { Block } from './block';
import { Collectible, CollectibleType } from './collectible';
import { Hammer } from './hammer';


export class Player extends GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  scene: RunScene;
  moveState: {
    inAir: boolean;
    left: boolean;
    running: boolean;
  }
  maxXVelocity = 500;
  maxXAirVelocity = 600;
  velocityRamping = 50;
  velocityAirRamping = 25;
  velocityDamping = 200;
  jumpVelocity = 500;

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
    this.scene.physics.add.collider(this, this.scene.collectibles, this.collect);
    this.scene.physics.add.collider(this, this.scene.hammers);
    this.scene.physics.add.overlap(this, this.scene.hammers, this.squish);
    scene.add.existing(this);

    this.scene.anims.create({
      key: 'player_idle_animation',
      frames: this.anims.generateFrameNames('player_idle'),
      frameRate: 4,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'player_run_animation',
      frames: this.anims.generateFrameNames('player_run'),
      frameRate: 24,
      repeat: -1,
    });

    this.moveState = {
      inAir: false,
      left: true,
      running: false,
    };

    this.body.setSize(16, 26, false);
  }

  update() {
    this.moveState.inAir = !this.body.touching.down;
    if (this.body.velocity.x < 0) {
      this.moveState.left = true;
    } else if (this.body.velocity.x > 0) {
      this.moveState.left = false;
    }
    this.moveState.running = this.body.velocity.x !== 0;

    let currentVY = this.body.velocity.y;
    const cursorKeys = this.scene.input.keyboard.createCursorKeys();
    if (!this.moveState.inAir) {
      if (cursorKeys.up.isDown) {
        currentVY = -this.jumpVelocity;
      } else if (cursorKeys.down.isDown) {
        currentVY += this.velocityRamping;
      }
    }
    this.body.setVelocityY(currentVY);

    let currentXV = this.body.velocity.x;
    // allow user to move left and right always
    if (cursorKeys.right.isDown) {
      if (this.moveState.inAir) {
        currentXV += this.velocityAirRamping;
      } else {
        currentXV += this.velocityRamping;
      }
    } else if (cursorKeys.left.isDown) {
      if (this.moveState.inAir) {
        currentXV -= this.velocityAirRamping;
      } else {
        currentXV -= this.velocityRamping;
      }
    } else {
      if (!this.moveState.inAir && currentXV !== 0) {
        currentXV += (currentXV > 0 ? -this.velocityDamping : this.velocityDamping);
        if (Math.abs(currentXV) < this.velocityDamping) {
          currentXV = 0
        }
      }
    }
    const maxV = this.moveState.inAir ? this.maxXAirVelocity : this.maxXVelocity;
    if (Math.abs(currentXV) > maxV) {
      currentXV = (currentXV > 0 ? maxV : -maxV);
    }
    this.body.setVelocityX(currentXV);
    this.setAnimation()
  }

  setAnimation() {
    
    if (this.moveState.running) {
      this.setToRun();
    } else {
      this.setToIdle();
    }

    if (this.moveState.inAir) {
      this.anims.pause();
    } else {
      this.anims.resume();
    }

    if (this.moveState.left) {
      this.flipX = true;
      this.body.setOffset(25,23);
    } else {
      this.flipX = false;
      this.body.setOffset(7,23);
    }
  }

  setToIdle() {
    
    this.anims.play('player_idle_animation', true);
  }

  setToRun() {
    this.body.setSize(16, 26, false);
    this.anims.play('player_run_animation', true);
  }

  collect(player: Player, collectible: Collectible) {
    if (collectible.type === CollectibleType.CASH) {
      console.log('picked up cash');
      
    } else if (collectible.type === CollectibleType.CARD) {
      console.log('picked up card');
      player.scene.finalDoor.open();
    }

    collectible.destroy();
  }

  squish(player: Player, hammer: Hammer) {
    if (hammer.canSquish(player)) {
      console.log('squished');
    }
  }
}