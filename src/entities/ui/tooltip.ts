import { Container } from "pixi.js";

export type TooltipOptions = {
  text: string;
};

export class Tooltip extends Container {
  protected _text: string;
  constructor({ text }: TooltipOptions) {
    super();
    this._text = text;
  }
}
