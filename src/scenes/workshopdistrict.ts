import { Application, Assets, Sprite } from "pixi.js";
import { projectsMap, projectsPath } from "../maps/projects";
import { Scene } from "./scene";
import { NPC } from "../entities/characters/npc";
import { Scout } from "../entities/characters/scout";
import { CityTileMap } from "../data/tilesets/cityTiles";

export class WorkshopDistrict extends Scene {
  protected _npcs: NPC[] = [];
  constructor() {
    super();
    this.setBackgroundColor("#479757");

    const getTileName = (tileId: number) => CityTileMap.get(tileId) ?? CityTileMap.get(1);

    for (let y = 0; y < projectsMap.length; y++) {
      const row = projectsMap[y];
      for (let x = 0; x < row.length; x++) {
        const tile = new Sprite(Assets.get(getTileName(row[x])));
        tile.position.set(x * 32, y * 32);
        this.addChild(tile);
      }
    }

    this.eventMode = "static";
    this.addEventListener("pointerdown", () => this.sceneComplete());

    const npc1 = new Scout();
    npc1.position.set(-100, -100);
    this._npcs.push(npc1);
    this.addChild(npc1);
  }

  public override onAdded(app: Application): void {
    super.onAdded(app);
    void this.createBackgroundImage(new Sprite(Assets.get(CityTileMap.get(1))));
  }

  public sceneActivated(): void {
    this.setBackgroundImage();
    this._npcs.forEach((npc) => {
      npc.onWalkingComplete(() => {
        const path = projectsPath[Math.floor(Math.random() * projectsPath.length)];
        path.reset();
        npc.walkOnPath(path, 2);
      });

      const path = projectsPath[Math.floor(Math.random() * projectsPath.length)];
      path.reset();
      npc.walkOnPath(path, 2);
    });
  }

  public sceneDeactivated(): void {
    this._npcs.forEach((npc) => npc.stop());
  }
}
