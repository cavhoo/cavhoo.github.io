import { Assets, Container, Sprite } from "pixi.js";
import { Building } from "../types/map";
import { BlockTextureIds } from "../data/blocks/blocks";

export class BlockBuilding extends Container {
  constructor(protected buildingData: Building) {
    super();
    for (let z = 0; z < buildingData.data.length; z++) {
      const storyLayer = buildingData.data[z];
      for (let y = 0; y < storyLayer.length; y++) {
        const storyRow = storyLayer[y];
        for (let x = 0; x < storyRow.length; x++) {
          const id = storyRow[x];
          const textureId = BlockTextureIds[buildingData.blockIds[id]];
          const tile = new Sprite(Assets.get(textureId));
          tile.anchor.set(0.5, 0.5);
          tile.position.set(16 * (x - y), 8 * (x + y));
          tile.position.y = tile.position.y - 16 * z;
          this.addChild(tile);
        }
      }
    }
  }
}
