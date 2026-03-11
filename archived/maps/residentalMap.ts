import { BlockIndex } from "../data/blocks/blocks";
import { Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

// prettier-ignore
export const aboutPath: Path[] = [
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -64])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -64])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
  new Path(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, -64]))),
  new Path(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 20 * 32])))
    .addWaypoint(new Waypoint(Vector.from([39 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 0])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, -64]))),
];

const baseLayer: Layer = {
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Concrete],
  data: Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0)),
};

export const residentialMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  buildings: [],
  props: [],
  paths: [],
};
