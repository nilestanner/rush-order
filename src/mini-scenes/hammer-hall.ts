import { Scene } from "phaser";
import { Block, BlockType } from "../object/block";
import { RunScene } from "../scene/start.scene";
import { makeMiniScene } from "./mini-scene-builder";

import * as components from '../components';
import { Hammer } from "../object/hammer";

export const makeHammerHall: makeMiniScene = (
  scene: RunScene,
  offsetX: number,
  offsetY: number,
) => {
  const staticObjects = [
    ...components.lineOfBlocks(scene, 0 + offsetX, 0 + offsetY - 128, 12, 'single_block_floor', BlockType.SOLID),
    new Block(scene, 0 + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
    
    ...components.lineOfBlocks(scene, 0 + offsetX, 64 + offsetY, 12, 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 3) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 6) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 9) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 11) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
  ];
  const hammers = [
    new Hammer(scene, (64 * 3) + offsetX, offsetY),
    new Hammer(scene, (64 * 6) + offsetX, offsetY),
    new Hammer(scene, (64 * 9) + offsetX, offsetY),
  ];

  return {
    staticObjects,
    hammers,
    collectibles: [],
    belts: [],
    movables: [],
    exitPoint: {
      x: (64 * 11) + offsetX,
      y: offsetY,
    },
    entryPoint: {
      x: offsetX,
      y: offsetY,
    }
  }
}