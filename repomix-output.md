This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
archived/
  data/
    blocks/
      blocks.ts
    texts/
      aboutMe.ts
      projects.ts
      text.ts
  entities/
    characters/
      npc.ts
      scout.ts
    props/
      holoicon.ts
      sign.ts
    ui/
      components/
        component.ts
        menu.ts
        menuItem.ts
      button.ts
      loadingBar.ts
      navigation.ts
      sidebar.ts
      textOverlay.ts
      tooltip.ts
      uilayer.ts
    animatedIcon.ts
    blockBuilding.ts
    blockLayer.ts
    skybox.ts
  maps/
    landing.ts
    projects.ts
    residentalMap.ts
  room/
    room.ts
  scenes/
    communitycenter.ts
    loading.ts
    residentialarea.ts
    scene.ts
    sceneManager.ts
    townsquare.ts
    workshopdistrict.ts
  shader/
    tree/
      treeshader.ts
    shader.ts
  block.json
  block.png
  buildingprops.json
  buildingprops.png
  city.json
  city.png
  environment.json
  environment.png
  grass.json
  grass.png
  houses1.json
  houses1.png
  icons.json
  icons.png
  props.json
  props.png
  sceneSetup.ts
src/
  assets/
    manifest.ts
  camera/
    camera.ts
  characters/
    character.ts
    user.ts
  types/
    common.ts
    constants.ts
    map.ts
    path.ts
  utilities/
    collisionMap.ts
    debug.ts
    gsap.ts
    math.ts
    modal.ts
    overlay.ts
    pathfinding.ts
    sceneGraph.ts
    theme.ts
    vector.ts
  world/
    interiors/
      baseInterior.ts
      homeInterior.ts
      libraryInterior.ts
    world.ts
  index.ts
static/
  assets/
    animations/
      scout1idle.json
      scout1idle.png
      scout1standing.json
      scout1standing.png
      scout1walking.json
      scout1walking.png
    fonts/
      Jersey10-Regular.woff2
      Silkscreen-Regular.woff2
      Tiny5-Regular.woff2
    mapdata/
      camping.tsx
      citytiles.tsx
      grounds.tsx
      town.tmx
      villas.tsx
    textures/
      camping.png
      citytiles.png
      grounds.png
      villas.png
      worksite.png
  index.html
tiledData/
  cavhoo_github.tiled-project
  cavhoo_github.tiled-session
  grounds.tsx
  town.tmx
.assetpack.js
.gitignore
.prettierrc
eslint.config.js
GEMINI.md
index.html
package.json
tsconfig.json
webpack.config.js
webpack.prod.config.js
```

# Files

## File: archived/data/blocks/blocks.ts
```typescript
export const BlockTextureIds = ["Grassblock.png", "Concreteblock.png", "Roadblock.png", "Dirtblock.png", "BuildingWindowBlock.png", "BuildingBlock.png"];

export enum BlockIndex {
  Grass,
  Concrete,
  Road,
  Dirt,
  BuildingWindow,
  BuildingDefault,

  Empty = Number.MAX_SAFE_INTEGER,
}
```

## File: archived/data/texts/aboutMe.ts
```typescript
import { TextData } from "./text";

export const aboutMe: TextData = {
  title: "About Me",
  lines: [
    "Hey! Thanks for stopping by.",
    "My name is Hendrik, or Excyl if you want to use my internet persona.",
    "I am a senior sofwatre engineer from Germany who is specialised in creating online slot games,",
    "with a degree in Game Development. I bring the visions of game design teams to live by creating",
    "high performance frameworks that allow companies to create the best online slot games in the world",
    "In my spare time, I enjoy learning new programming languages or starting small projects to improve myself.",
    "Some of the projects I have been working on are explained on this site.",
    "Feel free to stay a while and read about my job experience, and my projects.",
  ],
};
```

## File: archived/data/texts/projects.ts
```typescript
export interface ProjectData {
  title: string;
  status: "active" | "hold" | "complete";
  description: string;
  link: string;
}

export const projects: ProjectData[] = [
  {
    title: "PixiDust",
    status: "active",
    description: "",
    link: "",
  },
  {
    title: "Rust SCSS Modules",
    status: "hold",
    description: "",
    link: "",
  },
];
```

## File: archived/data/texts/text.ts
```typescript
export interface TextData {
  title: string;
  lines: string[];
}
```

## File: archived/entities/characters/npc.ts
```typescript
import { AnimatedSprite, Container, Ticker } from "pixi.js";
import { Vector } from "../../utilities/vector";
import { Path } from "../../types/path";

export enum NPCState {
  IdleLeft,
  IdleUp,
  IdleDown,
  IdleRight,
  WalkingLeft,
  WalkingRight,
  WalkingUp,
  WalkingDown,
}

/**
 * NPC container base class.
 */
export class NPC extends Container {
  protected animations: Map<NPCState, AnimatedSprite>;
  protected state: NPCState;
  protected walkPath: Path | null = null;
  protected walkSpeed: number = 0;
  protected loopPath: boolean = false;
  protected pathCompleteCallback?: () => void;
  constructor(animations: [NPCState, AnimatedSprite][], anchor: [number, number] = [0.5, 1]) {
    super();
    this.animations = new Map(animations);
    this.state = NPCState.IdleDown;
    const [x, y] = anchor;
    this.addChild(
      ...animations.map((ani) => {
        ani[1].anchor.set(x, y);
        ani[1].visible = ani[0] === this.state ? true : false;
        return ani[1];
      })
    );

    Ticker.shared.add(() => this.update());
  }

  public play(state: NPCState): void {
    this.animations.get(this.state).visible = false;
    this.animations.get(state).visible = true;

    this.animations.get(state).animationSpeed = 0.08;
    this.animations.get(state).play();
    this.state = state;
  }

  public walkOnPath(path: Path, speed: number) {
    const point = path.currentWaypoint;
    this.position.set(point.target.x, point.target.y);
    this.walkPath = path;
    this.walkSpeed = speed;
  }

  public stop(): void {
    this.walkPath = null;
  }

  public onWalkingComplete(cb: () => void): void {
    this.pathCompleteCallback = cb;
  }

  protected update() {
    if (this.walkPath !== null && this.walkPath.currentWaypoint !== null) {
      const position = Vector.from(this.position);
      const distance = this.walkPath.currentWaypoint.getDistanceFrom(position);
      if (Math.floor(Math.abs(distance.x)) > 0 || Math.floor(Math.abs(distance.y)) > 0) {
        const angle = Math.atan2(Math.floor(distance.x), Math.floor(distance.y));
        this.setAnimation(Math.floor((angle * 180) / Math.PI));
        this.position.set(this.position.x + this.walkSpeed * Math.sin(angle), this.position.y + this.walkSpeed * Math.cos(angle));
      } else {
        const next = this.walkPath.nextWaypoint();
        if (next === null) {
          this.pathCompleteCallback?.();
        }
      }
    }
  }

  protected setAnimation(angle: number) {
    switch (angle) {
      case 0:
        this.play(NPCState.WalkingDown);
        break;
      case -90:
        this.play(NPCState.WalkingLeft);
        break;
      case 180:
        this.play(NPCState.WalkingUp);
        break;
      default:
        this.play(NPCState.WalkingRight);
    }
  }
}
```

## File: archived/entities/characters/scout.ts
```typescript
import { AnimatedSprite, Texture } from "pixi.js";
import { NPC, NPCState } from "./npc";

export class Scout extends NPC {
  constructor() {
    super(
      [
        [NPCState.IdleRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.IdleDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingRight, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingUp, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingLeft, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
        [NPCState.WalkingDown, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      ],
      [0.5, 0.9]
    );
  }
}
```

## File: archived/entities/props/holoicon.ts
```typescript
import { AnimatedSprite, Container, Texture } from "pixi.js";
import { AnimatedIcon } from "../animatedIcon";

export class HoloIcon extends Container {
  constructor(icon: { frames: string[]; tint?: string }) {
    super();
    const holoCone = new AnimatedSprite({
      textures: [Texture.from("holocone1.png"), Texture.from("holocone2.png")],
      animationSpeed: 0.1,
      autoPlay: true,
    });
    holoCone.alpha = 0.5;
    holoCone.scale.set(2, 2);
    holoCone.anchor.set(0.5, 1);
    holoCone.position.set(0, 0);

    const animatedIcon = new AnimatedIcon(icon.frames, icon.tint);
    animatedIcon.position.set(-animatedIcon.width / 2, holoCone.position.y - holoCone.height + 20);
    this.addChild(holoCone, animatedIcon);
  }
}
```

## File: archived/entities/props/sign.ts
```typescript
import { Assets, Container, Sprite } from "pixi.js";

export class Sign extends Container {
  protected signSprite: Sprite;

  constructor(spriteId: string) {
    super();
    this.signSprite = new Sprite(Assets.get(spriteId));
    this.signSprite.eventMode = "static";
    this.signSprite.cursor = "pointer";
    this.signSprite.on("pointerover", () => {
      console.log("Mouseover");
    });
    this.addChild(this.signSprite);
  }
}
```

## File: archived/entities/ui/components/component.ts
```typescript
import { Container } from "pixi.js";

/**
 * Base class for all UI components.
 */
export class Component extends Container {}
```

## File: archived/entities/ui/components/menu.ts
```typescript
import { Container } from "pixi.js";
import { MenuItem } from "./menuItem";

export class Menu extends Container {
  protected itemGroup: MenuItem[] = [];

  constructor() {
    super();
  }

  public addItem(item: MenuItem): void {
    this.itemGroup.push(item);
    this.addChild(item);
    item.position.y = (item.height + 10) * (this.itemGroup.length - 1);
  }
}
```

## File: archived/entities/ui/components/menuItem.ts
```typescript
import { Container, Text } from "pixi.js";
import { FONT } from "../../../types/constants";

export class MenuItem extends Container {
  constructor(protected title: string, onClick: () => void) {
    super();

    this.eventMode = "static";
    this.cursor = "pointer";

    const labelText = new Text({
      text: title,
      style: {
        fontFamily: FONT,
        fontSize: 28,
        fill: "white",
      },
    });

    this.on("pointerdown", () => onClick());
    this.on("pointerover", () => (labelText.text = `${title} <<`));
    this.on("pointerout", () => (labelText.text = `${title}`));
    this.addChild(labelText);
  }
}
```

## File: archived/entities/ui/button.ts
```typescript
import { Container, Graphics, Text, TextOptions } from "pixi.js";

export interface ButtonStyle extends TextOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

export class Button extends Container {
  protected _styles: ButtonStyle;
  protected _text: Text;
  constructor(buttonStyles: ButtonStyle) {
    super();
    this._styles = buttonStyles;
    const { style, text, height, width } = buttonStyles;

    this._text = new Text({
      text,
      style,
    });

    const graphics = new Graphics();
    graphics.rect(0, 0, width, height);
    graphics.renderable = false;

    this.addChild(graphics, this._text);
  }
}
```

## File: archived/entities/ui/loadingBar.ts
```typescript
import { Container, Graphics, Text } from "pixi.js";

export class LoadingBar extends Container {
  protected _progress: number = 0;
  protected _progressBarHeight: number;
  protected _progressBarWidth: number;
  protected _loadingBar: Graphics;
  protected _loadingText: Text;
  constructor(width: number, height: number) {
    super();
    this._progressBarHeight = height;
    this._progressBarWidth = width;
    this.init();
  }

  protected init(): void {
    this._loadingBar = new Graphics();
    this._loadingBar.roundRect(0, 0, this._progressBarWidth * this._progress, this._progressBarHeight, 5);
    this._loadingBar.fill("lightblue");

    const graphics = new Graphics();
    graphics.roundRect(0, 0, this._progressBarWidth, this._progressBarHeight, 5);
    graphics.stroke({ width: 3, color: "white" });

    this._loadingText = new Text({
      style: {
        fontFamily: "Jersey10 Regular",
        fontSize: 60,
        fill: "white",
      },
      text: "50%",
    });
    this._loadingText.position.set((graphics.width - this._loadingText.width) / 2, 0);
    this._loadingText.blendMode = "screen";
    this.addChild(this._loadingBar, graphics, this._loadingText);
  }

  public set progress(value: number) {
    this._progress = value;
    this._loadingText.text = `${Math.round(this._progress * 100)}%`;
    this._loadingText.position.set((this._progressBarWidth - this._loadingText.width) / 2, 0);
    this._loadingBar.clear();
    this._loadingBar.roundRect(0, 0, this._progressBarWidth * this._progress, this._progressBarHeight, 5);
    this._loadingBar.fill("#0c5ba6");
  }

  public updateProgressBy(value: number): void {
    this._progress += value;
    this._loadingText.text = `${this._progress * 100}%`;
  }

  public reset(): void {
    this._progress = 0;
  }
}
```

## File: archived/entities/ui/navigation.ts
```typescript
import { Container, Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../../types/constants";

export enum NavigationDirection {
  Left,
  Right,
}

export class Navigation extends Container {
  protected navigationCallback: (direction: NavigationDirection) => void;
  constructor(callback: (direction: NavigationDirection) => void) {
    super();
    this.navigationCallback = callback;
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
    navLeft.onpointerdown = () => this.navigationCallback(NavigationDirection.Left);

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
    navRight.onpointerdown = () => this.navigationCallback(NavigationDirection.Right);

    this.addChild(navLeft, navRight);
  }
}
```

## File: archived/entities/ui/sidebar.ts
```typescript
import { Container, Graphics } from "pixi.js";
import { gsap } from "gsap";
import { SceneNames } from "../../sceneSetup";
import { Menu } from "./components/menu";
import { MenuItem } from "./components/menuItem";

export class Sidebar extends Container {
  protected menu: Menu;
  protected _onMenuitemClick: (name: string) => void;

  constructor() {
    super();

    const background = new Container();

    const backgroundGraphics = new Graphics();
    background.addChild(backgroundGraphics);

    this.addChild(background);

    this.menu = new Menu();

    this.menu.addItem(new MenuItem("Home", () => this._onMenuitemClick(SceneNames.TownSquare)));
    this.menu.addItem(new MenuItem("Projects", () => this._onMenuitemClick(SceneNames.WorkshopDistrict)));
    this.menu.addItem(new MenuItem("Experience", () => this._onMenuitemClick(SceneNames.ResidentialArea)));
    this.menu.position.set(10, 5);
    this.addChild(this.menu);

    backgroundGraphics.roundRect(-20, 0, this.width + 80, this.height + 20, 15).fill({ color: "rgba(255,255,255, 0.5)" });
  }

  public show(): void {
    gsap.to(this.position, { x: 0, duration: 0.3, ease: "power2.out" });
  }

  public hide(): void {
    gsap.to(this.position, { x: -this.width, duration: 0.3, ease: "power2.in" });
  }

  public set onMenuItemClick(fn: (name: string) => void) {
    this._onMenuitemClick = fn;
  }
}
```

## File: archived/entities/ui/textOverlay.ts
```typescript
import { Container, Graphics, Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../../types/constants";
import { TextData } from "../../data/texts/text";

export class TextOverlay extends Container {
  constructor(backgroundColor: string) {
    super();
    const background = new Graphics();
    background.roundRect(0, 0, WIDTH * 0.6, HEIGHT * 0.8).fill(backgroundColor);
    this.addChild(background);
  }

  public addText(text: TextData): void {
    const titleText = new Text({
      text: text.title,
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 40,
        align: "center",
      },
    });
    titleText.position.set((this.width - titleText.width) / 2, 5);

    const contentText = new Text({
      text: text.lines.join("\n"),
      style: {
        fontFamily: FONT,
        wordWrap: true,
        wordWrapWidth: this.width - 40,
      },
    });

    contentText.position.set(10, titleText.height + 20);

    this.addChild(titleText, contentText);
  }
}
```

## File: archived/entities/ui/tooltip.ts
```typescript
import { Container, Graphics, Text } from "pixi.js";
import { Vector } from "../../utilities/vector";
import { FONT } from "../../types/constants";

export type TooltipOptions = {
  text: string;
  size: Vector;
  backgbroundColor?: number;
  borderColor?: number;
  chamfer?: number;
};

export class Tooltip extends Container {
  protected _text: string;
  constructor({ text, borderColor, backgbroundColor, size, chamfer }: TooltipOptions) {
    super();

    const background = new Graphics();
    background
      .chamferRect(0, 0, size.x, size.y, chamfer ?? 10)
      .fill({ color: backgbroundColor ?? 0xc1a1dd })
      .stroke({ width: 2, color: borderColor ?? 0xc3c3c3 });

    this.addChild(background);
    this._text = text;

    const textElement = new Text({
      text: this._text,
      style: {
        fontSize: 38,
        fontFamily: FONT,
      },
    });
    textElement.resolution = 2;
    textElement.position.set((size.x - textElement.width) / 2, (size.y - textElement.height) / 2);
    this.addChild(textElement);
    this.pivot = new Vector(this.width / 2, this.height - 10).toPixiPoint();
  }
}
```

## File: archived/entities/ui/uilayer.ts
```typescript
import { Container } from "pixi.js";

export class UiLayer extends Container {
  constructor() {
    super();
  }
}
```

## File: archived/entities/animatedIcon.ts
```typescript
import { AnimatedSprite, Container, Texture } from "pixi.js";

export class AnimatedIcon extends Container {
  protected animatedSprite: AnimatedSprite;
  constructor(protected frames: string[], tint?: string) {
    super();
    this.animatedSprite = new AnimatedSprite({
      textures: frames.map((frame) => Texture.from(frame)),
      animationSpeed: 0.1,
      autoPlay: true,
    });

    if (tint) {
      this.animatedSprite.tint = tint;
    }

    this.addChild(this.animatedSprite);
  }
}
```

## File: archived/entities/blockBuilding.ts
```typescript
import { GlowFilter } from "pixi-filters";
import { Assets, Container, Sprite } from "pixi.js";
import { BlockIndex, BlockTextureIds } from "../data/blocks/blocks";
import { Building } from "../types/map";
import { HoloIcon } from "./props/holoicon";

export class BlockBuilding extends Container {
  protected buildingLayer: Container;
  protected hoverGlow: GlowFilter;
  constructor(protected buildingData: Building, protected onClick?: (name: string) => void) {
    super();
    this.buildingLayer = new Container();
    this.addChild(this.buildingLayer);
    this.label = buildingData.buildingName;
    this.eventMode = "static";
    this.cursor = "pointer";
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

    this.pivot.set(-32, 16);
    if (buildingData.icon) {
      const holoCone = new HoloIcon({
        frames: Array.from({ length: buildingData.icon.frameCount }, (_, frame) => buildingData.icon.baseTextureName.replace("{frame}", `${frame + 1}`)),
        tint: buildingData.icon.tint,
      });

      holoCone.position.set(0, 0);
      this.addChild(holoCone);
    }
  }
}
```

## File: archived/entities/blockLayer.ts
```typescript
import { Assets, Container, Sprite } from "pixi.js";
import { BlockTextureIds } from "../data/blocks/blocks";
import { Layer } from "../types/map";
import { BlockBuilding } from "./blockBuilding";

export class BlockLayer extends Container {
  protected buildingLayer: Container;
  protected blockLayer: Container;
  protected totalWidth: number;
  constructor(protected layerData: Layer) {
    super();
    this.buildingLayer = new Container();
    this.blockLayer = new Container();
    this.totalWidth = layerData.width * 32;
    for (let y = 0; y < layerData.height; y++) {
      for (let x = 0; x < layerData.width; x++) {
        const id = layerData.data[y][x];
        const textureId = BlockTextureIds[layerData.tileIds[id]];
        const tile = new Sprite(Assets.get(textureId));
        tile.anchor.set(0.5, 0.5);
        tile.position.set(16 * (x - y) + this.totalWidth / 2, 8 * (x + y) + 16);
        this.blockLayer.addChild(tile);
      }
    }
    this.addChild(this.blockLayer, this.buildingLayer);
    this.pivot.set(this.blockLayer.width / 2, this.blockLayer.height);
  }

  public addBuilding(building: BlockBuilding, x: number, y: number): void {
    const xPos = 16 * (x - y) + this.totalWidth / 2;
    const yPos = 8 * (x + y);
    building.position.set(xPos, yPos);
    this.buildingLayer.addChild(building);
  }
}
```

## File: archived/entities/skybox.ts
```typescript
import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import { HEIGHT, WIDTH } from "../types/constants";

export class Skybox extends Container {
  protected DAY_LENGTH: number = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  protected daylightColor: number = 0x87ceeb; // Default daylight color (sky blue)
  protected nightColor: number = 0x0b0c1a; // Default night color (dark blue)

  protected background: Graphics;
  protected sunSprite: Sprite;
  constructor() {
    super();
    Ticker.shared.add((ticker) => this.tick(ticker.elapsedMS));
    this.background = new Graphics();
    this.background.rect(0, 0, WIDTH, HEIGHT).fill(this.daylightColor);
    this.sunSprite = Sprite.from("sun.png");
    this.addChild(this.background, this.sunSprite);
  }

  protected dayTicks: number = 0;
  protected hours: number = 0;
  protected tick(_delta: number): void {
    this.dayTicks += _delta * 10000; // Speed up time for demonstration purposes
    if (this.dayTicks >= this.DAY_LENGTH) {
      this.dayTicks = 0;
    }
    const t = (Math.cos((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI) + 1) / 2; // Normalize hours to [0, 1];

    this.sunSprite.position.set(
      WIDTH / 2 + (WIDTH / 2) * Math.cos((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI + Math.PI / 2) - this.sunSprite.width / 2,
      HEIGHT / 2 + (HEIGHT / 2 + 100) * Math.sin((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI + Math.PI / 2) - this.sunSprite.height / 2 + 200
    );

    // Interpolate between daylightColor and nightColor based on time of day
    // Simple linear interpolation
    // Daylight color components
    const r1 = (this.daylightColor >> 16) & 0xff;
    const g1 = (this.daylightColor >> 8) & 0xff;
    const b1 = this.daylightColor & 0xff;

    // Night color components
    const r2 = (this.nightColor >> 16) & 0xff;
    const g2 = (this.nightColor >> 8) & 0xff;
    const b2 = this.nightColor & 0xff;

    // Calculate interpolated color components
    const r = Math.round(r1 * (1 - t) + r2 * t);
    const g = Math.round(g1 * (1 - t) + g2 * t);
    const b = Math.round(b1 * (1 - t) + b2 * t);

    this.background.clear();
    this.background.rect(0, 0, WIDTH, HEIGHT).fill(`rgb(${r}, ${g}, ${b})`);
  }
}
```

## File: archived/maps/landing.ts
```typescript
import { Sprite } from "pixi.js";
import { BlockIndex } from "../data/blocks/blocks";
import { Layer, Map } from "../types/map";
import { Vector } from "../utilities/vector";

const baseLayer: Layer = {
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Concrete, BlockIndex.Road],
  data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export const landingMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  props: [],
  buildings: [
    {
      buildingName: "About Me",
      position: Vector.from([11, 12]),
      blockIds: [BlockIndex.Empty, BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
      data: [
        ...Array.from({ length: 7 }, () => [
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1],
        ]),
        ...Array.from({ length: 3 }, () => [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ]),
        ...Array.from({ length: 3 }, () => [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ]),
      ],
    },
    {
      buildingName: "LinkedIn",
      icon: { baseTextureName: "linkedin{frame}.png", frameCount: 18 },
      position: Vector.from([24, 17]),
      blockIds: [BlockIndex.Empty, BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
      data: [
        ...Array.from({ length: 4 }, () => [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ]),
      ],
    },
    {
      buildingName: "Instagram",
      icon: { baseTextureName: "instagramColored{frame}.png", frameCount: 18 },
      position: Vector.from([15, 26]),
      blockIds: [BlockIndex.Empty, BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
      data: [
        ...Array.from({ length: 4 }, () => [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ]),
      ],
    },
    {
      buildingName: "Github",
      icon: { baseTextureName: "github{frame}.png", frameCount: 18, tint: "black" },
      position: Vector.from([24, 26]),
      blockIds: [BlockIndex.Empty, BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
      data: [
        ...Array.from({ length: 4 }, () => [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ]),
      ],
    },
  ],
  paths: [],
};
```

## File: archived/maps/projects.ts
```typescript
import { BlockIndex } from "../data/blocks/blocks";
import { Building, Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

export const projectsPath: Path[] = [
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -32])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 64])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 64])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 22 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 22 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
];

const baseLayer: Layer = {
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Dirt],
  data: Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0)),
};

