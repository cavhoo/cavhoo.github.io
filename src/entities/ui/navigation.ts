import { Container, Text } from "pixi.js";
import { FONT, HEIGHT, WIDTH } from "../../types/constants";

export enum NavigationDirection {
  Left,
  Right,
}

export class Navigation extends Container {
  protected navigationCallback: (direction: NavigationDirection) => void;
  constructor(callback: (direction: NavigationDirection) => void) {
    super();
    this.navigationCallback = callback;
    const navLeft = new Text({
      text: "<",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });

    navLeft.position.set(navLeft.width, (HEIGHT - navLeft.height) / 2);
    navLeft.eventMode = "static";
    navLeft.cursor = "pointer";
    navLeft.onpointerdown = () => this.navigationCallback(NavigationDirection.Left);

    const navRight = new Text({
      text: ">",
      style: {
        fontFamily: FONT,
        fontSize: 80,
        fill: "white",
      },
    });
    navRight.position.set(WIDTH - navRight.width * 2, (HEIGHT - navRight.height) / 2);
    navRight.eventMode = "static";
    navRight.cursor = "pointer";
    navRight.onpointerdown = () => this.navigationCallback(NavigationDirection.Right);

    this.addChild(navLeft, navRight);
  }
}
