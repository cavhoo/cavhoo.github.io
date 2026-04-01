import { AnimatedSprite } from "pixi.js";
import { Character } from "./character";
import { Direction } from "../types/common";
import { TILE_SIZE } from "../types/constants";
import { CollisionMap, Point } from "../utilities/collisionMap";

export class UserCharacter extends Character {
  private inputX = 0;
  private inputY = 0;

  protected mouseMovement: boolean;

  constructor(private readonly collisionMap: CollisionMap, animations: Map<string, AnimatedSprite>) {
    super(animations);
  }

  async moveTo(worldX: number, worldY: number): Promise<void> {
    this.mouseMovement = true;
    const safeTarget = this.collisionMap.clampToNearestWalkable(worldX, worldY);
    if (!safeTarget) {
      return this.setPath([]).then(() => {
        this.mouseMovement = false;
      });
    }

    return this.setPath([safeTarget]).then(() => {
      this.mouseMovement = false;
    });
  }

  public setInputDirection(x: number, y: number) {
    if (this.mouseMovement) {
      return;
    }
    this.inputX = x;
    this.inputY = y;

    if (x !== 0 || y !== 0) {
      this.path = [];
      if (this.moveResolve) {
        this.moveResolve();
        this.moveResolve = null;
      }
    } else {
      this.updateAnimation(Direction.SouthIdle);
    }
  }

  override update(deltaMS: number) {
    const lookAhead = TILE_SIZE * 0.4;

    if (this.inputX !== 0 || this.inputY !== 0) {
      const checkX = this.x + this.inputX * lookAhead;
      const checkY = this.y + this.inputY * lookAhead;

      if (!this.collisionMap.isWalkableWorld(checkX, checkY)) {
        this.updateAnimation(Direction.SouthIdle);
        return;
      }

      const maxStep = this.moveSpeed * (deltaMS / 1000);
      const target = {
        x: this.x + this.inputX * maxStep,
        y: this.y + this.inputY * maxStep,
      };

      if (this.collisionMap.isWalkableWorld(target.x, target.y)) {
        this.position.set(target.x, target.y);

        // Update direction based on input
        if (Math.abs(this.inputX) > Math.abs(this.inputY)) {
          this.updateAnimation(this.inputX > 0 ? Direction.East : Direction.West);
        } else {
          this.updateAnimation(this.inputY > 0 ? Direction.South : Direction.North);
        }
      } else {
        // Not walkable
        this.updateAnimation(Direction.SouthIdle);
        this.path.length = 0;
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
      }
      return;
    }

    if (this.path.length === 0) {
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    const target = this.path[0];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 0) {
      const checkX = this.x + (dx / distance) * lookAhead;
      const checkY = this.y + (dy / distance) * lookAhead;

      if (!this.collisionMap.isWalkableWorld(checkX, checkY)) {
        this.path = [];
        if (this.moveResolve) {
          this.moveResolve();
          this.moveResolve = null;
        }
        this.updateAnimation(Direction.SouthIdle);
        return;
      }
    }

    // Update direction based on movement
    if (Math.abs(dx) > Math.abs(dy)) {
      this.updateAnimation(dx > 0 ? Direction.East : Direction.West);
    } else {
      this.updateAnimation(dy > 0 ? Direction.South : Direction.North);
    }

    if (distance <= 2) {
      this.position.set(target.x, target.y);
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
    const nextPos: Point = this.collisionMap.nextStep({ x: this.x, y: this.y }, target, maxStep);

    if (nextPos.x === this.x && nextPos.y === this.y) {
      this.path = [];
      if (this.moveResolve) {
        this.moveResolve();
        this.moveResolve = null;
      }
      this.updateAnimation(Direction.SouthIdle);
      return;
    }

    this.position.set(nextPos.x, nextPos.y);
  }
}
