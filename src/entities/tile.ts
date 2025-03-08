import { Assets, Container, Sprite } from "pixi.js";

export enum TileType {
  Grass,
  Road, // 1
  RoadCross, // 2
  RoadCurve, // 3
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export class Tile extends Container {
  protected _tileType: TileType;
  protected sprite: Sprite;
  constructor(tileType: number) {
    super();
    this._tileType = tileType;
    this.initialize();
  }

  protected set clickable(clickable: boolean) {
    if (clickable) {
      this.cursor = "pointer";
      this.eventMode = "dynamic";
    } else {
      this.cursor = "none";
      this.eventMode = "none";
    }
  }

  protected initialize(): void {
    const texture = Assets.get(`${this._tileType}`);
    this.sprite = Sprite.from(texture);
    this.addChild(this.sprite);
    this.pivot.set(this.width / 2, this.height / 2);
  }

  protected updateTexture(): void {
    this.sprite.texture = Assets.get(`${this._tileType}`);
  }

  public set tileType(type: TileType) {
    this._tileType = type;
    this.updateTexture();
  }
}