const buildingPixiDust: Building = {
  blockIds: [BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
  buildingName: "Rust SCSS",
  position: Vector.from([16, 4]),
  data: Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 2)))),
};

const buildingRustTsScss: Building = {
  blockIds: [BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
  buildingName: "Pixi Dust",
  position: Vector.from([7, 23]),
  data: Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 2)))),
};

export const workshopsMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  buildings: [buildingPixiDust, buildingRustTsScss],
  props: [],
  paths: [],
};
```

## File: archived/maps/residentalMap.ts
```typescript
import { BlockIndex } from "../data/blocks/blocks";
import { Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

// prettier-ignore
export const aboutPath: Path[] = [
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -64])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -64])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
  new Path(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, -64]))),
  new Path(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, -64]))),
];

const baseLayer: Layer = {
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Concrete],
  data: Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0)),
};

export const residentialMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  buildings: [],
  props: [],
  paths: [],
};
```

## File: archived/room/room.ts
```typescript
import { Container } from "pixi.js";

export class Room extends Container {
  constructor() {
    super();
  }
}
```

## File: archived/scenes/communitycenter.ts
```typescript

```

## File: archived/scenes/loading.ts
```typescript
import { Text } from "pixi.js";
import { LoadingBar } from "../entities/ui/loadingBar";
import { Scene } from "./scene";
import { Button } from "../entities/ui/button";
import { FONT, HEIGHT, WIDTH } from "../types/constants";

export class LoadingScene extends Scene {
  protected loadingBar: LoadingBar;
  protected enterButton: Button;
  constructor() {
    super();

    this.label = "LoadingScene";
    this.loadingBar = new LoadingBar(483, 60);
    this.loadingBar.position.set((WIDTH - this.loadingBar.width) / 2, (HEIGHT - this.loadingBar.height) / 2);

    const name = new Text({
      text: "Hendrik (Excyl)",
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 80,
      },
    });
    name.position.set((WIDTH - name.width) / 2, 200);

    const jobTitle = new Text({
      text: "game developer",
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 40,
      },
    });
    jobTitle.position.set((WIDTH - jobTitle.width) / 2, 270);

    this.enterButton = new Button({
      text: "START",
      width: 483,
      height: 60,
      style: {
        fontFamily: FONT,
        fontSize: 60,
        fill: "white",
      },
    });

    this.enterButton.visible = false;
    this.enterButton.eventMode = "static";
    this.enterButton.cursor = "pointer";
    this.enterButton.on("pointerdown", () => {
      this.sceneComplete();
    });
    this.enterButton.position.set((WIDTH - this.enterButton.width) / 2, this.loadingBar.position.y);

    this.addChild(this.loadingBar, name, jobTitle, this.enterButton);
  }

  public updateProgress(value: number): void {
    this.loadingBar.progress = value;
    if (value >= 1) {
      this.loadingBar.visible = false;
      this.enterButton.visible = true;
    }
  }
}
```

## File: archived/scenes/residentialarea.ts
```typescript
import { Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../types/constants";
import { Scene } from "./scene";
import { BlockLayer } from "../entities/blockLayer";
import { residentialMap } from "../maps/residentalMap";

export class ResidentialArea extends Scene {
  constructor() {
    super();

    const text = new Text({
      text: "Experience",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });
    text.resolution = 2;
    text.position.set((WIDTH - text.width) / 2, 15);

    const blocks = new BlockLayer(residentialMap.terrain.layers[0]);

    blocks.position.set(WIDTH / 2, HEIGHT);
    this.addChild(blocks, text);
  }
}
```

## File: archived/scenes/scene.ts
```typescript
import { Application, Container } from "pixi.js";

export abstract class Scene extends Container {
  protected _app: Application;
  protected backgroundImage: HTMLImageElement;
  public onSceneComplete?: (showNavigation: boolean) => void;

  protected sceneComplete(showNavigation: boolean = false): void {
    if (this.onSceneComplete) {
      this.onSceneComplete(showNavigation);
    }
  }

  public onAdded(app: Application): void {
    this._app = app;
  }
  public sceneActivated?(): void;
  public sceneDeactivated?(): void;
  protected createTextOverlay?(): void;
}
```

## File: archived/scenes/sceneManager.ts
```typescript
import { gsap } from "gsap";
import { Application, Container, Graphics, Ticker } from "pixi.js";
import { Scene } from "./scene";
import { NavigationDirection } from "../entities/ui/navigation";
import { HEIGHT, WIDTH } from "../types/constants";

enum TransitionState {
  Fade,
  Idle,
  Left,
  Right,
  Transitioning,
}

export class SceneManager extends Container {
  protected static FADE_TIME: number = 250;
  protected static MOVE_TIME: number = 1.5;
  protected static MOVE_EASE: string = "elastic.out(i, 0.75)";
  protected _sceneList: Map<string, Scene> = new Map();
  protected _activeScene: Scene;
  protected _nextScene: Scene | null = null;

  protected transitionState: TransitionState = TransitionState.Idle;
  protected _app: Application;
  protected _time: number = 0;
  protected _sceneContainer: Container;

  protected sceneIndex: number = 2;

  constructor(app: Application) {
    super();
    this.label = "SceneManager";
    this._app = app;
    Ticker.shared.add(this.update, this);
    this._sceneContainer = new Container();
    const mask = new Graphics();
    mask.rect(0, 0, WIDTH, HEIGHT).fill({ color: 0x000000 });
    this.addChild(this._sceneContainer, mask);
    this.mask = mask;
  }

  protected moveSceneIntoView(direction: NavigationDirection): void {
    const directionMutliplier = direction === NavigationDirection.Left ? 1 : -1;
    this._nextScene.position.set(this._nextScene.width * directionMutliplier * -1, 0);
    this._nextScene.visible = true;
    gsap.to(this._nextScene.position, { x: 0, duration: SceneManager.MOVE_TIME, ease: SceneManager.MOVE_EASE });
    gsap.to(this._activeScene.position, {
      x: directionMutliplier * WIDTH,
      duration: SceneManager.MOVE_TIME,
      ease: SceneManager.MOVE_EASE,
      onComplete: () => {
        this.transitionState = TransitionState.Idle;
        this._activeScene.visible = false;
        this._activeScene.sceneDeactivated?.();
        this._activeScene = this._nextScene;
        this._activeScene.alpha = 1;
        this._activeScene.sceneActivated?.();
        this._nextScene = null;
      },
    });
  }

  protected handleNavigation(direction: NavigationDirection): void {
    if (direction === NavigationDirection.Left) {
      if (this.sceneIndex > 1 && this.transitionState === TransitionState.Idle) {
        const nextScene = this._sceneList.get([...this._sceneList.keys()][this.sceneIndex - 1]);
        if (nextScene) {
          this._nextScene = nextScene;
          this.transitionState = TransitionState.Transitioning;
          this._nextScene.position.set(-this._nextScene.width, 0);
          this.sceneIndex--;
          this._nextScene.visible = true;
          this.moveSceneIntoView(direction);
        }
      }
      return;
    }

    if (direction === NavigationDirection.Right) {
      if (this.sceneIndex < this._sceneList.size - 1 && this.transitionState === TransitionState.Idle) {
        const nextScene = this._sceneList.get([...this._sceneList.keys()][this.sceneIndex + 1]);
        if (nextScene) {
          this._nextScene = nextScene;
          this._nextScene.visible = true;
          this.transitionState = TransitionState.Transitioning;

          this.sceneIndex++;
          this.moveSceneIntoView(direction);
        }
      }
      return;
    }
  }

  public addScene(sceneName: string, scene: Scene): void {
    scene.position.set(WIDTH * this._sceneList.size, 0);
    this._sceneList.set(sceneName, scene);
    scene.onAdded(this._app);
    this._sceneContainer.addChild(scene);
  }

  public addScenes(...scenes: [string, Scene][]): void {
    scenes.forEach(([name, scene], index) => {
      scene.onAdded(this._app);
      this._sceneList.set(name, scene);
      scene.position.set(scene.width * (index - 1), 0);
      this._sceneContainer.addChild(scene);
    });
  }

  public setSceneActive(sceneName: string): void {
    if (this._sceneList.has(sceneName)) {
      const scene = this._sceneList.get(sceneName);
      const index = [...this._sceneList.entries()].findIndex(([name]) => name === sceneName);
      const targetPositon = index * WIDTH * -1;
      if (this._sceneContainer.position.x === targetPositon) {
        scene.sceneActivated?.();
        return;
      }

      gsap.to(this._sceneContainer.position, {
        duration: 1.5,
        x: targetPositon,
        ease: SceneManager.MOVE_EASE,
        onComplete: () => {
          console.log("Scene move complete");
          scene.sceneActivated?.();
        },
      });
    }
  }

  protected update(): void {
    if (this._nextScene !== null) {
      switch (this.transitionState) {
        case TransitionState.Idle: {
          this.transitionState = TransitionState.Fade;
          this._nextScene.visible = true;
          this._time = 0;
          break;
        }
        case TransitionState.Left:
        case TransitionState.Right:
          break;
        case TransitionState.Fade: {
          this._time += Ticker.shared.elapsedMS;
          if (this._activeScene) {
            this._activeScene.alpha = 1 - this._time / SceneManager.FADE_TIME;
            this._nextScene.alpha = this._time / SceneManager.FADE_TIME;
          }
          if (this._nextScene.alpha >= 1) {
            this.transitionState = TransitionState.Idle;
            this._time = 0;
            this._activeScene.visible = false;
            this._activeScene.sceneDeactivated?.();
            this._activeScene = this._nextScene;
            this._activeScene.alpha = 1;
            this._activeScene.sceneActivated?.();
            this._nextScene = null;
          }
          break;
        }
      }
    }
  }
}
```

## File: archived/scenes/townsquare.ts
```typescript
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
```

## File: archived/scenes/workshopdistrict.ts
```typescript
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
```

## File: archived/shader/tree/treeshader.ts
```typescript
import { ShaderBuilder, ShaderUniformTypes } from "../shader";
const vertexShader = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}`;

const fragmentShader = `
in vec2 vTextureCoord;

out vec4 finalColor;

// Custom uniforms
uniform float uTime;
uniform float uScale;
float amplitude = 0.012;
float frequency = 2.0;
float speed = 0.2;
float baseStability = 0.64;

// Built in uniforms
uniform sampler2D uTexture;

void main()
{
    vec2 uvs = vTextureCoord.xy;

    float swayAmount = amplitude * (1.0 / uScale - smoothstep(0.6, 0.63, vTextureCoord.y) / uScale);
    float wave = sin(vTextureCoord.y * frequency + uTime * speed);
    wave += 0.3 * sin(vTextureCoord.y * frequency * 1.5 + uTime * speed * 0.8);
    uvs.x += wave * swayAmount;
    uvs.x += 0.2 * swayAmount * sin(vTextureCoord.y * frequency * 0.5 + uTime * speed * 0.5);

    uvs.x = mod(uvs.x, 1.0);

    finalColor = texture2D(uTexture, uvs);
}`;

export const TreeShader = ShaderBuilder.create()
  .addGLProgram(fragmentShader, vertexShader)
  .addResource("uTime", 0.0, ShaderUniformTypes.f32)
  .addResource("uScale", 1.0, ShaderUniformTypes.f32);
```

## File: archived/shader/shader.ts
```typescript
import { Filter, GlProgram, GpuProgram, Shader } from "pixi.js";

export type GPUProgramShaderPart = { source: string; entryPoint: string };

export enum ShaderUniformTypes {
  f32 = "f32",
}

export class ShaderBuilder {
  protected glProgram: { vertex: string; fragment: string };
  protected gpuProgram: GpuProgram;
  protected resources?: Record<string, { [key: string]: { value: unknown; type: ShaderUniformTypes } }> = {};

  protected constructor() {}

  public static create(): ShaderBuilder {
    return new ShaderBuilder();
  }

  public addGLProgram(fragment: string, vertex: string): this {
    this.glProgram = { vertex, fragment };
    return this;
  }

  public addGPUProgram(fragment: GPUProgramShaderPart, vertex: GPUProgramShaderPart): this {
    this.gpuProgram = new GpuProgram({ fragment, vertex });
    return this;
  }

  public addResource(key: string, value: unknown, type: ShaderUniformTypes): this {
    this.resources["shaderUniforms"] = { ...this.resources["shaderUniforms"], [key]: { value, type } };
    return this;
  }

  public buildShader(): Filter {
    return new Filter({
      glProgram: new GlProgram(this.glProgram),
      resources: this.resources,
    });
  }
}
```

