import { AnimatedSprite, Assets, Container, Filter, GlProgram, GpuProgram, Graphics, UniformGroup } from "pixi.js";
import type { FederatedPointerEvent, Texture } from "pixi.js";
import { SceneGraph } from "../utilities/sceneGraph";
import { showOverlay, hideOverlay } from "../utilities/overlay";
import { showModal, isModalVisible } from "../utilities/modal";
import type { BaseInterior } from "./interiors/baseInterior";
import { gsap } from "gsap";
import { UserCharacter } from "../characters/user";
import { TILE_SIZE, WORLD_HEIGHT, WORLD_WIDTH } from "../types/constants";
import type { MapComponent } from "../types/map";
import type { ModalEntry } from "../utilities/modal";

const FIRE_LIGHT_PADDING = 96;

const FIRE_LIGHT_VERTEX_SHADER = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void)
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void)
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

const FIRE_LIGHT_FRAGMENT_SHADER = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform highp vec4 uInputSize;
uniform highp vec4 uOutputFrame;
uniform vec4 uLightConfig;
uniform vec4 uLightColor;

void main(void)
{
    vec4 color = texture(uTexture, vTextureCoord);
    vec2 filterCoord = vTextureCoord * uInputSize.xy / uOutputFrame.zw;
    vec2 pixelCoord = filterCoord * uOutputFrame.zw;
    vec2 lightCenter = uLightConfig.xy * uOutputFrame.zw;
    float falloff = 1.0 - smoothstep(0.0, uLightConfig.z, distance(pixelCoord, lightCenter));
    float strength = falloff * falloff * uLightConfig.w;
    float glowAlpha = strength * uLightColor.a;
    vec3 glow = uLightColor.rgb * glowAlpha;
    vec3 warmedSource = color.rgb + uLightColor.rgb * strength * color.a * 0.3;

    finalColor = vec4(warmedSource + glow * (1.0 - color.a), max(color.a, glowAlpha));
}
`;

const FIRE_LIGHT_WGSL_SHADER = `
struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

struct FireLightUniforms {
  uLightConfig: vec4<f32>,
  uLightColor: vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> fireLightUniforms: FireLightUniforms;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
  var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

  position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

