import { Text } from "pixi.js";
import { Scene } from "./scene";
import { FONT, HEIGHT, WIDTH } from "../types/constants";

export class LandingScene extends Scene {
  constructor() {
    super();

    const text = new Text({
      text: "Under Construction",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    text.position.set((WIDTH - text.width) / 2, (HEIGHT - text.height) / 2);

    this.addChild(text);
  }
}