## File: archived/block.json
```json
{
  "frames": {
    "Roadblock.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grassblock.png": {
      "frame": {
        "x": 36,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Dirtblock.png": {
      "frame": {
        "x": 2,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Concreteblock.png": {
      "frame": {
        "x": 36,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "CityBase.png": {
      "frame": {
        "x": 70,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "BuildingWindowBlock.png": {
      "frame": {
        "x": 70,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "BuildingBlock.png": {
      "frame": {
        "x": 2,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "block.png",
    "format": "RGBA8888",
    "size": {
      "w": 104,
      "h": 104
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/buildingprops.json
```json
{
  "frames": {
    "holocone2.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 23,
        "h": 24
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 20,
        "y": 28,
        "w": 23,
        "h": 24
      },
      "sourceSize": {
        "w": 64,
        "h": 64
      }
    },
    "holocone1.png": {
      "frame": {
        "x": 27,
        "y": 2,
        "w": 23,
        "h": 24
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 20,
        "y": 28,
        "w": 23,
        "h": 24
      },
      "sourceSize": {
        "w": 64,
        "h": 64
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "buildingprops.png",
    "format": "RGBA8888",
    "size": {
      "w": 52,
      "h": 28
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/city.json
```json
{
  "frames": {
    "Sidewalk_9.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_8.png": {
      "frame": {
        "x": 36,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_7.png": {
      "frame": {
        "x": 2,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_6.png": {
      "frame": {
        "x": 36,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_5.png": {
      "frame": {
        "x": 70,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_4.png": {
      "frame": {
        "x": 70,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_3.png": {
      "frame": {
        "x": 2,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_2.png": {
      "frame": {
        "x": 36,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_10.png": {
      "frame": {
        "x": 70,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sidewalk_1.png": {
      "frame": {
        "x": 104,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_9.png": {
      "frame": {
        "x": 104,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_8.png": {
      "frame": {
        "x": 104,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_7.png": {
      "frame": {
        "x": 2,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_6.png": {
      "frame": {
        "x": 36,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_5.png": {
      "frame": {
        "x": 70,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_4.png": {
      "frame": {
        "x": 104,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_3.png": {
      "frame": {
        "x": 138,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_2.png": {
      "frame": {
        "x": 138,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_15.png": {
      "frame": {
        "x": 138,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_14.png": {
      "frame": {
        "x": 138,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_13.png": {
      "frame": {
        "x": 2,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_12.png": {
      "frame": {
        "x": 36,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_11.png": {
      "frame": {
        "x": 70,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_10.png": {
      "frame": {
        "x": 104,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Asphalt_1.png": {
      "frame": {
        "x": 138,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "city.png",
    "format": "RGBA8888",
    "size": {
      "w": 172,
      "h": 172
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/environment.json
```json
{
  "frames": {
    "sun.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 44,
        "h": 45
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 8,
        "w": 44,
        "h": 45
      },
      "sourceSize": {
        "w": 64,
        "h": 64
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "environment.png",
    "format": "RGBA8888",
    "size": {
      "w": 48,
      "h": 49
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/grass.json
```json
{
  "frames": {
    "Mound_2_6.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Mound_2_5.png": {
      "frame": {
        "x": 36,
        "y": 2,
        "w": 32,
        "h": 26
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 6,
        "w": 32,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Mound_2_4.png": {
      "frame": {
        "x": 2,
        "y": 36,
        "w": 32,
        "h": 38
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 26,
        "w": 32,
        "h": 38
      },
      "sourceSize": {
        "w": 32,
        "h": 64
      }
    },
    "Mound_2_3.png": {
      "frame": {
        "x": 42,
        "y": 36,
        "w": 32,
        "h": 46
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 18,
        "w": 32,
        "h": 46
      },
      "sourceSize": {
        "w": 32,
        "h": 64
      }
    },
    "Mound_2_2.png": {
      "frame": {
        "x": 2,
        "y": 70,
        "w": 32,
        "h": 38
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 26,
        "w": 32,
        "h": 38
      },
      "sourceSize": {
        "w": 32,
        "h": 64
      }
    },
    "Mound_2_1.png": {
      "frame": {
        "x": 64,
        "y": 2,
        "w": 32,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 6,
        "w": 32,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Mound_1_3.png": {
      "frame": {
        "x": 42,
        "y": 70,
        "w": 32,
        "h": 23
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 9,
        "w": 32,
        "h": 23
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Mound_1_2.png": {
      "frame": {
        "x": 67,
        "y": 70,
        "w": 32,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Mound_1_1.png": {
      "frame": {
        "x": 90,
        "y": 30,
        "w": 32,
        "h": 22
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 10,
        "w": 32,
        "h": 22
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_9.png": {
      "frame": {
        "x": 2,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_8.png": {
      "frame": {
        "x": 36,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_7.png": {
      "frame": {
        "x": 70,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_6.png": {
      "frame": {
        "x": 124,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_5.png": {
      "frame": {
        "x": 124,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_4.png": {
      "frame": {
        "x": 99,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_3.png": {
      "frame": {
        "x": 104,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_22.png": {
      "frame": {
        "x": 2,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_21.png": {
      "frame": {
        "x": 36,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_20.png": {
      "frame": {
        "x": 70,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_2.png": {
      "frame": {
        "x": 104,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_19.png": {
      "frame": {
        "x": 133,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_18.png": {
      "frame": {
        "x": 158,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_17.png": {
      "frame": {
        "x": 158,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_16.png": {
      "frame": {
        "x": 138,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_15.png": {
      "frame": {
        "x": 138,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_14.png": {
      "frame": {
        "x": 2,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_13.png": {
      "frame": {
        "x": 36,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_12.png": {
      "frame": {
        "x": 70,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_11.png": {
      "frame": {
        "x": 104,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_10.png": {
      "frame": {
        "x": 138,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_4_1.png": {
      "frame": {
        "x": 167,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_9.png": {
      "frame": {
        "x": 192,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_8.png": {
      "frame": {
        "x": 192,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_7.png": {
      "frame": {
        "x": 172,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_6.png": {
      "frame": {
        "x": 172,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_5.png": {
      "frame": {
        "x": 172,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_4.png": {
      "frame": {
        "x": 2,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_3.png": {
      "frame": {
        "x": 36,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_23.png": {
      "frame": {
        "x": 70,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_22.png": {
      "frame": {
        "x": 104,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_21.png": {
      "frame": {
        "x": 138,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_20.png": {
      "frame": {
        "x": 172,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_2.png": {
      "frame": {
        "x": 201,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_19.png": {
      "frame": {
        "x": 226,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_18.png": {
      "frame": {
        "x": 226,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_17.png": {
      "frame": {
        "x": 206,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_16.png": {
      "frame": {
        "x": 206,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_15.png": {
      "frame": {
        "x": 206,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_14.png": {
      "frame": {
        "x": 206,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_13.png": {
      "frame": {
        "x": 2,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_12.png": {
      "frame": {
        "x": 36,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_11.png": {
      "frame": {
        "x": 70,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_10.png": {
      "frame": {
        "x": 104,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_3_1.png": {
      "frame": {
        "x": 138,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_9.png": {
      "frame": {
        "x": 172,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_8.png": {
      "frame": {
        "x": 206,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_7.png": {
      "frame": {
        "x": 235,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_6.png": {
      "frame": {
        "x": 260,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_5.png": {
      "frame": {
        "x": 260,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_4.png": {
      "frame": {
        "x": 240,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_3.png": {
      "frame": {
        "x": 240,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_23.png": {
      "frame": {
        "x": 240,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_22.png": {
      "frame": {
        "x": 240,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_21.png": {
      "frame": {
        "x": 240,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_20.png": {
      "frame": {
        "x": 2,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_2.png": {
      "frame": {
        "x": 36,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_19.png": {
      "frame": {
        "x": 70,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_18.png": {
      "frame": {
        "x": 104,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_17.png": {
      "frame": {
        "x": 138,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_16.png": {
      "frame": {
        "x": 172,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_15.png": {
      "frame": {
        "x": 206,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_14.png": {
      "frame": {
        "x": 240,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_13.png": {
      "frame": {
        "x": 269,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_12.png": {
      "frame": {
        "x": 294,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_11.png": {
      "frame": {
        "x": 294,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_10.png": {
      "frame": {
        "x": 274,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_2_1.png": {
      "frame": {
        "x": 274,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_9.png": {
      "frame": {
        "x": 274,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_8.png": {
      "frame": {
        "x": 274,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_7.png": {
      "frame": {
        "x": 274,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_6.png": {
      "frame": {
        "x": 274,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_5.png": {
      "frame": {
        "x": 2,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_4.png": {
      "frame": {
        "x": 36,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_3.png": {
      "frame": {
        "x": 70,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_23.png": {
      "frame": {
        "x": 104,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_22.png": {
      "frame": {
        "x": 138,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_21.png": {
      "frame": {
        "x": 172,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_20.png": {
      "frame": {
        "x": 206,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_2.png": {
      "frame": {
        "x": 240,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_19.png": {
      "frame": {
        "x": 274,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_18.png": {
      "frame": {
        "x": 303,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_17.png": {
      "frame": {
        "x": 328,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_16.png": {
      "frame": {
        "x": 328,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_15.png": {
      "frame": {
        "x": 308,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_14.png": {
      "frame": {
        "x": 308,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_13.png": {
      "frame": {
        "x": 308,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_12.png": {
      "frame": {
        "x": 308,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_11.png": {
      "frame": {
        "x": 308,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_10.png": {
      "frame": {
        "x": 308,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Water_1_1.png": {
      "frame": {
        "x": 308,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_9.png": {
      "frame": {
        "x": 2,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_8.png": {
      "frame": {
        "x": 36,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_7.png": {
      "frame": {
        "x": 70,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_6.png": {
      "frame": {
        "x": 104,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_5.png": {
      "frame": {
        "x": 138,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_4.png": {
      "frame": {
        "x": 172,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_3.png": {
      "frame": {
        "x": 206,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_22.png": {
      "frame": {
        "x": 240,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_21.png": {
      "frame": {
        "x": 274,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_20.png": {
      "frame": {
        "x": 308,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_2.png": {
      "frame": {
        "x": 337,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_19.png": {
      "frame": {
        "x": 362,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_18.png": {
      "frame": {
        "x": 362,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_17.png": {
      "frame": {
        "x": 342,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_16.png": {
      "frame": {
        "x": 342,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_15.png": {
      "frame": {
        "x": 342,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_14.png": {
      "frame": {
        "x": 342,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_13.png": {
      "frame": {
        "x": 342,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_12.png": {
      "frame": {
        "x": 342,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_11.png": {
      "frame": {
        "x": 342,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_10.png": {
      "frame": {
        "x": 342,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_Fenced_1_1.png": {
      "frame": {
        "x": 2,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_9.png": {
      "frame": {
        "x": 36,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_8.png": {
      "frame": {
        "x": 70,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_7.png": {
      "frame": {
        "x": 104,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_6.png": {
      "frame": {
        "x": 138,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_5.png": {
      "frame": {
        "x": 172,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_4.png": {
      "frame": {
        "x": 206,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_3.png": {
      "frame": {
        "x": 240,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_22.png": {
      "frame": {
        "x": 274,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_21.png": {
      "frame": {
        "x": 308,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_20.png": {
      "frame": {
        "x": 342,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_2.png": {
      "frame": {
        "x": 371,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_19.png": {
      "frame": {
        "x": 396,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_18.png": {
      "frame": {
        "x": 396,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_17.png": {
      "frame": {
        "x": 376,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_16.png": {
      "frame": {
        "x": 376,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_15.png": {
      "frame": {
        "x": 376,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_14.png": {
      "frame": {
        "x": 376,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_13.png": {
      "frame": {
        "x": 376,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_12.png": {
      "frame": {
        "x": 376,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_11.png": {
      "frame": {
        "x": 376,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_10.png": {
      "frame": {
        "x": 376,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_4_1.png": {
      "frame": {
        "x": 376,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_9.png": {
      "frame": {
        "x": 2,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_8.png": {
      "frame": {
        "x": 36,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_7.png": {
      "frame": {
        "x": 70,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_6.png": {
      "frame": {
        "x": 104,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_5.png": {
      "frame": {
        "x": 138,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_4.png": {
      "frame": {
        "x": 172,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_3.png": {
      "frame": {
        "x": 206,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_22.png": {
      "frame": {
        "x": 240,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_21.png": {
      "frame": {
        "x": 274,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_20.png": {
      "frame": {
        "x": 308,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_2.png": {
      "frame": {
        "x": 342,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_19.png": {
      "frame": {
        "x": 376,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_18.png": {
      "frame": {
        "x": 405,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_17.png": {
      "frame": {
        "x": 430,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_16.png": {
      "frame": {
        "x": 430,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_15.png": {
      "frame": {
        "x": 410,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_14.png": {
      "frame": {
        "x": 410,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_13.png": {
      "frame": {
        "x": 410,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_12.png": {
      "frame": {
        "x": 410,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_11.png": {
      "frame": {
        "x": 410,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_10.png": {
      "frame": {
        "x": 410,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_3_1.png": {
      "frame": {
        "x": 410,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_9.png": {
      "frame": {
        "x": 410,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_8.png": {
      "frame": {
        "x": 439,
        "y": 70,
        "w": 28,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 0,
        "w": 28,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_7.png": {
      "frame": {
        "x": 410,
        "y": 376,
        "w": 28,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 0,
        "w": 28,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_6.png": {
      "frame": {
        "x": 440,
        "y": 376,
        "w": 32,
        "h": 26
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_5.png": {
      "frame": {
        "x": 410,
        "y": 404,
        "w": 28,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 28,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_4.png": {
      "frame": {
        "x": 440,
        "y": 410,
        "w": 28,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 28,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_3.png": {
      "frame": {
        "x": 410,
        "y": 432,
        "w": 28,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 6,
        "w": 28,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_21.png": {
      "frame": {
        "x": 470,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_20.png": {
      "frame": {
        "x": 464,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_2.png": {
      "frame": {
        "x": 2,
        "y": 444,
        "w": 32,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 6,
        "w": 32,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_19.png": {
      "frame": {
        "x": 98,
        "y": 2,
        "w": 22,
        "h": 24
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 0,
        "w": 22,
        "h": 24
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_18.png": {
      "frame": {
        "x": 440,
        "y": 444,
        "w": 22,
        "h": 24
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 22,
        "h": 24
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_17.png": {
      "frame": {
        "x": 470,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_16.png": {
      "frame": {
        "x": 470,
        "y": 104,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_15.png": {
      "frame": {
        "x": 444,
        "y": 104,
        "w": 22,
        "h": 24
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 8,
        "w": 22,
        "h": 24
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_14.png": {
      "frame": {
        "x": 444,
        "y": 128,
        "w": 22,
        "h": 24
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 8,
        "w": 22,
        "h": 24
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_13.png": {
      "frame": {
        "x": 470,
        "y": 138,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_12.png": {
      "frame": {
        "x": 470,
        "y": 172,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_11.png": {
      "frame": {
        "x": 470,
        "y": 206,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_10.png": {
      "frame": {
        "x": 470,
        "y": 240,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_2_1.png": {
      "frame": {
        "x": 36,
        "y": 444,
        "w": 28,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 6,
        "w": 28,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_9.png": {
      "frame": {
        "x": 470,
        "y": 274,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_8.png": {
      "frame": {
        "x": 470,
        "y": 308,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_7.png": {
      "frame": {
        "x": 470,
        "y": 342,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_6.png": {
      "frame": {
        "x": 470,
        "y": 376,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_5.png": {
      "frame": {
        "x": 470,
        "y": 410,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_4.png": {
      "frame": {
        "x": 2,
        "y": 472,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_3.png": {
      "frame": {
        "x": 36,
        "y": 472,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_22.png": {
      "frame": {
        "x": 70,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_21.png": {
      "frame": {
        "x": 104,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_20.png": {
      "frame": {
        "x": 138,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_2.png": {
      "frame": {
        "x": 172,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_19.png": {
      "frame": {
        "x": 206,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_18.png": {
      "frame": {
        "x": 240,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_17.png": {
      "frame": {
        "x": 274,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_16.png": {
      "frame": {
        "x": 308,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_15.png": {
      "frame": {
        "x": 342,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_14.png": {
      "frame": {
        "x": 376,
        "y": 444,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_13.png": {
      "frame": {
        "x": 410,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_12.png": {
      "frame": {
        "x": 444,
        "y": 470,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_11.png": {
      "frame": {
        "x": 498,
        "y": 36,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_10.png": {
      "frame": {
        "x": 504,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Grass_1_1.png": {
      "frame": {
        "x": 504,
        "y": 70,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "grass.png",
    "format": "RGBA8888",
    "size": {
      "w": 538,
      "h": 506
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/houses1.json
```json
{
  "frames": {
    "Villa_5.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 288,
        "h": 416
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 288,
        "h": 416
      },
      "sourceSize": {
        "w": 288,
        "h": 416
      }
    },
    "Villa_4.png": {
      "frame": {
        "x": 292,
        "y": 2,
        "w": 288,
        "h": 416
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 288,
        "h": 416
      },
      "sourceSize": {
        "w": 288,
        "h": 416
      }
    },
    "Villa_3.png": {
      "frame": {
        "x": 2,
        "y": 420,
        "w": 288,
        "h": 416
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 288,
        "h": 416
      },
      "sourceSize": {
        "w": 288,
        "h": 416
      }
    },
    "Villa_2.png": {
      "frame": {
        "x": 420,
        "y": 420,
        "w": 288,
        "h": 416
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 288,
        "h": 416
      },
      "sourceSize": {
        "w": 288,
        "h": 416
      }
    },
    "Villa_1.png": {
      "frame": {
        "x": 582,
        "y": 2,
        "w": 288,
        "h": 416
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 288,
        "h": 416
      },
      "sourceSize": {
        "w": 288,
        "h": 416
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "houses1.png",
    "format": "RGBA8888",
    "size": {
      "w": 872,
      "h": 710
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/icons.json
```json
{
  "frames": {
    "linkedin9.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 21,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 6,
        "y": 1,
        "w": 21,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin8.png": {
      "frame": {
        "x": 25,
        "y": 2,
        "w": 17,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 1,
        "w": 17,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin7.png": {
      "frame": {
        "x": 2,
        "y": 34,
        "w": 12,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 1,
        "w": 12,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin6.png": {
      "frame": {
        "x": 44,
        "y": 2,
        "w": 8,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 1,
        "w": 8,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin5.png": {
      "frame": {
        "x": 2,
        "y": 48,
        "w": 7,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 1,
        "w": 7,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin4.png": {
      "frame": {
        "x": 54,
        "y": 2,
        "w": 12,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 1,
        "w": 12,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin3.png": {
      "frame": {
        "x": 34,
        "y": 34,
        "w": 17,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 1,
        "w": 17,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin2.png": {
      "frame": {
        "x": 2,
        "y": 57,
        "w": 24,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 1,
        "w": 24,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin18.png": {
      "frame": {
        "x": 34,
        "y": 53,
        "w": 24,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 1,
        "w": 24,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin17.png": {
      "frame": {
        "x": 68,
        "y": 2,
        "w": 17,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 1,
        "w": 17,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin16.png": {
      "frame": {
        "x": 66,
        "y": 34,
        "w": 12,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 1,
        "w": 12,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin15.png": {
      "frame": {
        "x": 2,
        "y": 83,
        "w": 7,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 1,
        "w": 7,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin14.png": {
      "frame": {
        "x": 34,
        "y": 79,
        "w": 8,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 1,
        "w": 8,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin13.png": {
      "frame": {
        "x": 87,
        "y": 2,
        "w": 12,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 10,
        "y": 1,
        "w": 12,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin12.png": {
      "frame": {
        "x": 80,
        "y": 34,
        "w": 17,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 1,
        "w": 17,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin11.png": {
      "frame": {
        "x": 66,
        "y": 66,
        "w": 21,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 6,
        "y": 1,
        "w": 21,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin10.png": {
      "frame": {
        "x": 2,
        "y": 92,
        "w": 30,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 1,
        "y": 1,
        "w": 30,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "linkedin1.png": {
      "frame": {
        "x": 34,
        "y": 89,
        "w": 30,
        "h": 30
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 1,
        "y": 1,
        "w": 30,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored9.png": {
      "frame": {
        "x": 66,
        "y": 89,
        "w": 26,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored8.png": {
      "frame": {
        "x": 101,
        "y": 2,
        "w": 22,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored7.png": {
      "frame": {
        "x": 94,
        "y": 89,
        "w": 13,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 13,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored6.png": {
      "frame": {
        "x": 109,
        "y": 36,
        "w": 3,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 14,
        "y": 0,
        "w": 3,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored5.png": {
      "frame": {
        "x": 99,
        "y": 36,
        "w": 7,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 0,
        "w": 7,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored4.png": {
      "frame": {
        "x": 2,
        "y": 124,
        "w": 16,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 16,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored3.png": {
      "frame": {
        "x": 125,
        "y": 2,
        "w": 22,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored2.png": {
      "frame": {
        "x": 114,
        "y": 36,
        "w": 29,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 0,
        "w": 29,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored18.png": {
      "frame": {
        "x": 114,
        "y": 67,
        "w": 29,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 0,
        "w": 29,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored17.png": {
      "frame": {
        "x": 109,
        "y": 98,
        "w": 22,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored16.png": {
      "frame": {
        "x": 36,
        "y": 123,
        "w": 16,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 16,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored15.png": {
      "frame": {
        "x": 109,
        "y": 122,
        "w": 7,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 0,
        "w": 7,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored14.png": {
      "frame": {
        "x": 143,
        "y": 98,
        "w": 3,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 14,
        "y": 0,
        "w": 3,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored13.png": {
      "frame": {
        "x": 70,
        "y": 123,
        "w": 13,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 13,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored12.png": {
      "frame": {
        "x": 104,
        "y": 132,
        "w": 22,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored11.png": {
      "frame": {
        "x": 70,
        "y": 138,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored10.png": {
      "frame": {
        "x": 128,
        "y": 132,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagramColored1.png": {
      "frame": {
        "x": 149,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram9.png": {
      "frame": {
        "x": 148,
        "y": 36,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram8.png": {
      "frame": {
        "x": 36,
        "y": 141,
        "w": 22,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram7.png": {
      "frame": {
        "x": 2,
        "y": 142,
        "w": 15,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 15,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram6.png": {
      "frame": {
        "x": 148,
        "y": 64,
        "w": 6,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 13,
        "y": 0,
        "w": 6,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram5.png": {
      "frame": {
        "x": 148,
        "y": 72,
        "w": 9,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 11,
        "y": 0,
        "w": 9,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram4.png": {
      "frame": {
        "x": 148,
        "y": 83,
        "w": 15,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 15,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram3.png": {
      "frame": {
        "x": 148,
        "y": 100,
        "w": 21,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 6,
        "y": 0,
        "w": 21,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram2.png": {
      "frame": {
        "x": 2,
        "y": 159,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram18.png": {
      "frame": {
        "x": 36,
        "y": 165,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram17.png": {
      "frame": {
        "x": 70,
        "y": 166,
        "w": 21,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 6,
        "y": 0,
        "w": 21,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram16.png": {
      "frame": {
        "x": 162,
        "y": 123,
        "w": 15,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 15,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram15.png": {
      "frame": {
        "x": 162,
        "y": 157,
        "w": 9,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 11,
        "y": 0,
        "w": 9,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram14.png": {
      "frame": {
        "x": 173,
        "y": 157,
        "w": 6,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 13,
        "y": 0,
        "w": 6,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram13.png": {
      "frame": {
        "x": 104,
        "y": 166,
        "w": 15,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 8,
        "y": 0,
        "w": 15,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram12.png": {
      "frame": {
        "x": 179,
        "y": 123,
        "w": 22,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram11.png": {
      "frame": {
        "x": 2,
        "y": 187,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram10.png": {
      "frame": {
        "x": 104,
        "y": 183,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "instagram1.png": {
      "frame": {
        "x": 203,
        "y": 2,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github9.png": {
      "frame": {
        "x": 70,
        "y": 189,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github8.png": {
      "frame": {
        "x": 138,
        "y": 166,
        "w": 22,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github7.png": {
      "frame": {
        "x": 36,
        "y": 193,
        "w": 16,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 16,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github6.png": {
      "frame": {
        "x": 203,
        "y": 36,
        "w": 10,
        "h": 31
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 11,
        "y": 0,
        "w": 10,
        "h": 31
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github5.png": {
      "frame": {
        "x": 36,
        "y": 211,
        "w": 8,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 0,
        "w": 8,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github4.png": {
      "frame": {
        "x": 183,
        "y": 2,
        "w": 13,
        "h": 31
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 13,
        "h": 31
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github3.png": {
      "frame": {
        "x": 138,
        "y": 200,
        "w": 20,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 0,
        "w": 20,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github2.png": {
      "frame": {
        "x": 172,
        "y": 191,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github18.png": {
      "frame": {
        "x": 181,
        "y": 157,
        "w": 26,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github17.png": {
      "frame": {
        "x": 206,
        "y": 191,
        "w": 20,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 0,
        "w": 20,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github16.png": {
      "frame": {
        "x": 183,
        "y": 35,
        "w": 13,
        "h": 31
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 13,
        "h": 31
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github15.png": {
      "frame": {
        "x": 209,
        "y": 48,
        "w": 8,
        "h": 30
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 12,
        "y": 0,
        "w": 8,
        "h": 30
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github14.png": {
      "frame": {
        "x": 203,
        "y": 58,
        "w": 10,
        "h": 31
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 11,
        "y": 0,
        "w": 10,
        "h": 31
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github13.png": {
      "frame": {
        "x": 182,
        "y": 68,
        "w": 16,
        "h": 32
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 9,
        "y": 0,
        "w": 16,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github12.png": {
      "frame": {
        "x": 203,
        "y": 70,
        "w": 22,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 5,
        "y": 0,
        "w": 22,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github11.png": {
      "frame": {
        "x": 200,
        "y": 94,
        "w": 26,
        "h": 32
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 3,
        "y": 0,
        "w": 26,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github10.png": {
      "frame": {
        "x": 203,
        "y": 122,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "github1.png": {
      "frame": {
        "x": 2,
        "y": 215,
        "w": 32,
        "h": 32
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "icons.png",
    "format": "RGBA8888",
    "size": {
      "w": 241,
      "h": 249
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/props.json
```json
{
  "frames": {
    "Tree_159.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 150,
        "h": 167
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 7,
        "y": 23,
        "w": 150,
        "h": 167
      },
      "sourceSize": {
        "w": 160,
        "h": 192
      }
    },
    "Tree_145.png": {
      "frame": {
        "x": 154,
        "y": 2,
        "w": 96,
        "h": 89
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 5,
        "w": 96,
        "h": 89
      },
      "sourceSize": {
        "w": 96,
        "h": 96
      }
    },
    "Sign_3.png": {
      "frame": {
        "x": 154,
        "y": 100,
        "w": 26,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 6,
        "w": 26,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sign_2.png": {
      "frame": {
        "x": 154,
        "y": 128,
        "w": 24,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 6,
        "w": 24,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    },
    "Sign_1.png": {
      "frame": {
        "x": 180,
        "y": 128,
        "w": 26,
        "h": 26
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 4,
        "y": 6,
        "w": 26,
        "h": 26
      },
      "sourceSize": {
        "w": 32,
        "h": 32
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "props.png",
    "format": "RGBA8888",
    "size": {
      "w": 245,
      "h": 171
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: archived/sceneSetup.ts
```typescript
import { ResidentialArea } from "./scenes/residentialarea";
import { SceneManager } from "./scenes/sceneManager";
import { TownSquare } from "./scenes/townsquare";
import { WorkshopDistrict } from "./scenes/workshopdistrict";

export enum SceneNames {
  Loading = "loading",
  TownSquare = "townSquare",
  WorkshopDistrict = "workshopDistrict",
  ResidentialArea = "residentialArea",
  About = "about",
  Projects = "projects",
  Imprint = "imprint",
}

export const sceneSetup = (sceneManager: SceneManager) => {
  const townSquareScene = new TownSquare();
  const workshopDistrictScene = new WorkshopDistrict();
  const residentialScene = new ResidentialArea();

  sceneManager.addScene(SceneNames.TownSquare, townSquareScene);
  sceneManager.addScene(SceneNames.WorkshopDistrict, workshopDistrictScene);
  sceneManager.addScene(SceneNames.ResidentialArea, residentialScene);
  sceneManager.setSceneActive(SceneNames.TownSquare);
};
```

## File: src/types/common.ts
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructable<T, TArgs extends any[] = any> = {
  new (...args: TArgs): T;
};

export enum Direction {
  North = "North",
  South = "South",
  West = "West",
  East = "East",
  NorthIdle = "NorthIdle",
  SouthIdle = "SouthIdle",
  WestIdle = "WestIdle",
  EastIdle = "EastIdle",
}
```

## File: src/utilities/collisionMap.ts
```typescript
import { TILE_COUNT_X, TILE_COUNT_Y, TILE_SIZE } from "../types/constants";

export interface Point {
  x: number;
  y: number;
}

export class CollisionMap {
  private readonly blockedTileId = 79;

  constructor(private readonly data: number[][]) {}

  public isWalkableTile(x: number, y: number): boolean {
    if (x < 0 || x >= TILE_COUNT_X || y < 0 || y >= TILE_COUNT_Y) {
      return false;
    }

    return this.data[y][x] !== this.blockedTileId;
  }

  public isWalkableWorld(x: number, y: number): boolean {
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);
    return this.isWalkableTile(tileX, tileY);
  }

  public clampToNearestWalkable(worldX: number, worldY: number, maxRadiusTiles = 5): Point | null {
    const originX = Math.floor(worldX / TILE_SIZE);
    const originY = Math.floor(worldY / TILE_SIZE);

    if (this.isWalkableTile(originX, originY)) {
      return { x: worldX, y: worldY };
    }

    for (let radius = 1; radius <= maxRadiusTiles; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) {
            continue;
          }

          const tx = originX + dx;
          const ty = originY + dy;
          if (!this.isWalkableTile(tx, ty)) {
            continue;
          }

          return {
            x: tx * TILE_SIZE + TILE_SIZE * 0.5,
            y: ty * TILE_SIZE + TILE_SIZE * 0.5,
          };
        }
      }
    }

    return null;
  }

  public nextStep(from: Point, target: Point, maxStep: number): Point {
    const dx = target.x - from.x;
    const dy = target.y - from.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 1e-6) {
      return from;
    }

    const step = Math.min(maxStep, distance);
    const baseAngle = Math.atan2(dy, dx);

    const angleOffsets = [0, 0.26, -0.26, 0.52, -0.52, 0.79, -0.79, 1.05, -1.05, 1.31, -1.31, Math.PI];

    for (const offset of angleOffsets) {
      const angle = baseAngle + offset;
      const nx = from.x + Math.cos(angle) * step;
      const ny = from.y + Math.sin(angle) * step;
      if (this.isWalkableWorld(nx, ny)) {
        return { x: nx, y: ny };
      }
    }

    return from;
  }
}
```

## File: src/utilities/debug.ts
```typescript
import { World } from "../world/world";
import { Point } from "pixi.js";

export class DebugManager {
  private isVisible: boolean = false;
  private world: World;
  private debugContainer: HTMLDivElement | null = null;
  private toggleButton: HTMLButtonElement | null = null;
  private worldPosLabel: HTMLDivElement | null = null;
  private screenPosLabel: HTMLDivElement | null = null;

  constructor(world: World) {
    this.world = world;
    this.createToggleButton();
    this.createDebugDisplay();
  }

  private createToggleButton() {
    if (typeof document === "undefined") return;

    this.toggleButton = document.createElement("button");
    this.toggleButton.innerText = "DEBUG: OFF";
    this.toggleButton.style.position = "fixed";
    this.toggleButton.style.bottom = "20px";
    this.toggleButton.style.left = "20px";
    this.toggleButton.style.zIndex = "3000";
    this.toggleButton.style.fontFamily = "'JetBrains Mono', monospace";
    this.toggleButton.style.fontSize = "12px";
    this.toggleButton.style.fontWeight = "800";
    this.toggleButton.style.padding = "8px 12px";
    this.toggleButton.style.border = "4px solid var(--primary, black)";
    this.toggleButton.style.backgroundColor = "var(--secondary, white)";
    this.toggleButton.style.color = "var(--primary, black)";
    this.toggleButton.style.cursor = "pointer";
    this.toggleButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
    this.toggleButton.style.transition = "transform 0.1s, box-shadow 0.1s";

    this.toggleButton.onclick = () => {
      this.isVisible = !this.isVisible;
      this.updateUI();
    };

    document.body.appendChild(this.toggleButton);
  }

  private createDebugDisplay() {
    if (typeof document === "undefined") return;

    this.debugContainer = document.createElement("div");
    this.debugContainer.style.position = "fixed";
    this.debugContainer.style.top = "20px";
    this.debugContainer.style.right = "20px";
    this.debugContainer.style.zIndex = "3000";
    this.debugContainer.style.display = "none";
    this.debugContainer.style.flexDirection = "column";
    this.debugContainer.style.gap = "5px";
    this.debugContainer.style.padding = "10px";
    this.debugContainer.style.backgroundColor = "var(--secondary, white)";
    this.debugContainer.style.border = "4px solid var(--primary, black)";
    this.debugContainer.style.boxShadow = "8px 8px 0px var(--primary, black)";
    this.debugContainer.style.fontFamily = "'JetBrains Mono', monospace";
    this.debugContainer.style.fontSize = "12px";
    this.debugContainer.style.fontWeight = "800";
    this.debugContainer.style.color = "var(--primary, black)";
    this.debugContainer.style.pointerEvents = "none";

    const title = document.createElement("div");
    title.innerText = "DEBUG INFO";
    title.style.borderBottom = "2px solid var(--primary, black)";
    title.style.marginBottom = "5px";
    title.style.paddingBottom = "2px";
    this.debugContainer.appendChild(title);

    this.worldPosLabel = document.createElement("div");
    this.screenPosLabel = document.createElement("div");

    this.debugContainer.appendChild(this.worldPosLabel);
    this.debugContainer.appendChild(this.screenPosLabel);

    document.body.appendChild(this.debugContainer);
  }

  private updateUI() {
    if (!this.toggleButton || !this.debugContainer) return;

    if (this.isVisible) {
      this.toggleButton.innerText = "DEBUG: ON";
      this.toggleButton.style.backgroundColor = "var(--primary, black)";
      this.toggleButton.style.color = "var(--secondary, white)";
      this.toggleButton.style.transform = "translate(2px, 2px)";
      this.toggleButton.style.boxShadow = "2px 2px 0px var(--primary, black)";
      this.debugContainer.style.display = "flex";
    } else {
      this.toggleButton.innerText = "DEBUG: OFF";
      this.toggleButton.style.backgroundColor = "var(--secondary, white)";
      this.toggleButton.style.color = "var(--primary, black)";
      this.toggleButton.style.transform = "translate(0, 0)";
      this.toggleButton.style.boxShadow = "4px 4px 0px var(--primary, black)";
      this.debugContainer.style.display = "none";
    }
  }

  public updateMousePosition(screenPos: Point) {
    if (!this.isVisible || !this.worldPosLabel || !this.screenPosLabel) return;

    const worldPos = this.world.toLocal(screenPos);

    this.screenPosLabel.innerText = `SCREEN: X: ${Math.round(screenPos.x)} Y: ${Math.round(screenPos.y)}`;
    this.worldPosLabel.innerText = `WORLD:  X: ${Math.round(worldPos.x)} Y: ${Math.round(worldPos.y)}`;
  }
}
```

## File: src/utilities/gsap.ts
```typescript
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export const registerGSAP = async () => {
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);
};
```

## File: src/utilities/pathfinding.ts
```typescript
import { TILE_COUNT_X, TILE_COUNT_Y } from "../types/constants";

export interface Point {
  x: number;
  y: number;
}

class Node {
  constructor(public x: number, public y: number, public walkable: boolean, public g = 0, public h = 0, public f = 0, public parent: Node | null = null) {}
}

export class Pathfinding {
  private grid: Node[][] = [];

  constructor(data: number[][]) {
    for (let y = 0; y < TILE_COUNT_Y; y++) {
      this.grid[y] = [];
      for (let x = 0; x < TILE_COUNT_X; x++) {
        // Any non-zero tile in the "Paths" layer is walkable
        const isWalkable = data[y][x] === 73;
        this.grid[y][x] = new Node(x, y, isWalkable);
      }
    }
  }

  public findPath(start: Point, end: Point): Point[] {
    const startNode = this.grid[start.y]?.[start.x];
    const endNode = this.grid[end.y]?.[end.x];

    if (!startNode || !endNode || !endNode.walkable) {
      // If end is not walkable, try to find nearest walkable neighbor
      const nearest = this.findNearestWalkable(end.x, end.y);
      if (!nearest) return [];
      return this.findPath(start, nearest);
    }

    const openSet: Node[] = [startNode];
    const closedSet: Set<Node> = new Set();

    // Reset grid
    for (let y = 0; y < TILE_COUNT_Y; y++) {
      for (let x = 0; x < TILE_COUNT_X; x++) {
        const node = this.grid[y][x];
        node.g = 0;
        node.h = 0;
        node.f = 0;
        node.parent = null;
      }
    }

    while (openSet.length > 0) {
      let currentIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }

      const current = openSet[currentIndex];

      if (current === endNode) {
        const path: Point[] = [];
        let temp: Node | null = current;
        while (temp) {
          path.push({ x: temp.x, y: temp.y });
          temp = temp.parent;
        }
        return path.reverse();
      }

      openSet.splice(currentIndex, 1);
      closedSet.add(current);

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor) || !neighbor.walkable) continue;

        const tentativeG = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tentativeG < neighbor.g) {
            neighbor.g = tentativeG;
            newPath = true;
          }
        } else {
          neighbor.g = tentativeG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    return [];
  }

  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    for (const dir of dirs) {
      const nx = node.x + dir.x;
      const ny = node.y + dir.y;
      if (nx >= 0 && nx < TILE_COUNT_X && ny >= 0 && ny < TILE_COUNT_Y) {
        neighbors.push(this.grid[ny][nx]);
      }
    }
    return neighbors;
  }

  private findNearestWalkable(x: number, y: number): Point | null {
    let radius = 1;
    const maxRadius = 5;

    while (radius <= maxRadius) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < TILE_COUNT_X && ny >= 0 && ny < TILE_COUNT_Y) {
            if (this.grid[ny][nx].walkable) {
              return { x: nx, y: ny };
            }
          }
        }
      }
      radius++;
    }
    return null;
  }
}
```

## File: src/utilities/theme.ts
```typescript
import { World } from "../world/world";

