import { Container, Text, TextStyle } from "pixi.js";
import { Sections } from "../models/Sections.model";

const onHover = (label: Text, text:string) => () => label.text = `${text}`


export class Menu extends Container {
  private menuFontConfig = {
    item: {
      fontFamily: 'Press Start 2P',
      fontSize: 20,
      fill: 'white'
    } as TextStyle
  }
  private onSelectItem: (section: Sections) => void


  constructor() {
    super()
    this.init()
  }

  set onSelect(listener: (section: Sections) => void) {
    this.onSelectItem = listener
  }

  private handleSelect = (section: Sections) => () => {
    if (this.onSelectItem) {
      this.onSelectItem(section)
    }
  }


  init() {
    const about = new Text(" About me ", this.menuFontConfig.item)
    about.position.set(0, 0)
    about.interactive = true
    about.buttonMode = true
    about.on("pointerover", onHover(about, "<About me>"))
    about.on("pointerout", onHover(about, " About me "))
    about.on("pointerdown", this.handleSelect(Sections.ABOUT))


    const experience = new Text(" Experience ", this.menuFontConfig.item)
    experience.position.set(0, 30)
    experience.interactive = true
    experience.buttonMode = true
    experience.on('pointerover', onHover(experience, '<Experience>'))
    experience.on('pointerout', onHover(experience, ' Experience '))
    experience.on("pointerdown", this.handleSelect(Sections.EXPERIENCE))

    const projects = new Text(" Projects ", this.menuFontConfig.item)
    projects.position.set(0, 60)
    projects.interactive = true
    projects.buttonMode = true
    projects.on('pointerover', onHover(projects, '<Projects>'))
    projects.on('pointerout', onHover(projects, ' Projects '))
    projects.on('pointerdown', this.handleSelect(Sections.PROJECTS))

    const hobbies = new Text(" Hobbies ", this.menuFontConfig.item)
    hobbies.position.set(0, 90)
    hobbies.interactive = true
    hobbies.buttonMode = true
    hobbies.on('pointerover', onHover(hobbies, '<Hobbies>'))
    hobbies.on('pointerout', onHover(hobbies, ' Hobbies '))
    hobbies.on('pointerdown', this.handleSelect(Sections.HOBBIES))

    this.addChild(experience)
    this.addChild(about)
    this.addChild(projects)
    this.addChild(hobbies)
  }

}
