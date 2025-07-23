import { Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

// prettier-ignore
// export const landingMap: number[][] = [
//   [1, 5, 5, 5, 5,10,11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2],
//   [7,12, 6, 6, 6, 6, 6, 6, 6, 6,13,12, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,13, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,31,35,35,35,35,35,35,35,35,32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,37,30,30,30,30,30,30,30,30,38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,37,30,30,30,30,30,30,30,30,38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,37,30,30,30,30,30,30,30,30,38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,37,30,30,30,30,30,30,30,30,38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,33,36,36,36,36,36,36,36,36,34, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 7,11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6,13,12, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7,11, 5, 5, 5, 5, 5, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7,12, 6, 6, 6, 6, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
//   [7,11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,10,11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,10, 8],
//   [3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,13,12, 6, 6, 4],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0],
// ];

const middlepath = new Path(new Waypoint(Vector.from([6 * 32, -32])))
  .addWaypoint(new Waypoint(Vector.from([6 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([11 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([11 * 32, 9 * 32])))
  .addWaypoint(new Waypoint(Vector.from([20 * 32, 9 * 32])))
  .addWaypoint(new Waypoint(Vector.from([20 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([36 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([36 * 32, 25 * 32])));

const leftPath = new Path(new Waypoint(Vector.from([6 * 32, -32])))
  .addWaypoint(new Waypoint(Vector.from([6 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([1 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([1 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([36 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([36 * 32, 25 * 32])));

const rightPath = new Path(new Waypoint(Vector.from([36 * 32, 25 * 32])))
  .addWaypoint(new Waypoint(Vector.from([36 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([1 * 32, 21 * 32])))
  .addWaypoint(new Waypoint(Vector.from([1 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([6 * 32, 32])))
  .addWaypoint(new Waypoint(Vector.from([6 * 32, -64])));

export const landingPaths: Path[] = [leftPath, leftPath.reverseClone(), middlepath, middlepath.reverseClone(), rightPath, rightPath.reverseClone()];

const baseLayer: Layer = {
  tileIds: [0],
  data: Array.from({ length: 25 }, () => Array.from({ length: 40 }, () => 0)),
};

const roadLayer: Layer = {
  tileIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  data: [
    [0, ...Array.from({ length: 38 }, () => 4), 1],
    [6, 11, ...Array.from({ length: 36 }, () => 5), 12, 7],
    ...Array.from({ length: 18 }, () => [6, 7, ...Array.from({ length: 36 }, () => -1), 6, 7]),
    [6, 10, ...Array.from({ length: 36 }, () => 4), 9, 7],
    [2, ...Array.from({ length: 38 }, () => 5), 3],
  ],
};

export const landingMap: Map = {
  width: 40,
  height: 30,
  terrain: {
    layers: [baseLayer, roadLayer],
  },
  props: [],
  paths: landingPaths,
};
