import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Background } from "../components/Background";
import { Menu } from "../components/Menu";
import { PageContainer } from "../models/PageContainer.model";
import { Sections } from "../models/Sections.model";
import { About } from "./About";
import { Blog } from "./Blog";
import { Experience } from "./Experience";
import { Hobbies } from "./Hobbies";
import { Projects } from "./Projects";

export class Main extends PageContainer {
  private currentSelected: Sections
  private sections: {[key:string]: Container}
  private menu: Menu
  private sectionTitle: Text
  private background: Background
  constructor() {
    super()
    this.currentSelected = Sections.BLOG
    this.init()
  }

  private init() {
    this.sectionTitle = new Text("", {
      fontSize: 48,
      fontFamily: "Press Start 2P",
      fill: "white",
      align: "center"
    } as TextStyle)

    this.background = new Background()
    //background.position.set(1280 / 2, 720 / 2)
    this.addChild(this.background)
    this.addChild(this.sectionTitle)


    this.menu = new Menu()
    this.menu.onSelect = this.onChangeSection
    this.menu.position.set(20, 100)
    this.addChild(this.menu)

    const content = new Container()

    content.position.set(this.menu.width + this.menu.x + 35, 100)
    this.addChild(content)
    const contentMask = new Graphics()
    contentMask.beginFill()
    contentMask.drawRect(0, 0, 1280 - content.x, 600)
    contentMask.endFill()
    content.mask = contentMask
    content.addChild(contentMask)


    this.sections = {}
    this.sections[Sections.BLOG] = new Blog()
    this.sections[Sections.ABOUT] = new About()
    this.sections[Sections.EXPERIENCE] = new Experience(600)
    this.sections[Sections.HOBBIES] = new Hobbies()
    this.sections[Sections.PROJECTS] =  new Projects()

    this.sections[Sections.BLOG].visible = true;
    this.sections[Sections.ABOUT].visible = false;
    this.sections[Sections.EXPERIENCE].visible = false;
    this.sections[Sections.HOBBIES].visible = false;
    this.sections[Sections.PROJECTS].visible = false;

    content.addChild(...Object.values(this.sections))

    this.sectionTitle.text = Sections.BLOG.toUpperCase()
    this.sectionTitle.position.set(
      (1280 - this.sectionTitle.width) / 2,
      50
    )
  }

  private onChangeSection = (section: Sections) => {
    switch(section) {
      case Sections.BLOG: {
        this.sections[Sections.ABOUT].visible = false;
        this.sections[Sections.BLOG].visible = true;
        this.sections[Sections.HOBBIES].visible = false;
        this.sections[Sections.PROJECTS].visible = false;
        this.sections[Sections.EXPERIENCE].visible = false;
        this.sectionTitle.text = Sections.BLOG.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
      case Sections.ABOUT: {
        this.sections[Sections.ABOUT].visible = true;
        this.sections[Sections.EXPERIENCE].visible = false;
        this.sections[Sections.HOBBIES].visible = false;
        this.sections[Sections.PROJECTS].visible = false;
        this.sections[Sections.BLOG].visible = false;
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
        this.sections[Sections.BLOG].visible = false;
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
        this.sections[Sections.BLOG].visible = false;
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
        this.sections[Sections.BLOG].visible = false;
        this.sectionTitle.text = Sections.PROJECTS.toUpperCase()
        this.sectionTitle.position.set(
          (1280 - this.sectionTitle.width) / 2,
          50
        )
        break;
      }
    }
  }

  public update(delta: number) {
    this.background.update(delta)
  }
}
