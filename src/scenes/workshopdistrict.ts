import { Application, Sprite, Text } from "pixi.js";
import { BlockBuilding } from "../entities/blockBuilding";
import { BlockLayer } from "../entities/blockLayer";
import { NPC } from "../entities/characters/npc";
import { workshopsMap } from "../maps/projects";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { Scene } from "./scene";

export class WorkshopDistrict extends Scene {
  protected _npcs: NPC[] = [];
  constructor() {
    super();
    const text = new Text({
      text: "Projects",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });
    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, 15);

    const layer = new BlockLayer(workshopsMap.terrain.layers[0]);
    workshopsMap.buildings.forEach((building) => {
      const b = new BlockBuilding(building, (label) => console.log("Building clicked", label));
      layer.addBuilding(b, building.position.x, building.position.y);
    });
    layer.position.set(WIDTH / 2, HEIGHT);
    this.addChild(layer, text);
  }

  public override onAdded(app: Application): void {
    super.onAdded(app);
  }

  public sceneActivated(): void {}

  public sceneDeactivated(): void {}
}
