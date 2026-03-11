import { Container, Graphics, Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../../types/constants";
import { TextData } from "../../data/texts/text";

export class TextOverlay extends Container {
  constructor(backgroundColor: string) {
    super();
    const background = new Graphics();
    background.roundRect(0, 0, WIDTH * 0.6, HEIGHT * 0.8).fill(backgroundColor);
    this.addChild(background);
  }

  public addText(text: TextData): void {
    const titleText = new Text({
      text: text.title,
      style: {
        fill: "white",
        fontFamily: FONT,
        fontSize: 40,
        align: "center",
      },
    });
    titleText.position.set((this.width - titleText.width) / 2, 5);

    const contentText = new Text({
      text: text.lines.join("\n"),
      style: {
        fontFamily: FONT,
        wordWrap: true,
        wordWrapWidth: this.width - 40,
      },
    });

    contentText.position.set(10, titleText.height + 20);

    this.addChild(titleText, contentText);
  }
}
