import { Assets, Container, Texture, FederatedPointerEvent, Graphics } from "pixi.js";
import { SceneGraph } from "../utilities/sceneGraph";
import { showOverlay, hideOverlay } from "../utilities/overlay";
import { showModal } from "../utilities/modal";
import { LibraryInterior } from "./interiors/libraryInterior";
import { BaseInterior } from "./interiors/baseInterior";
import { gsap } from "gsap";
import { HomeInterior } from "./interiors/homeInterior";
import { UserCharacter } from "../characters/user";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../types/constants";
import { MapComponent } from "../types/map";

export class World extends Container {
  protected groundTileTexture: Texture;
  protected interiorContainer: Container | null = null;
  protected isTransitioning = false;
  protected fadeOverlay: Graphics;
  protected nightOverlay: Graphics;
  protected _userCharacter: UserCharacter | null = null;

  public get isInteriorActive(): boolean {
    return this.interiorContainer !== null || this.isTransitioning || (this.userCharacter?.isMoving ?? false);
  }

  constructor() {
    super();
    const { container } = Assets.get("town");
    this.addChild(container);

    // Create night overlay
    this.nightOverlay = new Graphics();
    this.nightOverlay.rect(0, 0, WORLD_WIDTH, WORLD_HEIGHT).fill({ color: 0x1a1a4a, alpha: 1 });
    this.nightOverlay.blendMode = "multiply";
    this.nightOverlay.alpha = 0;
    this.nightOverlay.eventMode = "none";
    this.addChild(this.nightOverlay);

    // Create fade overlay for transitions
    this.fadeOverlay = new Graphics();
    this.fadeOverlay.rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    this.fadeOverlay.alpha = 0;
    this.fadeOverlay.visible = false;
    this.fadeOverlay.eventMode = "none";
    // We'll add it to the stage later or keep it here and ensure it's on top
    this.addChild(this.fadeOverlay);

    const components: MapComponent[] = [
      {
        name: ["Library", "LibraryAbove"],
        title: "The Library",
        content: "A quiet place filled with ancient knowledge and digital archives.",
        hasInterior: true,
        interiorClass: LibraryInterior,
        target: { x: 166, y: 666 },
      },
      {
        name: ["House", "HouseAbove"],
        title: "The Workshop",
        content: "Sparks fly as new ideas are forged here. This is where most of the projects were born.",
        hasInterior: true,
        interiorClass: HomeInterior,
        target: { x: 656, y: 542 },
      },
      {
        name: ["Architecture", "ArchitectureAbove"],
        title: "Architecture",
        content: "Creating designs that last, scale and are robust. Always having the big picture in front of me.",
      },
      { name: "Rust", title: "Rust", content: "Learning Rust has been an incredible journey. There is one test project that you can view in the library." },
      { name: "C++", title: "C++", content: "This is where my initial journey as a developer started, and I still love the language to this day." },
      {
        name: ["Typescript", "TypescriptAbove"],
        title: "TypeScript",
        content: "My main language for the past decade of creating casino games, it's versatile, it's typed and my TypeFu is pretty good.",
      },
      {
        name: ["Pipelines", "PipelinesAbove"],
        title: "CI/CD Pipelines",
        content:
          "Since my career start I have also been maintaining and managing anything that comes in the shape of CI/CD. Be it managing a Jenkins instance, automating whole test systems that are spawned on the fly, nothing that i won't learn to make my CI/CD experience better.",
      },
    ];

    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    components.forEach((comp) => {
      const el = SceneGraph.GetComponents(comp.name, this);
      if (el.length > 0) {
        el.forEach((el) => {
          el.eventMode = "dynamic";
          el.cursor = "pointer";

          const onHover = (event: FederatedPointerEvent) => {
            if (this.isTransitioning || this.interiorContainer) return;
            if (isTouchDevice()) return;
            showOverlay(comp.title, comp.content, { x: event.client.x, y: event.client.y });
          };

          const onClick = async () => {
            if (this.isTransitioning) return;

            if (comp.hasInterior && comp.interiorClass) {
              this.isTransitioning = true;
              hideOverlay();
              if (this.userCharacter && comp.target) {
                const target = comp.target;
                await this.userCharacter.moveTo(target.x, target.y);
              }
              this.enterInterior(comp.interiorClass);
            } else {
              showModal(comp.title, comp.content);
              hideOverlay();
            }
          };

          el.on("pointerover", onHover);
          el.on("pointermove", onHover);
          el.on("pointerout", hideOverlay);
          el.on("pointertap", onClick);
          el.on("mousedown", onClick);
        });
      }
    });

    window.addEventListener("resize", () => {
      this.fadeOverlay.clear().rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    });
  }

