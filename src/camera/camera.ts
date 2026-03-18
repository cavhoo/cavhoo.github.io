import { Application, Container } from "pixi.js";

export class Camera {
  protected container: Container;
  protected app: Application;

  protected x = 0;
  protected y = 0;
  protected targetX = 0;
  protected targetY = 0;

  protected zoom = 1;
  protected targetZoom = 1;
  protected baseScale = 1;
  protected zoomLevels: number[] = [];
  protected zoomLevelIndex = 1; // Start at default (index 1)

  protected worldWidth: number;
  protected worldHeight: number;

  protected shake = 0;
  protected pointerX = 0;
  protected pointerY = 0;
  protected pointerInside = false;
  protected edgeScrollEnabled = true;
  protected edgeMargin = 48;
  protected edgeSpeed = 500;

  public paused = false;

  constructor(app: Application, container: Container, worldWidth: number, worldHeight: number, baseScale: number) {
    this.app = app;
    this.container = container;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.setBaseScale(baseScale);
    this.zoom = this.zoomLevels[this.zoomLevelIndex];
    this.targetZoom = this.zoom;
  }

  public setBaseScale(baseScale: number) {
    this.baseScale = baseScale;
    // Level 0: Fully zoomed out (baseScale)
    // Level 1: Default/Medium (baseScale * 1.5)
    // Level 2: Zoomed in (baseScale * 2.5)
    this.zoomLevels = [baseScale, baseScale * 1.5, baseScale * 2.5];
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  public zoomIn() {
    this.zoomLevelIndex = Math.min(this.zoomLevelIndex + 1, this.zoomLevels.length - 1);
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  public zoomOut() {
    this.zoomLevelIndex = Math.max(this.zoomLevelIndex - 1, 0);
    this.targetZoom = this.zoomLevels[this.zoomLevelIndex];
  }

  currentLocation(): [number, number] {
    return [this.targetX, this.targetY];
  }

  follow(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  setZoom(z: number) {
    this.targetZoom = z;
  }

  shakeCamera(amount = 8) {
    this.shake = amount;
  }

  setPointerPosition(x: number, y: number) {
    this.pointerX = x;
    this.pointerY = y;
  }

  setPointerInside(inside: boolean) {
    this.pointerInside = inside;
  }

  setEdgeScrollEnabled(enabled: boolean) {
    this.edgeScrollEnabled = enabled;
  }

  update(deltaMS: number) {
    const { width: screenW, height: screenH } = this.app.screen;
    const deltaSeconds = deltaMS / 1000;

    if (this.edgeScrollEnabled && this.pointerInside) {
      let dirX = 0;
      let dirY = 0;

      if (this.pointerX < this.edgeMargin) {
        dirX = -(1 - this.pointerX / this.edgeMargin);
      } else if (this.pointerX > screenW - this.edgeMargin) {
        dirX = (this.pointerX - (screenW - this.edgeMargin)) / this.edgeMargin;
      }

      if (this.pointerY < this.edgeMargin) {
        dirY = -(1 - this.pointerY / this.edgeMargin);
      } else if (this.pointerY > screenH - this.edgeMargin) {
        dirY = (this.pointerY - (screenH - this.edgeMargin)) / this.edgeMargin;
      }

      this.targetX += dirX * this.edgeSpeed * deltaSeconds;
      this.targetY += dirY * this.edgeSpeed * deltaSeconds;
    }

    // Smooth zoom
    this.zoom += (this.targetZoom - this.zoom) * 0.1;

    // Smooth follow
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    // Compute half-screen in world coordinates
    const halfW = screenW / 2 / this.zoom;
    const halfH = screenH / 2 / this.zoom;
    this.targetX = Math.max(halfW, Math.min(this.worldWidth - halfW, this.targetX));
    this.targetY = Math.max(halfH, Math.min(this.worldHeight - halfH, this.targetY));

    // Clamp camera inside world bounds
    this.x = Math.max(halfW, Math.min(this.worldWidth - halfW, this.x));
    this.y = Math.max(halfH, Math.min(this.worldHeight - halfH, this.y));

    // Optional shake
    let shakeX = 0;
    let shakeY = 0;
    if (this.shake > 0.01) {
      shakeX = (Math.random() - 0.5) * this.shake;
      shakeY = (Math.random() - 0.5) * this.shake;
      this.shake *= 0.9;
    } else {
      this.shake = 0;
    }

    const camX = Math.round(-this.x * this.zoom + screenW / 2 + shakeX);
    const camY = Math.round(-this.y * this.zoom + screenH / 2 + shakeY);

    if (!this.paused) {
      this.container.scale.set(this.zoom);
      this.container.position.set(camX, camY);
    }
  }
}
