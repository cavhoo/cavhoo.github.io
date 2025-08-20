import { Vector } from "../utilities/vector";
import { Path } from "./path";

export class Range {
  constructor(public start: number, public end: number) {}
}

export type Prop = {
  /**  The id of the prop. */
  propName: string;
  /** The position of the prop on the map. */
  position: Vector;
};

export type Building = {
  blockIds: number[];
  buildingName: string;
  position: Vector;
  data: number[][][];
};

export type Layer = {
  /** The height of the layer in tiles. */
  height: number;
  /** The width of the layer in tiles. */
  width: number;
  /** The tile ids used by this layer. The place in the array is the ID used in the data field array. */
  tileIds: number[];
  /** The layer data of which tile is drawn. */
  data: number[][];
};

export type Terrain = {
  /** Layers in this terrain. */
  layers: Layer[];
};

export type Map = {
  /** The width of the map. */
  width: number;
  /** The height of the map. */
  height: number;
  /** The terrain of the map. */
  terrain: Terrain;
  /** The props on the map. */
  props: Prop[];
  /** Buidligns that can be on this block map.*/
  buildings: Building[];
  /** The paths on the map. */
  paths: Path[];
};
