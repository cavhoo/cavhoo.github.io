import { Container, Graphics, Text } from "pixi.js";

export abstract class BaseInterior extends Container {
  protected background: Graphics;
  protected content: Container;
  public onExit?: () => void;

  // Virtual design resolution
  protected designWidth = 1280;
  protected designHeight = 720;

  constructor(title: string, color: string = "#1a1a1a") {
    super();

    this.background = new Graphics();
    this.background.rect(0, 0, window.innerWidth, window.innerHeight).fill(color);
    this.addChild(this.background);

    this.content = new Container();
    this.addChild(this.content);

    const titleText = new Text({
      text: title,
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 48,
        fill: "white",
        fontWeight: "800",
      },
    });
    titleText.position.set(40, 40);
    this.content.addChild(titleText);

    this.createLeaveButton();
    this.fitToScreen();

    window.addEventListener("resize", this.onWindowResize);
  }

  protected createLeaveButton() {
    const button = new Container();
    const bg = new Graphics();
    bg.rect(0, 0, 150, 50).fill("white").stroke({ width: 4, color: "black" });

    const text = new Text({
      text: "LEAVE",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 24,
        fill: "black",
        fontWeight: "800",
      },
    });
    text.position.set((150 - text.width) / 2, (50 - text.height) / 2);

    button.addChild(bg, text);
    // Position relative to design resolution
    button.position.set(this.designWidth - 190, this.designHeight - 90);
    button.eventMode = "static";
    button.cursor = "pointer";

    button.on("pointertap", () => {
      if (this.onExit) this.onExit();
    });

    button.on("pointerover", () => {
      bg.clear().rect(0, 0, 150, 50).fill("#FF0000").stroke({ width: 4, color: "black" });
      text.style.fill = "white";
    });

    button.on("pointerout", () => {
      bg.clear().rect(0, 0, 150, 50).fill("white").stroke({ width: 4, color: "black" });
      text.style.fill = "black";
    });

    this.content.addChild(button);
  }

  protected fitToScreen = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.min(screenWidth / this.designWidth, screenHeight / this.designHeight);

    this.content.scale.set(scale);
    this.content.position.set((screenWidth - this.designWidth * scale) / 2, (screenHeight - this.designHeight * scale) / 2);

    this.background.clear().rect(0, 0, screenWidth, screenHeight).fill(this.background.fillStyle.color);
  };

  private onWindowResize = () => {
    this.fitToScreen();
  };

  public destroy(options?: unknown) {
    window.removeEventListener("resize", this.onWindowResize);
    super.destroy(options);
  }
}
