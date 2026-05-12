import { AnimatedSprite } from "pixi.js";
import { Character } from "./character";
import { Direction } from "../types/common";
import { TILE_SIZE } from "../types/constants";
import { CollisionMap, Point } from "../utilities/collisionMap";

export class UserCharacter extends Character {
  private static readonly IDLE_SPEECH_DELAY_MS = 30000;

  private inputX = 0;
  private inputY = 0;
  private idleSpeechElapsedMs = 0;
  private speechPaused = false;
  private lastIdlePhrase: string | null = null;
  private lastMovePhrase: string | null = null;

  protected mouseMovement: boolean;

  private readonly idlePhrases = [
    "Idle mode. Still compiling thoughts.",
    "No bugs spotted. Suspicious.",
    "Standing by. Pixels stable.",
    "Quiet moment. Good time to explore.",
    "All systems nominal. More or less.",
  ];

  private readonly movePhrases = [
    "On my way.",
    "Path locked in.",
    "Moving out.",
    "Marching toward click.",
    "Heading there now.",
  ];

  constructor(private readonly collisionMap: CollisionMap, animations: Map<string, AnimatedSprite>) {
    super(animations);
    this.pivot.set(TILE_SIZE / 2, 48);
  }

  async moveTo(worldX: number, worldY: number): Promise<void> {
    this.mouseMovement = true;
    this.inputX = 0;
    this.inputY = 0;
    this.idleSpeechElapsedMs = 0;
    const safeTarget = this.collisionMap.clampToNearestWalkable(worldX, worldY);
    if (!safeTarget) {
      this.hideSpeechBubble();
      return this.setPath([]).then(() => {
        this.mouseMovement = false;
      });
    }

    const movePhrase = this.pickPhrase(this.movePhrases, this.lastMovePhrase);
    this.lastMovePhrase = movePhrase;
    this.showSpeechBubble(movePhrase, 2600);

    return this.setPath([safeTarget]).then(() => {
      this.mouseMovement = false;
    });
  }

  public setInputDirection(x: number, y: number) {
    if (this.mouseMovement && (x !== 0 || y !== 0)) {
      return;
    }
    this.inputX = x;
    this.inputY = y;

    if (x !== 0 || y !== 0) {
      this.idleSpeechElapsedMs = 0;
      this.hideSpeechBubble();
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

  public setSpeechPaused(paused: boolean) {
    if (this.speechPaused === paused) return;

    this.speechPaused = paused;
    if (paused) {
      this.idleSpeechElapsedMs = 0;
      this.hideSpeechBubble();
    }
  }

  public updateSpeech(deltaMS: number) {
    if (this.speechPaused) return;

    this.updateSpeechBubble(deltaMS);

    if (this.inputX !== 0 || this.inputY !== 0 || this.path.length > 0 || this.mouseMovement) {
      this.idleSpeechElapsedMs = 0;
      return;
    }

    this.idleSpeechElapsedMs += deltaMS;
    if (this.idleSpeechElapsedMs < UserCharacter.IDLE_SPEECH_DELAY_MS) return;

    this.idleSpeechElapsedMs = 0;
    const idlePhrase = this.pickPhrase(this.idlePhrases, this.lastIdlePhrase);
    this.lastIdlePhrase = idlePhrase;
    this.showSpeechBubble(idlePhrase, 4200);
  }

  private pickPhrase(phrases: string[], lastPhrase: string | null): string {
    const availablePhrases = phrases.length > 1 && lastPhrase ? phrases.filter((phrase) => phrase !== lastPhrase) : phrases;
    const index = Math.floor(Math.random() * availablePhrases.length);
    return availablePhrases[index] || phrases[0];
  }
}
