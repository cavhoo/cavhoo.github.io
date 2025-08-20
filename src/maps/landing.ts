import { BlockIndex } from "../data/blocks/blocks";
import { TILE_COUNT_X, TILE_COUNT_Y } from "../types/constants";
import { Building, Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

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
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Concrete],
  data: Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0)),
};

const building1: Building = {
  buildingName: "Building1",
  position: Vector.from([16 * 32, 16 * 32]),
  blockIds: [BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
  data: Array.from({ length: Math.floor(3 + Math.random() * 10) }, () => Array.from({ length: 2 }, () => [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)])),
};

export const landingMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  props: [],
  buildings: [building1],
  paths: landingPaths,
};
