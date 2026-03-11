import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import { HEIGHT, WIDTH } from "../types/constants";

export class Skybox extends Container {
  protected DAY_LENGTH: number = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  protected daylightColor: number = 0x87ceeb; // Default daylight color (sky blue)
  protected nightColor: number = 0x0b0c1a; // Default night color (dark blue)

  protected background: Graphics;
  protected sunSprite: Sprite;
  constructor() {
    super();
    Ticker.shared.add((ticker) => this.tick(ticker.elapsedMS));
    this.background = new Graphics();
    this.background.rect(0, 0, WIDTH, HEIGHT).fill(this.daylightColor);
    this.sunSprite = Sprite.from("sun.png");
    this.addChild(this.background, this.sunSprite);
  }

  protected dayTicks: number = 0;
  protected hours: number = 0;
  protected tick(_delta: number): void {
    this.dayTicks += _delta * 10000; // Speed up time for demonstration purposes
    if (this.dayTicks >= this.DAY_LENGTH) {
      this.dayTicks = 0;
    }
    const t = (Math.cos((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI) + 1) / 2; // Normalize hours to [0, 1];

    this.sunSprite.position.set(
      WIDTH / 2 + (WIDTH / 2) * Math.cos((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI + Math.PI / 2) - this.sunSprite.width / 2,
      HEIGHT / 2 + (HEIGHT / 2 + 100) * Math.sin((this.dayTicks / this.DAY_LENGTH) * 2 * Math.PI + Math.PI / 2) - this.sunSprite.height / 2 + 200
    );

    // Interpolate between daylightColor and nightColor based on time of day
    // Simple linear interpolation
    // Daylight color components
    const r1 = (this.daylightColor >> 16) & 0xff;
    const g1 = (this.daylightColor >> 8) & 0xff;
    const b1 = this.daylightColor & 0xff;

    // Night color components
    const r2 = (this.nightColor >> 16) & 0xff;
    const g2 = (this.nightColor >> 8) & 0xff;
    const b2 = this.nightColor & 0xff;

    // Calculate interpolated color components
    const r = Math.round(r1 * (1 - t) + r2 * t);
    const g = Math.round(g1 * (1 - t) + g2 * t);
    const b = Math.round(b1 * (1 - t) + b2 * t);

    this.background.clear();
    this.background.rect(0, 0, WIDTH, HEIGHT).fill(`rgb(${r}, ${g}, ${b})`);
  }
}
