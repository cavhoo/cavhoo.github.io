import { Assets, Container, Sprite } from "pixi.js";
import { BlockTextureIds } from "../data/blocks/blocks";
import { Layer } from "../types/map";
import { BlockBuilding } from "./blockBuilding";

export class BlockLayer extends Container {
  protected buildingLayer: Container;
  protected blockLayer: Container;
  protected totalWidth: number;
  constructor(protected layerData: Layer) {
    super();
    this.buildingLayer = new Container();
    this.blockLayer = new Container();
    this.totalWidth = layerData.width * 32;
    for (let y = 0; y < layerData.height; y++) {
      for (let x = 0; x < layerData.width; x++) {
        const id = layerData.data[y][x];
        const textureId = BlockTextureIds[layerData.tileIds[id]];
        const tile = new Sprite(Assets.get(textureId));
        tile.anchor.set(0.5, 0.5);
        tile.position.set(16 * (x - y) + this.totalWidth / 2, 8 * (x + y) + 16);
        this.blockLayer.addChild(tile);
      }
    }
    this.addChild(this.blockLayer, this.buildingLayer);
    this.pivot.set(this.blockLayer.width / 2, this.blockLayer.height);
  }

  public addBuilding(building: BlockBuilding, x: number, y: number): void {
    const xPos = 16 * (x - y) + this.totalWidth / 2;
    const yPos = 8 * (x + y);
    building.position.set(xPos, yPos);
    this.buildingLayer.addChild(building);
  }
}