  return vec4<f32>(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(@location(0) aPosition: vec2<f32>) -> VSOutput
{
  return VSOutput(filterVertexPosition(aPosition), filterTextureCoord(aPosition));
}

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32>
{
  var color = textureSample(uTexture, uSampler, uv);
  let filterCoord = uv * gfu.uInputSize.xy / gfu.uOutputFrame.zw;
  let pixelCoord = filterCoord * gfu.uOutputFrame.zw;
  let lightCenter = fireLightUniforms.uLightConfig.xy * gfu.uOutputFrame.zw;
  let falloff = 1.0 - smoothstep(0.0, fireLightUniforms.uLightConfig.z, distance(pixelCoord, lightCenter));
  let strength = falloff * falloff * fireLightUniforms.uLightConfig.w;
  let glowAlpha = strength * fireLightUniforms.uLightColor.a;
  let glow = fireLightUniforms.uLightColor.rgb * glowAlpha;
  let warmedSource = color.rgb + fireLightUniforms.uLightColor.rgb * strength * color.a * 0.3;

  return vec4<f32>(warmedSource + glow * (1.0 - color.a), max(color.a, glowAlpha));
}
`;

const createFireLightFilter = (): Filter => {
  return new Filter({
    glProgram: GlProgram.from({
      vertex: FIRE_LIGHT_VERTEX_SHADER,
      fragment: FIRE_LIGHT_FRAGMENT_SHADER,
      name: "fire-light-filter",
    }),
    gpuProgram: GpuProgram.from({
      vertex: {
        source: FIRE_LIGHT_WGSL_SHADER,
        entryPoint: "mainVertex",
      },
      fragment: {
        source: FIRE_LIGHT_WGSL_SHADER,
        entryPoint: "mainFragment",
      },
      name: "fire-light-filter",
    }),
    resources: {
      fireLightUniforms: new UniformGroup({
        uLightConfig: { value: new Float32Array([0.5, 0.56, 96, 0.9]), type: "vec4<f32>" },
        uLightColor: { value: new Float32Array([1, 0.42, 0.12, 0.58]), type: "vec4<f32>" },
      }),
    },
    padding: FIRE_LIGHT_PADDING,
    resolution: "inherit",
    blendMode: "screen",
  });
};

const homeEntries: ModalEntry[] = [
  {
    title: "Hendrik (Excyl)",
    subtitle: "Senior Software Engineer / Game Engine Developer",
    description:
      "Senior Software Engineer specialized in casino game development and high-performance web applications. Expert in building game engines with Pixi.js, WebGL, and TypeScript. Experience spans from mobile slot games to SaaS platforms, always focused on cutting-edge technology and user experience.",
  },
];

const occupationalHistoryEntries: ModalEntry[] = [
  {
    title: "Senior Software Engineer",
    subtitle: "GAMOMAT Development GmbH",
    meta: "4 years 5 months",
    description:
      "Developed in-house game engines for next-generation slot games using Pixi.js, WebGL, TypeScript, and Webpack. Specialized in high-performance casino gaming solutions with advanced graphics and shader programming.",
  },
  {
    title: "Frontend Engineer",
    subtitle: "Fitogram",
    meta: "2 years 6 months",
    description:
      "Built and maintained SaaS solutions for studio management with online booking and accounting systems. Led architectural upgrades using ReactJS and TypeScript with mobile-first, UX-focused approach.",
  },
  {
    title: "Client Developer",
    subtitle: "QuickSpin",
    meta: "1 year 8 months",
    description:
      "Created interactive side games within slot games including achievement systems and tournaments. Developed on-demand loaded modules using WebGL/Pixi.js with API communication frameworks.",
  },
  {
    title: "Front End Developer",
    subtitle: "adp Gauselmann",
    meta: "4 years 3 months",
    description:
      "Delivered high-performance mobile slot games for browsers using JavaScript, CSS3, and custom game engine frameworks. Specialized in WebGL-based gaming solutions and mobile optimization.",
  },
];

const DEFAULT_ENTRY_RADIUS = TILE_SIZE * 0.6;

export class World extends Container {
  protected groundTileTexture: Texture;
  protected interiorContainer: Container | null = null;
  protected isTransitioning = false;
  protected fadeOverlay: Graphics;
  protected nightOverlay: Graphics;
  protected _userCharacter: UserCharacter | null = null;
  private readonly components: MapComponent[];
  private activeEntryKey: string | null = null;

  public get isInteriorActive(): boolean {
    return this.interiorContainer !== null || this.isTransitioning || (this.userCharacter?.isMoving ?? false);
  }

  public get isSceneOverlayActive(): boolean {
    return this.interiorContainer !== null || this.isTransitioning;
  }

  constructor() {
    super();
    const { container } = Assets.get("town");
    this.addChild(container);

    const campfire = SceneGraph.GetComponent("Campfire", this);
    const animation = Assets.get("campfire");
    const fire = new AnimatedSprite(animation.animations["fire"], true);
    fire.position.set(45 * 32, 42 * 32);
    fire.animationSpeed = 0.07;
    fire.filters = [createFireLightFilter()];
    fire.play();
    campfire.addChild(fire);

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

    this.components = [
      {
        name: ["Library", "LibraryAbove"],
        title: "The Library",
        content: "Occupational history from my work archive.",
        modalContent: occupationalHistoryEntries,
        target: { x: 144, y: 688 },
      },
      {
        name: ["House", "HouseAbove"],
        title: "Home",
        content: "About me and the things I build.",
        modalContent: homeEntries,
        target: { x: 656, y: 496 },
      },
      {
        name: ["Architecture", "ArchitectureAbove"],
        title: "Architecture",
        content: "Creating designs that last, scale and are robust. Always having the big picture in front of me.",
      },
      {
        name: "SkillsForest",
        title: "Skilltrees",
        content: "Each tree represents a skill I have acquired, or I am acquiring right now. The larger a tree has grown the stronger and tested the knowledge.",
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

    this.components.forEach((comp) => {
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

            if (comp.modalContent) {
              hideOverlay();
              if (comp.target && this._userCharacter) {
                this.isTransitioning = true;
                try {
                  await this._userCharacter.moveTo(comp.target.x, comp.target.y);
                } finally {
                  this.isTransitioning = false;
                }
              }
              if (!comp.target || this.isCharacterAtEntry(comp)) {
                this.showComponentModal(comp);
              }
              this.updateActiveEntry(comp);
              return;
            } else if (comp.hasInterior && comp.interiorClass) {
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

  public updateEntryInteractions(): void {
    if (this.isTransitioning || this.interiorContainer || isModalVisible()) return;

    const entryComponent = this.components.find((comp) => comp.modalContent && comp.target && this.isCharacterAtEntry(comp));

    if (!entryComponent) {
      this.activeEntryKey = null;
      return;
    }

    if (this.activeEntryKey === this.getComponentKey(entryComponent)) return;

    this.showComponentModal(entryComponent);
  }

  private showComponentModal(comp: MapComponent): void {
    if (!comp.modalContent) return;

    showModal(comp.title, comp.modalContent);
    hideOverlay();
    this.activeEntryKey = this.getComponentKey(comp);
  }

  private updateActiveEntry(comp: MapComponent): void {
    this.activeEntryKey = comp.target && this.isCharacterAtEntry(comp) ? this.getComponentKey(comp) : null;
  }

  private isCharacterAtEntry(comp: MapComponent): boolean {
    if (!this._userCharacter || !comp.target) return false;

    const radius = comp.entryRadius ?? DEFAULT_ENTRY_RADIUS;
    const distance = Math.hypot(this._userCharacter.x - comp.target.x, this._userCharacter.y - comp.target.y);

    return distance <= radius;
  }

  private getComponentKey(comp: MapComponent): string {
    return Array.isArray(comp.name) ? comp.name.join("|") : comp.name;
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
