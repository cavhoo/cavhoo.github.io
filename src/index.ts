import { AbstractRenderer, Application, Assets, TextureStyle } from "pixi.js";
import { LoadingScene } from "./scenes/loading";
import { SceneManager } from "./scenes/sceneManager";
import { HEIGHT, WIDTH } from "./types/constants";
import { SceneNames, sceneSetup } from "./sceneSetup";
import { assetManifest } from "./data/assets/manifest";

const start = async (): Promise<void> => {
  TextureStyle.defaultOptions.scaleMode = "nearest";
  AbstractRenderer.defaultOptions.roundPixels = false;
  AbstractRenderer.defaultOptions.resolution = 1;

  // Create new PIXI Canvas App
  const app = new Application();
  const container = document.querySelector("#app");
  // Ugly hack to set nearest neighbour scaling globally;
  await app.init({ background: "black", width: WIDTH, height: HEIGHT });
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
  const canvas = document.querySelector("canvas");

  const resizeCanvas = () => {
    const canvasWidth = WIDTH * AbstractRenderer.defaultOptions.resolution;
    const canvasHeight = HEIGHT * AbstractRenderer.defaultOptions.resolution;
    let scale = window.innerWidth / canvasWidth;
    if (scale * canvasHeight > window.innerHeight) {
      scale = window.innerHeight / canvasHeight;
    }
    document.body.style.backgroundSize = `${64 * scale}px ${64 * scale}px`;
    canvas.style.transform = `matrix3d(calc(1*calc(${scale})),0,0,0, 0,calc(1*calc(${scale})),0,0, 0,0,1,0, 0,0,1,1)`;
  };

  window.addEventListener("resize", () => resizeCanvas());

  // Stretch canvass onto the window size
  resizeCanvas();
  const scenemanager = new SceneManager(app);

  const loadingScene = new LoadingScene();
  scenemanager.addScene(SceneNames.Loading, loadingScene);
  app.stage.addChild(scenemanager);

  scenemanager.setSceneActive(SceneNames.Loading);
  await Assets.loadBundle(["tiles", "props", "characters"], (progress: number) => {
    loadingScene.updateProgress(progress);
    loadingScene.onSceneComplete = () => sceneSetup(scenemanager);
  });
  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
};

start();
