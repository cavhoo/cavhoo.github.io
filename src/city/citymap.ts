import { Assets, Container, Sprite } from "pixi.js";
import { cityLayout } from "./layout";
import { Direction, Tile, TileType } from "../entities/tile";

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
    this.createLayout();
    //this.placeBuilding();
  }

  protected createTileMap(): void {
    for (let y = 0; y < this.mapSizeY; y++) {
      for (let x = 0; x < this.mapSizeX; x++) {
        const tile = new Tile(TileType.Grass, Direction.Up);
        tile.position.set((tile.width) * x + tile.width * 0.5, tile.height * y + tile.height * 0.5);
        this.baseLayer.addChild(tile);
      }
    }

    //this.baseLayer.cacheAsTexture(true);
  }

  protected createLayout(): void {
    cityLayout.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile !== 0) {
          const [tileType, tileDirection] = this.getTileTypeFromTileId(tile);
          const tileSprite = new Tile(tileType, tileDirection);
          tileSprite.position.set(tileSprite.width * x + tileSprite.width * 0.5, tileSprite.height * y + tileSprite.width * 0.5);
          this.roadLayer.addChild(tileSprite);
        }
      });
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
