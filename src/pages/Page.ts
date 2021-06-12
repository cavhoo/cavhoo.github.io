import { Container } from "pixi.js";

export abstract class Page extends Container {
	constructor() {
		super();
	}

	protected abstract init(): void;
}
