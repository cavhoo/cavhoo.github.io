import { Container, Ticker } from "pixi.js";
import { Scene } from "./scene";

enum TransitionState {
  Fade,
  Idle,
}

export class SceneManager extends Container {
  protected static FADE_TIME: number = 250;
  protected _sceneList: Set<Scene> = new Set();
  protected _activeScene: Scene;
  protected _nextScene: Scene | null = null;

  protected transitionState: TransitionState = TransitionState.Idle;

  protected _time: number = 0;

  constructor() {
    super();
    this.name = "SceneManager";
    Ticker.shared.add(this.update, this);
  }

  public addScene(scene: Scene): void {
    this._sceneList.add(scene);
    scene.visible = false;
    scene.alpha = 0;
    this.addChild(scene);
  }

  public setSceneActive(scene: Scene): void {
    if (this._sceneList.has(scene)) {
      if (!this._activeScene) {
        scene.visible = true;
        scene.alpha = 1;
        this._activeScene = scene;
        return;
      }
      this._nextScene = scene;
    }
  }

  protected update(): void {
    if (this._nextScene !== null) {
      switch (this.transitionState) {
        case TransitionState.Idle: {
          this.transitionState = TransitionState.Fade;
          this._nextScene.visible = true;
          this._time = 0;
          break;
        }
        case TransitionState.Fade: {
          this._time += Ticker.shared.elapsedMS;
          if (this._activeScene) {
            this._activeScene.alpha = 1 - this._time / SceneManager.FADE_TIME;
            this._nextScene.alpha = this._time / SceneManager.FADE_TIME;
          }
          if (this._nextScene.alpha >= 1) {
            this.transitionState = TransitionState.Idle;
            this._time = 0;
            this._activeScene.visible = false;
            this._activeScene = this._nextScene;
            this._activeScene.alpha = 1;
            this._nextScene = null;
          }
          break;
        }
      }
    }
  }
}
