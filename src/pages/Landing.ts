import { Text, TextStyle } from "pixi.js";
import { PageContainer } from "../models/PageContainer.model";
import { FONT } from "../constants/Styles";

export class Landing extends PageContainer {
	private navFunc = (path: string) => {};
	private fontSettings = {
		title: {
			fontFamily: FONT.FONT_FAMILY,
			fontSize: 55,
			fill: "white",
			align: "center",
		} as TextStyle,
		subTitle: {
			fontFamily: FONT.FONT_FAMILY,
			fontSize: 28,
			fill: "white",
			align: "center",
		} as TextStyle,
		enter: {
			fontFamily: FONT.FONT_FAMILY,
			fontSize: 30,
			fill: "white",
		} as TextStyle,
	};
	constructor() {
		super();
		this.init();
	}

	private init() {
		const title = new Text("Hendrik Müller-Röhr", this.fontSettings.title);
		title.position.set(Math.floor((1280 - title.width) / 2), Math.floor((720 - title.height) / 2) - 120);
		this.addChild(title);

		const subTitle = new Text("Frontend Developer", this.fontSettings.subTitle);
		subTitle.position.set(Math.floor((1280 - subTitle.width) / 2), Math.floor((720 - subTitle.height) / 2) - 50);
		this.addChild(subTitle);

		const enter = new Text("< Enter >", this.fontSettings.enter);
		enter.position.set(Math.floor((1280 - enter.width) / 2), Math.floor((720 - enter.height) / 2) + 20);
		enter.interactive = true;
		enter.buttonMode = true;
		enter.on("pointerdown", this.handleNavClick);

		this.addChild(enter);
	}

	private handleNavClick = () => {
		this.navFunc("/main");
	};

	public setNavCallback(callback: (path: string) => void) {
		this.navFunc = callback;
	}
}
