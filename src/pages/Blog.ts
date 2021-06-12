import { Container, Text } from "pixi.js";
import { SizeableText } from "../components/SizeableText";
import { FONT } from "../constants/Styles";

import Posts from "../posts";
import EventListener, { EVENT } from "../utils/EventListener";
import { Page } from "./Page";

interface Post {
	title: string;
	content: string;
	date: string;
}

export class Blog extends Page {
	private _maxHeight: number = 600;
	constructor() {
		super();
		this.init();
	}

	protected init(): void {
		let lastY = 15;

		Posts.reverse();

		Posts.forEach((post) => {
			const { title, date, content } = post;

			const postContainer = new Container();
			const postDate = new Text(date, {
				fill: FONT.COLOR_DEFAULT,
				fontSize: FONT.FONT_SIZE_CONTENT - 7,
				fontFamily: FONT.FONT_FAMILY,
			});
			const postTitle = new Text(title, {
				fill: FONT.COLOR_DEFAULT,
				fontSize: FONT.FONT_SIZE_TITLE,
				fontFamily: FONT.FONT_FAMILY,
			});
			postTitle.position.set(postDate.x + postDate.width + 20, 0);
			const postContent = new SizeableText(
				content,
				{
					fill: FONT.COLOR_DEFAULT,
					fontSize: FONT.FONT_SIZE_CONTENT,
					lineHeight: FONT.LINE_SPACING_CONTENT,
					fontFamily: FONT.FONT_FAMILY,
				},
				900
			);
			postContent.position.set(0, postDate.y + postDate.height + 20);

			postContainer.addChild(postTitle);
			postContainer.addChild(postDate);
			postContainer.addChild(postContent);
			postContainer.position.set(0, lastY);
			this.addChild(postContainer);
			lastY += postContainer.height + 30;
			console.log(lastY);
		});

		EventListener.addListener(EVENT.ONSCROLL, this.onScroll);
	}

	private onScroll = (event: WheelEvent) => {
		if (this.visible) {
			const { deltaY } = event;
			if (deltaY > 0) {
				if (this.position.y >= this._maxHeight - this.height) {
					this.position.y -= Math.abs(deltaY);
				}
			} else {
				if (this.position.y < 0) {
					this.position.y += Math.abs(deltaY);
				}
			}
		}
	};
}
