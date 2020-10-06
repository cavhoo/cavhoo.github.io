import { Container, Text, TextStyle } from "pixi.js";

export interface SectionData {
  title: string
  content: string
}


export class Section extends Container {
  private contentFontConfig: {[key:string]: Partial<TextStyle>} = {
    title: {
      fontFamily: "Press Start 2P",
      fontSize: 25,
      fill: 'white'
    },
    content: {
      fontFamily: "Press Start 2P",
      fontSize: 18,
      fill: 'white'
    }
  }
  private data:SectionData
  constructor(data: SectionData) {
    super()
    this.data = data
    this.init()
  }

  init() {
    const title = new Text(this.data.title, this.contentFontConfig.title)
    const content = new Text(this.data.content, this.contentFontConfig.content)


    this.addChild(title)
    this.addChild(content)
  }
}
