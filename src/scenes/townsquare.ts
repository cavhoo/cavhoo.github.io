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
      text: "Welcome to Excylonia",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    this._tiles = new Container();

    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, 15);

    text.eventMode = "static";
    text.cursor = "pointer";
    text.addEventListener("pointerdown", () => this.sceneComplete());

    const navLeft = new Text({
      text: "<",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    navLeft.position.set(navLeft.width, (HEIGHT - navLeft.height) / 2);
    navLeft.eventMode = "static";
    navLeft.cursor = "pointer";

    const navRight = new Text({
      text: ">",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });
    navRight.position.set(WIDTH - navRight.width * 2, (HEIGHT - navRight.height) / 2);
    navRight.eventMode = "static";
    navRight.cursor = "pointer";

    const concreteLayer = new BlockLayer(landingMap.terrain.layers[0]);

    concreteLayer.position.set(WIDTH / 2, concreteLayer.height / 2);

    const building = new BlockBuilding(landingMap.buildings[0]);
    building.position.set(WIDTH / 2, HEIGHT / 2);

    this.addChild(concreteLayer, building, navLeft, navRight);
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
