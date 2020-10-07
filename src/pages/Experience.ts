import { Container, Text } from "pixi.js";
import { ExperienceItem } from "../components/ExperienceItem";

const experiences = [
  {
    company: "Fitogram GmbH",
    location: "Cologne, Germany",
    years: "2018 - today",
    content: "Lead developer for the new frontend application,\nthat is suppose to replace Fitogram Pro",
    techStack: "ReactJS, .Net Core, Typescript"
  },
  {
    company: "Quickspin AB",
    location: "Stockholm, Sweden",
    years: "2016 - 2018",
    content:"Developer for features that run  next to slot games, like Achievements, Tournaments and Challenges\n"+
      "Spear headed the development "
  }
]


export class Experience extends Container {
  constructor() {
    super()
    this.init()
  }

  private init() {
    let lastItem: ExperienceItem = null
    experiences.forEach((experience, index) => {
      const item = new ExperienceItem(
        experience.company,
        experience.years,
        experience.location,
        experience.content
      )

      if (lastItem) {
        item.position.set(0, lastItem.totalHeight + 45)
      }
    
      lastItem = item
      this.addChild(item)
    })

  }
}
