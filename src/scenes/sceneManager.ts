import { Container } from "pixi.js";
import { Scene } from "./scene";

export class SceneManager extends Container {
  protected _sceneList: Scene[];
  protected _activeScene: Scene;
  protected _lastScene: Scene;
  constructor() {
    super();
  }
}
