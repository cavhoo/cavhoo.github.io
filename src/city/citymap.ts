import { Container } from "pixi.js";
import { cityLayout } from "./layout";
import { Direction, Tile, TileType } from "../entities/tile";

export class City extends Container {
  protected baseLayer: Container;
  protected roadLayer: Container;
  constructor(protected mapSizeX: number, protected mapSizeY: number) {
    super();
    this.baseLayer = new Container();
    this.roadLayer = new Container();
    this.addChild(this.baseLayer, this.roadLayer);
    this.createTileMap();
    this.createLayout();
  }

  protected createTileMap(): void {
    for (let y = 0; y < this.mapSizeY; y++) {
      for (let x = 0; x < this.mapSizeX; x++) {
        const tile = new Tile(TileType.Grass, Direction.Up);
        tile.position.set((tile.width / 2) * (x + y), (tile.height / 2) * (y - x));
        this.baseLayer.addChild(tile);
      }
    }

    this.baseLayer.cacheAsTexture(true);
  }

  protected createLayout(): void {
    cityLayout.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile !== 0) {
          const [tileType, tileDirection] = this.getTileTypeFromTileId(tile);
          const tileSprite = new Tile(tileType, tileDirection);
          tileSprite.position.set((tileSprite.width / 2) * (x + y), (tileSprite.height / 2) * (y - x));
          this.roadLayer.addChild(tileSprite);
        }
      });
    });
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
        return [TileType.RoadCurveUp, Direction.Up];
      case 4:
        return [TileType.RoadCurveUp, Direction.Down];
      case 5:
        return [TileType.RoadCurve, Direction.Left];
      case 6:
        return [TileType.RoadCurve, Direction.Right];
      case 7:
        return [TileType.RoadCross, Direction.Up];
    }
  }
}
