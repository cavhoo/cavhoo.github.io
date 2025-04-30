import { ObservablePoint } from "pixi.js";
import Victor from "victor";

export class Vector extends Victor {
  public static from(point: ObservablePoint | [number, number]) {
    if (Array.isArray(point)) {
      return new Vector(point[0], point[1]);
    }
    return new Vector(point.x, point.y);
  }

  public toPixiPoint(): ObservablePoint {
    return new ObservablePoint(null, this.x, this.y); // (x,y) pair in pixi.js is the y axis being 'up';
  }
}
