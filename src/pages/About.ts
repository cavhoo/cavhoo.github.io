import { Container, Text, TextStyle } from "pixi.js";

import * as aboutContent from "../../content/about.json"

export class About extends Container {
  constructor() {
    super()
    this.init()
  }

  private init() {
    const title = new Text(aboutContent.title, {
      fontSize: 16,
      fontFamily: "Press Start 2P",
      align: "center",
      fill: "white"
    } as TextStyle)
    this.addChild(title)
  }

}
