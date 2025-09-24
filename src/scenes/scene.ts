import { Application, Container } from "pixi.js";

export abstract class Scene extends Container {
  protected _app: Application;
  protected backgroundImage: HTMLImageElement;
  public onSceneComplete?: (showNavigation: boolean) => void;

  protected sceneComplete(showNavigation: boolean = false): void {
    if (this.onSceneComplete) {
      this.onSceneComplete(showNavigation);
    }
  }

  public onAdded(app: Application): void {
    this._app = app;
  }
  public sceneActivated?(): void;
  public sceneDeactivated?(): void;
  protected createTextOverlay?(): void;
}
