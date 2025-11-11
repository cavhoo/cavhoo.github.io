import { Container, Text } from "pixi.js";
import { FONT } from "../../../types/constants";

export class MenuItem extends Container {
  constructor(protected title: string, onClick: () => void) {
    super();

    this.eventMode = "static";
    this.cursor = "pointer";

    const labelText = new Text({
      text: title,
      style: {
        fontFamily: FONT,
        fontSize: 28,
        fill: "white",
      },
    });

    this.on("pointerdown", () => onClick());
    this.on("pointerover", () => (labelText.text = `${title} <<`));
    this.on("pointerout", () => (labelText.text = `${title}`));
    this.addChild(labelText);
  }
}
