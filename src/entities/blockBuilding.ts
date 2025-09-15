import { Assets, Container, Sprite } from "pixi.js";
import { GlowFilter } from "pixi-filters";
import { Building } from "../types/map";
import { BlockIndex, BlockTextureIds } from "../data/blocks/blocks";
import { Tooltip } from "./ui/tooltip";
import { Vector } from "../utilities/vector";

export class BlockBuilding extends Container {
  protected buildingLayer: Container;
  protected hoverGlow: GlowFilter;
  constructor(protected buildingData: Building, protected onClick?: (name: string) => void) {
    super();
    this.buildingLayer = new Container();
    this.addChild(this.buildingLayer);
    this.label = buildingData.buildingName;
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

    const tooltip = new Tooltip({ text: this.label, size: new Vector(200, 50) });
    tooltip.visible = false;
    this.addChild(tooltip);
    if (onClick) {
      this.hoverGlow = new GlowFilter({ distance: 15, outerStrength: 2, color: 0xffff99 });
      this.hoverGlow.enabled = false;
      this.buildingLayer.filters = [this.hoverGlow];
      this.eventMode = "static";
      this.cursor = "pointer";
      this.on("pointerover", () => {
        this.hoverGlow.enabled = true;
        tooltip.visible = true;
      });

      this.on("pointerleave", () => {
        tooltip.visible = false;
        this.hoverGlow.enabled = false;
      });
    }

    this.pivot.set(-32, 16);
  }
}
