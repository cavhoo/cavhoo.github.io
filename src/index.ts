import { AbstractRenderer, Application, Assets, Text, TextureStyle } from "pixi.js";
import { LoadingScene } from "./scenes/loading";
import { SceneManager } from "./scenes/sceneManager";
import { LandingScene } from "./scenes/landing";
import { HEIGHT, WIDTH } from "./types/constants";

const start = async (): Promise<void> => {
  TextureStyle.defaultOptions.scaleMode = "nearest";
  AbstractRenderer.defaultOptions.roundPixels = false;
  AbstractRenderer.defaultOptions.resolution = 2;

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
    manifest: {
      bundles: [
        {
          name: "base",
          assets: [
            {
              alias: "Jersey10",
              src: "/assets/fonts/Jersey10-Regular.woff2",
              data: { scaleMode: "nearest" },
            },
          ],
        },
        {
          name: "grass",
          assets: [
            {
              alias: "grass_tiles",
              src: "/assets/textures/grass.json",
              data: { scaleMode: "nearest" },
            },
          ],
        },
        {
          name: "props",
          assets: [
            {
              alias: "props",
              src: "/assets/textures/props.json",
              data: { scaleMode: "nearest" },
            },
          ],
        },
      ],
    },
  });
  await Assets.loadBundle("base");

  const canvas = document.querySelector("canvas");

  // Stretch canvass onto the window size
  const aspectRatio = window.innerHeight / (HEIGHT * AbstractRenderer.defaultOptions.resolution);
  canvas.style.transform = `matrix3d(calc(1*calc(${aspectRatio})),0,0,0, 0,calc(1*calc(${aspectRatio})),0,0, 0,0,1,0, 0,0,1,1)`;

  const scenemanager = new SceneManager();

  const loadingScene = new LoadingScene();
  scenemanager.addScene(loadingScene);
  app.stage.addChild(scenemanager);

  scenemanager.setSceneActive(loadingScene);
  await Assets.loadBundle(["grass", "props"], (progress: number) => {
    loadingScene.updateProgress(progress);
    loadingScene.onSceneComplete = () => {
      const landingScene = new LandingScene();
      scenemanager.addScene(landingScene);
      scenemanager.setSceneActive(landingScene);
    };
  });
  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
};

start();
