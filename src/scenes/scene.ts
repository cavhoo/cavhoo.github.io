import { Container } from "pixi.js";

export abstract class Scene extends Container {
  public onSceneComplete?: () => void;
  protected sceneComplete(): void {
    if (this.onSceneComplete) {
      this.onSceneComplete();
    }
  }

  protected setBackgroundColor(color: string): void {
    document.body.style.backgroundColor = color;
  }
}
