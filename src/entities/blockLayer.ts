import { Assets, Container, Sprite } from "pixi.js";
import { Layer } from "../types/map";
import { BlockTextureIds } from "../data/blocks/blocks";

export class BlockLayer extends Container {
  constructor(protected layerData: Layer) {
    super();
    for (let y = 0; y < layerData.height; y++) {
      for (let x = 0; x < layerData.width; x++) {
        const id = layerData.data[y][x];
        const textureId = BlockTextureIds[layerData.tileIds[id]];
        const tile = new Sprite(Assets.get(textureId));
        tile.anchor.set(0.5, 0.5);
        tile.position.set(16 * (x - y), 8 * (x + y));
        this.addChild(tile);
      }
    }
  }
}
