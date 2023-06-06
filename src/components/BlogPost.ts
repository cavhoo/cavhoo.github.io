import { Container, Text } from "pixi.js";
import { SizeableText } from "./SizeableText";
import { FONT } from "../constants/Styles";

export class BlogPost extends Container {
	constructor({ title, content, date }: { title: string; content: string; date: string }) {
		super();
		this.init(title, content, date);
	}

	private init(title: string, content: string, date: string) {
		const titleText = new Text(title, {
			fontSize: 30,
			fontFamily: FONT.FONT_FAMILY,
			align: "left",
			fill: "white",
		});
		const dateText = new Text(date, {
			fontSize: 30,
			fontFamily: FONT.FONT_FAMILY,
			align: "left",
			fill: "white",
		});
		const contentText = new SizeableText(
			content,
			{
				fontSize: 30,
				fontFamily: FONT.FONT_FAMILY,
				align: "left",
				fill: "white",
			},
			900 // Text max line width
		);

		this.addChild(titleText);
		this.addChild(dateText);
		this.addChild(contentText);
	}
}
