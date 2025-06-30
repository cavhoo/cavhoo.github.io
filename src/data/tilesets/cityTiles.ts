export enum CityTilePrefixes {
  Asphalt = "Asphalt",
  Sidewalk = "Sidewalk",
}

export enum CityTileIds {
  RoadFill = 1,
  RoadVertical = 2,
  RoadHorizontal = 3,
  RoadCornerUpLeft = 4,
  RoadCornerUpRight = 5,
  RoadCornerDownLeft = 6,
  RoadCornerDownRight = 7,
  RoadCross = 8,
  RoadTDown = 9,
  RoadTUp = 10,
  RoadTLeft = 11,
  RoadTRight = 12,
  SidewalkFill = 13,
  SidewalkHorizontal = 14,
  SidewalkVerticalLeft = 15,
  SidewalkVerticalRight = 16,
  SidewalkHorizontalTop = 17,
  SidewalkHorizontalBottom = 18,
  SidewalkCornerBottomRight = 19,
  SidewalkCornerBottomLeft = 20,
  SidewalkCornerTopRight = 21,
  SidewalkCornerTopLeft = 22,
}

export const generateCityTileFileAlias = (prefix: string, tileId: number): string => {
  return `${prefix}_${tileId}.png`;
};

export const CityTileMap = new Map<number, string>([
  [CityTileIds.RoadFill, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 10)],
  [CityTileIds.SidewalkFill, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 9)],
  [CityTileIds.RoadVertical, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 4)],
  [CityTileIds.RoadHorizontal, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 6)],
  [CityTileIds.RoadCornerDownLeft, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 5)],
  [CityTileIds.RoadCornerDownRight, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 7)],
  [CityTileIds.RoadCornerUpLeft, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 3)],
  [CityTileIds.RoadCornerUpRight, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 1)],
  [CityTileIds.RoadCross, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 13)],
  [CityTileIds.RoadTDown, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 12)],
  [CityTileIds.RoadTLeft, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 10)],
  [CityTileIds.RoadTUp, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 11)],
  [CityTileIds.RoadTRight, generateCityTileFileAlias(CityTilePrefixes.Asphalt, 9)],
  [CityTileIds.SidewalkHorizontal, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 2)],
  [CityTileIds.SidewalkHorizontalTop, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 6)],
  [CityTileIds.SidewalkHorizontalBottom, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 2)],
  [CityTileIds.SidewalkCornerBottomLeft, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 3)],
  [CityTileIds.SidewalkCornerBottomRight, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 1)],
  [CityTileIds.SidewalkCornerTopLeft, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 5)],
  [CityTileIds.SidewalkCornerTopRight, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 7)],
  [CityTileIds.SidewalkVerticalLeft, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 4)],
  [CityTileIds.SidewalkVerticalRight, generateCityTileFileAlias(CityTilePrefixes.Sidewalk, 8)],
]);
