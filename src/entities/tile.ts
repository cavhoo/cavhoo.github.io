import { Assets, Container, Sprite } from "pixi.js";

export enum TileType {
  Grass = "grass", // 0
  Road = "road", // 1
  RoadCross = "roadCross", // 2
  RoadCurve = "roadCurve", // 3
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
    this.sprite.anchor.set(0.5, 0.5);
    switch (this._tileDirection) {
      case Direction.Left:
        {
          this.sprite.rotation = Math.PI / 2;
        }
        break;
      case Direction.Right:
        {
          this.sprite.rotation = (Math.PI * 3) / 2;
        }
        break;
      case Direction.Up:
        {
          this.sprite.rotation = 0;
        }
        break;
      case Direction.Down:
        {
          this.sprite.rotation = Math.PI;
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
