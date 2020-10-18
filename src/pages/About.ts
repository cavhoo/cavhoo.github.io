import { Container, Text, TextStyle } from "pixi.js";

import { SizeableText } from "../components/SizeableText"
import * as aboutContent from "../../content/about.json"

const textContent = [
  "My name is Hendrik, and I am from Germany. Ever since I was a kid it technology ",
  "was facsinating to me. I took apart all kinds of things, and I was better at that ",
  "then at reassembling the stuff I took apart. ",
  "Then I got my first computer when I just joined primary school, and from that moment ",
  "on I was hooked to computers. Mostly playing games though, and then my chance came around ",
  "to study computer science. ",
  "I like to try new things, and I am not afraid of learning or adjusting to new environments, ",
  "one of my goals is to relocate to the US and live in Las Vegas and work for one of the big ",
  "gaming studios there like Konami or Aristocrat. "
]

export class About extends Container {
  constructor() {
    super()
    this.init()
  }

  private init() {
    const title = new Text(aboutContent.title, {
      fontSize: 20,
      fontFamily: "Press Start 2P",
      align: "center",
      fill: "white"
    } as TextStyle)
    this.addChild(title)

    const content = new SizeableText(textContent.join(''), {
      fontSize: 20,
      fontFamily: "Press Start 2P",
      align: "left",
      fill: "white"
    }, 900)
   
    content.position.set(0, 25)
    this.addChild(content)
  }

}
