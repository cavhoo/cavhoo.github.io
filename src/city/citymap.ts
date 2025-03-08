import { Assets, Container, Sprite } from "pixi.js";
import { cityLayout } from "../maps/cityLayout";
import { Direction, Tile, TileType } from "../entities/tile";
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
    //this.createLayout();
    //this.placeBuilding();
  }

  protected createTileMap(): void {
    cityLayout.layers.forEach((layerdata) => {
      const layer = new TileLayer(layerdata, cityLayout.tilewidth, cityLayout.tileheight);
      this.baseLayer.addChild(layer);
    });
  }

  protected placeBuilding(): void {
    const buildingTexture = Assets.get("building3x3");
    const building1 = Sprite.from(buildingTexture);
    building1.position.set(496, -10);
    this.buildingLayer.addChild(building1);
  }

  protected getTileTypeFromTileId(id: number): [TileType, Direction] {
    switch (id) {
      case 0:
        return [TileType.Grass, Direction.Up];
      case 1:
        return [TileType.Road, Direction.Up];
      case 2:
        return [TileType.Road, Direction.Left];
      case 3:
        return [TileType.RoadCurve, Direction.Right];
      case 4:
        return [TileType.RoadCurve, Direction.Down];
      case 5:
        return [TileType.RoadCurve, Direction.Left];
      case 6:
        return [TileType.RoadCurve, Direction.Up];
      case 7:
        return [TileType.RoadCross, Direction.Up];
      case 99:
        return [TileType.Road, Direction.Up];
      case 100:
        return [TileType.Road, Direction.Down];
      case 101:
        return [TileType.Road, Direction.Left];
    }
  }
}
