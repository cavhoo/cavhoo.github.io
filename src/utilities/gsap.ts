import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export const registerGSAP = async () => {
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);
};
