import { Container, Text, TextStyle } from "pixi.js";

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

    const companyText = new Text(company, {...fontSyle, fontSize: 24})
    companyText.position.set(0, 5)
    const yearText = new Text(years, fontSyle)
    yearText.position.set(companyText.x + companyText.width + 15, 9)

    const locationText = new Text(location, fontSyle)
    locationText.position.set(0, yearText.y + yearText.height + 13)

    const contentText = new Text(content, fontSyle)
    contentText.position.set(0, locationText.y + locationText.height + 30)


    this.addChild(companyText)
    this.addChild(yearText)
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
