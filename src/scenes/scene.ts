import { Application, Container, Sprite } from "pixi.js";

export abstract class Scene extends Container {
  protected _app: Application;
  protected backgroundImage: HTMLImageElement;
  public onSceneComplete?: (showNavigation: boolean) => void;

  protected sceneComplete(showNavigation: boolean = false): void {
    if (this.onSceneComplete) {
      this.onSceneComplete(showNavigation);
    }
  }

  protected async createBackgroundImage(sprite: Sprite): Promise<void> {
    if (!this.backgroundImage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.backgroundImage = await (this._app.renderer as any).extract.image(sprite);
    }
  }

  protected setBackgroundColor(_color: string): void {
    //document.body.style.backgroundColor = color;
  }

  protected async setBackgroundImage(): Promise<void> {
    if (this.backgroundImage !== undefined) {
      //document.body.style.backgroundImage = `url(${this.backgroundImage.src})`;
    }
  }

  public onAdded(app: Application): void {
    this._app = app;
  }
  public sceneActivated?(): void;
  public sceneDeactivated?(): void;
}
