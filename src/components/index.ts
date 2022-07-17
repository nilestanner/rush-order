import { Scene } from "phaser";
import { Block, BlockType } from "../object/block";
import { RunScene } from "../scene/start.scene";
import { range } from "./utils";

/**
 * creates a stack of block going right
 * @param scene 
 * @param x 
 * @param y 
 * @param numBlocks 
 * @param texture 
 * @param blockType 
 * @param deltaX 
 * @returns 
 */
export function lineOfBlocks(
  scene: RunScene, x: number, y: number, numBlocks: number,
  texture: string = 'single_metal_block_floor',
  blockType = BlockType.SOLID,
  deltaX: number = 64,
): Array<Block> {
  return range(0, numBlocks).map(i => (new Block(
    scene,
    x + i*deltaX,
    y,
    texture,
    blockType,
  )));
}

/**
 * crates a stack of blocks going up
 * @param scene 
 * @param x 
 * @param y 
 * @param numBlocks 
 * @param texture 
 * @param blockType 
 * @param deltaY 
 * @returns 
 */
export function stackOfBlocks(
  scene: RunScene, x: number, y: number, numBlocks: number,
  texture: string = 'single_metal_block_floor',
  blockType = BlockType.SOLID,
  deltaY: number = 80,
): Array<Block> {
  return range(0, numBlocks).map(i => (new Block(
    scene,
    x,
    y - i*deltaY,
    texture,
    blockType,
  )));
}
