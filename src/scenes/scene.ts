import { Application, Container, Sprite } from "pixi.js";

export abstract class Scene extends Container {
  protected _app: Application;
  protected backgroundImage: HTMLImageElement;
  public onSceneComplete?: () => void;

  protected sceneComplete(): void {
    if (this.onSceneComplete) {
      this.onSceneComplete();
    }
  }

  protected async createBackgroundImage(sprite: Sprite): Promise<void> {
    if (!this.backgroundImage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.backgroundImage = await (this._app.renderer as any).extract.image(sprite);
    }
  }

  protected setBackgroundColor(color: string): void {
    document.body.style.backgroundColor = color;
  }

  protected async setBackgroundImage(): Promise<void> {
    if (this.backgroundImage !== undefined) {
      document.body.style.backgroundImage = `url(${this.backgroundImage.src})`;
    }
  }

  public onAdded(app: Application): void {
    this._app = app;
  }
  public sceneActivated?(): void;
  public sceneDeactivated?(): void;
}
