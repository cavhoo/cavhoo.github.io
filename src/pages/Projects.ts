import { Container, Text, TextStyle } from "pixi.js";
import { SizeableText } from "../components/SizeableText";
import { FONT } from "../constants/Styles";
import EventListener, { EVENT } from "../utils/EventListener";

const projects = [
  {
    title: "GTA 5 RP Project",
    content: [
      "A FiveM based Role Playing framework written in C#, and some ReactJS/Pixi.js for the client.",
      "It's using a PostgresSQL database to store the user information, and uses MVC development pattern,",
      "for backend and frontend alike."
    ].join(" "),
    link: ""
  },
  {
    title: "CityGenerator",
    content: [
      "A C++/OpenGL based procedural generation of a city scape. A few years ago I read a blog post about something",
      "in a blog post where someone did the same. So last year or so I started the same, it's a project I spend sometime",
      "in every now and then as it requires a lot of focus and learning from my side. So I am mostly working on it when I",
      "can afford a whole day to spend in from of my PC"
    ].join(" "),
    link: ""
  },
  {
    title: "cavhoo.github.io",
    content: [
      "My github portfolio page created with PixiJS. So this website is a canvas based website, and I use it as",
      "a playground to test new things. So you might see stuff change from time to time. My idea is to use this",
      "website to showcase some techniques that I learned now and then. So some shader effects and other funny rendering"
    ].join(" ")
  }
]

const titleStyle = {
  fontSize: FONT.FONT_SIZE_TITLE + 10,
  fontFamily: FONT.FONT_FAMILY,
  fill: FONT.COLOR_DEFAULT
} as TextStyle

const contentStyle = {
  fontSize: FONT.FONT_SIZE_CONTENT,
  fontFamily: FONT.FONT_FAMILY,
  lineHeight: FONT.LINE_SPACING_CONTENT,
  fill: FONT.COLOR_DEFAULT
} as TextStyle

export class Projects extends Container {
  private _maxHeight: number = 600
  constructor() {
    super()
    this.init()
  }

  private init() {
    EventListener.addListener(EVENT.ONSCROLL, this.onScroll)

    let lastY = 10
    projects.forEach((project) => {
      const projectWrapper = new Container()
      const title = new Text(project.title, titleStyle)
      const content = new SizeableText(project.content, contentStyle, 900)
      content.position.set(0, title.height + 15)
      projectWrapper.position.set(0, lastY)
      projectWrapper.addChild(title)
      projectWrapper.addChild(content)
      this.addChild(projectWrapper)
      lastY += projectWrapper.height + 15
    })
  }

  private onScroll = (event: WheelEvent) => {
    if (this.visible) {
      const {
        deltaY
      } = event
      if (deltaY > 0) {
        if (this.position.y >= (this._maxHeight - this.height)) {
          this.position.y -= Math.abs(deltaY)
        }
      } else {
        if (this.position.y < 0) {
          this.position.y += Math.abs(deltaY)
        }
      }
    }
  }
}
