import { Vector } from "../utilities/vector";
import { Path } from "./path";

export class Range {
  constructor(public start: number, public end: number) {}
}

export type Prop = {
  propId: string;
  position: Vector;
};

export type Layer = {
  tileId: number;
  coords: [number, number][];
  props: Prop[];
};

export type Terrain = {
  layers: Layer[];
};

export type Map = {
  terrain: Terrain;
  props: Prop[];
  paths: Path[];
};
