import { Scene } from "phaser";
import { Block, BlockType } from "../object/block";
import { range } from "./utils";

export function lineOfBlocks(
  scene: Scene, x: number, y: number, numBlocks: number,
  texture: string = 'single_metal_block_floor',
  blockType = BlockType.SOLID,
): Array<Block> {
  return range(0, numBlocks).map(i => (new Block(
    scene,
    x + i*64,
    y,
    texture,
    blockType,
  )));
}

export function stackOfBlocks(
  scene: Scene, x: number, y: number, numBlocks: number,
  texture: string = 'single_metal_block_floor',
  blockType = BlockType.SOLID,
): Array<Block> {
  return range(0, numBlocks).map(i => (new Block(
    scene,
    x,
    y - i*80,
    texture,
    blockType,
  )));
}
