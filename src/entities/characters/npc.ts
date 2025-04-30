import { AnimatedSprite, Container, Ticker } from "pixi.js";
import { Vector } from "../../utilities/vector";
import { Waypoint } from "../../types/path";

export enum NPCState {
  IdleLeft,
  IdleUp,
  IdleDown,
  IdleRight,
  WalkingLeft,
  WalkingRight,
  WalkingUp,
  WalkingDown,
}

/**
 * NPC container base class.
 */
export class NPC extends Container {
  protected animations: Map<NPCState, AnimatedSprite>;
  protected state: NPCState;
  protected walkPoint: Waypoint | null = null;
  protected nextPoint: Waypoint | null = null;
  protected walkSpeed: number = 0;
  protected loopPath: boolean = false;
  protected pathCompleteCallback?: () => void;
  constructor(animations: [NPCState, AnimatedSprite][]) {
    super();
    this.animations = new Map(animations);
    this.state = NPCState.IdleDown;
    this.addChild(
      ...animations.map((ani) => {
        ani[1].visible = ani[0] === this.state ? true : false;
        return ani[1];
      })
    );

    Ticker.shared.add(() => this.update());
  }

  public play(state: NPCState): void {
    this.animations.get(this.state).visible = false;
    this.animations.get(state).visible = true;

    this.animations.get(state).animationSpeed = 0.08;
    this.animations.get(state).play();
    this.state = state;
  }

  public walkOnPath(path: Waypoint, speed: number) {
    this.position.set(path.target.x, path.target.y);
    this.walkPoint = path;
    this.nextPoint = path;
    this.walkSpeed = speed;
  }

  public onWalkingComplete(cb: () => void): void {
    this.pathCompleteCallback = cb;
  }

  protected update() {
    if (this.nextPoint !== null) {
      const position = Vector.from(this.position);
      const distance = this.nextPoint.getDistanceFrom(position);
      if (Math.floor(Math.abs(distance.x)) > 0 || Math.floor(Math.abs(distance.y)) > 0) {
        const angle = Math.atan2(Math.floor(distance.x), Math.floor(distance.y));
        this.setAnimation(Math.floor((angle * 180) / Math.PI));
        this.position.set(this.position.x + this.walkSpeed * Math.sin(angle), this.position.y + this.walkSpeed * Math.cos(angle));
      } else {
        this.nextPoint = this.nextPoint.next;
      }
    } else {
      this.pathCompleteCallback?.();
    }
  }

  protected setAnimation(angle: number) {
    switch (angle) {
      case 0:
        this.play(NPCState.WalkingDown);
        break;
      case -90:
        this.play(NPCState.WalkingLeft);
        break;
      case 180:
        this.play(NPCState.WalkingUp);
        break;
      default:
        this.play(NPCState.WalkingRight);
    }
  }
}
