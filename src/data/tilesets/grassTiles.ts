/**
 * Texture Prefixes for all tiles
 * made from grass.
 */
export enum GrassTilePrefixes {
  GrassWater = "Grass_Water",
  Mound = "Mound",
  Grass = "Grass",
  GrassFenced = "GrassFenced",
}

export enum GrassTileIds {
  TopLeftOutsideCorner = 1,
  TopRightOutsideCorner = 2,
  BottomLeftOutsideCorner = 3,
  BottomRightOutsideCorner = 4,

  TopStraightOutside = 5,
  BottomStraightOutside = 6,
  LeftStraightOutside = 7,
  RightStraightOutside = 8,

  TopLeftPatch = 10,
  TopRightPatch = 11,
  BottomLeftPatch = 12,
  BottomRightPatch = 13,
  GrassPatch = 22,

  WaterPatch = 30,
  WaterCornerTopLeft = 31,
  WaterCornerTopRight = 32,
  WaterCornerBottomLeft = 33,
  WaterCornerBottomRight = 34,
  WaterHorizontalTop = 35,
  WaterHorizontalBottom = 36,
  WaterVerticalLeft = 37,
  WaterVerticalRight = 38,
}

export const generateGrassTileFileAlias = (prefix: string, groupId: number, tileId: number): string => {
  return `${prefix}_${groupId}_${tileId}.png`;
};

export const GrassTileMap = new Map<number, string>([
  // Fills
  [GrassTileIds.GrassPatch, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 1, 22)],
  // Corners
  [GrassTileIds.TopLeftOutsideCorner, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 1)],
  [GrassTileIds.TopRightOutsideCorner, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 3)],
  [GrassTileIds.BottomLeftOutsideCorner, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 7)],
  [GrassTileIds.BottomRightOutsideCorner, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 5)],

  [GrassTileIds.TopLeftPatch, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 11)],
  [GrassTileIds.TopRightPatch, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 12)],
  [GrassTileIds.BottomLeftPatch, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 9)],
  [GrassTileIds.BottomRightPatch, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 10)],

  // Straights
  [GrassTileIds.TopStraightOutside, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 2)],
  [GrassTileIds.BottomStraightOutside, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 6)],
  [GrassTileIds.LeftStraightOutside, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 8)],
  [GrassTileIds.RightStraightOutside, generateGrassTileFileAlias(GrassTilePrefixes.Grass, 4, 4)],

  // Water Tiles
  [GrassTileIds.WaterPatch, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 21)],
  [GrassTileIds.WaterCornerBottomRight, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 5)],
  [GrassTileIds.WaterCornerBottomLeft, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 7)],
  [GrassTileIds.WaterCornerTopLeft, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 1)],
  [GrassTileIds.WaterCornerTopRight, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 3)],
  [GrassTileIds.WaterHorizontalBottom, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 6)],
  [GrassTileIds.WaterHorizontalTop, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 2)],
  [GrassTileIds.WaterVerticalLeft, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 8)],
  [GrassTileIds.WaterVerticalRight, generateGrassTileFileAlias(GrassTilePrefixes.GrassWater, 4, 4)],
]);
