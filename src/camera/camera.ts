import { Application, Container } from "pixi.js";

export class Camera {
  container: Container;
  app: Application;

  x = 0;
  y = 0;
  targetX = 0;
  targetY = 0;

  zoom = 1;
  targetZoom = 1;

  worldWidth: number;
  worldHeight: number;

  shake = 0;

  constructor(app: Application, container: Container, worldWidth: number, worldHeight: number, baseScale: number) {
    this.app = app;
    this.container = container;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.zoom = baseScale;
    this.targetZoom = baseScale;
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

  update() {
    const { width: screenW, height: screenH } = this.app.screen;

    // Smooth zoom
    this.zoom += (this.targetZoom - this.zoom) * 0.1;

    // Smooth follow
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    // Compute half-screen in world coordinates
    const halfW = screenW / 2 / this.zoom;
    const halfH = screenH / 2 / this.zoom;

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

    // Pixel-perfect positioning
    const camX = Math.round(-this.x * this.zoom + screenW / 2 + shakeX);
    const camY = Math.round(-this.y * this.zoom + screenH / 2 + shakeY);

    this.container.scale.set(this.zoom);
    this.container.position.set(camX, camY);
  }
}
