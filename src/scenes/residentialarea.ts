import { Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { Scene } from "./scene";
import { BlockLayer } from "../entities/blockLayer";
import { residentialMap } from "../maps/residentalMap";

export class ResidentialArea extends Scene {
  constructor() {
    super();

    const text = new Text({
      text: "Experience",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });
    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, 15);

    const blocks = new BlockLayer(residentialMap.terrain.layers[0]);

    blocks.position.set(WIDTH / 2, HEIGHT);
    this.addChild(blocks, text);
  }
}
