import { Application, Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { Floor } from "./entities/floor";

const start = async (): Promise<void> => {
  const SCENE_DIMENSIONS = {
    width: 1280,
    height: 720,
  };
  // Create new PIXI Canvas App
  const app = new Application();
  const container = document.querySelector("#app");

  await app.init({ background: "black", width: 1280, height: 720 });
  globalThis.__PIXI_APP__ = app;
  if (container) {
    container.appendChild(app.canvas);
  } else {
    console.error("Unable to attach app to body! Reason: Body not found");
  }

  Assets.add({ alias: "floortile", src: "/assets/websitetiles_floor.png" });
  Assets.add({ alias: "wallleft", src: "/assets/wallleft.png" });
  Assets.add({ alias: "wallright", src: "/assets/rightwall.png" });

  const textures = await Assets.load(["floortile", "wallleft", "wallright"]);

  const canvas = document.querySelector("canvas");

  // Stretch canvass onto the window size
  const aspectRatio = window.innerHeight / 720;
  canvas.style.transform = `matrix3d(calc(1*calc(${aspectRatio})),0,0,0, 0,calc(1*calc(${aspectRatio})),0,0, 0,0,1,0, 0,0,1,1)`;

  const text = new Text({ text: `Mouse X: ${0} Mouse Y: ${0}` });
  const scrollText = new Text({ text: `Scroll: ${0}` });
  scrollText.position.set(text.x, text.y + text.height);

  const panes = [];

  panes.forEach((pane) => pane.position.set(40, 10));
  app.stage.eventMode = "static";

  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen;


  const room = new Container();
  const floorTileTexture = textures.floortile;
  // Floor
  const floor = new Floor(64, floorTileTexture);

  floor.pivot.set(floor.width / 2 - floorTileTexture.width / 2, floorTileTexture.height / 2);
  floor.position.set(1280 / 2, 720 / 2)

  app.stage.addChild(floor);


  // Walls 
  const leftWall = new Sprite(textures.wallleft);
  leftWall.anchor.set(1, 1);
  leftWall.position.set(floor.position.x, floor.position.y + 5)
  /** const leftWall = new Graphics().poly([
    floor.position.x - floor.width / 2,
    floor.position.y,

    floor.position.x,
    floor.position.y - floor.height / 2,

    floor.position.x,
    floor.position.y - floor.height / 2 - 150,

    floor.position.x - floor.width / 2,
    floor.position.y - 150,
  ]).fill({ color: "beige" }); */

  const rightWall = new Sprite(textures.wallright);
  rightWall.anchor.set(0, 1);
  rightWall.position.set(floor.position.x - 8, floor.position.y)
  /** const rightWall = new Graphics().poly([
     floor.position.x + floor.width / 2,
     floor.position.y,
 
     floor.position.x,
     floor.position.y - floor.height / 2,
 
     floor.position.x,
     floor.position.y - floor.height / 2 - 150,
 
     floor.position.x + floor.width / 2,
     floor.position.y - 150,
   ]).fill({ color: "beige" }); */

  app.stage.addChild(rightWall, leftWall)
};

start();
