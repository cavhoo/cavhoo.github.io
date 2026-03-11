import { Assets, Container, Sprite } from "pixi.js";

export class Sign extends Container {
  protected signSprite: Sprite;

  constructor(spriteId: string) {
    super();
    this.signSprite = new Sprite(Assets.get(spriteId));
    this.signSprite.eventMode = "static";
    this.signSprite.cursor = "pointer";
    this.signSprite.on("pointerover", () => {
      console.log("Mouseover");
    });
    this.addChild(this.signSprite);
  }
}
