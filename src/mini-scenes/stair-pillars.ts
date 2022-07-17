import { Scene } from "phaser";
import { Block, BlockType } from "../object/block";
import { RunScene } from "../scene/start.scene";
import { makeMiniScene } from "./mini-scene-builder";

import * as components from '../components';
import { Hammer } from "../object/hammer";

export const makeStairPillars: makeMiniScene = (
  scene: RunScene,
  offsetX: number,
  offsetY: number,
) => {
  const staticObjects = [
    ...components.lineOfBlocks(scene, 0 + offsetX, 64 + offsetY, 14, 'single_block_floor', BlockType.SOLID),
    new Block(scene, 0 + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 1) + offsetX, offsetY - (64 * 2), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 2) + offsetX, offsetY - (64 * 3), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 3) + offsetX, offsetY - (64 * 3), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 4) + offsetX, offsetY - (64 * 4), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 4) + offsetX, offsetY - (64 * 5), 'single_block_floor', BlockType.SOLID),
    ...components.lineOfBlocks(scene, (64 * 5) + offsetX, offsetY - (64 * 6), 11, 'single_block_floor', BlockType.SOLID),

    new Block(scene, (64 * 2) + offsetX, offsetY, 'single_block_floor', BlockType.SOLID),

    new Block(scene, (64 * 4) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),

    new Block(scene, (64 * 6) + offsetX, offsetY - (64 * 2), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 6) + offsetX, offsetY - 64, 'single_block_floor', BlockType.SOLID),

    new Block(scene, (64 * 8) + offsetX, offsetY - (64 * 3), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 8) + offsetX, offsetY - (64 * 1), 'single_block_floor', BlockType.SOLID),

    new Block(scene, (64 * 10) + offsetX, offsetY - (64 * 4), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 10) + offsetX, offsetY - (64 * 2), 'single_block_floor', BlockType.SOLID),

    ...components.stackOfBlocks(scene, (64 * 13) + offsetX, offsetY, 5, 'single_block_floor', BlockType.SOLID, 64),
    new Block(scene, (64 * 14) + offsetX, offsetY - (64 * 4), 'single_block_floor', BlockType.SOLID),
    new Block(scene, (64 * 15) + offsetX, offsetY - (64 * 4), 'single_block_floor', BlockType.SOLID),
  ];

  return {
    staticObjects,
    hammers: [],
    collectibles: [],
    belts: [],
    movables: [],
    exitPoint: {
      x: (64 * 15) + offsetX,
      y: offsetY - (64 * 5),
    },
    entryPoint: {
      x: offsetX,
      y: offsetY,
    }
  }
}