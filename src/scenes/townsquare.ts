import { Application, Assets, Container, Sprite, Text } from "pixi.js";
import { GrassTileMap } from "../data/tilesets/grassTiles";
import { BlockBuilding } from "../entities/blockBuilding";
import { BlockLayer } from "../entities/blockLayer";
import { NPC } from "../entities/characters/npc";
import { landingMap } from "../maps/landing";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { Waypoint } from "../types/path";
import { Scene } from "./scene";

export class TownSquare extends Scene {
  protected _paths: Waypoint[] = [];
  protected _npcs: NPC[] = [];
  protected _tiles: Container;
  constructor() {
    super();
    this.setBackgroundColor("#479757");
    this.label = "LandingScene";
    const text = new Text({
      text: "Landing",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    this._tiles = new Container();

    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, 15);

    const concreteLayer = new BlockLayer(landingMap.terrain.layers[0]);
    landingMap.buildings.forEach((buildingData) => {
      concreteLayer.addBuilding(new BlockBuilding(buildingData), buildingData.position.x, buildingData.position.y);
    });
    concreteLayer.position.set(WIDTH / 2, HEIGHT);

    this.addChild(concreteLayer, text);
  }

  public override onAdded(app: Application): void {
    super.onAdded(app);
    void this.createBackgroundImage(new Sprite(Assets.get(GrassTileMap.get(22))));
  }

  public sceneDeactivated(): void {
    this._npcs.forEach((npc) => npc.stop());
  }

  public sceneActivated(): void {
    this.setBackgroundImage();
  }
}
