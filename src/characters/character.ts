import { Container, AnimatedSprite, Graphics, RAD_TO_DEG, DEG_TO_RAD, Text } from "pixi.js";
import { Direction } from "../types/common";
import { FONT, TILE_SIZE } from "../types/constants";
import { isBetween } from "../utilities/math";

/**
 * Base class for any sprite based character
 */
export class Character extends Container {
  protected moveSpeed = 180;
  protected path: { x: number; y: number }[] = [];
  protected moveResolve: (() => void) | null = null;

  private animations: Map<string, AnimatedSprite>;
  private currentState: Direction = Direction.SouthIdle;
  private currentAnimation: AnimatedSprite | null = null;
  private fallbackGraphics: Graphics | null = null;
  private speechBubble: Container;
  private speechBubbleBox: Graphics;
  private speechBubbleTail: Graphics;
  private speechBubbleText: Text;
  private speechBubbleTimerMs = 0;

  constructor(animations: Map<string, AnimatedSprite>) {
    super();
    this.animations = animations;

    this.pivot.set(TILE_SIZE / 2, TILE_SIZE);
    if (this.animations.size === 0) {
      this.fallbackGraphics = new Graphics();
      this.fallbackGraphics.rect(0, 0, TILE_SIZE, TILE_SIZE);
      this.fallbackGraphics.fill({ color: 0x2f6bff, alpha: 0.8 });
      this.addChild(this.fallbackGraphics);
    }

    this.speechBubble = new Container();
    this.speechBubble.visible = false;
    this.speechBubble.eventMode = "none";

    this.speechBubbleBox = new Graphics();
    this.speechBubbleTail = new Graphics();
    this.speechBubbleText = new Text({
      text: "",
      resolution: typeof window !== "undefined" ? Math.max(1, Math.ceil(window.devicePixelRatio || 1)) : 1,
      roundPixels: true,
      textureStyle: {
        scaleMode: "nearest",
      },
      style: {
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: "700",
        fill: "black",
        align: "center",
        wordWrap: true,
        wordWrapWidth: 180,
        lineHeight: 18,
      },
    });

    this.speechBubble.addChild(this.speechBubbleBox, this.speechBubbleTail, this.speechBubbleText);
    this.addChild(this.speechBubble);

    // Set initial idle animation
    this.updateAnimation(Direction.SouthIdle);
  }

  public get isMoving(): boolean {
    return this.path.length > 0;
  }

  public get state(): Direction {
    return this.currentState;
  }

  protected updateAnimation(state: Direction) {
    if (this.currentState === state && this.currentAnimation) {
      return;
    }
    if (this.currentAnimation) {
      this.currentAnimation.stop();
      this.removeChild(this.currentAnimation);
    }

    this.currentState = state;
    this.currentAnimation = this.animations.get(state) || this.animations.get(Direction.SouthIdle) || null;

    if (this.currentAnimation) {
      if (this.fallbackGraphics) {
        this.removeChild(this.fallbackGraphics);
        this.fallbackGraphics = null;
      }
      this.addChild(this.currentAnimation);
      this.addChild(this.speechBubble);
      this.currentAnimation.animationSpeed = this.currentState.toLowerCase().includes("idle") ? 0.09 : 0.13;
      this.currentAnimation.play();
    }
  }

  protected showSpeechBubble(text: string, durationMs: number = 3000) {
    const paddingX = 12;
    const paddingY = 10;
    const tailHeight = 10;
    const minBubbleWidth = 92;

    this.speechBubbleText.text = text;

    const textWidth = Math.ceil(this.speechBubbleText.width);
    const textHeight = Math.ceil(this.speechBubbleText.height);
    const bubbleWidth = Math.max(minBubbleWidth, textWidth + paddingX * 2);
    const bubbleHeight = textHeight + paddingY * 2;
    const tailCenter = bubbleWidth / 2;

    this.speechBubbleText.position.set((bubbleWidth - textWidth) / 2, paddingY);

    this.speechBubbleBox
      .clear()
      .roundRect(0, 0, bubbleWidth, bubbleHeight, 10)
      .fill("white")
      .stroke({ width: 3, color: "black" });

    this.speechBubbleTail
      .clear()
      .poly([tailCenter - 12, bubbleHeight, tailCenter + 12, bubbleHeight, tailCenter, bubbleHeight + tailHeight], true)
      .fill("white")
      .stroke({ width: 3, color: "black" });

    this.speechBubble.pivot.set(bubbleWidth / 2, bubbleHeight + tailHeight);
    this.speechBubble.position.set(TILE_SIZE / 2, -8);
    this.speechBubble.visible = true;
    this.speechBubbleTimerMs = durationMs;
    this.syncSpeechBubbleTransform();
    this.addChild(this.speechBubble);
  }

  protected hideSpeechBubble() {
    this.speechBubble.visible = false;
    this.speechBubbleTimerMs = 0;
  }

  protected updateSpeechBubble(deltaMs: number) {
    if (!this.speechBubble.visible) return;

    this.syncSpeechBubbleTransform();

    this.speechBubbleTimerMs -= deltaMs;
    if (this.speechBubbleTimerMs <= 0) {
      this.hideSpeechBubble();
    }
  }

  private syncSpeechBubbleTransform() {
    const worldScale = this.getAccumulatedScale();
    this.speechBubble.scale.set(1 / worldScale.x, 1 / worldScale.y);
    this.speechBubble.position.set(Math.round(TILE_SIZE / 2), -8);
  }

  private getAccumulatedScale() {
    let scaleX = 1;
    let scaleY = 1;
    let current: Container | null = this;

    while (current) {
      scaleX *= current.scale.x;
      scaleY *= current.scale.y;
      current = current.parent as Container | null;
    }

    return {
      x: Math.max(Math.abs(scaleX), 0.0001),
      y: Math.max(Math.abs(scaleY), 0.0001),
    };
  }

  setPath(path: { x: number; y: number }[]): Promise<void> {
    this.path = path;

    if (this.moveResolve) {
      this.moveResolve();
      this.moveResolve = null;
    }

    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.moveResolve = resolve;
    });
  }

  update(deltaMS: number) {
    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    const nextPoint = this.path[0];
    const dx = nextPoint.x - this.x;
    const dy = nextPoint.y - this.y;
    const distance = Math.hypot(dx, dy);
    const directionRaw = Math.atan2(dy, dx) * RAD_TO_DEG;
    const direction = directionRaw < 0 ? directionRaw + 360 : directionRaw;
    if (isBetween(direction, 225, 315)) {
      if (this.currentState !== Direction.North) {
        this.updateAnimation(Direction.North);
      }
    }

    if (isBetween(direction, 315, 360, true) || isBetween(direction, 0, 45, true)) {
      if (this.currentState !== Direction.East) {
        this.updateAnimation(Direction.East);
      }
    }

    if (isBetween(direction, 45, 135)) {
      if (this.currentState !== Direction.South) {
        this.updateAnimation(Direction.South);
      }
    }

    if (isBetween(direction, 135, 225, true)) {
      if (this.currentState !== Direction.West) {
        this.updateAnimation(Direction.West);
      }
    }

    if (distance <= 0.5) {
      this.position.set(nextPoint.x, nextPoint.y);
      this.path.shift();
      if (this.path.length === 0) {
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
        this.updateAnimation(Direction.SouthIdle);
      }
      return;
    }

    const maxStep = this.moveSpeed * (deltaMS / 1000);
    const t = Math.min(1, maxStep / distance);
    this.position.set(this.x + dx * t, this.y + dy * t);
  }
}
