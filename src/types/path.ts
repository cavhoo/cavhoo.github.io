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
    return this._next;
  }

  public getDistanceFrom(position: Vector): Vector {
    return Vector.from([this._target.distanceX(position), this._target.distanceY(position)]);
  }

  public get target(): Vector {
    return this._target;
  }
}

export class Path {
  protected waypoints: Waypoint[] = [];
  protected _currentWaypoint: Waypoint;
  protected prevWaypoint: Waypoint;

  constructor(start: Waypoint) {
    this.waypoints.push(start);
    this._currentWaypoint = start;
  }

  public reset(): void {
    this._currentWaypoint = this.waypoints[0];
  }

  public addWaypoint(point: Waypoint): this {
    this.waypoints.push(this.waypoints[this.waypoints.length - 1].addNext(point));
    return this;
  }

  public get currentWaypoint(): Waypoint | null {
    return this._currentWaypoint;
  }

  public nextWaypoint(): Waypoint | null {
    const point = this.currentWaypoint.next;
    if (point === null) {
      return point;
    }
    this._currentWaypoint = point;
    return point;
  }

  public reverseClone(): Path {
    const reversedWaypoints = [...this.waypoints];
    const reversePath = new Path(reversedWaypoints.pop());

    reversedWaypoints.reverse().forEach((point) => {
      reversePath.addWaypoint(new Waypoint(Vector.from([point.target.x, point.target.y])));
    });

    return reversePath;
  }
}
