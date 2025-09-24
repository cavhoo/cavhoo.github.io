import { Application, Container, Graphics, Text } from "pixi.js";
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
  protected _textOverlay: Container;
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

    this._textOverlay = new Container();
    const background = new Graphics();
    background.roundRect(0, 0, WIDTH * 0.6, HEIGHT * 0.8).fill("rgba(80,80,80, 0.7)");
    background.position.set((WIDTH - background.width) / 2, (HEIGHT - background.height) / 2 + 30);
    this._textOverlay.addChild(background);
    this._textOverlay.visible = false;

    this.addChild(concreteLayer, text, this._textOverlay);
  }

  public override onAdded(app: Application): void {
    super.onAdded(app);
  }

  public sceneActivated(): void {
    this._textOverlay.visible = true;
  }

  public sceneDeactivated(): void {
    this._npcs.forEach((npc) => npc.stop());
    this._textOverlay.visible = false;
  }

  protected onBuildingClicked(name: string): void {
    console.log(`Clicked on building: ${name}`);
  }
}
