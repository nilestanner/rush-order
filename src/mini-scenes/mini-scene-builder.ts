import { Scene } from "phaser";
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