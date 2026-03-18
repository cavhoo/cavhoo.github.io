import { Container } from "pixi.js";

/**
 * Base class for any sprite based character
 */
export class Character extends Container {
  protected moveSpeed = 180;
  protected targetX: number | null = null;
  protected targetY: number | null = null;

  moveTo(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  update(deltaMS: number) {
    if (this.targetX === null || this.targetY === null) {
      return;
    }

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance <= 0.5) {
      this.position.set(this.targetX, this.targetY);
      this.targetX = null;
      this.targetY = null;
      return;
    }

    const maxStep = this.moveSpeed * (deltaMS / 1000);
    const t = Math.min(1, maxStep / distance);
    this.position.set(this.x + dx * t, this.y + dy * t);
  }
}
