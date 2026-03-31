import { BaseInterior } from "../world/interiors/baseInterior";
import { Constructable } from "./common";

export type Coord = { x: number; y: number };

export interface MapComponent {
  name: string;
  title: string;
  content: string;
  hasInterior?: boolean;
  interiorClass?: Constructable<BaseInterior>;
  target?: Coord;
}
