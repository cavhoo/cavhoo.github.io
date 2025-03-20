import { LoadingBar } from "../entities/ui/loadingBar";
import { Scene } from "./scene";

export class LoadingScene extends Scene {
  protected loadingBar: LoadingBar;
  constructor() {
    super();
    this.loadingBar = new LoadingBar(483, 60);
    this.addChild(this.loadingBar);
  }

  public updateProgress(value: number): void {
    this.loadingBar.progress = value;
  }
}
