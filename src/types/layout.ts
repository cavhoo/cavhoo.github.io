export interface Layer {
  data: number[];
  height: number;
  width: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  x: number;
  y: number;
}

export interface TileSet {
  firstgid: number;
  source: string;
}

export interface Layout {
  compressionLevel: number;
  height: number;
  width: number;
  infinite: boolean;
  layers: Layer[];
  nextLayerId: number;
  nextObjectId: number;
  orientation: string;
  renderorder: string;
  tiledVersion: string;
  tileHeight: number;
  tileWidth: number;
  tilesets: TileSet[];
  type: string;
  version: string;
}
