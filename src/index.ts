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
    viewportScale = app.screen.width / (35 * TILE_SIZE);
    camera.setZoom(viewportScale);
  }

  resize();
  window.addEventListener("resize", resize);

  app.stage.eventMode = "dynamic";

  app.stage.on("pointerdown", () => {
    touched = true;
    camera.setEdgeScrollEnabled(false);
  });
  app.stage.on("pointerup", () => {
    touched = false;
    camera.setEdgeScrollEnabled(true);
  });

  app.stage.on("pointertap", (event) => {
    if (world.isInteriorActive) return;
    const target = world.toLocal(event.global);
    const clampedX = Math.max(0, Math.min(WORLD_WIDTH, target.x));
    const clampedY = Math.max(0, Math.min(WORLD_HEIGHT, target.y));
    userCharacter.moveTo(clampedX, clampedY);
  });

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key !== "ArrowUp" && key !== "ArrowDown" && key !== "ArrowLeft" && key !== "ArrowRight") return;
    event.preventDefault();

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
    //camera.follow(userCharacter.x, userCharacter.y);
    camera.update(ticker.deltaMS);
  });
};

start();
