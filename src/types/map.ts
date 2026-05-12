import type { BaseInterior } from "../world/interiors/baseInterior";
import type { Constructable } from "./common";
import type { ModalContent } from "../utilities/modal";

export type Coord = { x: number; y: number };

export interface MapComponent {
  name: string | string[];
  title: string;
  content: string;
  modalContent?: ModalContent;
  hasInterior?: boolean;
  interiorClass?: Constructable<BaseInterior>;
  target?: Coord;
  entryRadius?: number;
}
