import { Container, Text } from "pixi.js";
import { SceneGraph } from "../../utilities/sceneGraph";
import { Sign } from "./sign";

export class SkillForest extends Sign {
  constructor(layer: Container) {
    super();
    const signLayer = SceneGraph.GetComponent("SkillsForest");
  }
}
