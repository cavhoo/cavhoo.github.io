import { Assets, Sprite, Text } from "pixi.js";
import { GrassTileMap } from "../data/tilesets/grassTiles";
import { aboutMap, aboutPath } from "../maps/about";
import { Scene } from "./scene";
import { FONT } from "../types/constants";
import { Scout } from "../entities/characters/scout";
import { NPC } from "../entities/characters/npc";

const content = `
Hello, my name is Hendrik.
I am a game developer with 12 years of experience in the iGaming industry.
Since 2012, I have been developing slot games for the online market
in Typescript.

My main focus during work was creating and maintaining the frameworks
to bring those games to life.

I enjoy solving complex problems and coming up with new ways of making the life
of the game developers easier, also enabling game design to use more advanced
techniques.

Working closely with artists and understanding their needs and requirements
is key to keep evolving the frameworks to deliver high quality games.
`;

export class About extends Scene {
  protected _npcs: NPC[] = [];
  constructor() {
    super();
    this.setBackgroundColor("#479757");

    const getTileName = (tileId: number) => GrassTileMap.get(tileId) ?? GrassTileMap.get(22);

    for (let y = 0; y < aboutMap.length; y++) {
      const row = aboutMap[y];
      for (let x = 0; x < row.length; x++) {
        const tile = new Sprite(Assets.get(getTileName(row[x])));
        tile.position.set(x * 32, y * 32);
        this.addChild(tile);
      }
    }

    this.eventMode = "static";
    this.addEventListener("pointerdown", () => this.sceneComplete());

    const aboutText = new Text({
      text: content,
      style: {
        fontFamily: FONT,
        fontSize: 20,
        fill: "white",
      },
    });
    aboutText.position.set(600, 64);
    const npc1 = new Scout();
    npc1.position.set(-100, -100);
    this._npcs.push(npc1);

    this.addChild(aboutText, npc1);
  }

  public sceneActivated(): void {
    this._npcs.forEach((npc) => {
      npc.onWalkingComplete(() => {
        npc.walkOnPath(aboutPath[Math.floor(Math.random() * 4)], 2);
      });

      npc.walkOnPath(aboutPath[Math.floor(Math.random() * 4)], 2);
    });
  }
}
