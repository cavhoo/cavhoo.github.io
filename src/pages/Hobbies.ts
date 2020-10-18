import { Container, TextStyle } from "pixi.js";
import { SizeableText } from "../components/SizeableText";
import { FONT } from '../constants/Styles'
import EventListener, { EVENT } from "../utils/EventListener";

const hobbies = [
  {
    title: "Photography",
    content: [
      "I bought a camera because I was interested in capturing life how it is. Right now!",
      "Freezing moments in time of the current world was what got into the area of street photography",
      "a lot of people don't like it being photographed because they fear being robbed of their identity",
      "and I belive in certain ethics. I don't take picture of homeless people, or people in bad situations.",
      "Yes that belongs to life, but it feels wrong to gain on someone elses misery. I also try to not photograph",
      "kids as they are growing into this world. And there are a lot of weird people out there that well get off on",
      "any picture of a kid. If I happen to capture a kid, I always approach the parents afterwards asking if that",
      "was ok, and if not the picture gets deleted then and there in front of their eyes!",
      "But it fascinates me, looking back 8 years into my journey, each picture takes me back to that place like",
      "a memory frozen in eternity. That is what drives my passion for pictures."
    ].join(" ")
  },
  {
    title: "Gaming",
    content: [
      "Yes I like to play computer games, and yes I admit that I do :D.",
      "But I mostly play the old games from the late 90s, like Doom, Quake and Unreal Tournament.",
      "From time to time I throw in a role playing game, or a round of Counter-Strike or two.",
      "But I am a pure PC player, I owned a Xbox because of Halo, but after the Xbox 360 I never",
      "bought a console again. And probably never will."
    ].join(" ")
  }
]

const titleStyle = {
  fontSize: FONT.FONT_SIZE_TITLE + 5,
  fontFamily: FONT.FONT_FAMILY,
  fill: FONT.COLOR_DEFAULT
} as TextStyle

const contentStyle = {
  fontSize: FONT.FONT_SIZE_CONTENT,
  fontFamily: FONT.FONT_FAMILY,
  fill: FONT.COLOR_DEFAULT,
  lineHeight: FONT.LINE_SPACING_CONTENT
} as TextStyle

export class Hobbies extends Container {
  private _maxHeight: number
  constructor() {
    super()
    this.init()
    this._maxHeight = 500
  }

  private init() {
    let lastY =15;

    hobbies.forEach((hobby) => {
      const hobbyWrapper = new Container()

      const title = new SizeableText(hobby.title, titleStyle, 900)

      const content = new SizeableText(hobby.content, contentStyle, 900)
      content.position.set(0, title.height + 25)
      hobbyWrapper.addChild(title)
      hobbyWrapper.addChild(content)
      this.addChild(hobbyWrapper)
      hobbyWrapper.position.set(0, lastY)
      lastY = hobbyWrapper.y + hobbyWrapper.height + 20;
    })

    EventListener.addListener(EVENT.ONSCROLL, this.onScroll)

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
