import { Scene } from "phaser";
import { shuffleArray } from "../components/utils";
import { Block } from "../object/block"
import { Collectible } from "../object/collectible"
import { ConveyorBelt } from "../object/conveyor_belt"
import { Door } from "../object/door"
import { Hammer } from "../object/hammer";
import { RunScene } from "../scene/start.scene";

export interface MiniSceneParts {
  staticObjects: Array<Block | Door>,
  movables: Array<Block>,
  collectibles: Array<Collectible>,
  belts: Array<ConveyorBelt>,
  hammers: Array<Hammer>

  // these are absolute points
  entryPoint: {
    x: number,
    y: number,
  },
  exitPoint: {
    x: number,
    y: number,
  },
}

export type makeMiniScene = (
  scene: RunScene,
  offsetX: number,
  offsetY: number,
) => MiniSceneParts;

export function RandomlyOrderMiniScenes (
  scene: RunScene,
  offsetX: number,
  offsetY: number,
  makeFuncs: Array<makeMiniScene>,
): MiniSceneParts  {
  const shuffled = shuffleArray<makeMiniScene>(makeFuncs);
  const all: MiniSceneParts = {
    staticObjects: [],
    hammers: [],
    collectibles: [],
    belts: [],
    movables: [],
    exitPoint: {
      x: offsetX,
      y: offsetY,
    },
    entryPoint: {
      x: offsetX,
      y: offsetY,
    }
  }
  shuffled.forEach((nextFunc: makeMiniScene) => {
    const miniScene = nextFunc(scene, all.exitPoint.x, all.exitPoint.y);
    all.staticObjects.push(...miniScene.staticObjects);
    all.movables.push(...miniScene.movables);
    all.collectibles.push(...miniScene.collectibles);
    all.belts.push(...miniScene.belts);
    all.hammers.push(...miniScene.hammers);
    all.exitPoint = miniScene.exitPoint;
    return miniScene;
  })
  return all;
}