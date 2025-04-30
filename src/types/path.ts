import { Vector } from "../utilities/vector";

export class Waypoint {
  protected _next: Waypoint | null = null;
  protected _target: Vector;

  constructor(point: Vector) {
    this._target = point;
  }

  public addNext(next?: Waypoint): Waypoint | null {
    this._next = next ?? null;
    return this._next;
  }

  public get next(): Waypoint | null {
    console.log("Next waypoint: ", this._next);
    return this._next;
  }

  public getDistanceFrom(position: Vector): Vector {
    return Vector.from([this._target.distanceX(position), this._target.distanceY(position)]);
  }

  public get target(): Vector {
    return this._target;
  }
}
