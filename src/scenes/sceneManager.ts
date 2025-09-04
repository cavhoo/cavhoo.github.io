import { gsap } from "gsap";
import { Application, Container, Graphics, Ticker } from "pixi.js";
import { Scene } from "./scene";
import { Navigation, NavigationDirection } from "../entities/ui/navigation";
import { HEIGHT, WIDTH } from "../types/constants";

enum TransitionState {
  Fade,
  Idle,
  Left,
  Right,
  Transitioning,
}

export class SceneManager extends Container {
  protected static FADE_TIME: number = 250;
  protected static MOVE_TIME: number = 1.5;
  protected static MOVE_EASE: string = "elastic.out(i, 0.75)";
  protected _sceneList: Map<string, Scene> = new Map();
  protected _activeScene: Scene;
  protected _nextScene: Scene | null = null;

  protected transitionState: TransitionState = TransitionState.Idle;
  protected _app: Application;
  protected _time: number = 0;
  protected _sceneContainer: Container;
  protected _sceneNavigation: Navigation;

  protected sceneIndex: number = 2;

  constructor(app: Application) {
    super();
    this.label = "SceneManager";
    this._app = app;
    Ticker.shared.add(this.update, this);
    this._sceneContainer = new Container();
    this._sceneNavigation = new Navigation((direction) => this.handleNavigation(direction));
    this._sceneNavigation.visible = false;
    const mask = new Graphics();
    mask.rect(0, 0, WIDTH, HEIGHT).fill({ color: 0x000000 });
    this.addChild(this._sceneContainer, this._sceneNavigation, mask);
    this.mask = mask;
  }

  protected moveSceneIntoView(direction: NavigationDirection): void {
    const directionMutliplier = direction === NavigationDirection.Left ? 1 : -1;
    this._nextScene.position.set(this._nextScene.width * directionMutliplier * -1, 0);
    this._nextScene.visible = true;
    gsap.to(this._nextScene.position, { x: 0, duration: SceneManager.MOVE_TIME, ease: SceneManager.MOVE_EASE });
    gsap.to(this._activeScene.position, {
      x: directionMutliplier * WIDTH,
      duration: SceneManager.MOVE_TIME,
      ease: SceneManager.MOVE_EASE,
      onComplete: () => {
        this.transitionState = TransitionState.Idle;
        this._activeScene.visible = false;
        this._activeScene.sceneDeactivated?.();
        this._activeScene = this._nextScene;
        this._activeScene.alpha = 1;
        this._activeScene.sceneActivated?.();
        this._nextScene = null;
      },
    });
  }

  protected handleNavigation(direction: NavigationDirection): void {
    if (direction === NavigationDirection.Left) {
      if (this.sceneIndex > 1 && this.transitionState === TransitionState.Idle) {
        const nextScene = this._sceneList.get([...this._sceneList.keys()][this.sceneIndex - 1]);
        if (nextScene) {
          this._nextScene = nextScene;
          this.transitionState = TransitionState.Transitioning;
          this._nextScene.position.set(-this._nextScene.width, 0);
          this.sceneIndex--;
          this._nextScene.visible = true;
          this.moveSceneIntoView(direction);
        }
      }
      return;
    }

    if (direction === NavigationDirection.Right) {
      if (this.sceneIndex < this._sceneList.size - 1 && this.transitionState === TransitionState.Idle) {
        const nextScene = this._sceneList.get([...this._sceneList.keys()][this.sceneIndex + 1]);
        if (nextScene) {
          this._nextScene = nextScene;
          this._nextScene.visible = true;
          this.transitionState = TransitionState.Transitioning;

          this.sceneIndex++;
          this.moveSceneIntoView(direction);
        }
      }
      return;
    }
  }

  public showNavigation(): void {
    this._sceneNavigation.visible = true;
  }

  public addScene(sceneName: string, scene: Scene, index: number): void {
    this._sceneList.set(sceneName, scene);
    scene.onAdded(this._app);
    scene.position.set(WIDTH * index, 0);
    this._sceneContainer.addChild(scene);
  }

  public addScenes(...scenes: [string, Scene][]): void {
    scenes.forEach(([name, scene], index) => {
      scene.onAdded(this._app);
      this._sceneList.set(name, scene);
      scene.position.set(scene.width * (index - 1), 0);
      this._sceneContainer.addChild(scene);
    });
  }

  public setSceneActive(sceneName: string): void {
    if (this._sceneList.has(sceneName)) {
      const scene = this._sceneList.get(sceneName);
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
        case TransitionState.Left:
        case TransitionState.Right:
          break;
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
            this._activeScene.sceneDeactivated?.();
            this._activeScene = this._nextScene;
            this._activeScene.alpha = 1;
            this._activeScene.sceneActivated?.();
            this._nextScene = null;
          }
          break;
        }
      }
    }
  }
}
