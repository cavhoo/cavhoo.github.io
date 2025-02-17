declare let PIXI: any;

import { Application } from "pixi.js";

PIXI.WebGLRenderer = PIXI.Renderer;
window["__PIXI_INSPECTOR_GLOBAL_HOOK__"] && window["__PIXI_INSPECTOR_GLOBAL_HOOK__"].register({ PIXI: PIXI });

const start = async (): Promise<void> => {
	const settings = {
		width: 1280,
		height: 720,
		antialias: true,
		transparent: false,
		resolution: 1,
	};

	// Create new PIXI Canvas App
	const app = new Application();

	await app.init({ background: "black", resizeTo: window });
	const container = document.querySelector("#app");

	if (container) {
		container.appendChild(app.canvas);
	} else {
		console.error("Unable to attach app to body! Reason: Body not found");
	}
};

start();
