import { AnimatedSprite, Container, Texture } from "pixi.js";

export class AnimatedIcon extends Container {
  protected animatedSprite: AnimatedSprite;
  constructor(protected frames: string[], tint?: string) {
    super();
    this.animatedSprite = new AnimatedSprite({
      textures: frames.map((frame) => Texture.from(frame)),
      animationSpeed: 0.1,
      autoPlay: true,
    });

    if (tint) {
      this.animatedSprite.tint = tint;
    }

    this.addChild(this.animatedSprite);
  }
}
