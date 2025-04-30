import { AnimatedSprite, Assets, Sprite, Text, Texture } from "pixi.js";
import { Scene } from "./scene";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { GrassTileMap } from "../data/tilesets/grassTiles";
import { Sign } from "../entities/props/sign";
import { NPC, NPCState } from "../entities/characters/npc";
import { Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";
import { formatRFC3339 } from "date-fns";

const landingMap: number[][] = [
  [1, 5, 5, 5, 5, 10, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2],
  [7, 12, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
  [7, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 8],
  [3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 12, 6, 6, 4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0],
];

const PATHS = [];

export class LandingScene extends Scene {
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
    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, (HEIGHT - text.height) / 2);

    const getTileName = (tileId: number) => GrassTileMap.get(tileId) ?? GrassTileMap.get(22);

    for (let y = 0; y < landingMap.length; y++) {
      const row = landingMap[y];
      for (let x = 0; x < row.length; x++) {
        const tile = new Sprite(Assets.get(getTileName(row[x])));
        tile.position.set(x * 32, y * 32);
        this.addChild(tile);
      }
    }

    const signRight = new Sign("Sign_1.png");
    signRight.scale = 2;
    signRight.position.set(WIDTH - signRight.width * 2, HEIGHT / 2);

    const signLeft = new Sign("Sign_3.png");
    signLeft.scale = 2;
    signLeft.position.set(signLeft.width, 200);

    const tree1 = new Sprite(Assets.get("Tree_159.png"));
    tree1.scale = 1.5;
    tree1.position.set(WIDTH / 2, HEIGHT / 2);

    const signText1 = new Text({
      text: "PROJECTS",
      style: {
        fontSize: 15,
        fontFamily: "Tiny5 Regular",
        fill: "#4d3114",
      },
    });

    signText1.anchor.set(0.5, 0.25);
    signText1.position.set(signLeft.position.x + signLeft.width / 2, signLeft.position.y + signLeft.height / 2);

    const npc1 = new NPC([
      [NPCState.IdleRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.IdleUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.IdleLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.IdleDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.WalkingRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.WalkingUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.WalkingLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [NPCState.WalkingDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
    ]);

    const path = new Waypoint(Vector.from([6 * 32 - 16, -64]));
    path
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([1 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])));

    const path2 = new Waypoint(Vector.from([6 * 32 - 16, -64]));
    path2
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([39 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])));

    const path3 = new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]));
    path3
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([1 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, -64])));

    const path4 = new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]));
    path4
      .addNext(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
      .addNext(new Waypoint(Vector.from([39 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, 0])))
      .addNext(new Waypoint(Vector.from([6 * 32 - 16, -64])));

    const paths = [path, path2, path3, path4];
    npc1.onWalkingComplete(() => {
      npc1.walkOnPath(paths[Math.floor(Math.random() * 4)], 2);
    });
    npc1.walkOnPath(paths[Math.floor(Math.random() * 4)], 2);
    npc1.play(NPCState.WalkingLeft);

    this.addChild(signRight, signLeft, tree1, text, signText1, npc1);
  }
}
