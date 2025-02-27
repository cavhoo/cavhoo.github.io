import { Assets, Container, Sprite } from "pixi.js";

export enum TileType {
  Grass = "grass",
  Road = "road",
  RoadAlternate = "roadAlt",
  RoadCross = "roadCross",
  RoadCurve = "roadCurve",
  RoadCurveUp = "roadCurveUp",
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export class Tile extends Container {
  protected _tileType: TileType;
  protected _tileDirection: Direction;
  protected sprite: Sprite;
  constructor(tileType: TileType, direction: Direction) {
    super();
    this._tileType = tileType;
    this._tileDirection = direction;
    this.initialize();
  }

  protected initialize(): void {
    const texture = Assets.get(this._tileType);
    this.sprite = Sprite.from(texture);
    this.updateDirection();
    this.addChild(this.sprite);
  }

  protected updateTexture(): void {
    this.sprite.texture = Assets.get(this._tileType);
  }

  protected updateDirection(): void {
    switch (this._tileDirection) {
      case Direction.Left:
        {
          this.sprite.pivot.set(this.sprite.width, 0);
          this.sprite.scale.x = -1;
        }
        break;
      case Direction.Up:
        {
          this.sprite.pivot.set(0, 0);
          this.sprite.scale.y = 1;
        }
        break;
      case Direction.Down:
        {
          this.sprite.pivot.set(0, this.sprite.height);
          this.sprite.scale.y = -1;
        }
        break;
    }
  }

  public set tileType(type: TileType) {
    this._tileType = type;
    this.updateTexture();
    this.updateDirection();
  }
}
