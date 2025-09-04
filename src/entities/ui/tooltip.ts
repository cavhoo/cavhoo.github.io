import { Container, Graphics, Text } from "pixi.js";
import { Vector } from "../../utilities/vector";
import { FONT } from "../../types/constants";

export type TooltipOptions = {
  text: string;
  size: Vector;
  backgbroundColor?: number;
  borderColor?: number;
  chamfer?: number;
};

export class Tooltip extends Container {
  protected _text: string;
  constructor({ text, borderColor, backgbroundColor, size, chamfer }: TooltipOptions) {
    super();

    const background = new Graphics();
    background
      .chamferRect(0, 0, size.x, size.y, chamfer ?? 10)
      .fill({ color: backgbroundColor ?? 0xc1a1dd })
      .stroke({ width: 2, color: borderColor ?? 0xc3c3c3 });

    this.addChild(background);
    this._text = text;

    const textElement = new Text({
      text: this._text,
      style: {
        fontSize: 38,
        fontFamily: FONT,
      },
    });
    textElement.resolution = 2;
    textElement.position.set((size.x - textElement.width) / 2, (size.y - textElement.height) / 2);
    this.addChild(textElement);
    this.pivot = new Vector(this.width / 2, this.height - 10).toPixiPoint();
  }
}
