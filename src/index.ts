import { Application, Assets, Text, TextureStyle } from "pixi.js";
import { City } from "./city/citymap";

const start = async (): Promise<void> => {
  const SCENE_DIMENSIONS = {
    width: 1280,
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
          name: "city",
          assets: [
            { alias: "road", src: "/assets/road.png", },
            { alias: "roadCurve", src: "/assets/roadcurve.png" },
            { alias: "roadCross", src: "/assets/roadcross.png" },
            { alias: "grass", src: "/assets/grass.png" },
            { alias: "concrete", src: "/assets/concrete.png" },
            { alias: "dirt", src: "/assets/dirt.png" },
            { alias: "slab", src: "/assets/slab.png" },
            { alias: "concrete", src: "/assets/concrete.png", },
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

  const city = new City(40, 22);
  city.scale.set(0.5)

  app.stage.addChild(city);
  app.stage.eventMode = "static";

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;
};

start();
