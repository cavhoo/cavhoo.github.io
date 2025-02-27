import { Application, Assets, Text, TextureStyle } from "pixi.js";
import { City } from "./city/citymap";

const start = async (): Promise<void> => {
  const SCENE_DIMENSIONS = {
    width: 1280,
    height: 720,
  };

  // Create new PIXI Canvas App
  const app = new Application();
  const container = document.querySelector("#app");

  // Ugly hack to set nearest neighbour scaling globally;
  (TextureStyle as any).defaultOptions = {
    addressMode: "clamp-to-edge",
    scaleMode: "nearest",
  };
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
          name: "city",
          assets: [
            { alias: "road", src: "/assets/road.png" },
            { alias: "roadAlt", src: "/assets/road.png" },
            { alias: "roadCurve", src: "/assets/roadcurve.png" },
            { alias: "roadCurveUp", src: "/assets/roadcurveup.png" },
            { alias: "roadCross", src: "/assets/roadcross.png" },
            { alias: "grass", src: "/assets/grass.png" },
          ],
        },
      ],
    },
  });

  await Assets.loadBundle(["city"]);

  const canvas = document.querySelector("canvas");

  // Stretch canvass onto the window size
  const aspectRatio = window.innerHeight / 720;
  canvas.style.transform = `matrix3d(calc(1*calc(${aspectRatio})),0,0,0, 0,calc(1*calc(${aspectRatio})),0,0, 0,0,1,0, 0,0,1,1)`;

  const text = new Text({ text: `Mouse X: ${0} Mouse Y: ${0}` });
  const scrollText = new Text({ text: `Scroll: ${0}` });
  scrollText.position.set(text.x, text.y + text.height);

  const city = new City(30, 30);
  city.pivot.set(city.width / 2, 0);
  city.position.set(SCENE_DIMENSIONS.width / 2, SCENE_DIMENSIONS.height / 2);

  app.stage.addChild(city);
  app.stage.eventMode = "static";

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
};

start();
