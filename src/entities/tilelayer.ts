import { Container } from "pixi.js";
import { Tile } from "./tile";

export interface TileLayerData {
  data: number[];
  height: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

export class TileLayer extends Container {
  protected layerData: TileLayerData;
  protected tileWidth: number;
  protected tileHeight: number;
  protected firstTileIndex: number;
  constructor(layerData: TileLayerData, tileWidth: number, tileHeight: number, firstTileIndex: number) {
    super();
    this.layerData = layerData;
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.firstTileIndex = firstTileIndex;
    this.alpha = layerData.opacity;
    this.constructLayer();
    this.pivot.set(this.width / 2, (this.tileHeight * layerData.height) / 2 - 16);
  }

  protected createTile(tileType: number): Tile {
    return new Tile(tileType);
  }

  protected constructLayer(): void {
    const { height, width, data } = this.layerData;
    const startX = (this.tileWidth * width) / 2;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tileIndex = y * width + x;
        const tileSpriteId = data[tileIndex];
        if (tileSpriteId === 0) {
          continue;
        }
        const tile = this.createTile(tileSpriteId);

        const xPos = startX + x * (this.tileWidth / 2) - (y * this.tileWidth) / 2;
        const yPos = (x * this.tileHeight) / 2 + (y * this.tileHeight) / 2;
        tile.position.set(xPos, yPos);
        this.addChild(tile);
      }
    }
  }
}
