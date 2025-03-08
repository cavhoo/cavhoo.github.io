import { Container } from "pixi.js";
import { cityLayout } from "../maps/cityLayout";
import { TileLayer } from "../entities/tilelayer";

export class City extends Container {
  protected baseLayer: Container;
  protected roadLayer: Container;
  protected buildingLayer: Container;
  constructor(protected mapSizeX: number, protected mapSizeY: number) {
    super();
    this.baseLayer = new Container();
    this.roadLayer = new Container();
    this.buildingLayer = new Container();
    this.addChild(this.baseLayer, this.roadLayer, this.buildingLayer);
    this.createTileMap();
  }

  protected createTileMap(): void {
    cityLayout.layers.forEach((layerdata) => {
      const layer = new TileLayer(layerdata, cityLayout.tilewidth, cityLayout.tileheight, cityLayout.tilesets[0].firstgid);
      this.baseLayer.addChild(layer);
    });
  }
}