type Theme = "auto" | "light" | "dark";

export class ThemeManager {
  private theme: Theme = "auto";
  private world: World;
  private menuContainer: HTMLDivElement | null = null;

  constructor(world: World) {
    this.world = world;
    this.loadTheme();
    this.createToggle();
    this.startAutoUpdate();
  }

  private loadTheme() {
    const saved = localStorage.getItem("theme-preference") as Theme;
    if (saved && ["auto", "light", "dark"].includes(saved)) {
      this.theme = saved;
    }
    this.applyTheme();
  }

  private saveTheme() {
    localStorage.setItem("theme-preference", this.theme);
  }

  private createToggle() {
    if (typeof document === "undefined") return;

    this.menuContainer = document.createElement("div");
    this.menuContainer.style.position = "fixed";
    this.menuContainer.style.bottom = "20px";
    this.menuContainer.style.right = "20px";
    this.menuContainer.style.display = "flex";
    this.menuContainer.style.gap = "10px";
    this.menuContainer.style.zIndex = "3000";

    const themes: Theme[] = ["auto", "light", "dark"];
    themes.forEach((t) => {
      const btn = document.createElement("button");
      btn.innerText = t.toUpperCase();
      btn.style.fontFamily = "'JetBrains Mono', monospace";
      btn.style.fontSize = "12px";
      btn.style.fontWeight = "800";
      btn.style.padding = "8px 12px";
      btn.style.border = "4px solid var(--primary, black)";
      btn.style.cursor = "pointer";
      btn.style.boxShadow = "4px 4px 0px var(--primary, black)";
      btn.style.transition = "transform 0.1s, box-shadow 0.1s, background-color 0.3s, color 0.3s, border-color 0.3s";

      const updateStyle = () => {
        if (this.theme === t) {
          btn.style.backgroundColor = "var(--primary, black)";
          btn.style.color = "var(--secondary, white)";
          btn.style.transform = "translate(2px, 2px)";
          btn.style.boxShadow = "2px 2px 0px var(--primary, black)";
        } else {
          btn.style.backgroundColor = "var(--secondary, white)";
          btn.style.color = "var(--primary, black)";
          btn.style.transform = "translate(0, 0)";
          btn.style.boxShadow = "4px 4px 0px var(--primary, black)";
        }
      };

      btn.onclick = () => {
        this.theme = t;
        this.saveTheme();
        this.applyTheme();
        // Update all buttons
        this.menuContainer?.querySelectorAll("button").forEach((b: any) => {
            const themeValue = b.innerText.toLowerCase() as Theme;
            if (this.theme === themeValue) {
                b.style.backgroundColor = "var(--primary, black)";
                b.style.color = "var(--secondary, white)";
                b.style.transform = "translate(2px, 2px)";
                b.style.boxShadow = "2px 2px 0px var(--primary, black)";
            } else {
                b.style.backgroundColor = "var(--secondary, white)";
                b.style.color = "var(--primary, black)";
                b.style.transform = "translate(0, 0)";
                b.style.boxShadow = "4px 4px 0px var(--primary, black)";
            }
        });
      };

      updateStyle();
      this.menuContainer?.appendChild(btn);
    });

    document.body.appendChild(this.menuContainer);
  }

  private applyTheme() {
    const hour = new Date().getHours();
    this.world.updateTime(hour, this.theme);
    
    // Also apply to body for UI elements if needed
    if (this.theme === "dark" || (this.theme === "auto" && (hour < 6 || hour >= 21))) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
  }

  private startAutoUpdate() {
    setInterval(() => {
      this.applyTheme();
    }, 60000); // Update every minute
  }
}
```

## File: src/utilities/vector.ts
```typescript
import { ObservablePoint } from "pixi.js";
import Victor from "victor";

export class Vector extends Victor {
  public static from(point: ObservablePoint | [number, number]) {
    if (Array.isArray(point)) {
      return new Vector(point[0], point[1]);
    }
    return new Vector(point.x, point.y);
  }

  public toPixiPoint(): ObservablePoint {
    return new ObservablePoint(null, this.x, this.y); // (x,y) pair in pixi.js is the y axis being 'up';
  }
}
```

## File: src/world/interiors/baseInterior.ts
```typescript
import { Container, Graphics, Text } from "pixi.js";

export abstract class BaseInterior extends Container {
  protected background: Graphics;
  protected content: Container;
  public onExit?: () => void;

  // Virtual design resolution
  protected designWidth = 1280;
  protected designHeight = 720;

  constructor(title: string, color: string = "#1a1a1a") {
    super();

    this.background = new Graphics();
    this.background.rect(0, 0, window.innerWidth, window.innerHeight).fill(color);
    this.addChild(this.background);

    this.content = new Container();
    this.addChild(this.content);

    const titleText = new Text({
      text: title,
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 48,
        fill: "white",
        fontWeight: "800",
      },
    });
    titleText.position.set(40, 40);
    this.content.addChild(titleText);

    this.createLeaveButton();
    this.fitToScreen();

    window.addEventListener("resize", this.onWindowResize);
  }

  protected createLeaveButton() {
    const button = new Container();
    const bg = new Graphics();
    bg.rect(0, 0, 150, 50).fill("white").stroke({ width: 4, color: "black" });

    const text = new Text({
      text: "LEAVE",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 24,
        fill: "black",
        fontWeight: "800",
      },
    });
    text.position.set((150 - text.width) / 2, (50 - text.height) / 2);

    button.addChild(bg, text);
    // Position relative to design resolution
    button.position.set(this.designWidth - 190, this.designHeight - 90);
    button.eventMode = "static";
    button.cursor = "pointer";

    button.on("pointertap", () => {
      if (this.onExit) this.onExit();
    });

    button.on("pointerover", () => {
      bg.clear().rect(0, 0, 150, 50).fill("#FF0000").stroke({ width: 4, color: "black" });
      text.style.fill = "white";
    });

    button.on("pointerout", () => {
      bg.clear().rect(0, 0, 150, 50).fill("white").stroke({ width: 4, color: "black" });
      text.style.fill = "black";
    });

    this.content.addChild(button);
  }

  protected fitToScreen = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.min(screenWidth / this.designWidth, screenHeight / this.designHeight);

    this.content.scale.set(scale);
    this.content.position.set((screenWidth - this.designWidth * scale) / 2, (screenHeight - this.designHeight * scale) / 2);

    this.background.clear().rect(0, 0, screenWidth, screenHeight).fill(this.background.fillStyle.color);
  };

  private onWindowResize = () => {
    this.fitToScreen();
  };

  public destroy(options?: unknown) {
    window.removeEventListener("resize", this.onWindowResize);
    super.destroy(options);
  }
}
```

## File: src/world/interiors/homeInterior.ts
```typescript
import { Text } from "pixi.js";
import { BaseInterior } from "./baseInterior";

export class HomeInterior extends BaseInterior {
  constructor() {
    super("My Home", "#1a2a3a"); // Darker blue for library vibes

    const description = new Text({
      text: "A vast digital archive of past projects and technical documentation.\nEach terminal here contains a piece of my development journey.",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18,
        fill: "#cccccc",
        lineHeight: 28,
      },
    });
    description.position.set(40, 120);
    this.addChild(description);

    // Add some mock terminal labels
    const projects = ["Project Alpha", "Project Beta", "Legacy System 01", "Graphics Engine V2"];
    projects.forEach((name, i) => {
      const pText = new Text({
        text: `> TERMINAL_${i + 1}: ${name}`,
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          fill: "#00FF00", // Retro terminal green
        },
      });
      pText.position.set(60, 240 + i * 40);
      this.addChild(pText);
    });
  }
}
```

## File: src/world/interiors/libraryInterior.ts
```typescript
import { Text } from "pixi.js";
import { BaseInterior } from "./baseInterior";

export class LibraryInterior extends BaseInterior {
  constructor() {
    super("THE LIBRARY", "#1a2a3a"); // Darker blue for library vibes

    const description = new Text({
      text: "A vast digital archive of past projects and technical documentation.\nEach terminal here contains a piece of my development journey.",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18,
        fill: "#cccccc",
        lineHeight: 28,
      }
    });
    description.position.set(40, 120);
    this.addChild(description);

