import { Container, Text, TextStyle } from "pixi.js";
import { Menu } from "../components/Menu";
import { PageContainer } from "../models/PageContainer.model";
import { Sections } from "../models/Sections.model";
import { About } from "./About";

export class Main extends PageContainer {
  private currentSelected: Sections
  private sections: {[key:string]: Container}
  private sectionTitle: Text
  constructor() {
    super()
    this.currentSelected = Sections.ABOUT
    this.init()
  }

  private init() {
    this.sectionTitle = new Text("", {
      fontSize: 48,
      fontFamily: "Press Start 2P",
      fill: "white",
      align: "center"
    } as TextStyle)
    this.addChild(this.sectionTitle)


    const menu = new Menu()
    menu.onSelect = this.onChangeSection
    menu.position.set(20, 100)
    this.addChild(menu)

    const content = new Container()
    content.position.set(menu.width + menu.x + 35, 100)
    this.addChild(content)

    this.sections = {}
    this.sections[Sections.ABOUT] = new About()
    this.sections[Sections.EXPERIENCE] = new Container()
    this.sections[Sections.HOBBIES] = new Container()
    this.sections[Sections.PROJECTS] =  new Container()

    this.sections[Sections.ABOUT].visible = true;
    this.sections[Sections.EXPERIENCE].visible = false;
    this.sections[Sections.HOBBIES].visible = false;
    this.sections[Sections.PROJECTS].visible = false;

    content.addChild(...Object.values(this.sections))

    this.sectionTitle.text = Sections.ABOUT.toUpperCase()
    this.sectionTitle.position.set(
      (1280 - this.sectionTitle.width) / 2,
      50
    )
  }

  private onChangeSection = (section: Sections) => {
    switch(section) {
      case Sections.ABOUT: {
        this.sections[Sections.ABOUT].visible = true;
        this.sections[Sections.EXPERIENCE].visible = false;
        this.sections[Sections.HOBBIES].visible = false;
        this.sections[Sections.PROJECTS].visible = false;
        this.sectionTitle.text = Sections.ABOUT.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
      case Sections.EXPERIENCE: {
        this.sections[Sections.ABOUT].visible = false;
        this.sections[Sections.EXPERIENCE].visible = true;
        this.sections[Sections.HOBBIES].visible = false;
        this.sections[Sections.PROJECTS].visible = false;
        this.sectionTitle.text = Sections.EXPERIENCE.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
      case Sections.HOBBIES: {
        this.sections[Sections.ABOUT].visible = false;
        this.sections[Sections.EXPERIENCE].visible = false;
        this.sections[Sections.HOBBIES].visible = true;
        this.sections[Sections.PROJECTS].visible = false;
        this.sectionTitle.text = Sections.HOBBIES.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
      case Sections.PROJECTS: {
        this.sections[Sections.ABOUT].visible = false;
        this.sections[Sections.EXPERIENCE].visible = false;
        this.sections[Sections.HOBBIES].visible = false;
        this.sections[Sections.PROJECTS].visible = true;
        this.sectionTitle.text = Sections.PROJECTS.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
    }
  }

}
