import { Application, Assets, Text, TextureStyle } from "pixi.js";
import { LoadingScene } from "./scenes/loading";
import { SceneManager } from "./scenes/sceneManager";
import { LandingScene } from "./scenes/landing";

const start = async (): Promise<void> => {
  const SCENE_DIMENSIONS = {
    width: 1366,
    height: 720,
  };

  TextureStyle.defaultOptions.scaleMode = "nearest";

  // Create new PIXI Canvas App
  const app = new Application();
  const container = document.querySelector("#app");
  // Ugly hack to set nearest neighbour scaling globally;
  await app.init({ background: "black", width: SCENE_DIMENSIONS.width, height: SCENE_DIMENSIONS.height });
  globalThis.__PIXI_APP__ = app;
  if (container) {
    container.appendChild(app.canvas);
  } else {
    console.error("Unable to attach app to body! Reason: Body not found");
  }

  await Assets.init({
    manifest: {
      bundles: [
        {
          name: "base",
          assets: [
            {
              alias: "Jersey10",
              src: "/assets/Jersey10-Regular.ttf",
            },
          ],
        },
        {
          name: "city",
          assets: [{ alias: "cubes", src: "/assets/isometric.json" }],
        },
      ],
    },
  });
  await Assets.loadBundle("base");

  const canvas = document.querySelector("canvas");

  // Stretch canvass onto the window size
  const aspectRatio = window.innerHeight / 720;
  canvas.style.transform = `matrix3d(calc(1*calc(${aspectRatio})),0,0,0, 0,calc(1*calc(${aspectRatio})),0,0, 0,0,1,0, 0,0,1,1)`;

  const text = new Text({ text: `Mouse X: ${0} Mouse Y: ${0}` });
  const scrollText = new Text({ text: `Scroll: ${0}` });
  scrollText.position.set(text.x, text.y + text.height);

  const scenemanager = new SceneManager();

  const loadingScene = new LoadingScene();
  const landingScene = new LandingScene();
  scenemanager.addScene(loadingScene);
  scenemanager.addScene(landingScene);
  app.stage.addChild(scenemanager);

  await Assets.loadBundle(["city"], (progress: number) => {
    scenemanager.setSceneActive(loadingScene);
    loadingScene.updateProgress(progress);
    loadingScene.onSceneComplete = () => scenemanager.setSceneActive(landingScene);
  });
  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
};

start();
