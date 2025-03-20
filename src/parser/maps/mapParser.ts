import { Layout, TileSet } from "../../types/layout";
import { TileLayer, TileLayout } from "../../types/tileLayout";

export class MapParser {
  public static mapTileIdToSpriteId(tileId: number, tileSets: TileSet[]): number {
    let tileIdOffset = 0;

    // Finding offset value for the current tileid
    for (let i = tileSets.length - 1; i > 0; i--) {
      const set = tileSets[i];
      if (tileId < set.firstgid) {
        continue;
      }
      tileIdOffset = set.firstgid;
    }

    return tileId !== 0 ? tileId - tileIdOffset : 0;
  }

  public static parseMapData(mapLayout: Layout): TileLayout {
    const layout: TileLayout = {
      layers: [],
      tileSets: [],
    };

    layout.layers = mapLayout.layers.map((layer) => {
      const { tilesets, tileWidth, tileHeight } = mapLayout;
      const { data, width, height, opacity, x, y } = layer;

      const tileLayer: TileLayer = {
        tiles: data.map((tileId) => MapParser.mapTileIdToSpriteId(tileId, tilesets)),
        tileHeight,
        tileWidth,
        width,
        height,
        opacity,
        x,
        y,
      };

      return tileLayer;
    });

    return layout;
  }
}
