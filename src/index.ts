import { AbstractRenderer, Application, Assets, Container, TextureStyle } from "pixi.js";
import { registerGSAP } from "./utilities/gsap";
import { TILE_SIZE, WORLD_CENTER_X, WORLD_CENTER_Y, WORLD_HEIGHT, WORLD_WIDTH } from "./types/constants";
import { Camera } from "./camera/camera";
import { World } from "./world/world";
import { assetManifest } from "./assets/manifest";
const start = async (): Promise<void> => {
  let touched = false;

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

  await Assets.init({
    manifest: assetManifest,
  });

  await Assets.loadBundle("base");

  const world = new World();
  // Base scale so world is zoomed in (viewport smaller than full world)
  const BASE_SCALE = Math.min(app.screen.width / WORLD_WIDTH, app.screen.height / WORLD_HEIGHT) * 1;

  const camera = new Camera(app, world, WORLD_WIDTH, WORLD_HEIGHT, BASE_SCALE);

  app.stage.addChild(world);

  camera.follow(WORLD_CENTER_X, WORLD_CENTER_Y);

  let viewportScale = 1;
  function resize() {
    viewportScale = app.screen.width / (20 * TILE_SIZE);
    camera.setZoom(viewportScale);
    // app.stage.scale = viewportScale;
  }

  resize();
  window.addEventListener("resize", resize);

  app.stage.eventMode = "dynamic";
  app.stage.cursor = "pointer";

  app.stage.on("pointerdown", () => {
    touched = true;
  });
  app.stage.on("pointerup", () => {
    touched = false;
  });

  app.stage.on("pointermove", (event) => {
    if (touched) {
      camera.follow(event.global.x, event.global.y);
    }
  });

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
  app.ticker.add(() => {
    camera.update();
  });
};

start();
