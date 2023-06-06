import { TextStyle, Text } from "pixi.js";
export interface ILinkText {
	title: string;
	url: string;
}

export class LinkText extends Text {
	protected readonly sourceText: string;
	protected url: string;
	constructor({ title, url }: ILinkText, style: Partial<TextStyle>) {
		super(title, style);
		this.sourceText = title;
		this.url = url;
		this.interactive = true;
		this.buttonMode = true;
		this.on("pointerover", () => {
			this.text = `- ${this.sourceText} - `;
		});
		this.on("pointerout", () => {
			this.text = this.sourceText;
		});
		this.on("pointerdown", () => this.onLinkClicked());
	}

	protected onLinkClicked(): void {
		window.open(this.url, "_");
	}
}
