import { Application, Container, Text } from "pixi.js";
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
    this.label = "LandingScene";
    const text = new Text({
      text: "Welcome",
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
      concreteLayer.addBuilding(new BlockBuilding(buildingData, (name) => this.onBuildingClicked(name)), buildingData.position.x, buildingData.position.y);
    });
    concreteLayer.position.set(WIDTH / 2, HEIGHT);

    this.addChild(concreteLayer, text);
  }

  public override onAdded(app: Application): void {
    super.onAdded(app);
  }

  public sceneActivated(): void {}

  public sceneDeactivated(): void {}

  protected onBuildingClicked(name: string): void {
    console.log(`Clicked on building: ${name}`);
  }
}
