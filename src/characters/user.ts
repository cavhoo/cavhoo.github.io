import { Graphics } from "pixi.js";
import { Character } from "./character";

export class UserCharacter extends Character {
  constructor() {
    super();

    const body = new Graphics();
    body.rect(-10, -10, 20, 20);
    body.fill(0x2f6bff);
    this.addChild(body);
  }
}
