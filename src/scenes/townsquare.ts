import { Application, Assets, Container, Sprite, Text, Ticker } from "pixi.js";
import { Scene } from "./scene";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { GrassTileMap } from "../data/tilesets/grassTiles";
import { NPC } from "../entities/characters/npc";
import { Waypoint } from "../types/path";
import { landingMap, landingPaths } from "../maps/landing";
import { Scout } from "../entities/characters/scout";
import { TreeShader } from "../shader/tree/treeshader";

export class TownSquare extends Scene {
  protected _paths: Waypoint[] = [];
  protected _npcs: NPC[] = [];
  protected _tiles: Container;
  constructor() {
    super();
    this.setBackgroundColor("#479757");
    this.label = "LandingScene";
    const text = new Text({
      text: "Under Construction",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    this._tiles = new Container();

    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, (HEIGHT - text.height) / 2);

    text.eventMode = "static";
    text.cursor = "pointer";
    text.addEventListener("pointerdown", () => this.sceneComplete());

    const getTileName = (tileId: number) => GrassTileMap.get(tileId) ?? GrassTileMap.get(22);

    const {
      terrain: { layers },
    } = landingMap;

    layers.forEach((layer) => {
      const tileIds = layer.tileIds;
      layer.data.forEach((row, y) => {
        row.forEach((tileId, x) => {
          const tileName = getTileName(tileIds[tileId]);
          if (tileName) {
            const tile = new Sprite(Assets.get(tileName));
            tile.position.set(x * 32, y * 32);
            this._tiles.addChild(tile);
          }
        });
      });
    });

    const shader = TreeShader.buildShader();
    Ticker.shared.add(() => {
      shader.resources.shaderUniforms.uniforms.uTime += 0.1;
    });
    // Trees
    const tree1 = new Sprite(Assets.get("Tree_159.png"));
    tree1.label = "Tree1";
    tree1.scale = 1;
    tree1.position.set(WIDTH / 2 - 5, HEIGHT / 2);
    tree1.filters = [shader];

    const tree2 = new Sprite(Assets.get("Tree_159.png"));
    tree2.label = "Tree2";
    tree2.scale = 1.5;
    tree2.position.set(64, 320);

    const tree3 = new Sprite(Assets.get("Tree_159.png"));
    tree3.label = "Tree3";
    tree3.scale = 1.5;
    tree3.position.set(800, 100);

    // Houses
    const villa1 = new Sprite(Assets.get("Villa_1.png"));
    villa1.label = "Villa1";
    villa1.position.set(64, 32);

    // Add 'Projects' text on the roof of villa1
    const projectsText = new Text("Projects", {
      fontFamily: FONT,
      fontSize: 24,
      fill: "#fff",
      fontWeight: "bold",
      stroke: "#222",
      dropShadow: {
        color: "#000",
        blur: 4,
        distance: 2,
        alpha: 0.7,
        angle: 45,
      },
    });
    projectsText.anchor.set(0.5, 0.3); // Center horizontally and vertically on the roof
    // Place text centered horizontally on the roof of villa1, but shifted left by half its width
    projectsText.position.set(villa1.position.x + villa1.width / 2 - projectsText.width / 2, villa1.position.y + villa1.height * 0.22);

    const villa2 = new Sprite(Assets.get("Villa_3.png"));
    villa2.label = "Villa2";
    villa2.position.set(964, 231);

    // Add 'About Me' text on the roof of villa2
    const aboutMeText = new Text("About Me", {
      fontFamily: FONT,
      fontSize: 24,
      fill: "#fff",
      fontWeight: "bold",
      stroke: "#222",
      dropShadow: {
        color: "#000",
        blur: 4,
        distance: 2,
        alpha: 0.7,
        angle: 45,
      },
    });
    aboutMeText.anchor.set(0.5, 0.3); // Center horizontally and vertically on the roof
    // Place text centered horizontally on the roof of villa2, but shifted left by half its width
    aboutMeText.position.set(villa2.position.x + villa2.width / 2 - aboutMeText.width / 2, villa2.position.y + villa2.height * 0.22);

    // Character
    const npc1 = new Scout();
    npc1.position.set(32, 32);
    this._npcs.push(npc1);

    this.addChild(this._tiles, tree1, tree3, villa1, projectsText, villa2, aboutMeText, npc1, tree2, text);
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
    this._npcs.forEach((npc) => {
      npc.onWalkingComplete(() => {
        const path = landingPaths[Math.floor(Math.random() * landingPaths.length)];
        path.reset();
        npc.walkOnPath(path, 2);
      });
      const path = landingPaths[Math.floor(Math.random() * landingPaths.length)];
      path.reset();
      npc.walkOnPath(path, 2);
    });
  }
}
