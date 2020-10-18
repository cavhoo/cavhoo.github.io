import { Container, Text } from "pixi.js";
import { SizeableText } from "./SizeableText";

export class BlogPost extends Container {
  constructor({title, content, date}: {title: string, content: string, date: string}) {
    super()
    this.init(title, content, date)
  }

  private init(title: string, content: string, date: string) {
    const titleText = new Text(title, {})
    const dateText = new Text(date, {})
    const contentText = new SizeableText(content, {}, 900)

    this.addChild(titleText)
    this.addChild(dateText)
    this.addChild(contentText)
  }
}
