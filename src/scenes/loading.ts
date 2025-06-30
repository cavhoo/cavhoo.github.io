import { Text } from "pixi.js";
import { LoadingBar } from "../entities/ui/loadingBar";
import { Scene } from "./scene";
import { Button } from "../entities/ui/button";
import { FONT } from "../types/constants";

export class LoadingScene extends Scene {
  protected loadingBar: LoadingBar;
  protected enterButton: Button;
  constructor() {
    super();

    this.label = "LoadingScene";
    this.loadingBar = new LoadingBar(483, 60);
    this.loadingBar.position.set((1366 - this.loadingBar.width) / 2, (720 - this.loadingBar.height) / 2);

    const name = new Text({
      text: "Hendrik (Excyl)",
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 80,
      },
    });
    name.position.set((1366 - name.width) / 2, 200);

    const jobTitle = new Text({
      text: "game developer",
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 40,
      },
    });
    jobTitle.position.set((1366 - jobTitle.width) / 2, 270);

    this.enterButton = new Button({
      text: "START",
      width: 483,
      height: 60,
      style: {
        fontFamily: FONT,
        fontSize: 60,
        fill: "white",
      },
    });

    this.enterButton.visible = false;
    this.enterButton.eventMode = "static";
    this.enterButton.cursor = "pointer";
    this.enterButton.on("pointerdown", () => {
      this.sceneComplete();
    });
    this.enterButton.position.set((1366 - this.enterButton.width) / 2, this.loadingBar.position.y);

    this.addChild(this.loadingBar, name, jobTitle, this.enterButton);
  }

  public updateProgress(value: number): void {
    this.loadingBar.progress = value;
    if (value >= 1) {
      this.loadingBar.visible = false;
      this.enterButton.visible = true;
    }
  }
}
