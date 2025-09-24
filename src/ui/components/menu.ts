import { Container } from "pixi.js";
import { MenuItem } from "./menuItem";

export class Menu extends Container {
  protected itemGroup: MenuItem[] = [];

  constructor() {
    super();
  }

  public addItem(item: MenuItem): void {
    this.itemGroup.push(item);
    this.addChild(item);
    item.position.y = (item.height + 10) * (this.itemGroup.length - 1);
  }
}
