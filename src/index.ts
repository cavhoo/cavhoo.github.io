import { AbstractRenderer, Application, Assets, Container, extensions, TextureStyle } from "pixi.js";
import { registerGSAP } from "./utilities/gsap";
import { TILE_SIZE, WORLD_CENTER_X, WORLD_CENTER_Y, WORLD_HEIGHT, WORLD_WIDTH } from "./types/constants";
import { Camera } from "./camera/camera";
import { World } from "./world/world";
import { assetManifest } from "./assets/manifest";
import { tiledMapLoader } from "pixi-tiledmap";
import { SceneGraph } from "./utilities/sceneGraph";
import { UserCharacter } from "./characters/user";
const start = async (): Promise<void> => {
  let touched = false;

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

  await Assets.loadBundle(["base", "tiles"]);

  const world = new World();
  const userCharacter = new UserCharacter();
  userCharacter.position.set(WORLD_CENTER_X, WORLD_CENTER_Y);
  world.addChild(userCharacter);
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
    const target = world.toLocal(event.global);
    const clampedX = Math.max(0, Math.min(WORLD_WIDTH, target.x));
    const clampedY = Math.max(0, Math.min(WORLD_HEIGHT, target.y));
    userCharacter.moveTo(clampedX, clampedY);
  });

  app.stage.on("pointermove", (event) => {
    camera.setPointerPosition(event.global.x, event.global.y);
    camera.setPointerInside(true);
  });

  app.stage.on("pointerleave", () => {
    camera.setPointerInside(false);
  });

  app.stage.on("pointerenter", (event) => {
    camera.setPointerPosition(event.global.x, event.global.y);
    camera.setPointerInside(true);
  });

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
  app.ticker.add((ticker) => {
    camera.update(ticker.deltaMS);
    userCharacter.update(ticker.deltaMS);
  });
};

start();
