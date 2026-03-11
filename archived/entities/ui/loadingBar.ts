import { Container, Graphics, Text } from "pixi.js";

export class LoadingBar extends Container {
  protected _progress: number = 0;
  protected _progressBarHeight: number;
  protected _progressBarWidth: number;
  protected _loadingBar: Graphics;
  protected _loadingText: Text;
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

    this._loadingText = new Text({
      style: {
        fontFamily: "Jersey10 Regular",
        fontSize: 60,
        fill: "white",
      },
      text: "50%",
    });
    this._loadingText.position.set((graphics.width - this._loadingText.width) / 2, 0);
    this._loadingText.blendMode = "screen";
    this.addChild(this._loadingBar, graphics, this._loadingText);
  }

  public set progress(value: number) {
    this._progress = value;
    this._loadingText.text = `${Math.round(this._progress * 100)}%`;
    this._loadingText.position.set((this._progressBarWidth - this._loadingText.width) / 2, 0);
    this._loadingBar.clear();
    this._loadingBar.roundRect(0, 0, this._progressBarWidth * this._progress, this._progressBarHeight, 5);
    this._loadingBar.fill("#0c5ba6");
  }

  public updateProgressBy(value: number): void {
    this._progress += value;
    this._loadingText.text = `${this._progress * 100}%`;
  }

  public reset(): void {
    this._progress = 0;
  }
}
