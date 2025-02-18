import { Container, Sprite, Texture } from "pixi.js";

export class Floor extends Container {
  protected tileCount: number = 0;
  protected tilesPerSide: number = 0;
  protected tileTexture: Texture;
  protected tiles: Sprite[] = [];

  constructor(tileCount: number, floorTexture: Texture) {
    super();
    if (tileCount % Math.sqrt(tileCount) !== 0) {
      throw new Error("tileCount needs to be multiple of number: e.g. 25 = 5");
    }


    this.tileCount = tileCount;
    this.tileTexture = floorTexture;

    this.tilesPerSide = Math.sqrt(this.tileCount);
    this.label = "Floor";

    for (let index = 0; index < tileCount; index++) {
      this.createTile(index);
    }
  }

  protected createTile(tileIndex: number) {
    const xIndex = tileIndex % 8;
    const yIndex = Math.floor(tileIndex / 8);
    const floorTile = new Sprite(this.tileTexture);
    floorTile.anchor.set(0.5, 0);
    floorTile.position.set((yIndex * floorTile.width / 2) + (xIndex * floorTile.width / 2), (yIndex * floorTile.height / 2) - (xIndex * floorTile.height / 2))
    this.tiles.push(floorTile);
    this.addChild(floorTile)
  }
}
