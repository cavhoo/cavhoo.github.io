export interface TileLayer {
  tiles: number[];
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  opacity: number;
  x: number;
  y: number;
}

export interface TileLayout {
  layers: TileLayer[];
  tileSets: [];
}
