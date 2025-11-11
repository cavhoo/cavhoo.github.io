import { Container, Graphics } from "pixi.js";
import { gsap } from "gsap";
import { SceneNames } from "../../sceneSetup";
import { Menu } from "./components/menu";
import { MenuItem } from "./components/menuItem";

export class Sidebar extends Container {
  protected menu: Menu;
  protected _onMenuitemClick: (name: string) => void;

  constructor() {
    super();

    const background = new Container();

    const backgroundGraphics = new Graphics();
    background.addChild(backgroundGraphics);

    this.addChild(background);

    this.menu = new Menu();

    this.menu.addItem(new MenuItem("Home", () => this._onMenuitemClick(SceneNames.TownSquare)));
    this.menu.addItem(new MenuItem("Projects", () => this._onMenuitemClick(SceneNames.WorkshopDistrict)));
    this.menu.addItem(new MenuItem("Experience", () => this._onMenuitemClick(SceneNames.ResidentialArea)));
    this.menu.position.set(10, 5);
    this.addChild(this.menu);

    backgroundGraphics.roundRect(-20, 0, this.width + 80, this.height + 20, 15).fill({ color: "rgba(255,255,255, 0.5)" });
  }

  public show(): void {
    gsap.to(this.position, { x: 0, duration: 0.3, ease: "power2.out" });
  }

  public hide(): void {
    gsap.to(this.position, { x: -this.width, duration: 0.3, ease: "power2.in" });
  }

  public set onMenuItemClick(fn: (name: string) => void) {
    this._onMenuitemClick = fn;
  }
}
