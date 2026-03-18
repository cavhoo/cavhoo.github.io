import { Assets, Container, Texture, FederatedPointerEvent, Graphics } from "pixi.js";
import { SceneGraph } from "../utilities/sceneGraph";
import { showOverlay, hideOverlay } from "../utilities/overlay";
import { showModal } from "../utilities/modal";
import { LibraryInterior } from "./interiors/libraryInterior";
import { BaseInterior } from "./interiors/baseInterior";
import { gsap } from "gsap";
import { HomeInterior } from "./interiors/homeInterior";

export class World extends Container {
  protected groundTileTexture: Texture;
  protected interiorContainer: Container | null = null;
  protected isTransitioning = false;
  protected fadeOverlay: Graphics;

  constructor() {
    super();
    const { container } = Assets.get("town");
    this.addChild(container);

    // Create fade overlay for transitions
    this.fadeOverlay = new Graphics();
    this.fadeOverlay.rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    this.fadeOverlay.alpha = 0;
    this.fadeOverlay.visible = false;
    // We'll add it to the stage later or keep it here and ensure it's on top
    this.addChild(this.fadeOverlay);

    const components = [
      {
        name: "Library",
        title: "The Library",
        content: "A quiet place filled with ancient knowledge and digital archives.",
        hasInterior: true,
        interiorClass: LibraryInterior,
      },
      {
        name: "House",
        title: "The Workshop",
        content: "Sparks fly as new ideas are forged here. This is where most of the projects were born.",
        hasInterior: true,
        interiorClass: HomeInterior,
      },
      { name: "Architecture", title: "Architecture", content: "Designing systems that are robust, scalable, and elegant." },
      { name: "Rust", title: "Rust", content: "Memory safety without a garbage collector. Fast and reliable." },
      { name: "C++", title: "C++", content: "The powerhouse of game development and high-performance systems." },
      { name: "Typescript", title: "TypeScript", content: "Type safety for the modern web. My primary language of choice." },
      { name: "Pipelines", title: "CI/CD Pipelines", content: "Automating the path from code to production." },
    ];

    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    components.forEach((comp) => {
      const el = SceneGraph.GetComponent(comp.name, this);
      if (el) {
        el.eventMode = "static";
        el.cursor = "pointer";

        const onHover = (event: FederatedPointerEvent) => {
          if (this.isTransitioning || this.interiorContainer) return;
          if (isTouchDevice()) return;
          showOverlay(comp.title, comp.content, { x: event.client.x, y: event.client.y });
        };

        const onClick = () => {
          if (this.isTransitioning) return;

          if (comp.hasInterior && comp.interiorClass) {
            this.enterInterior(comp.interiorClass);
          } else {
            showModal(comp.title, comp.content);
          }
          hideOverlay();
        };

        el.on("pointerover", onHover);
        el.on("pointermove", onHover);
        el.on("pointerout", hideOverlay);
        el.on("pointertap", onClick);
      }
    });

    window.addEventListener("resize", () => {
      this.fadeOverlay.clear().rect(0, 0, window.innerWidth, window.innerHeight).fill("black");
    });
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

    // Hide world content (except interior and overlay)
    this.children.forEach((child) => {
      if (child !== this.fadeOverlay) child.visible = false;
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
      if (child !== this.fadeOverlay) child.visible = true;
    });

    // Fade back to world
    await gsap.to(this.fadeOverlay, { alpha: 0, duration: 0.5 });
    this.fadeOverlay.visible = false;
    this.isTransitioning = false;
  }
}
