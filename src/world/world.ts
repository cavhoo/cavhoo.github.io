import { Assets, Color, Container, Graphics, Texture, Rectangle } from "pixi.js";
import { TILE_COUNT_X, TILE_COUNT_Y, TILE_SIZE } from "../types/constants";
import { CompositeTilemap } from "@pixi/tilemap";

export class World extends Container {
  protected groundTileTexture: Texture;
  constructor() {
    super();

    const gfx = new Graphics();
    for (let x = 0; x < TILE_COUNT_X; x++) {
      for (let y = 0; y < TILE_COUNT_Y; y++) {
        gfx.fill({ color: new Color({ r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) }) });
        gfx.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
    this.addChild(gfx);
  }

  protected getTile(index: number): Texture {
    const size = 32;
    const columns = 8;

    const x = (index % columns) * size;
    const y = Math.floor(index / columns) * size;

    return new Texture({ source: this.groundTileTexture.source, frame: new Rectangle(x, y, size, size) });
  }
}
