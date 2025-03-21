import { Container } from "pixi.js";
import { Scene } from "./scene";

export class SceneManager extends Container {
  protected _sceneList: Set<Scene> = new Set();
  protected _activeScene: Scene;
  protected _lastScene: Scene;
  constructor() {
    super();
  }

  public addScene(scene: Scene): void {
    this._sceneList.add(scene);
    scene.visible = false;
    this.addChild(scene);
  }

  public setSceneActive(scene: Scene): void {
    if (this._sceneList.has(scene)) {
      if (this._activeScene) {
        this._activeScene.visible = false;
      }
      this._activeScene = scene;
      this._activeScene.visible = true;
    }
  }
}
