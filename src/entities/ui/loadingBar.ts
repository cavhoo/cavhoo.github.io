import { Container, Graphics } from "pixi.js";

export class LoadingBar extends Container {
  protected _progress: number = 0;
  protected _progressBarHeight: number;
  protected _progressBarWidth: number;
  protected _loadingBar: Graphics;
  constructor(width: number, height: number) {
    super();
    this._progressBarHeight = height;
    this._progressBarWidth = width;
    this.init();
  }

  protected init(): void {
    this._loadingBar = new Graphics();
    this._loadingBar.roundRect(0, 0, this._progressBarWidth * this._progress, this._progressBarHeight, 5);
    this._loadingBar.fill("lightblue");

    const graphics = new Graphics();
    graphics.roundRect(0, 0, this._progressBarWidth, this._progressBarHeight, 5);
    graphics.stroke({ width: 3, color: "white" });
    this.addChild(this._loadingBar, graphics);
  }

  public set progress(value: number) {
    this._progress = value;
    this._loadingBar.clear();
    this._loadingBar.roundRect(0, 0, this._progressBarWidth * this._progress, this._progressBarHeight, 5);
    this._loadingBar.fill("lightblue");
  }

  public updateProgressBy(value: number): void {
    this._progress += value;
  }

  public reset(): void {
    this._progress = 0;
  }
}
