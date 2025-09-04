import { BlockIndex } from "../data/blocks/blocks";
import { Building, Layer, Map } from "../types/map";
import { Path, Waypoint } from "../types/path";
import { Vector } from "../utilities/vector";

export const projectsPath: Path[] = [
  new Path(new Waypoint(Vector.from([6 * 32 - 16, -32])))
    .addWaypoint(new Waypoint(Vector.from([6 * 32 - 16, 64])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 64])))
    .addWaypoint(new Waypoint(Vector.from([1 * 32 - 16, 22 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 22 * 32])))
    .addWaypoint(new Waypoint(Vector.from([36 * 32 - 16, 25 * 32]))),
];

const baseLayer: Layer = {
  width: 30,
  height: 30,
  tileIds: [BlockIndex.Dirt],
  data: Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => 0)),
};

const buildingPixiDust: Building = {
  blockIds: [BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
  buildingName: "Rust SCSS",
  position: Vector.from([16, 4]),
  data: Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 2)))),
};

const buildingRustTsScss: Building = {
  blockIds: [BlockIndex.BuildingDefault, BlockIndex.BuildingWindow],
  buildingName: "Pixi Dust",
  position: Vector.from([7, 23]),
  data: Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 2)))),
};

export const workshopsMap: Map = {
  width: 30,
  height: 30,
  terrain: {
    layers: [baseLayer],
  },
  buildings: [buildingPixiDust, buildingRustTsScss],
  props: [],
  paths: [],
};
