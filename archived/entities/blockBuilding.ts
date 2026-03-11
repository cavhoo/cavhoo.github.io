import { GlowFilter } from "pixi-filters";
import { Assets, Container, Sprite } from "pixi.js";
import { BlockIndex, BlockTextureIds } from "../data/blocks/blocks";
import { Building } from "../types/map";
import { HoloIcon } from "./props/holoicon";

export class BlockBuilding extends Container {
  protected buildingLayer: Container;
  protected hoverGlow: GlowFilter;
  constructor(protected buildingData: Building, protected onClick?: (name: string) => void) {
    super();
    this.buildingLayer = new Container();
    this.addChild(this.buildingLayer);
    this.label = buildingData.buildingName;
    this.eventMode = "static";
    this.cursor = "pointer";
    for (let z = 0; z < buildingData.data.length; z++) {
      const storyLayer = buildingData.data[z];
      for (let y = 0; y < storyLayer.length; y++) {
        const storyRow = storyLayer[y];
        for (let x = 0; x < storyRow.length; x++) {
          const id = storyRow[x];
          const blockId = buildingData.blockIds[id];

          if (blockId === BlockIndex.Empty) {
            continue;
          }
          const textureId = BlockTextureIds[blockId];
          const tile = new Sprite(Assets.get(textureId));
          tile.anchor.set(0.5, 0.5);
          tile.position.set(16 * (x - y), 8 * (x + y));
          tile.position.y = tile.position.y - 16 * z;
          this.buildingLayer.addChild(tile);
        }
      }
    }

    this.pivot.set(-32, 16);
    if (buildingData.icon) {
      const holoCone = new HoloIcon({
        frames: Array.from({ length: buildingData.icon.frameCount }, (_, frame) => buildingData.icon.baseTextureName.replace("{frame}", `${frame + 1}`)),
        tint: buildingData.icon.tint,
      });

      holoCone.position.set(0, 0);
      this.addChild(holoCone);
    }
  }
}