    // Add some mock terminal labels
    const projects = ["Project Alpha", "Project Beta", "Legacy System 01", "Graphics Engine V2"];
    projects.forEach((name, i) => {
        const pText = new Text({
            text: `> TERMINAL_${i+1}: ${name}`,
            style: {
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fill: "#00FF00", // Retro terminal green
            }
        });
        pText.position.set(60, 240 + (i * 40));
        this.addChild(pText);
    });
  }
}
```

## File: static/assets/animations/scout1idle.json
```json
{
  "frames": {
    "scout1idle_24.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_23.png": {
      "frame": {
        "x": 36,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_22.png": {
      "frame": {
        "x": 2,
        "y": 52,
        "w": 32,
        "h": 50
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_21.png": {
      "frame": {
        "x": 70,
        "y": 2,
        "w": 32,
        "h": 50
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_20.png": {
      "frame": {
        "x": 54,
        "y": 54,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_19.png": {
      "frame": {
        "x": 2,
        "y": 86,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_18.png": {
      "frame": {
        "x": 104,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_17.png": {
      "frame": {
        "x": 104,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_16.png": {
      "frame": {
        "x": 52,
        "y": 102,
        "w": 32,
        "h": 50
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_15.png": {
      "frame": {
        "x": 86,
        "y": 102,
        "w": 32,
        "h": 50
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_14.png": {
      "frame": {
        "x": 2,
        "y": 120,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_13.png": {
      "frame": {
        "x": 138,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_12.png": {
      "frame": {
        "x": 138,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_11.png": {
      "frame": {
        "x": 120,
        "y": 102,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_10.png": {
      "frame": {
        "x": 120,
        "y": 152,
        "w": 32,
        "h": 50
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_09.png": {
      "frame": {
        "x": 2,
        "y": 154,
        "w": 32,
        "h": 50
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_08.png": {
      "frame": {
        "x": 54,
        "y": 154,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_07.png": {
      "frame": {
        "x": 154,
        "y": 102,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_06.png": {
      "frame": {
        "x": 172,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_05.png": {
      "frame": {
        "x": 172,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_04.png": {
      "frame": {
        "x": 172,
        "y": 152,
        "w": 32,
        "h": 50
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_03.png": {
      "frame": {
        "x": 2,
        "y": 188,
        "w": 32,
        "h": 50
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_02.png": {
      "frame": {
        "x": 54,
        "y": 188,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1idle_01.png": {
      "frame": {
        "x": 104,
        "y": 186,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "scout1idle.png",
    "format": "RGBA8888",
    "size": {
      "w": 206,
      "h": 222
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: static/assets/animations/scout1standing.json
```json
{
  "frames": {
    "scout1standing_04.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 48
      }
    },
    "scout1standing_03.png": {
      "frame": {
        "x": 36,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 48
      }
    },
    "scout1standing_02.png": {
      "frame": {
        "x": 2,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 48
      }
    },
    "scout1standing_01.png": {
      "frame": {
        "x": 52,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 48
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "scout1standing.png",
    "format": "RGBA8888",
    "size": {
      "w": 102,
      "h": 86
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: static/assets/animations/scout1walking.json
```json
{
  "frames": {
    "scout1_24.png": {
      "frame": {
        "x": 2,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 30,
        "h": 50
      }
    },
    "scout1_23.png": {
      "frame": {
        "x": 34,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_22.png": {
      "frame": {
        "x": 2,
        "y": 52,
        "w": 30,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_21.png": {
      "frame": {
        "x": 66,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 0,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_20.png": {
      "frame": {
        "x": 2,
        "y": 84,
        "w": 30,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_19.png": {
      "frame": {
        "x": 52,
        "y": 52,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 0,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_18.png": {
      "frame": {
        "x": 98,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_17.png": {
      "frame": {
        "x": 84,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_16.png": {
      "frame": {
        "x": 2,
        "y": 116,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_15.png": {
      "frame": {
        "x": 52,
        "y": 102,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_14.png": {
      "frame": {
        "x": 132,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_13.png": {
      "frame": {
        "x": 118,
        "y": 52,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_12.png": {
      "frame": {
        "x": 102,
        "y": 102,
        "w": 30,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_11.png": {
      "frame": {
        "x": 2,
        "y": 150,
        "w": 32,
        "h": 50
      },
      "rotated": true,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_10.png": {
      "frame": {
        "x": 102,
        "y": 134,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 2,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_09.png": {
      "frame": {
        "x": 134,
        "y": 134,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_08.png": {
      "frame": {
        "x": 166,
        "y": 2,
        "w": 32,
        "h": 50
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 50
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_07.png": {
      "frame": {
        "x": 166,
        "y": 54,
        "w": 30,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 30,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_06.png": {
      "frame": {
        "x": 166,
        "y": 104,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_05.png": {
      "frame": {
        "x": 166,
        "y": 154,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_04.png": {
      "frame": {
        "x": 2,
        "y": 184,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_03.png": {
      "frame": {
        "x": 52,
        "y": 184,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_02.png": {
      "frame": {
        "x": 102,
        "y": 184,
        "w": 32,
        "h": 48
      },
      "rotated": true,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    },
    "scout1_01.png": {
      "frame": {
        "x": 198,
        "y": 54,
        "w": 32,
        "h": 48
      },
      "rotated": false,
      "trimmed": true,
      "spriteSourceSize": {
        "x": 0,
        "y": 2,
        "w": 32,
        "h": 48
      },
      "sourceSize": {
        "w": 32,
        "h": 50
      }
    }
  },
  "meta": {
    "app": "http://github.com/pixijs/assetpack",
    "version": "1.0",
    "image": "scout1walking.png",
    "format": "RGBA8888",
    "size": {
      "w": 232,
      "h": 218
    },
    "scale": 1,
    "related_multi_packs": []
  }
}
```

## File: static/assets/mapdata/camping.tsx
```typescript
<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.2" name="camping" tilewidth="32" tileheight="32" tilecount="5792" columns="32">
 <image source="../textures/camping.png" width="1024" height="5792"/>
</tileset>
```

## File: static/assets/mapdata/citytiles.tsx
```typescript
<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.2" name="citytiles" tilewidth="32" tileheight="32" tilecount="6077" columns="59">
 <image source="../textures/citytiles.png" width="1888" height="3296"/>
</tileset>
```

## File: static/assets/mapdata/grounds.tsx
```typescript
<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.2" name="grounds" tilewidth="32" tileheight="32" tilecount="2176" columns="32">
 <image source="../textures/grounds.png" width="1024" height="2176"/>
</tileset>
```

## File: static/assets/mapdata/villas.tsx
```typescript
<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.2" name="villas" tilewidth="32" tileheight="32" tilecount="1824" columns="32">
 <image source="../textures/villas.png" width="1024" height="1824"/>
</tileset>
```

## File: tiledData/cavhoo_github.tiled-project
```
{
    "automappingRulesFile": "",
    "commands": [
    ],
    "compatibilityVersion": 1100,
    "extensionsPath": "extensions",
    "folders": [
        ".",
        "../static/assets/mapdata"
    ],
    "properties": [
    ],
    "propertyTypes": [
    ]
}
```

## File: tiledData/grounds.tsx
```typescript
<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.2" name="grounds" tilewidth="32" tileheight="32" tilecount="2176" columns="32">
 <image source="../static/assets/textures/grounds.png" width="1024" height="2176"/>
</tileset>
```

## File: tiledData/town.tmx
```
<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.11.2" orientation="orthogonal" renderorder="right-down" width="50" height="50" tilewidth="32" tileheight="32" infinite="0" nextlayerid="2" nextobjectid="1">
 <tileset firstgid="1" source="grounds.tsx"/>
 <layer id="1" name="Tile Layer 1" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,193,194,194,194,194,195,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,225,226,226,226,226,227,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,225,226,226,226,226,227,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,225,226,226,226,226,227,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,257,258,258,258,258,259,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
</map>
```

## File: .assetpack.js
```javascript
import { texturePacker } from "@assetpack/core/texture-packer";
import { webfont } from "@assetpack/core/webfont";
// .assetpack.js
export default {
  entry: "./assets",
  output: "./static/assets",
  pipes: [
    texturePacker({
      texturePacker: {
        padding: 2,
        nameStyle: "relative",
        removeFileExtension: false,
      },
      resolutionOptions: {
        resolutions: { default: 1 },
        fixedResolution: "default",
        maximumTextureSize: 4096,
      },
    }),
    webfont(),
  ],
};
```

## File: eslint.config.js
```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ files: ["**/*.js"], languageOptions: { sourceType: "script" } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
```

## File: GEMINI.md
```markdown
# Project Documentation: cavhoo.github.io

This document outlines the project structure, naming conventions, and programming standards for the portfolio website build with Pixi.js and TypeScript.

## 📁 Folder Structure

- **`/src`**: Core application logic.
  - **`/assets`**: Asset manifests and loading logic.
  - **`/camera`**: Camera systems and viewport management.
  - **`/characters`**: Entity classes for the user and NPCs.
  - **`/types`**: TypeScript interfaces, types, and constants.
  - **`/utilities`**: Helper functions (GSAP, Math, SceneGraph, Overlay, Modal).
  - **`/world`**: World container and scene-specific logic.
    - **`/interiors`**: Interior scene implementations (BaseInterior, LibraryInterior).
- **`/static`**: Static assets served directly.
  - **`/assets/mapdata`**: Tiled `.tmx` and `.tsx` files.
  - **`/assets/textures`**: Spritesheets and images.
  - **`/assets/fonts`**: Web fonts (Jersey10, Silkscreen, Tiny5).
- **`/tiledData`**: Source Tiled project files.
- **`/archived`**: Legacy code and previous iterations for reference.

## 🏷️ Naming Conventions

- **Files**: camelCase (e.g., `sceneGraph.ts`, `user.ts`).
- **Classes**: PascalCase (e.g., `World`, `BaseInterior`, `UserCharacter`).
- **Interfaces/Types**: PascalCase (e.g., `OverlayCoords`, `Building`).
- **Methods/Variables**: camelCase (e.g., `showOverlay`, `isTransitioning`).
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `WORLD_WIDTH`, `TILE_SIZE`).
- **Private/Protected Members**: camelCase (e.g., `this.fadeOverlay`, `this.isTransitioning`).

## 💻 Programming Style & Standards

### TypeScript
- Use strict typing where possible.
- Prefer `interface` for data structures and `class` for complex entities with behavior.
- Use `protected` for members intended for inheritance (e.g., in `BaseInterior`).

### Pixi.js & Rendering
- **Event Mode**: Use `eventMode = "static"` or `"dynamic"` for interactive elements.
- **Scene Graph**: Utilize `SceneGraph.GetComponent(name, parent)` to find elements by their Tiled label/name.
- **Resolution**: The project targets a pixel-perfect feel. `roundPixels: true` and `nearest` scale mode for textures are preferred.

### UI Aesthetic (Brutalist Style)
The HTML overlays and modals follow a **Brutalist / Minimalist** design:
- **Fonts**: Primary use of `'JetBrains Mono', monospace`.
- **Borders**: Thick black borders (e.g., `border: 4px solid black` or `6px`).
- **Shadows**: Solid, non-blurred offsets (e.g., `box-shadow: 8px 8px 0px rgba(0,0,0,1)`).
- **Colors**: High contrast (White, Black, and primary accents like `#FF0000` Red or `#00FF00` Green).
- **Interactions**: Immediate, snappy transitions. Hover states often swap background/text colors or use solid color shifts.

### Transitions & Animations
- Use **GSAP** for all smooth transitions (fades, camera movement, scaling).
- Scene transitions should follow a "Fade to Black -> Swap Content -> Fade In" pattern.
- Camera transformations should be paused (`camera.paused = true`) when showing static interior scenes or full-screen overlays to prevent background scrolling.

### Responsive Design
- Interior scenes should utilize the `fitToScreen` pattern with a virtual design resolution (default: `1280x720`) to ensure content is always visible without scrolling.
- Check for `isTouchDevice()` to differentiate between hover (desktop) and tap (mobile) behaviors.
```

## File: index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HENDRIK (Excyl) | WEB DEVELOPER</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #000000;
            --secondary: #FFFFFF;
            --accent: #FF0000;
            --yellow: #FFFF00;
            --blue: #0066FF;
            --green: #00FF00;
            --pink: #FF00FF;
        }
        
        body {
            font-family: 'JetBrains Mono', monospace;
            background: var(--secondary);
            color: var(--primary);
            line-height: 1.2;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* HEADER SECTION */
        .header {
            background: var(--primary);
            color: var(--secondary);
            padding: 40px 0;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200px;
            height: 200px;
            background: var(--accent);
            transform: rotate(45deg);
            border: 8px solid var(--secondary);
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .name {
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 800;
            letter-spacing: -0.05em;
            text-transform: uppercase;
            margin-bottom: 10px;
            text-shadow: 4px 4px 0px var(--accent);
        }
        
        .title {
            font-size: clamp(1rem, 3vw, 1.5rem);
            font-weight: 400;
            background: var(--yellow);
            color: var(--primary);
            padding: 10px 20px;
            display: inline-block;
            border: 4px solid var(--primary);
            transform: rotate(-2deg);
            margin-bottom: 20px;
        }
        
        .bio {
            font-size: 1.1rem;
            max-width: 600px;
            background: var(--secondary);
            color: var(--primary);
            padding: 20px;
            border: 4px solid var(--secondary);
            box-shadow: 8px 8px 0px var(--blue);
        }
        
        /* NAVIGATION */
        .nav {
            background: var(--yellow);
            padding: 20px 0;
            border-top: 8px solid var(--primary);
            border-bottom: 8px solid var(--primary);
        }
        
        .nav-list {
            display: flex;
            gap: 40px;
            list-style: none;
            flex-wrap: wrap;
        }
        
        .nav-item {
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            padding: 10px 20px;
            background: var(--primary);
            color: var(--secondary);
            border: 4px solid var(--primary);
            transition: all 0.2s ease;
        }
        
        .nav-item:hover {
            background: var(--secondary);
            color: var(--primary);
            transform: translate(-4px, -4px);
            box-shadow: 4px 4px 0px var(--primary);
        }
        
        /* SECTIONS */
        .section {
            padding: 80px 0;
            position: relative;
        }
        
        .section:nth-child(even) {
            background: #f8f8f8;
        }
        
        .section-title {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 40px;
            position: relative;
            display: inline-block;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 8px;
            background: var(--accent);
            transform: skew(-20deg);
        }
        
        /* SKILLS SECTION */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .skill-card {
            background: var(--secondary);
            border: 6px solid var(--primary);
            padding: 30px;
            position: relative;
            transition: all 0.3s ease;
            transform: translate(-8px, -8px);
            box-shadow: 8px 8px 0px var(--primary);
        }
        
        .skill-card::before {
            content: '';
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            background: var(--blue);
            border: 4px solid var(--primary);
        }
        
        .skill-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        
        .experience-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .company {
            background: var(--blue);
            color: var(--secondary);
            padding: 5px 10px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            border: 2px solid var(--primary);
        }
        
        .duration {
            background: var(--green);
            color: var(--primary);
            padding: 5px 10px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            border: 2px solid var(--primary);
        }
        
        .skill-desc {
            font-size: 1rem;
            line-height: 1.4;
        }
        
        /* PROJECTS SECTION */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
            margin-top: 40px;
        }
        
        .project-card {
            background: var(--primary);
            color: var(--secondary);
            border: 6px solid var(--primary);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .project-card:hover {
            transform: rotate(1deg) scale(1.02);
        }
        
        .project-header {
            background: var(--pink);
            color: var(--primary);
            padding: 20px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 1.2rem;
        }
        
        .project-content {
            padding: 30px;
        }
        
        .project-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        
        .project-desc {
            margin-bottom: 20px;
            line-height: 1.4;
        }
        
        .project-tech {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        
        .tech-tag {
            background: var(--green);
            color: var(--primary);
            padding: 5px 10px;
            font-size: 0.8rem;
            font-weight: 700;
            border: 2px solid var(--secondary);
        }
        
        .project-link {
            background: var(--accent);
            color: var(--secondary);
            padding: 10px 20px;
            text-decoration: none;
            font-weight: 700;
            text-transform: uppercase;
            border: 4px solid var(--secondary);
            display: inline-block;
            transition: all 0.2s ease;
        }
        
        .project-link:hover {
            background: var(--secondary);
            color: var(--primary);
            transform: translate(-3px, -3px);
            box-shadow: 3px 3px 0px var(--accent);
        }
        
        /* CONTACT SECTION */
        .contact {
            background: var(--primary);
            color: var(--secondary);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        /* IMPRESSUM SECTION */
        .imprint-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .imprint-card {
            background: var(--secondary);
            border: 6px solid var(--primary);
            padding: 30px;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .imprint-card:hover {
            transform: translate(-5px, -5px);
            box-shadow: 5px 5px 0px var(--primary);
        }
        
        .imprint-card::before {
            content: '';
            position: absolute;
            top: -8px;
            right: -8px;
            width: 25px;
            height: 25px;
            background: var(--accent);
            border: 4px solid var(--primary);
        }
        
        .imprint-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            color: var(--primary);
            border-bottom: 4px solid var(--blue);
            padding-bottom: 10px;
        }
        
        .imprint-info p {
            margin-bottom: 15px;
            line-height: 1.5;
            font-size: 0.95rem;
        }
        
        .imprint-info strong {
            color: var(--accent);
            font-weight: 700;
        }
        
        .contact::before {
            content: '';
            position: absolute;
            top: -100px;
            left: -100px;
            width: 200px;
            height: 200px;
            background: var(--blue);
            border-radius: 50%;
            border: 8px solid var(--secondary);
        }
        
        .contact::after {
            content: '';
            position: absolute;
            bottom: -150px;
            right: -150px;
            width: 300px;
            height: 300px;
            background: var(--pink);
            transform: rotate(45deg);
            border: 8px solid var(--secondary);
        }
        
        .contact-content {
            position: relative;
            z-index: 2;
        }
        
        .contact-title {
            color: var(--primary);
        }
        
        .contact-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        
        .contact-link {
            background: var(--yellow);
            color: var(--primary);
            padding: 20px 30px;
            text-decoration: none;
            font-weight: 700;
            text-transform: uppercase;
            border: 4px solid var(--secondary);
            transition: all 0.3s ease;
            font-size: 1.1rem;
        }
        
        .contact-link:hover {
            background: var(--secondary);
            transform: translate(-5px, -5px);
            box-shadow: 5px 5px 0px var(--yellow);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
            .nav-list {
                flex-direction: column;
                gap: 15px;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-links {
                flex-direction: column;
                align-items: center;
            }
        }
        
        /* GLITCH ANIMATION */
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .glitch:hover {
            animation: glitch 0.3s ease-in-out;
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="name glitch">Hendrik<br>(Excyl)</h1>
                <div class="title">SENIOR SOFTWARE ENGINEER / GAME ENGINE DEVELOPER</div>
                <div class="bio">
                    Senior Software Engineer specialized in casino game development and high-performance web applications. Expert in building game engines with Pixi.js, WebGL, and TypeScript. Experience spans from mobile slot games to SaaS platforms, always focused on cutting-edge technology and user experience.
                </div>
            </div>
        </div>
    </header>

    <!-- NAVIGATION -->
    <nav class="nav">
        <div class="container">
            <ul class="nav-list">
                <li class="nav-item" onclick="scrollToSection('skills')">SKILLS</li>
                <li class="nav-item" onclick="scrollToSection('projects')">PROJECTS</li>
                <li class="nav-item" onclick="scrollToSection('experience')">EXPERIENCE</li>
                <li class="nav-item" onclick="scrollToSection('contact')">CONTACT</li>
            </ul>
        </div>
    </nav>

    <!-- SKILLS SECTION -->
    <section id="skills" class="section">
        <div class="container">
            <h2 class="section-title">SKILLS & TECH</h2>
            <div class="skills-grid">
                <div class="skill-card glitch">
                    <h3 class="skill-title">CORE TECHNOLOGIES</h3>
                    <p class="skill-desc">TypeScript/JavaScript, C#, C++, and currently learning Rust. Expert in Pixi.js, WebGL, and OpenGL Shading Language (GLSL) for high-performance graphics programming.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">GAME DEVELOPMENT</h3>
                    <p class="skill-desc">Specialized in casino games, slot machines, and interactive gaming systems. Experience with game engines, WebGL rendering, and mobile-first game optimization.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">FRONTEND & ARCHITECTURE</h3>
                    <p class="skill-desc">ReactJS, modern web frameworks, and software architecture. Expert in building SaaS solutions, API integration, and scalable frontend systems.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">TOOLS & WORKFLOW</h3>
                    <p class="skill-desc">Webpack, GitLab, Jenkins, Travis CI, and modern development workflows. Passionate about creating developer tools and build systems that improve productivity.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="section">
        <div class="container">
            <h2 class="section-title">PROJECTS & WORK</h2>
            <div class="projects-grid">
                <div class="project-card glitch">
                    <div class="project-header">CASINO GAMES</div>
                    <div class="project-content">
                        <h3 class="project-title">Web Casino Games</h3>
                        <p class="project-desc">Specialized development of casino games for web platforms using advanced JavaScript/TypeScript frameworks and game engines.</p>
                        <div class="project-tech">
                            <span class="tech-tag">TYPESCRIPT</span>
                            <span class="tech-tag">JAVASCRIPT</span>
                            <span class="tech-tag">PIXI.JS</span>
                            <span class="tech-tag">CI/CD</span>
                            <span class="tech-tag">ARCHITECTURE</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card glitch">
                    <div class="project-header">RUST-TS-SCSS-MODULES</div>
                    <div class="project-content">
                        <h3 class="project-title">Productivity Tools</h3>
                        <p class="project-desc">CLI written in Rust to generate d.ts files from .scss files in order to use the module system. Inspired by the npm package <a href="https://www.npmjs.com/package/typed-scss-modules" class="tech-tag">typed-scss-modules</a></p>
                        <div class="project-tech">
                            <span class="tech-tag">RUST</span>
                            <span class="tech-tag">CONCURRENCY</span>
                            <span class="tech-tag">TOOLS</span>
                        </div>
                        <a href="https://github.com/cavhoo/rust-ts-scss-modules" class="project-link">CHECK OUT</a>
                    </div>
                </div>
                
                <div class="project-card glitch">
                    <div class="project-header">PIXIDUST</div>
                    <div class="project-content">
                        <h3 class="project-title">Effects library</h3>
                        <p class="project-desc">Library that experiments with creating a particle system with pixi.js to learn how to animate and move thousands of elements per frame.</p>
                        <div class="project-tech">
                            <span class="tech-tag">TYPESCRIPT</span>
                            <span class="tech-tag">LEARNING</span>
                            <span class="tech-tag">EXPERIMENTAL</span>
                            <span class="tech-tag">PIXI.JS</span>
                        </div>
                        <a href="https://github.com/cavhoo/pixidust" class="project-link">CHECK OUT</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section id="experience" class="section">
        <div class="container">
            <h2 class="section-title">EXPERIENCE</h2>
            <div class="skills-grid">
                <div class="skill-card glitch">
                    <h3 class="skill-title">SENIOR SOFTWARE ENGINEER</h3>
                    <div class="experience-meta">
                        <span class="company">GAMOMAT Development GmbH</span>
                        <span class="duration">4 years 5 months</span>
                    </div>
                    <p class="skill-desc">Developed in-house game engines for next-generation slot games using Pixi.js, WebGL, TypeScript, and Webpack. Specialized in high-performance casino gaming solutions with advanced graphics and shader programming.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">FRONTEND ENGINEER</h3>
                    <div class="experience-meta">
                        <span class="company">Fitogram</span>
                        <span class="duration">2 years 6 months</span>
                    </div>
                    <p class="skill-desc">Built and maintained SaaS solutions for studio management with online booking and accounting systems. Led architectural upgrades using ReactJS and TypeScript with mobile-first, UX-focused approach.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">CLIENT DEVELOPER</h3>
                    <div class="experience-meta">
                        <span class="company">QuickSpin</span>
                        <span class="duration">1 year 8 months</span>
                    </div>
                    <p class="skill-desc">Created interactive side games within slot games including achievement systems and tournaments. Developed on-demand loaded modules using WebGL/Pixi.js with API communication frameworks.</p>
                </div>
                <div class="skill-card glitch">
                    <h3 class="skill-title">FRONT END DEVELOPER</h3>
                    <div class="experience-meta">
                        <span class="company">adp Gauselmann</span>
                        <span class="duration">4 years 3 months</span>
                    </div>
                    <p class="skill-desc">Delivered high-performance mobile slot games for browsers using JavaScript, CSS3, and custom game engine frameworks. Specialized in WebGL-based gaming solutions and mobile optimization.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTACT SECTION -->
    <section id="contact" class="section contact">
        <div class="container">
            <div class="contact-content">
                <h2 class="section-title contact-title">LET'S CONNECT</h2>
                <div class="contact-links">
                    <a href="https://github.com/cavhoo" class="contact-link glitch">GITHUB</a>
                    <a href="https://www.linkedin.com/in/hendrikmuellerroehr/" class="contact-link glitch">LINKEDIN</a>
                </div>
            </div>
        </div>
    </section>

    <!-- IMPRESSUM SECTION -->
    </section>

    <script>
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Random color changes for accent elements
            const colors = ['#FF0000', '#00FF00', '#0066FF', '#FF00FF'];
            
            setInterval(() => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                document.documentElement.style.setProperty('--accent', randomColor);
            }, 5000);

            // Add scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.skill-card, .project-card, .imprint-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });
    </script>
</body>
</html>
```

## File: src/characters/character.ts
```typescript
import { Container, AnimatedSprite, Graphics, RAD_TO_DEG, DEG_TO_RAD } from "pixi.js";
import { Direction } from "../types/common";
import { TILE_SIZE } from "../types/constants";
import { isBetween } from "../utilities/math";

/**
 * Base class for any sprite based character
 */
export class Character extends Container {
  protected moveSpeed = 180;
  protected path: { x: number; y: number }[] = [];
  protected moveResolve: (() => void) | null = null;

  private animations: Map<string, AnimatedSprite>;
  private currentState: Direction = Direction.SouthIdle;
  private currentAnimation: AnimatedSprite | null = null;
  private fallbackGraphics: Graphics | null = null;

  constructor(animations: Map<string, AnimatedSprite>) {
    super();
    this.animations = animations;

    this.pivot.set(TILE_SIZE / 2, TILE_SIZE);
    if (this.animations.size === 0) {
      this.fallbackGraphics = new Graphics();
      this.fallbackGraphics.rect(0, 0, TILE_SIZE, TILE_SIZE);
      this.fallbackGraphics.fill({ color: 0x2f6bff, alpha: 0.8 });
      this.addChild(this.fallbackGraphics);
    }

    // Set initial idle animation
    this.updateAnimation(Direction.SouthIdle);
  }

  public get isMoving(): boolean {
    return this.path.length > 0;
  }

  public get state(): Direction {
    return this.currentState;
  }

  protected updateAnimation(state: Direction) {
    if (this.currentState === state && this.currentAnimation) {
      return;
    }
    if (this.currentAnimation) {
      this.currentAnimation.stop();
      this.removeChild(this.currentAnimation);
    }

    this.currentState = state;
    this.currentAnimation = this.animations.get(state) || this.animations.get(Direction.SouthIdle) || null;

    if (this.currentAnimation) {
      if (this.fallbackGraphics) {
        this.removeChild(this.fallbackGraphics);
        this.fallbackGraphics = null;
      }
      this.addChild(this.currentAnimation);
      this.currentAnimation.animationSpeed = this.currentState.toLowerCase().includes("idle") ? 0.09 : 0.13;
      this.currentAnimation.play();
    }
  }

  setPath(path: { x: number; y: number }[]): Promise<void> {
    this.path = path;

    if (this.moveResolve) {
      this.moveResolve();
      this.moveResolve = null;
    }

    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.moveResolve = resolve;
    });
  }

  update(deltaMS: number) {
    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    const nextPoint = this.path[0];
    const dx = nextPoint.x - this.x;
    const dy = nextPoint.y - this.y;
    const distance = Math.hypot(dx, dy);
    const directionRaw = Math.atan2(dy, dx) * RAD_TO_DEG;
    const direction = directionRaw < 0 ? directionRaw + 360 : directionRaw;
    if (isBetween(direction, 225, 315)) {
      if (this.currentState !== Direction.North) {
        this.updateAnimation(Direction.North);
      }
    }

    if (isBetween(direction, 315, 360, true) || isBetween(direction, 0, 45, true)) {
      if (this.currentState !== Direction.East) {
        this.updateAnimation(Direction.East);
      }
    }

    if (isBetween(direction, 45, 135)) {
      if (this.currentState !== Direction.South) {
        this.updateAnimation(Direction.South);
      }
    }

    if (isBetween(direction, 135, 225, true)) {
      if (this.currentState !== Direction.West) {
        this.updateAnimation(Direction.West);
      }
    }

    if (distance <= 0.5) {
      this.position.set(nextPoint.x, nextPoint.y);
      this.path.shift();
      if (this.path.length === 0) {
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
        this.updateAnimation(Direction.SouthIdle);
      }
      return;
    }

    const maxStep = this.moveSpeed * (deltaMS / 1000);
    const t = Math.min(1, maxStep / distance);
    this.position.set(this.x + dx * t, this.y + dy * t);
  }
}
```

## File: src/types/path.ts
```typescript
import { Vector } from "../utilities/vector";

export class Waypoint {
  protected _next: Waypoint | null = null;
  protected _target: Vector;

  constructor(point: Vector) {
    this._target = point;
  }

  public addNext(next?: Waypoint): Waypoint | null {
    this._next = next ?? null;
    return this._next;
  }

  public get next(): Waypoint | null {
    return this._next;
  }

  public getDistanceFrom(position: Vector): Vector {
    return Vector.from([this._target.distanceX(position), this._target.distanceY(position)]);
  }

  public get target(): Vector {
    return this._target;
  }
}

export class Path {
  protected waypoints: Waypoint[] = [];
  protected _currentWaypoint: Waypoint;
  protected prevWaypoint: Waypoint;

  constructor(start: Waypoint) {
    this.waypoints.push(start);
    this._currentWaypoint = start;
  }

  public reset(): void {
    this._currentWaypoint = this.waypoints[0];
  }

  public addWaypoint(point: Waypoint): this {
    this.waypoints.push(this.waypoints[this.waypoints.length - 1].addNext(point));
    return this;
  }

  public get currentWaypoint(): Waypoint | null {
    return this._currentWaypoint;
  }

  public nextWaypoint(): Waypoint | null {
    const point = this.currentWaypoint.next;
    if (point === null) {
      return point;
    }
    this._currentWaypoint = point;
    return point;
  }

  public reverseClone(): Path {
    const reversedWaypoints = [...this.waypoints];
    const reversePath = new Path(reversedWaypoints.pop());

    reversedWaypoints.reverse().forEach((point) => {
      reversePath.addWaypoint(new Waypoint(Vector.from([point.target.x, point.target.y])));
    });

    return reversePath;
  }
}
```

## File: src/utilities/math.ts
```typescript
export const step = (value: number, step: number) => {
  return value > step ? 1 : 0;
};

export const isBetween = (value: number, lower: number, upper: number, inclusive = false): boolean => {
  if (inclusive) {
    return value >= lower && value <= upper;
  }
  return value > lower && value < upper;
};
```

## File: src/utilities/modal.ts
```typescript
export class ModalManager {
  private modalContainer: HTMLDivElement | null = null;
  private backdrop: HTMLDivElement | null = null;

  constructor() {
    this.createModalElements();
  }

  private createModalElements(): void {
    if (typeof document === "undefined") return;

    // Check if it already exists (HMR)
    if (document.getElementById("modal-backdrop")) return;

    this.backdrop = document.createElement("div");
    this.backdrop.id = "modal-backdrop";
    this.backdrop.style.position = "fixed";
    this.backdrop.style.top = "0";
    this.backdrop.style.left = "0";
    this.backdrop.style.width = "100vw";
    this.backdrop.style.height = "100vh";
    this.backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    this.backdrop.style.display = "none";
    this.backdrop.style.zIndex = "2000";
    this.backdrop.style.justifyContent = "center";
    this.backdrop.style.alignItems = "center";
    this.backdrop.style.backdropFilter = "blur(4px)";

    this.modalContainer = document.createElement("div");
    this.modalContainer.style.backgroundColor = "var(--secondary, white)";
    this.modalContainer.style.color = "var(--primary, black)";
    this.modalContainer.style.border = "6px solid var(--primary, black)";
    this.modalContainer.style.padding = "40px";
    this.modalContainer.style.maxWidth = "600px";
    this.modalContainer.style.width = "90%";
    this.modalContainer.style.position = "relative";
    this.modalContainer.style.boxShadow = "15px 15px 0px var(--accent, #FF0000)";
    this.modalContainer.style.fontFamily = "'JetBrains Mono', monospace";

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.border = "4px solid var(--primary, black)";
    closeButton.style.backgroundColor = "var(--primary, black)";
    closeButton.style.color = "var(--secondary, white)";
    closeButton.style.padding = "5px 12px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "800";
    closeButton.style.fontSize = "1.2rem";
    closeButton.onmouseover = () => {
      closeButton.style.backgroundColor = "var(--secondary, white)";
      closeButton.style.color = "var(--primary, black)";
    };
    closeButton.onmouseout = () => {
      closeButton.style.backgroundColor = "var(--primary, black)";
      closeButton.style.color = "var(--secondary, white)";
    };
    closeButton.onclick = (e) => {
      e.stopPropagation();
      this.hide();
    };

    this.modalContainer.appendChild(closeButton);
    this.backdrop.appendChild(this.modalContainer);
    document.body.appendChild(this.backdrop);

    this.backdrop.onclick = () => this.hide();
    this.modalContainer.onclick = (e) => e.stopPropagation();
  }

  public show(title: string, content: string): void {
    if (!this.modalContainer || !this.backdrop) {
        this.createModalElements();
        // Re-check
        this.backdrop = document.getElementById("modal-backdrop") as HTMLDivElement;
        this.modalContainer = this.backdrop?.firstChild as HTMLDivElement;
    }
    
    if (!this.modalContainer || !this.backdrop) return;

    // Clear previous content (except close button)
    const closeBtn = this.modalContainer.querySelector("button");
    this.modalContainer.innerHTML = "";
    if (closeBtn) this.modalContainer.appendChild(closeBtn);

    const titleEl = document.createElement("h2");
    titleEl.innerText = title;
    titleEl.style.textTransform = "uppercase";
    titleEl.style.fontSize = "2.5rem";
    titleEl.style.marginBottom = "20px";
    titleEl.style.borderBottom = "8px solid var(--primary, black)";
    titleEl.style.paddingBottom = "10px";

    const contentEl = document.createElement("div");
    contentEl.innerHTML = content;
    contentEl.style.fontSize = "1.1rem";
    contentEl.style.lineHeight = "1.6";

    this.modalContainer.appendChild(titleEl);
    this.modalContainer.appendChild(contentEl);

    this.backdrop.style.display = "flex";
  }

  public hide(): void {
    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) backdrop.style.display = "none";
  }
}

export const modalManager = new ModalManager();

export const showModal = (title: string, content: string) => {
  modalManager.show(title, content);
};

export const hideModal = () => {
  modalManager.hide();
};
```

## File: src/utilities/overlay.ts
```typescript
export interface OverlayCoords {
  x: number;
  y: number;
}

class OverlayManager {
  private overlayElement: HTMLDivElement | null = null;
  private isVisible: boolean = false;

  constructor() {
    this.createOverlayElement();
  }

  private createOverlayElement(): void {
    if (typeof document === "undefined") return;

    // Check if it already exists (e.g., during HMR)
    let el = document.getElementById("html-overlay") as HTMLDivElement;
    if (el) {
      this.overlayElement = el;
      return;
    }

    this.overlayElement = document.createElement("div");
    this.overlayElement.id = "html-overlay";
    this.overlayElement.style.position = "absolute";
    this.overlayElement.style.display = "none";
    this.overlayElement.style.zIndex = "1000";
    this.overlayElement.style.pointerEvents = "none";
    this.overlayElement.style.backgroundColor = "var(--bg-overlay, white)";
    this.overlayElement.style.color = "var(--primary, black)";
    this.overlayElement.style.border = "4px solid var(--primary, black)";
    this.overlayElement.style.padding = "10px";
    this.overlayElement.style.boxShadow = "8px 8px 0px var(--primary, black)";
    this.overlayElement.style.fontFamily = "'JetBrains Mono', monospace";
    this.overlayElement.style.maxWidth = "300px";
    this.overlayElement.style.minWidth = "150px";

    document.body.appendChild(this.overlayElement);
  }

  public showOverlay(title: string, content: string, coords: OverlayCoords): void {
    if (!this.overlayElement) return;

    this.overlayElement.innerHTML = `
      <div style="font-weight: 800; text-transform: uppercase; border-bottom: 2px solid var(--primary, black); margin-bottom: 8px; padding-bottom: 4px; font-size: 1.1rem;">
        ${title}
      </div>
      <div style="font-size: 0.9rem; line-height: 1.4;">
        ${content}
      </div>
    `;

    this.overlayElement.style.display = "block";
    this.isVisible = true;

    // Position the overlay near the mouse, but try to keep it within the viewport
    this.updatePosition(coords);
  }

  public hideOverlay(): void {
    if (!this.overlayElement) return;
    this.overlayElement.style.display = "none";
    this.isVisible = false;
  }

  public updatePosition(coords: OverlayCoords): void {
    if (!this.overlayElement || !this.isVisible) return;

    const offset = 15;
    let x = coords.x + offset;
    let y = coords.y + offset;

    // Check bounds
    const rect = this.overlayElement.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
      x = coords.x - rect.width - offset;
    }
    if (y + rect.height > window.innerHeight) {
      y = coords.y - rect.height - offset;
    }

    this.overlayElement.style.left = `${x}px`;
    this.overlayElement.style.top = `${y}px`;
  }
}

export const overlayManager = new OverlayManager();

export const showOverlay = (title: string, content: string, coords: OverlayCoords): void => {
  overlayManager.showOverlay(title, content, coords);
};

export const hideOverlay = (): void => {
  overlayManager.hideOverlay();
};
```

## File: src/utilities/sceneGraph.ts
```typescript
import { Container } from "pixi.js";

export class SceneGraph {
  public static stage: Container;

  public static GetComponent<T extends Container>(name: string, startContainer?: T): T {
    if (startContainer) {
      const found = this.search(name, startContainer.children) as T;
      return found;
    }
    return this.search(name, this.stage.children) as T;
  }

  public static GetComponents<T extends Container>(name: string | string[], startContainer?: T): T[] {
    const found: T[] = [];
    const names = Array.isArray(name) ? name : [name];
    if (startContainer) {
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const component = this.search(name, startContainer ? startContainer.children : this.stage.children) as T;
        if (component) {
          found.push(component);
        }
      }
    }
    return found;
  }

  protected static search<T extends Container>(name: string, children: T[]): T {
    let found: T;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.label === name) {
        found = child;
      } else {
        found = this.search(name, child.children) as T;
      }

      if (found) {
        break;
      }
    }

    return found;
  }
}
```

## File: .gitignore
```
.DS_Store
.idea
.assetpack
*.log
tmp/

*.tern-port
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.tsbuildinfo
.npm
.eslintcache
dist
```

## File: .prettierrc
```
printWidth: 180
useTabs: false
endOfLine: auto
```

## File: webpack.prod.config.js
```javascript
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
 mode: 'production',
  entry: [
    './src/index.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: "static" }
      ],
      options: {
        concurrency: 100
      }
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
```

## File: src/assets/manifest.ts
```typescript
export const assetManifest = {
  bundles: [
    {
      name: "base",
      assets: [
        {
          alias: "Jersey10",
          src: "/assets/fonts/Jersey10-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "Tiny5",
          src: "/assets/fonts/Tiny5-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "Silkscreen",
          src: "/assets/fonts/Silkscreen-Regular.woff2",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "tiles",
      assets: [
        {
          alias: "town",
          src: "/assets/mapdata/town.tmx",
          data: { scaleMode: "nearest" },
        },
      ],
    },
    {
      name: "animations",
      assets: [
        {
          alias: "userIdle",
          src: "/assets/animations/scout1idle.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "userStanding",
          src: "/assets/animations/scout1standing.json",
          data: { scaleMode: "nearest" },
        },
        {
          alias: "userWalking",
          src: "/assets/animations/scout1walking.json",
          data: { scaleMode: "nearest" },
        },
      ],
    },
  ],
};
```

## File: src/camera/camera.ts
```typescript
import { Application, Container } from "pixi.js";

export class Camera {
  protected container: Container;
  protected app: Application;

  protected x = 0;
  protected y = 0;
  protected targetX = 0;
  protected targetY = 0;

  protected zoom = 1;
  protected targetZoom = 1;
  protected baseScale = 1;
  protected zoomLevels: number[] = [];
  protected zoomLevelIndex = 1; // Start at default (index 1)

  protected worldWidth: number;
  protected worldHeight: number;

  protected shake = 0;
  protected pointerX = 0;
  protected pointerY = 0;
  protected pointerInside = false;
  protected edgeScrollEnabled = true;
  protected edgeMargin = 48;
  protected edgeSpeed = 500;

  public paused = false;
  protected followingCharacter = true;

  constructor(app: Application, container: Container, worldWidth: number, worldHeight: number, baseScale: number) {
    this.app = app;
    this.container = container;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.setBaseScale(baseScale);
    this.zoom = this.zoomLevels[this.zoomLevelIndex];
    this.targetZoom = this.zoom;
  }

  public setBaseScale(baseScale: number) {
    this.baseScale = baseScale;
    // Level 0: Fully zoomed out (baseScale)
    // Level 1: Default/Medium (baseScale * 1.5)
    // Level 2: Zoomed in (baseScale * 2.5)
    this.zoomLevels = [baseScale, baseScale * 1.5, baseScale * 2.5];
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  public zoomIn() {
    this.zoomLevelIndex = Math.min(this.zoomLevelIndex + 1, this.zoomLevels.length - 1);
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  public zoomOut() {
    this.zoomLevelIndex = Math.max(this.zoomLevelIndex - 1, 0);
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  currentLocation(): [number, number] {
    return [this.targetX, this.targetY];
  }

  follow(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  followCharacter(x: number, y: number) {
    if (this.paused || !this.followingCharacter) return;

    const { width: screenW, height: screenH } = this.app.screen;

    // Define a deadzone in screen coordinates (e.g., 30% from edges)
    const horizontalMargin = screenW * 0.3;
    const verticalMargin = screenH * 0.3;

    // Convert character world position to screen position
    const screenX = (x - this.x) * this.zoom + screenW / 2;
    const screenY = (y - this.y) * this.zoom + screenH / 2;

    let moveX = 0;
    let moveY = 0;

    if (screenX < horizontalMargin) {
      moveX = screenX - horizontalMargin;
    } else if (screenX > screenW - horizontalMargin) {
      moveX = screenX - (screenW - horizontalMargin);
    }

    if (screenY < verticalMargin) {
      moveY = screenY - verticalMargin;
    } else if (screenY > screenH - verticalMargin) {
      moveY = screenY - (screenH - verticalMargin);
    }

    if (moveX !== 0 || moveY !== 0) {
      this.targetX += moveX / this.zoom;
      this.targetY += moveY / this.zoom;
    }
  }

  setZoom(z: number) {
    this.targetZoom = z;
  }

  shakeCamera(amount = 8) {
    this.shake = amount;
  }

  setPointerPosition(x: number, y: number) {
    this.pointerX = x;
    this.pointerY = y;
  }

  setPointerInside(inside: boolean) {
    this.pointerInside = inside;
  }

  setEdgeScrollEnabled(enabled: boolean) {
    this.edgeScrollEnabled = enabled;
  }

  public setFollowingCharacter(following: boolean) {
    this.followingCharacter = following;
  }

  public panByScreenDelta(deltaX: number, deltaY: number) {
    if (this.paused) return;

    this.targetX -= deltaX / this.zoom;
    this.targetY -= deltaY / this.zoom;
    this.followingCharacter = false;
  }

  update(deltaMS: number) {
    const { width: screenW, height: screenH } = this.app.screen;
    const deltaSeconds = deltaMS / 1000;

    if (this.edgeScrollEnabled && this.pointerInside) {
      let dirX = 0;
      let dirY = 0;

      if (this.pointerX < this.edgeMargin) {
        dirX = -(1 - this.pointerX / this.edgeMargin);
      } else if (this.pointerX > screenW - this.edgeMargin) {
        dirX = (this.pointerX - (screenW - this.edgeMargin)) / this.edgeMargin;
      }

      if (this.pointerY < this.edgeMargin) {
        dirY = -(1 - this.pointerY / this.edgeMargin);
      } else if (this.pointerY > screenH - this.edgeMargin) {
        dirY = (this.pointerY - (screenH - this.edgeMargin)) / this.edgeMargin;
      }

      if (dirX !== 0 || dirY !== 0) {
        this.targetX += dirX * this.edgeSpeed * deltaSeconds;
        this.targetY += dirY * this.edgeSpeed * deltaSeconds;
        this.followingCharacter = false;
      }
    }

    // Smooth zoom
    this.zoom += (this.targetZoom - this.zoom) * 0.1;

    // Smooth follow
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    // Compute half-screen in world coordinates
    const halfW = screenW / 2 / this.zoom;
    const halfH = screenH / 2 / this.zoom;
    this.targetX = Math.max(halfW, Math.min(this.worldWidth - halfW, this.targetX));
    this.targetY = Math.max(halfH, Math.min(this.worldHeight - halfH, this.targetY));

    // Clamp camera inside world bounds
    this.x = Math.max(halfW, Math.min(this.worldWidth - halfW, this.x));
    this.y = Math.max(halfH, Math.min(this.worldHeight - halfH, this.y));

    // Optional shake
    let shakeX = 0;
    let shakeY = 0;
    if (this.shake > 0.01) {
      shakeX = (Math.random() - 0.5) * this.shake;
      shakeY = (Math.random() - 0.5) * this.shake;
      this.shake *= 0.9;
    } else {
      this.shake = 0;
    }

    const camX = Math.round(-this.x * this.zoom + screenW / 2 + shakeX);
    const camY = Math.round(-this.y * this.zoom + screenH / 2 + shakeY);

    if (!this.paused) {
      this.container.scale.set(this.zoom);
      this.container.position.set(camX, camY);
    }
  }
}
```

## File: static/assets/mapdata/town.tmx
```
<?xml version="1.0" encoding="UTF-8"?>
<map version="1.10" tiledversion="1.11.2" orientation="orthogonal" renderorder="right-down" width="50" height="50" tilewidth="32" tileheight="32" infinite="0" nextlayerid="45" nextobjectid="31">
 <tileset firstgid="1" source="grounds.tsx"/>
 <tileset firstgid="2177" source="citytiles.tsx"/>
 <tileset firstgid="8254" source="villas.tsx"/>
 <tileset firstgid="10078" source="camping.tsx"/>
 <layer id="23" name="WalkablePaths" width="50" height="50">
  <data encoding="csv">
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,79,79,79,73,73,79,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,79,79,79,73,73,73,79,79,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,0,0,79,79,79,79,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,0,0,79,79,79,79,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,
73,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,73,79,79,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,79,79,79,79,73,73,79,79,79,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,79,79,79,79,73,73,79,79,79,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,79,79,79,79,79,79,79,79,79,79,73,73,73,73,73,79,79,79,79,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,79,79,79,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,
73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73
</data>
 </layer>
 <layer id="1" name="Ground" width="50" height="50">
  <data encoding="csv">
1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
970,970,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1034,1034,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
970,970,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1034,1034,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,1036,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,1036,1036,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,1036,1036,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
970,970,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1034,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1189,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,1036,1036,242,1036,1036,1036,1036,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
970,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1034,1034,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1189,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242,1036,1036,1036,1036,1036,1036,1036,1036,1036,1828,1036,1036,1036,1036,1036,1036,1036,1036,1036,242,242,242,242,242,242,242,242,242,242,242,242,1189,
1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1002,1002,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,
1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,
1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,
1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,1828,
1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836,1836
</data>
 </layer>
 <layer id="40" name="Lake" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10122,10123,10119,10119,10119,10119,10119,10119,10119,10119,10119,10125,10126,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10154,10155,10151,10151,10151,10151,10151,10151,10151,10151,10151,10157,10158,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10179,10179,10179,10238,10179,10179,10179,10179,10247,10277,10179,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10238,10179,10179,10179,10179,10179,10179,10242,10179,10179,10179,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10179,10179,10179,10179,10179,10179,10179,10179,10179,10179,10179,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10179,10179,10245,10240,10179,10179,10179,10496,10496,10496,10179,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10179,10179,10179,10179,10246,10179,10244,10244,10528,10528,10180,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10178,10179,10280,10179,10244,10179,10179,10179,10244,10179,10179,10238,10181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10218,10219,10179,10179,10179,10179,10179,10179,10179,10179,10179,10221,10222,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10250,10251,10211,10211,10211,10211,10211,10211,10211,10211,10211,10253,10254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="42" name="Boat" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11080,11081,11082,11083,11084,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11112,11113,11114,11115,11116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11144,11145,11146,11147,11148,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="41" name="Plank" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10316,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10462,10463,10465,10466,10467,10468,10348,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10494,10495,10497,10498,10499,10500,10380,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10526,10527,10529,10530,10531,10532,10412,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="43" name="Camping" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10578,10579,10580,10581,10582,10583,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10610,10611,10612,10613,10614,10615,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10642,10643,10644,10645,10646,10647,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10674,10675,10676,10677,10678,10679,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10706,10707,10708,10709,0,0,11063,11064,11065,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10738,10739,10740,10741,0,0,11095,11096,11097,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10770,10771,10772,10773,0,0,11127,11128,11129,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10802,10803,10804,10805,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11028,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10735,10736,10737,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10767,10768,10769,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="44" name="TreeHouse" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9734,9735,9736,9737,9738,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9766,9767,9768,9769,9770,9771,9772,9773,9774,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9798,9799,9800,9801,9802,9803,9804,9805,9806,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9830,9831,9832,9833,9834,9835,9836,9837,9838,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9862,9863,9864,9865,9866,9867,9868,9869,9870,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9894,9895,9896,9897,9898,9899,9900,9901,9902,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9926,9927,9928,9929,9930,9931,9932,9933,9934,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9958,9959,9960,9961,9962,9963,9964,9965,9966,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9990,9991,9992,9993,9994,9995,9996,9997,9998,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,10022,10023,10024,10025,10026,10027,10028,10029,10030,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,10054,10055,10056,10057,10058,10059,10060,10061,10062,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="20" name="Beach" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1767,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1618,1618,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1766,
1796,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1797,1796,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1762,1797,
1838,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1794,1839,
1833,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1834,1835,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <layer id="19" name="Paths" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,
1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
970,970,970,970,970,970,970,970,970,970,970,1005,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,1001,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1004,970,970,970,970,970,970,1005,1002,1004,970,970,970,970,970,970,970,970,970,970,970,970,1005,1004,970,970,970,970,970,970,970,970,970,970,970,970,970,970,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,1001,1003,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,1001,1003,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
970,970,970,970,1005,1004,970,970,970,970,970,1005,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,1001,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1002,1004,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,
0,0,0,0,0,0,0,0,0,0,0,1033,1034,1034,1034,1034,1034,1034,973,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,1005,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,1034,973,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1001,1004,970,970,970,970,970,970,970,970,970,970,970,970,970,970,970,1005,1003,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1033,1034,1034,1034,1034,1034,1034,973,972,1034,1034,1034,1034,1034,1034,1034,1034,1034,1035,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1473,1475,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <group id="22" name="Buildings">
  <layer id="4" name="House" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8446,8447,8448,8449,8450,8451,8452,8453,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8478,8479,8480,8481,8482,8483,8484,8485,8934,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8510,8511,8512,8513,8514,8515,8516,8517,8966,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8542,8543,8544,8545,8546,8547,8548,8549,8998,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8574,8575,8576,8577,8578,8579,8580,8581,9030,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8606,8607,8608,8609,8610,8611,8612,8613,9062,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8638,8639,8640,8641,8642,8643,8644,8645,9094,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="9" name="Library" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9009,9010,9011,9012,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9041,9042,9043,9044,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9073,9074,9075,9076,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="38" name="EmptyHouse1" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8282,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8314,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8346,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8378,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8410,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8442,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8466,8467,8468,8469,8470,8471,8472,8473,8474,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8498,8499,8500,8501,8502,8503,8504,8505,8506,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8530,8531,8532,8533,8534,8535,8536,8537,8538,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8562,8563,8564,8565,8566,8567,8568,8569,8570,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8594,8595,8596,8597,8598,8599,8600,8601,8602,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8626,8627,8628,8629,8630,8631,8632,8633,8634,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8658,8659,8660,8661,8662,8663,8664,8665,8666,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
 </group>
 <layer id="3" name="Trees" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9708,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9739,9740,9741,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9708,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9739,9740,9741,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <group id="10" name="Skills">
  <layer id="15" name="C++" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,9556,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,9588,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="13" name="Rust" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,9556,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,9588,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="12" name="Architecture" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,9592,9593,9594,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="14" name="Pipelines" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9592,9593,9594,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="11" name="Typescript" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9592,9593,9594,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
 </group>
 <group id="17" name="Signs">
  <layer id="18" name="SkillsForest" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,10831,10832,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,10863,10864,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
 </group>
 <layer id="24" name="Character" width="50" height="50">
  <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
 </layer>
 <group id="30" name="AboveCharacter">
  <group id="35" name="SkillsAbove">
   <layer id="37" name="ArchitectureAbove" width="50" height="50">
    <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,9496,9497,9498,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,9528,9529,9530,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,9560,9561,9562,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
   </layer>
   <layer id="36" name="PipelinesAbove" width="50" height="50">
    <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9496,9497,9498,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9528,9529,9530,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,9560,9561,9562,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
   </layer>
   <layer id="34" name="TypescriptAbove" width="50" height="50">
    <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9496,9497,9498,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9528,9529,9530,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,9560,9561,9562,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
   </layer>
  </group>
  <layer id="33" name="TreesAbove" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9642,9643,9644,9645,9646,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9674,9675,9676,9677,9678,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9706,9707,9712,9709,9710,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9642,9643,9644,9645,9646,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9674,9675,9676,9677,9678,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9706,9707,9712,9709,9710,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="32" name="HouseAbove" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8254,8255,8256,8257,8258,8259,8260,8261,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8286,8287,8288,8289,8290,8291,8292,8293,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8318,8319,8320,8321,8322,8323,8324,8325,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8350,8351,8352,8353,8354,8355,8356,8357,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8382,8383,8384,8385,8386,8387,8388,8389,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8414,8415,8416,8417,8418,8419,8420,8421,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="31" name="LibraryAbove" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,8945,8946,8947,8948,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,8977,8978,8979,8980,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
  <layer id="39" name="EmptyHouse1Above" width="50" height="50">
   <data encoding="csv">
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8274,8275,8276,8277,8278,8279,8280,8281,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8306,8307,8308,8309,8310,8311,8312,8313,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8338,8339,8340,8341,8342,8343,8344,8345,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8370,8371,8372,8373,8374,8375,8376,8377,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8402,8403,8404,8405,8406,8407,8408,8409,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8434,8435,8436,8437,8438,8439,8440,8441,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
</data>
  </layer>
 </group>
</map>
```

## File: tiledData/cavhoo_github.tiled-session
```
{
    "Map/SizeTest": {
        "height": 4300,
        "width": 2
    },
    "activeFile": "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/town.tmx",
    "expandedProjectPaths": [
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata"
    ],
    "file.lastUsedOpenFilter": "All Files (*)",
    "fileStates": {
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/camping.tsx": {
            "scaleInDock": 1,
            "scaleInEditor": 1
        },
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/citytiles.tsx": {
            "scaleInDock": 1,
            "scaleInEditor": 1
        },
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/grounds.tsx": {
            "scaleInDock": 1,
            "scaleInEditor": 1
        },
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/town.tmx": {
            "expandedGroupLayers": [
                26,
                30
            ],
            "scale": 2,
            "selectedLayer": 0,
            "viewCenter": {
                "x": 925.75,
                "y": 413.75
            }
        },
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/villas.tsx": {
            "scaleInDock": 1,
            "scaleInEditor": 1
        },
        "grounds.tsx": {
            "scaleInDock": 1,
            "scaleInEditor": 1
        },
        "town.tmx": {
            "scale": 3,
            "selectedLayer": 0,
            "viewCenter": {
                "x": 390.66666666666663,
                "y": 793.8333333333333
            }
        }
    },
    "last.imagePath": "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/textures",
    "map.height": 50,
    "map.lastUsedFormat": "tmx",
    "map.width": 50,
    "openFiles": [
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/grounds.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/citytiles.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/villas.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/camping.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/town.tmx"
    ],
    "project": "cavhoo_github.tiled-project",
    "recentFiles": [
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/grounds.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/citytiles.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/villas.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/camping.tsx",
        "/Users/hendrik/workspace/repos/personal/cavhoo.github.io/static/assets/mapdata/town.tmx",
        "town.tmx",
        "grounds.tsx"
    ],
    "tileset.lastUsedFormat": "tsx"
}
```

## File: src/characters/user.ts
```typescript
import { AnimatedSprite } from "pixi.js";
import { Character } from "./character";
import { Direction } from "../types/common";
import { TILE_SIZE } from "../types/constants";
import { CollisionMap, Point } from "../utilities/collisionMap";

export class UserCharacter extends Character {
  private inputX = 0;
  private inputY = 0;

  protected mouseMovement: boolean;

  constructor(private readonly collisionMap: CollisionMap, animations: Map<string, AnimatedSprite>) {
    super(animations);
    this.pivot.set(TILE_SIZE / 2, 48);
  }

  async moveTo(worldX: number, worldY: number): Promise<void> {
    this.mouseMovement = true;
    const safeTarget = this.collisionMap.clampToNearestWalkable(worldX, worldY);
    if (!safeTarget) {
      return this.setPath([]).then(() => {
        this.mouseMovement = false;
      });
    }

    return this.setPath([safeTarget]).then(() => {
      this.mouseMovement = false;
    });
  }

  public setInputDirection(x: number, y: number) {
    if (this.mouseMovement) {
      return;
    }
    this.inputX = x;
    this.inputY = y;

    if (x !== 0 || y !== 0) {
      this.path = [];
      if (this.moveResolve) {
        this.moveResolve();
        this.moveResolve = null;
      }
    } else {
      this.updateAnimation(Direction.SouthIdle);
    }
  }

  override update(deltaMS: number) {
    const lookAhead = TILE_SIZE * 0.4;

    if (this.inputX !== 0 || this.inputY !== 0) {
      const checkX = this.x + this.inputX * lookAhead;
      const checkY = this.y + this.inputY * lookAhead;

      if (!this.collisionMap.isWalkableWorld(checkX, checkY)) {
        this.updateAnimation(Direction.SouthIdle);
        return;
      }

      const maxStep = this.moveSpeed * (deltaMS / 1000);
      const target = {
        x: this.x + this.inputX * maxStep,
        y: this.y + this.inputY * maxStep,
      };

      if (this.collisionMap.isWalkableWorld(target.x, target.y)) {
        this.position.set(target.x, target.y);

        // Update direction based on input
        if (Math.abs(this.inputX) > Math.abs(this.inputY)) {
          this.updateAnimation(this.inputX > 0 ? Direction.East : Direction.West);
        } else {
          this.updateAnimation(this.inputY > 0 ? Direction.South : Direction.North);
        }
      } else {
        // Not walkable
        this.updateAnimation(Direction.SouthIdle);
        this.path.length = 0;
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
      }
      return;
    }

    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    const target = this.path[0];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 0) {
      const checkX = this.x + (dx / distance) * lookAhead;
      const checkY = this.y + (dy / distance) * lookAhead;

      if (!this.collisionMap.isWalkableWorld(checkX, checkY)) {
        this.path = [];
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
        this.updateAnimation(Direction.SouthIdle);
        return;
      }
    }

    // Update direction based on movement
    if (Math.abs(dx) > Math.abs(dy)) {
      this.updateAnimation(dx > 0 ? Direction.East : Direction.West);
    } else {
      this.updateAnimation(dy > 0 ? Direction.South : Direction.North);
    }

    if (distance <= 2) {
      this.position.set(target.x, target.y);
      this.path.shift();
      if (this.path.length === 0) {
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
        this.updateAnimation(Direction.SouthIdle);
      }
      return;
    }

    const maxStep = this.moveSpeed * (deltaMS / 1000);
    const nextPos: Point = this.collisionMap.nextStep({ x: this.x, y: this.y }, target, maxStep);

    if (nextPos.x === this.x && nextPos.y === this.y) {
      this.path = [];
      if (this.moveResolve) {
        this.moveResolve();
        this.moveResolve = null;
      }
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    this.position.set(nextPos.x, nextPos.y);
  }
}
```

## File: src/world/world.ts
```typescript
import { Assets, Container, Texture, FederatedPointerEvent, Graphics } from "pixi.js";
import { SceneGraph } from "../utilities/sceneGraph";
import { showOverlay, hideOverlay } from "../utilities/overlay";
import { showModal } from "../utilities/modal";
import { LibraryInterior } from "./interiors/libraryInterior";
import { BaseInterior } from "./interiors/baseInterior";
import { gsap } from "gsap";
import { HomeInterior } from "./interiors/homeInterior";
import { UserCharacter } from "../characters/user";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../types/constants";
import { MapComponent } from "../types/map";

export class World extends Container {
  protected groundTileTexture: Texture;
  protected interiorContainer: Container | null = null;
  protected isTransitioning = false;
  protected fadeOverlay: Graphics;
  protected nightOverlay: Graphics;
  protected _userCharacter: UserCharacter | null = null;

  public get isInteriorActive(): boolean {
    return this.interiorContainer !== null || this.isTransitioning || (this.userCharacter?.isMoving ?? false);
  }

  constructor() {
    super();
    const { container } = Assets.get("town");
    this.addChild(container);

    // Create night overlay
    this.nightOverlay = new Graphics();
    this.nightOverlay.rect(0, 0, WORLD_WIDTH, WORLD_HEIGHT).fill({ color: 0x1a1a4a, alpha: 1 });
    this.nightOverlay.blendMode = "multiply";
    this.nightOverlay.alpha = 0;
    this.nightOverlay.eventMode = "none";
    this.addChild(this.nightOverlay);

    // Create fade overlay for transitions
    this.fadeOverlay = new Graphics();
    this.fadeOverlay.rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    this.fadeOverlay.alpha = 0;
    this.fadeOverlay.visible = false;
    this.fadeOverlay.eventMode = "none";
    // We'll add it to the stage later or keep it here and ensure it's on top
    this.addChild(this.fadeOverlay);

    const components: MapComponent[] = [
      {
        name: ["Library", "LibraryAbove"],
        title: "The Library",
        content: "A quiet place filled with ancient knowledge and digital archives.",
        hasInterior: true,
        interiorClass: LibraryInterior,
        target: { x: 166, y: 666 },
      },
      {
        name: ["House", "HouseAbove"],
        title: "The Workshop",
        content: "Sparks fly as new ideas are forged here. This is where most of the projects were born.",
        hasInterior: true,
        interiorClass: HomeInterior,
        target: { x: 656, y: 474 },
      },
      {
        name: ["Architecture", "ArchitectureAbove"],
        title: "Architecture",
        content: "Creating designs that last, scale and are robust. Always having the big picture in front of me.",
      },
      { name: "Rust", title: "Rust", content: "Learning Rust has been an incredible journey. There is one test project that you can view in the library." },
      { name: "C++", title: "C++", content: "This is where my initial journey as a developer started, and I still love the language to this day." },
      {
        name: ["Typescript", "TypescriptAbove"],
        title: "TypeScript",
        content: "My main language for the past decade of creating casino games, it's versatile, it's typed and my TypeFu is pretty good.",
      },
      {
        name: ["Pipelines", "PipelinesAbove"],
        title: "CI/CD Pipelines",
        content:
          "Since my career start I have also been maintaining and managing anything that comes in the shape of CI/CD. Be it managing a Jenkins instance, automating whole test systems that are spawned on the fly, nothing that i won't learn to make my CI/CD experience better.",
      },
    ];

    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    components.forEach((comp) => {
      const el = SceneGraph.GetComponents(comp.name, this);
      if (el.length > 0) {
        el.forEach((el) => {
          el.eventMode = "dynamic";
          el.cursor = "pointer";

          const onHover = (event: FederatedPointerEvent) => {
            if (this.isTransitioning || this.interiorContainer) return;
            if (isTouchDevice()) return;
            showOverlay(comp.title, comp.content, { x: event.client.x, y: event.client.y });
          };

          const onClick = async () => {
            if (this.isTransitioning) return;

            if (comp.hasInterior && comp.interiorClass) {
              this.isTransitioning = true;
              hideOverlay();
              if (this.userCharacter && comp.target) {
                const target = comp.target;
                await this.userCharacter.moveTo(target.x, target.y);
              }
              this.enterInterior(comp.interiorClass);
            } else {
              showModal(comp.title, comp.content);
              hideOverlay();
            }
          };

          el.on("pointerover", onHover);
          el.on("pointermove", onHover);
          el.on("pointerout", hideOverlay);
          el.on("pointertap", onClick);
          el.on("mousedown", onClick);
        });
      }
    });

    window.addEventListener("resize", () => {
      this.fadeOverlay.clear().rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    });
  }

  public get userCharacter(): UserCharacter {
    return this._userCharacter;
  }

  public set userCharacter(character: UserCharacter) {
    this._userCharacter = character;
    const characterLayer = SceneGraph.GetComponent("Character", this);
    if (characterLayer) {
      characterLayer.addChild(this._userCharacter);
    }
  }

  public updateTime(hour: number, theme: "auto" | "light" | "dark") {
    let targetAlpha = 0;

    if (theme === "dark") {
      targetAlpha = 0.6;
    } else if (theme === "light") {
      targetAlpha = 0;
    } else {
      // Auto cycle
      // 0:00 - 6:00: Dark (0.6)
      // 6:00 - 8:00: Fading out (0.6 -> 0)
      // 8:00 - 18:00: Day (0)
      // 18:00 - 21:00: Fading in (0 -> 0.6)
      // 21:00 - 24:00: Dark (0.6)
      if (hour < 6 || hour >= 21) {
        targetAlpha = 0.6;
      } else if (hour >= 6 && hour < 8) {
        targetAlpha = 0.6 * (1 - (hour - 6) / 2);
      } else if (hour >= 18 && hour < 21) {
        targetAlpha = 0.6 * ((hour - 18) / 3);
      } else {
        targetAlpha = 0;
      }
    }

    gsap.to(this.nightOverlay, { alpha: targetAlpha, duration: 2 });
  }

  protected async enterInterior(InteriorClass: new () => BaseInterior) {
    this.isTransitioning = true;
    hideOverlay();

    // Fade to black
    this.fadeOverlay.visible = true;
    this.fadeOverlay.alpha = 0;
    this.addChild(this.fadeOverlay); // Ensure it's on top of world

    await gsap.to(this.fadeOverlay, { alpha: 1, duration: 0.5 });

    // Pause camera and reset world transform so interior fits screen
    if (globalThis.__CAMERA__) {
      globalThis.__CAMERA__.paused = true;
    }
    this.scale.set(1);
    this.position.set(0, 0);

    // Hide world content (except interior, nightOverlay and overlay)
    this.children.forEach((child) => {
      if (child !== this.fadeOverlay && child !== this.nightOverlay) child.visible = false;
    });

    // Create and add interior
    const interior = new InteriorClass();
    this.interiorContainer = interior;
    this.addChildAt(interior, 0);

    interior.onExit = () => this.exitInterior();

    // Fade in interior
    await gsap.to(this.fadeOverlay, { alpha: 0, duration: 0.5 });
    this.fadeOverlay.visible = false;
    this.isTransitioning = false;
  }

  protected async exitInterior() {
    if (!this.interiorContainer || this.isTransitioning) return;
    this.isTransitioning = true;

    // Fade to black
    this.fadeOverlay.visible = true;
    await gsap.to(this.fadeOverlay, { alpha: 1, duration: 0.5 });

    // Remove interior
    if (this.interiorContainer) {
      this.removeChild(this.interiorContainer);
      this.interiorContainer.destroy({ children: true });
      this.interiorContainer = null;
    }

    // Unpause camera
    if (globalThis.__CAMERA__) {
      globalThis.__CAMERA__.paused = false;
    }

    // Show world content
    this.children.forEach((child) => {
      if (child !== this.fadeOverlay && child !== this.nightOverlay) child.visible = true;
    });

    // Fade back to world
    await gsap.to(this.fadeOverlay, { alpha: 0, duration: 0.5 });
    this.fadeOverlay.visible = false;
    this.isTransitioning = false;
  }
}
```

## File: src/types/constants.ts
```typescript
export const FONT = "Silkscreen Regular";

export const TILE_SIZE = 32;
export const TILE_SIZE_HALF = TILE_SIZE / 2;
export const TILE_SIZE_QUARTER = TILE_SIZE / 4;

export const TILE_COUNT_X = 50;
export const TILE_COUNT_Y = 50;

export const WORLD_WIDTH = TILE_COUNT_X * TILE_SIZE;
export const WORLD_HEIGHT = TILE_COUNT_Y * TILE_SIZE;

export const WORLD_CENTER_X = WORLD_WIDTH / 2;
export const WORLD_CENTER_Y = WORLD_HEIGHT / 2;
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "ES2018" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "es6" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    // "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
    "resolveJsonModule": true,
    /* Module Resolution Options */
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    "allowSyntheticDefaultImports": true /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
    "sourceMap": true,
    /* Experimental Options */
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": ["src/**/*"],
  "exclude": ["content"]
}
```

## File: webpack.config.js
```javascript
const path = require("path");
const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: ["/node_modules", "/content"],
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 8080,
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: "pixi.js",
    }),
    new copyWebpackPlugin({
      patterns: [{ from: "static" }],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
```

## File: src/types/map.ts
```typescript
import { BaseInterior } from "../world/interiors/baseInterior";
import { Constructable } from "./common";

export type Coord = { x: number; y: number };

export interface MapComponent {
  name: string | string[];
  title: string;
  content: string;
  hasInterior?: boolean;
  interiorClass?: Constructable<BaseInterior>;
  target?: Coord;
}
```

## File: static/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Hendrik Müller-Röhr</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <style>
      body {
        padding: 0;
        margin: 0;
        background-color: black;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
      #app {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        place-items: center;
      }

      canvas {
        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1);
      }
    </style>
    <noscript>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #000000;
          --secondary: #ffffff;
          --accent: #ff0000;
          --yellow: #ffff00;
          --blue: #0066ff;
          --green: #00ff00;
          --pink: #ff00ff;
          --bg-overlay: rgba(255, 255, 255, 0.9);
        }

        body.dark-mode {
          --primary: #ffffff;
          --secondary: #1a1a1a;
          --accent: #ff4d4d;
          --bg-overlay: rgba(26, 26, 26, 0.9);
        }

        body {
          font-family: "JetBrains Mono", monospace;
          background: var(--secondary);
          color: var(--primary);
          line-height: 1.2;
          overflow: unset;
          overflow-x: hidden;
          transition: background-color 0.3s, color 0.3s;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HEADER SECTION */
        .header {
          background: var(--primary);
          color: var(--secondary);
          padding: 40px 0;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 200px;
          height: 200px;
          background: var(--accent);
          transform: rotate(45deg);
          border: 8px solid var(--secondary);
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .name {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-shadow: 4px 4px 0px var(--accent);
        }

        .title {
          font-size: clamp(1rem, 3vw, 1.5rem);
          font-weight: 400;
          background: var(--yellow);
          color: var(--primary);
          padding: 10px 20px;
          display: inline-block;
          border: 4px solid var(--primary);
          transform: rotate(-2deg);
          margin-bottom: 20px;
        }

        .bio {
          font-size: 1.1rem;
          max-width: 600px;
          background: var(--secondary);
          color: var(--primary);
          padding: 20px;
          border: 4px solid var(--secondary);
          box-shadow: 8px 8px 0px var(--blue);
        }

        /* NAVIGATION */
        .nav {
          background: var(--yellow);
          padding: 20px 0;
          border-top: 8px solid var(--primary);
          border-bottom: 8px solid var(--primary);
        }

        .nav-list {
          display: flex;
          gap: 40px;
          list-style: none;
          flex-wrap: wrap;
        }

        .nav-item {
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
          padding: 10px 20px;
          background: var(--primary);
          color: var(--secondary);
          border: 4px solid var(--primary);
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: var(--secondary);
          color: var(--primary);
          transform: translate(-4px, -4px);
          box-shadow: 4px 4px 0px var(--primary);
        }

        /* SECTIONS */
        .section {
          padding: 80px 0;
          position: relative;
        }

        .section:nth-child(even) {
          background: #f8f8f8;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 40px;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 8px;
          background: var(--accent);
          transform: skew(-20deg);
        }

        /* SKILLS SECTION */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .skill-card {
          background: var(--secondary);
          border: 6px solid var(--primary);
          padding: 30px;
          position: relative;
          transition: all 0.3s ease;
          transform: translate(-8px, -8px);
          box-shadow: 8px 8px 0px var(--primary);
        }

        .skill-card::before {
          content: "";
          position: absolute;
          top: -10px;
          right: -10px;
          width: 30px;
          height: 30px;
          background: var(--blue);
          border: 4px solid var(--primary);
        }

        .skill-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .experience-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .company {
          background: var(--blue);
          color: var(--secondary);
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 2px solid var(--primary);
        }

        .duration {
          background: var(--green);
          color: var(--primary);
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 2px solid var(--primary);
        }

        .skill-desc {
          font-size: 1rem;
          line-height: 1.4;
        }

        /* PROJECTS SECTION */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .project-card {
          background: var(--primary);
          color: var(--secondary);
          border: 6px solid var(--primary);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: rotate(1deg) scale(1.02);
        }

        .project-header {
          background: var(--pink);
          color: var(--primary);
          padding: 20px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1.2rem;
        }

        .project-content {
          padding: 30px;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .project-desc {
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .project-tech {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .tech-tag {
          background: var(--green);
          color: var(--primary);
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 2px solid var(--secondary);
        }

        .project-link {
          background: var(--accent);
          color: var(--secondary);
          padding: 10px 20px;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          border: 4px solid var(--secondary);
          display: inline-block;
          transition: all 0.2s ease;
        }

        .project-link:hover {
          background: var(--secondary);
          color: var(--primary);
          transform: translate(-3px, -3px);
          box-shadow: 3px 3px 0px var(--accent);
        }

        /* CONTACT SECTION */
        .contact {
          background: var(--primary);
          color: var(--secondary);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* IMPRESSUM SECTION */
        .imprint-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .imprint-card {
          background: var(--secondary);
          border: 6px solid var(--primary);
          padding: 30px;
          position: relative;
          transition: all 0.3s ease;
        }

        .imprint-card:hover {
          transform: translate(-5px, -5px);
          box-shadow: 5px 5px 0px var(--primary);
        }

        .imprint-card::before {
          content: "";
          position: absolute;
          top: -8px;
          right: -8px;
          width: 25px;
          height: 25px;
          background: var(--accent);
          border: 4px solid var(--primary);
        }

        .imprint-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: var(--primary);
          border-bottom: 4px solid var(--blue);
          padding-bottom: 10px;
        }

        .imprint-info p {
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .imprint-info strong {
          color: var(--accent);
          font-weight: 700;
        }

        .contact::before {
          content: "";
          position: absolute;
          top: -100px;
          left: -100px;
          width: 200px;
          height: 200px;
          background: var(--blue);
          border-radius: 50%;
          border: 8px solid var(--secondary);
        }

        .contact::after {
          content: "";
          position: absolute;
          bottom: -150px;
          right: -150px;
          width: 300px;
          height: 300px;
          background: var(--pink);
          transform: rotate(45deg);
          border: 8px solid var(--secondary);
        }

        .contact-content {
          position: relative;
          z-index: 2;
        }

        .contact-title {
          color: var(--primary);
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .contact-link {
          background: var(--yellow);
          color: var(--primary);
          padding: 20px 30px;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          border: 4px solid var(--secondary);
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .contact-link:hover {
          background: var(--secondary);
          transform: translate(-5px, -5px);
          box-shadow: 5px 5px 0px var(--yellow);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-list {
            flex-direction: column;
            gap: 15px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .contact-links {
            flex-direction: column;
            align-items: center;
          }
        }

        /* GLITCH ANIMATION */
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch:hover {
          animation: glitch 0.3s ease-in-out;
        }

        #app {
          display: none;
        }
      </style>
    </noscript>
  </head>

  <body>
    <noscript>
      <!-- HEADER -->
      <header class="header">
        <div class="container">
          <div class="header-content">
            <h1 class="name glitch">Hendrik<br />(Excyl)</h1>
            <div class="title">SENIOR SOFTWARE ENGINEER / GAME ENGINE DEVELOPER</div>
            <div class="bio">
              Senior Software Engineer specialized in casino game development and high-performance web applications. Expert in building game engines with Pixi.js, WebGL, and
              TypeScript. Experience spans from mobile slot games to SaaS platforms, always focused on cutting-edge technology and user experience.
            </div>
          </div>
        </div>
      </header>

      <!-- NAVIGATION -->
      <nav class="nav">
        <div class="container">
          <ul class="nav-list">
            <li class="nav-item" onclick="scrollToSection('skills')">SKILLS</li>
            <li class="nav-item" onclick="scrollToSection('projects')">PROJECTS</li>
            <li class="nav-item" onclick="scrollToSection('experience')">EXPERIENCE</li>
            <li class="nav-item" onclick="scrollToSection('contact')">CONTACT</li>
          </ul>
        </div>
      </nav>

      <!-- SKILLS SECTION -->
      <section id="skills" class="section">
        <div class="container">
          <h2 class="section-title">SKILLS & TECH</h2>
          <div class="skills-grid">
            <div class="skill-card glitch">
              <h3 class="skill-title">CORE TECHNOLOGIES</h3>
              <p class="skill-desc">
                TypeScript/JavaScript, C#, C++, and currently learning Rust. Expert in Pixi.js, WebGL, and OpenGL Shading Language (GLSL) for high-performance graphics programming.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">GAME DEVELOPMENT</h3>
              <p class="skill-desc">
                Specialized in casino games, slot machines, and interactive gaming systems. Experience with game engines, WebGL rendering, and mobile-first game optimization.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">FRONTEND & ARCHITECTURE</h3>
              <p class="skill-desc">
                ReactJS, modern web frameworks, and software architecture. Expert in building SaaS solutions, API integration, and scalable frontend systems.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">TOOLS & WORKFLOW</h3>
              <p class="skill-desc">
                Webpack, GitLab, Jenkins, Travis CI, and modern development workflows. Passionate about creating developer tools and build systems that improve productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- PROJECTS SECTION -->
      <section id="projects" class="section">
        <div class="container">
          <h2 class="section-title">PROJECTS & WORK</h2>
          <div class="projects-grid">
            <div class="project-card glitch">
              <div class="project-header">CASINO GAMES</div>
              <div class="project-content">
                <h3 class="project-title">Web Casino Games</h3>
                <p class="project-desc">Specialized development of casino games for web platforms using advanced JavaScript/TypeScript frameworks and game engines.</p>
                <div class="project-tech">
                  <span class="tech-tag">TYPESCRIPT</span>
                  <span class="tech-tag">JAVASCRIPT</span>
                  <span class="tech-tag">PIXI.JS</span>
                  <span class="tech-tag">CI/CD</span>
                  <span class="tech-tag">ARCHITECTURE</span>
                </div>
              </div>
            </div>

            <div class="project-card glitch">
              <div class="project-header">RUST-TS-SCSS-MODULES</div>
              <div class="project-content">
                <h3 class="project-title">Productivity Tools</h3>
                <p class="project-desc">
                  CLI written in Rust to generate d.ts files from .scss files in order to use the module system. Inspired by the npm package
                  <a href="https://www.npmjs.com/package/typed-scss-modules" class="tech-tag">typed-scss-modules</a>
                </p>
                <div class="project-tech">
                  <span class="tech-tag">RUST</span>
                  <span class="tech-tag">CONCURRENCY</span>
                  <span class="tech-tag">TOOLS</span>
                </div>
                <a href="https://github.com/cavhoo/rust-ts-scss-modules" class="project-link">CHECK OUT</a>
              </div>
            </div>

            <div class="project-card glitch">
              <div class="project-header">PIXIDUST</div>
              <div class="project-content">
                <h3 class="project-title">Effects library</h3>
                <p class="project-desc">Library that experiments with creating a particle system with pixi.js to learn how to animate and move thousands of elements per frame.</p>
                <div class="project-tech">
                  <span class="tech-tag">TYPESCRIPT</span>
                  <span class="tech-tag">LEARNING</span>
                  <span class="tech-tag">EXPERIMENTAL</span>
                  <span class="tech-tag">PIXI.JS</span>
                </div>
                <a href="https://github.com/cavhoo/pixidust" class="project-link">CHECK OUT</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE SECTION -->
      <section id="experience" class="section">
        <div class="container">
          <h2 class="section-title">EXPERIENCE</h2>
          <div class="skills-grid">
            <div class="skill-card glitch">
              <h3 class="skill-title">SENIOR SOFTWARE ENGINEER</h3>
              <div class="experience-meta">
                <span class="company">GAMOMAT Development GmbH</span>
                <span class="duration">4 years 5 months</span>
              </div>
              <p class="skill-desc">
                Developed in-house game engines for next-generation slot games using Pixi.js, WebGL, TypeScript, and Webpack. Specialized in high-performance casino gaming
                solutions with advanced graphics and shader programming.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">FRONTEND ENGINEER</h3>
              <div class="experience-meta">
                <span class="company">Fitogram</span>
                <span class="duration">2 years 6 months</span>
              </div>
              <p class="skill-desc">
                Built and maintained SaaS solutions for studio management with online booking and accounting systems. Led architectural upgrades using ReactJS and TypeScript with
                mobile-first, UX-focused approach.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">CLIENT DEVELOPER</h3>
              <div class="experience-meta">
                <span class="company">QuickSpin</span>
                <span class="duration">1 year 8 months</span>
              </div>
              <p class="skill-desc">
                Created interactive side games within slot games including achievement systems and tournaments. Developed on-demand loaded modules using WebGL/Pixi.js with API
                communication frameworks.
              </p>
            </div>
            <div class="skill-card glitch">
              <h3 class="skill-title">FRONT END DEVELOPER</h3>
              <div class="experience-meta">
                <span class="company">adp Gauselmann</span>
                <span class="duration">4 years 3 months</span>
              </div>
              <p class="skill-desc">
                Delivered high-performance mobile slot games for browsers using JavaScript, CSS3, and custom game engine frameworks. Specialized in WebGL-based gaming solutions and
                mobile optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="section contact">
        <div class="container">
          <div class="contact-content">
            <h2 class="section-title contact-title">LET'S CONNECT</h2>
            <div class="contact-links">
              <a href="https://github.com/cavhoo" class="contact-link glitch">GITHUB</a>
              <a href="https://www.linkedin.com/in/hendrikmuellerroehr/" class="contact-link glitch">LINKEDIN</a>
            </div>
          </div>
        </div>
      </section>
    </noscript>
    <div id="app"></div>
    <script src="./main.js"></script>
  </body>
</html>
```

## File: package.json
```json
{
  "name": "hemuroweb",
  "version": "1.0.0",
  "description": "Website build around PIXI.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npx webpack-cli serve --config webpack.config.js",
    "build": "webpack --config webpack.prod.config.js",
    "deploy": "gh-pages -d dist",
    "release": "npm run build && npm run deploy",
    "copy-map": "cp ./tiledData/*.tsx ./static/assets/mapdata/;cp ./tiledData/*.tmx ./static/assets/mapdata/"
  },
  "author": "Hendrik Mueller-Roehr",
  "license": "MIT",
  "dependencies": {
    "@pixi/tilemap": "^5.0.2",
    "axios": "^1.4.0",
    "date-fns": "^2.30.0",
    "eslint": "^9.20.1",
    "gh-pages": "^6.3.0",
    "gsap": "^3.13.0",
    "pixi-filters": "^6.1.4",
    "pixi-tiledmap": "^2.0.0",
    "pixi.js": "^8.8.0",
    "typescript-eslint": "^8.24.0",
    "victor": "^1.1.0",
    "webfontloader": "^1.6.28"
  },
  "devDependencies": {
    "@assetpack/core": "^1.4.0",
    "@types/axios": "^0.14.0",
    "@types/victor": "^1.1.5",
    "@types/webfontloader": "^1.6.35",
    "copy-webpack-plugin": "^11.0.0",
    "prettier": "^2.8.8",
    "terser-webpack-plugin": "^5.3.9",
    "ts-loader": "^9.4.3",
    "typescript": "^5.1.3",
    "webpack": "^5.85.1",
    "webpack-cli": "^5.1.3",
    "webpack-dev-server": "^4.15.0"
  }
}
```

## File: src/index.ts
```typescript
import { AbstractRenderer, AnimatedSprite, Application, Assets, Container, extensions, Texture, TextureStyle } from "pixi.js";
import { registerGSAP } from "./utilities/gsap";
import { TILE_COUNT_X, TILE_COUNT_Y, TILE_SIZE, WORLD_CENTER_X, WORLD_CENTER_Y, WORLD_HEIGHT, WORLD_WIDTH } from "./types/constants";
import { Camera } from "./camera/camera";
import { World } from "./world/world";
import { ThemeManager } from "./utilities/theme";
import { DebugManager } from "./utilities/debug";
import { assetManifest } from "./assets/manifest";
import { tiledMapLoader } from "pixi-tiledmap";
import { SceneGraph } from "./utilities/sceneGraph";
import { UserCharacter } from "./characters/user";
import { CollisionMap } from "./utilities/collisionMap";
import { Direction } from "./types/common";
const start = async (): Promise<void> => {
  let touched = false;
  let isTouchDragging = false;
  let touchDragMoved = false;
  let lastTouchX = 0;
  let lastTouchY = 0;
  const TOUCH_DRAG_THRESHOLD = 4;
  const pressedKeys = new Set<string>();
  const keyOrder: string[] = [];

  extensions.add(tiledMapLoader);

  TextureStyle.defaultOptions.scaleMode = "nearest";
  AbstractRenderer.defaultOptions.roundPixels = false;
  AbstractRenderer.defaultOptions.resolution = 1;

  registerGSAP();
  // Create new PIXI Canvas App
  const app = new Application();
  const container = document.querySelector("#app");
  await app.init({ background: "black", resizeTo: window, antialias: false, roundPixels: true });
  globalThis.__PIXI_APP__ = app;
  if (container) {
    container.appendChild(app.canvas);
  } else {
    console.error("Unable to attach app to body! Reason: Body not found");
  }

  SceneGraph.stage = app.stage;
  await Assets.init({
    manifest: assetManifest,
  });

  await Assets.loadBundle(["base", "tiles", "animations"]);

  // Initialize walkable collision map from town.tmx
  const response = await fetch("/assets/mapdata/town.tmx");
  const tmxText = await response.text();
  const parser = new DOMParser();
  const tmxDoc = parser.parseFromString(tmxText, "text/xml");
  const layers = tmxDoc.getElementsByTagName("layer");
  let pathsLayer: Element | null = null;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].getAttribute("name") === "WalkablePaths") {
      pathsLayer = layers[i];
      break;
    }
  }

  if (!pathsLayer) {
    console.error("Paths layer not found in town.tmx");
  }

  const dataNode = pathsLayer?.getElementsByTagName("data")[0];
  const csvData = dataNode?.textContent || "";
  const flatData = csvData
    .trim()
    .split(",")
    .map((v) => parseInt(v.trim(), 10));

  const collisionData: number[][] = [];
  for (let y = 0; y < TILE_COUNT_Y; y++) {
    collisionData[y] = [];
    for (let x = 0; x < TILE_COUNT_X; x++) {
      collisionData[y][x] = flatData[y * TILE_COUNT_X + x];
    }
  }

  const collisionMap = new CollisionMap(collisionData);

  const world = new World();
  new ThemeManager(world);
  const debugManager = new DebugManager(world);
  const userCharacter = new UserCharacter(
    collisionMap,
    new Map([
      [Direction.EastIdle, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.NorthIdle, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.WestIdle, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.SouthIdle, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1idle_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.East, new AnimatedSprite([1, 2, 3, 4, 5, 6].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.North, new AnimatedSprite([7, 8, 9, 10, 11, 12].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.West, new AnimatedSprite([13, 14, 15, 16, 17, 18].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
      [Direction.South, new AnimatedSprite([19, 20, 21, 22, 23, 24].map((frame) => Texture.from(`scout1_${`${frame}`.padStart(2, "0")}.png`)))],
    ])
  );
  world.userCharacter = userCharacter;
  userCharacter.position.set(WORLD_CENTER_X, WORLD_CENTER_Y);
  // Base scale so world is zoomed in (viewport smaller than full world)
  const BASE_SCALE = Math.min(app.screen.width / WORLD_WIDTH, app.screen.height / WORLD_HEIGHT) * 1;

  const camera = new Camera(app, world, WORLD_WIDTH, WORLD_HEIGHT, BASE_SCALE);
  globalThis.__CAMERA__ = camera;

  app.stage.addChild(world);

  camera.follow(WORLD_CENTER_X, WORLD_CENTER_Y);

  let viewportScale = 1;
  function resize() {
    viewportScale = (app.screen.width * window.devicePixelRatio) / (35 * TILE_SIZE);
    camera.setZoom(viewportScale);
  }

  resize();
  window.addEventListener("resize", resize);

  app.stage.eventMode = "dynamic";

  app.stage.on("pointerdown", (event) => {
    touched = true;
    camera.setEdgeScrollEnabled(false);

    if (event.pointerType === "touch") {
      isTouchDragging = true;
      touchDragMoved = false;
      lastTouchX = event.global.x;
      lastTouchY = event.global.y;
      camera.setFollowingCharacter(false);
    }
  });
  app.stage.on("pointerup", () => {
    touched = false;
    camera.setEdgeScrollEnabled(true);
    isTouchDragging = false;
  });
  app.stage.on("pointerupoutside", () => {
    touched = false;
    camera.setEdgeScrollEnabled(true);
    isTouchDragging = false;
  });

  app.stage.on("pointertap", (event) => {
    if (world.isInteriorActive) return;
    if (event.pointerType === "touch" && touchDragMoved) {
      touchDragMoved = false;
      return;
    }

    camera.setFollowingCharacter(true);
    const target = world.toLocal(event.global);
    const clampedX = Math.max(0, Math.min(WORLD_WIDTH, target.x));
    const clampedY = Math.max(0, Math.min(WORLD_HEIGHT, target.y));
    userCharacter.moveTo(clampedX, clampedY);
  });

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key !== "ArrowUp" && key !== "ArrowDown" && key !== "ArrowLeft" && key !== "ArrowRight") return;
    event.preventDefault();

    camera.setFollowingCharacter(true);

    if (!pressedKeys.has(key)) {
      pressedKeys.add(key);
      keyOrder.push(key);
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key !== "ArrowUp" && key !== "ArrowDown" && key !== "ArrowLeft" && key !== "ArrowRight") return;
    event.preventDefault();

    pressedKeys.delete(key);
    const index = keyOrder.indexOf(key);
    if (index >= 0) keyOrder.splice(index, 1);
  });

  app.stage.on("pointermove", (event) => {
    if (event.pointerType === "touch" && isTouchDragging) {
      const deltaX = event.global.x - lastTouchX;
      const deltaY = event.global.y - lastTouchY;

      if (Math.abs(deltaX) > TOUCH_DRAG_THRESHOLD || Math.abs(deltaY) > TOUCH_DRAG_THRESHOLD) {
        touchDragMoved = true;
      }

      camera.panByScreenDelta(deltaX, deltaY);
      lastTouchX = event.global.x;
      lastTouchY = event.global.y;
    }

    camera.setPointerPosition(event.global.x, event.global.y);
    camera.setPointerInside(true);
    debugManager.updateMousePosition(event.global);
  });

  app.stage.on("pointerleave", () => {
    camera.setPointerInside(false);
  });

  app.stage.on("pointerenter", (event) => {
    camera.setPointerPosition(event.global.x, event.global.y);
    camera.setPointerInside(true);
    debugManager.updateMousePosition(event.global);
  });

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
  app.ticker.add((ticker) => {
    let dx = 0;
    let dy = 0;
    for (let i = keyOrder.length - 1; i >= 0; i--) {
      const key = keyOrder[i];
      if (!pressedKeys.has(key)) continue;
      if (key === "ArrowLeft") dx = -1;
      if (key === "ArrowRight") dx = 1;
      if (key === "ArrowUp") dy = -1;
      if (key === "ArrowDown") dy = 1;
      break;
    }
    userCharacter.setInputDirection(dx, dy);

    userCharacter.update(ticker.deltaMS);
    camera.followCharacter(userCharacter.x, userCharacter.y);
    camera.update(ticker.deltaMS);
  });
};

start();
```
