import { Container, AnimatedSprite, Graphics, RAD_TO_DEG, DEG_TO_RAD } from "pixi.js";
import { Direction } from "../types/common";
import { TILE_SIZE } from "../types/constants";
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
      this.currentAnimation.animationSpeed = this.currentState.toLowerCase().includes("idle") ? 0.09 : 0.13;
      this.currentAnimation.play();
    }
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
