import * as Phaser from 'phaser';
import * as components from '../components';
import { Block, BlockType } from '../object/block';
import { Collectible, CollectibleType } from '../object/collectible';
import { Door } from '../object/door';
import { ConveyorBelt } from '../object/conveyor_belt';
import { Hammer } from '../object/hammer';
import { Player } from '../object/player';
import { makeHammerHall } from '../mini-scenes/hammer-hall';
import { makeStairPillars } from '../mini-scenes/stair-pillars';
import { RandomlyOrderMiniScenes } from '../mini-scenes/mini-scene-builder';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'main',
};

export class RunScene extends Phaser.Scene {

  public staticObjects: Array<Block | Door> = [];
  public movables: Array<Block> = [];
  public collectibles: Array<Collectible> = [];
  public belts: Array<ConveyorBelt> = [];
  public hammers: Array<Hammer> = [];
  public player: Player;
  public finalDoor: Door;

  constructor(config = sceneConfig) {
    super(config);
  }

  public create() {
    console.log('scene start');

    const route = RandomlyOrderMiniScenes(this, 2000, 2000, [
      makeHammerHall,
      makeHammerHall,
      makeStairPillars,
      makeStairPillars,
    ]);

    this.staticObjects.push(...route.staticObjects);
    this.movables.push(...route.movables);
    this.collectibles.push(...route.collectibles);
    this.belts.push(...route.belts);
    this.hammers.push(...route.hammers);

    console.log(route.entryPoint.x, route.entryPoint.y)
    this.player = new Player(this, route.entryPoint.x, route.entryPoint.y, 'player_idle');

    this.cameras.main.setBounds(0, 0, 100000, 100000);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.staticObjects, this.movables);
    
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    this.player.update();
    this.hammers.forEach(h => h.update());
  }
}