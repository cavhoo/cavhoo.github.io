import { Container, Text } from "pixi.js";
import { SizeableText } from "../components/SizeableText";
import { FONT } from "../constants/Styles";

import Posts from "../posts"

interface Post {
  title: string,
  content: string,
  date: string
}

export class Blog extends Container {
  constructor() {
    super()
    this.init()
  }

  public init() {
    let lastY = 15
    Posts.forEach((post) => {
      const {title, date, content} = post

      const postContainer = new Container()
      const postDate = new Text(date, { fill: FONT.COLOR_DEFAULT, fontSize: FONT.FONT_SIZE_CONTENT - 7, fontFamily: FONT.FONT_FAMILY })
      const postTitle = new Text(title, { fill: FONT.COLOR_DEFAULT, fontSize: FONT.FONT_SIZE_TITLE, fontFamily: FONT.FONT_FAMILY })
      postTitle.position.set(postDate.x + postDate.width + 20, 0)
      const postContent = new SizeableText(content, {fill: FONT.COLOR_DEFAULT, fontSize: FONT.FONT_SIZE_CONTENT, lineHeight: FONT.LINE_SPACING_CONTENT, fontFamily: FONT.FONT_FAMILY}, 900)
      postContent.position.set(0, postDate.y + postDate.height + 20)
     
      postContainer.addChild(postTitle)
      postContainer.addChild(postDate)
      postContainer.addChild(postContent)
      postContainer.position.set(0, lastY)
      this.addChild(postContainer)
      lastY += postContainer.y + 30
    })
  }

}