  public get userCharacter(): UserCharacter {
    return this._userCharacter;
  }

  public set userCharacter(character: UserCharacter) {
    this._userCharacter = character;
    const characterLayer = SceneGraph.GetComponent("Character", this);
    if (characterLayer) {
      characterLayer.addChild(this._userCharacter);
    }
  }

  public updateTime(hour: number, theme: "auto" | "light" | "dark") {
    let targetAlpha = 0;

    if (theme === "dark") {
      targetAlpha = 0.6;
    } else if (theme === "light") {
      targetAlpha = 0;
    } else {
      // Auto cycle
      // 0:00 - 6:00: Dark (0.6)
      // 6:00 - 8:00: Fading out (0.6 -> 0)
      // 8:00 - 18:00: Day (0)
      // 18:00 - 21:00: Fading in (0 -> 0.6)
      // 21:00 - 24:00: Dark (0.6)
      if (hour < 6 || hour >= 21) {
        targetAlpha = 0.6;
      } else if (hour >= 6 && hour < 8) {
        targetAlpha = 0.6 * (1 - (hour - 6) / 2);
      } else if (hour >= 18 && hour < 21) {
        targetAlpha = 0.6 * ((hour - 18) / 3);
      } else {
        targetAlpha = 0;
      }
    }

    gsap.to(this.nightOverlay, { alpha: targetAlpha, duration: 2 });
  }

  protected async enterInterior(InteriorClass: new () => BaseInterior) {
    this.isTransitioning = true;
    hideOverlay();

    // Fade to black
    this.fadeOverlay.visible = true;
    this.fadeOverlay.alpha = 0;
    this.addChild(this.fadeOverlay); // Ensure it's on top of world

    await gsap.to(this.fadeOverlay, { alpha: 1, duration: 0.5 });

    // Pause camera and reset world transform so interior fits screen
    if (globalThis.__CAMERA__) {
      globalThis.__CAMERA__.paused = true;
    }
    this.scale.set(1);
    this.position.set(0, 0);

    // Hide world content (except interior, nightOverlay and overlay)
    this.children.forEach((child) => {
      if (child !== this.fadeOverlay && child !== this.nightOverlay) child.visible = false;
    });

    // Create and add interior
    const interior = new InteriorClass();
    this.interiorContainer = interior;
    this.addChildAt(interior, 0);

    interior.onExit = () => this.exitInterior();

    // Fade in interior
    await gsap.to(this.fadeOverlay, { alpha: 0, duration: 0.5 });
    this.fadeOverlay.visible = false;
    this.isTransitioning = false;
  }

  protected async exitInterior() {
    if (!this.interiorContainer || this.isTransitioning) return;
    this.isTransitioning = true;

    // Fade to black
    this.fadeOverlay.visible = true;
    await gsap.to(this.fadeOverlay, { alpha: 1, duration: 0.5 });

    // Remove interior
    if (this.interiorContainer) {
      this.removeChild(this.interiorContainer);
      this.interiorContainer.destroy({ children: true });
      this.interiorContainer = null;
    }

    // Unpause camera
    if (globalThis.__CAMERA__) {
      globalThis.__CAMERA__.paused = false;
    }

    // Show world content
    this.children.forEach((child) => {
      if (child !== this.fadeOverlay && child !== this.nightOverlay) child.visible = true;
    });

    // Fade back to world
    await gsap.to(this.fadeOverlay, { alpha: 0, duration: 0.5 });
    this.fadeOverlay.visible = false;
    this.isTransitioning = false;
  }
}
