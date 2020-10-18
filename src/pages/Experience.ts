import { Container, Graphics, Text } from "pixi.js";
import { ExperienceItem } from "../components/ExperienceItem";
import EventListener, { EVENT } from "../utils/EventListener";

const experiences = [
  {
    company: "Fitogram GmbH",
    location: "Cologne, Germany",
    years: "2018 - today",
    content: [
      "Lead developer for new frontend that is going to replace the old SaaS software called Fitogram Pro.",
      "It is build completely with functional ReactJS component, and utilizes Redux for global state management.",
      "Splitting up components into a Container and Visual part, allows for easy testing with Jest and testing-library.",
      " Also by utizing encapsulation of thirdparty libraries into our own hooks, we ensure that we can expore the correct",
      "functionality even if we change the library."
    ].join(''),
    techStack: "ReactJS, .Net Core, Typescript, Webpack"
  },
  {
    company: "Quickspin AB",
    location: "Stockholm, Sweden",
    years: "2016 - 2018",
    content:[
      "Working on slot game features and mini games that run next to the main game, and focus on customer retention on casino platform.",
      "First project involved developing a frontend for an achievement system that tracks certain occurances inside the slot, and progresses",
      " towards specific rewards. These rewards could be used to toggle freespins inside the games. Another project I have worked on was a tournament",
      " system that uses a third party integration through Competition Labs to host a tournament like mini game. The system uses the same events as the",
      " achievements system and calculates a defined score by the platform an awards players after the tournmanent has ended. The last project I was leading",
      " before leaving was a mini game called challenges, it's a maze game that would clear a path based on your spin outcomes, each stage can have a different",
      " reward like money, freespins or tokens to toggle freespins."
    ].join(''),
    techStack: "Pixi.js, WebGL, Webpack, Typescript"
  },
  {
    company: "adp Gauselmann GmbH",
    location: "Lübbecke, Germany",
    years: "2012 - 2016",
    content: [
      "Started the position as a flash developer, but quickly moved onto working on the first JavaScript based framework to make slot games run",
      " on mobile devices. The first framework was built around a framework called ImpactJS and used the normal canvas api to render the games",
      " after the first successful launches, we redid the framework with the helpm of PhaserJS which is built ontop of PixiJS and it utilizes WebGL",
      " to ensure best performance across devices and provide the option for higher fidelity games"
    ].join(''),
    techStack: "JavaScript, TypeScript, PhaserJS, Pixi.js, Gulp, Webpack"
  }
]


export class Experience extends Container {
  private _maxHeight: number
  constructor(maxHeight: number) {
    super()
    this._maxHeight = maxHeight
    this.init()
  }

  private init() {
    let lastItem: ExperienceItem = null

    for (let i = 0; i < experiences.length; i++) {
      const item = new ExperienceItem(
        experiences[i].company,
        experiences[i].years,
        experiences[i].location,
        experiences[i].content
      )

      if (lastItem) {
        item.position.set(0, lastItem.y + lastItem.totalHeight + 45)
      }

      lastItem = item
      this.addChild(item)
    }
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
