import { Container, Text, TextStyle } from "pixi.js";
import { FONT } from "../constants/Styles";
import { SizeableText } from "./SizeableText";

export class ExperienceItem extends Container {
  constructor(company: string, years: string, location: string, content: string) {
    super()
    this.init(
      company,
      years,
      location,
      content
    )
  }

  private init(
    company,
    years,
    location,
    content
  ) {
    const fontSyle = {
      fontSize: 20,
      fontFamily: "Press Start 2P",
      align: "left",
      fill: "white"
    } as TextStyle

    const yearText = new Text(years, fontSyle)
    yearText.position.set(0, 5)
    const companyText = new Text(company, {...fontSyle, fontSize: 24})
    companyText.position.set(0, yearText.height + 10)

    const locationText = new Text(location, fontSyle)
    locationText.position.set(0, companyText.y + companyText.height + 13)

    const contentText = new SizeableText(content, {...fontSyle, lineHeight: FONT.LINE_SPACING_CONTENT}, 900)
    contentText.position.set(0, locationText.y + locationText.height + 30)

    this.addChild(yearText)
    this.addChild(companyText)
    this.addChild(locationText)
    this.addChild(contentText)
  }


  public get totalHeight() {
    const firstTextY = this.children[0].y
    const lastTextY = this.children[this.children.length - 1].y
    const lastTextheight = (this.children[this.children.length - 1] as Text).height

    return lastTextY - firstTextY + lastTextheight
  }
}
