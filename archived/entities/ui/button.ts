import { Container, Graphics, Text, TextOptions } from "pixi.js";

export interface ButtonStyle extends TextOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

export class Button extends Container {
  protected _styles: ButtonStyle;
  protected _text: Text;
  constructor(buttonStyles: ButtonStyle) {
    super();
    this._styles = buttonStyles;
    const { style, text, height, width } = buttonStyles;

    this._text = new Text({
      text,
      style,
    });

    const graphics = new Graphics();
    graphics.rect(0, 0, width, height);
    graphics.renderable = false;

    this.addChild(graphics, this._text);
  }
}
