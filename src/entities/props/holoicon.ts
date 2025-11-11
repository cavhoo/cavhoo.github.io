import { AnimatedSprite, Container, Texture } from "pixi.js";
import { AnimatedIcon } from "../animatedIcon";

export class HoloIcon extends Container {
  constructor(icon: { frames: string[]; tint?: string }) {
    super();
    const holoCone = new AnimatedSprite({
      textures: [Texture.from("holocone1.png"), Texture.from("holocone2.png")],
      animationSpeed: 0.1,
      autoPlay: true,
    });
    holoCone.alpha = 0.5;
    holoCone.scale.set(2, 2);
    holoCone.anchor.set(0.5, 1);
    holoCone.position.set(0, 0);

    const animatedIcon = new AnimatedIcon(icon.frames, icon.tint);
    animatedIcon.position.set(-animatedIcon.width / 2, holoCone.position.y - holoCone.height + 20);
    this.addChild(holoCone, animatedIcon);
  }
}
