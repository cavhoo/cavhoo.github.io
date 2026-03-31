import { TILE_COUNT_X, TILE_COUNT_Y, TILE_SIZE } from "../types/constants";

export interface Point {
  x: number;
  y: number;
}

export class CollisionMap {
  private readonly blockedTileId = 79;

  constructor(private readonly data: number[][]) {}

  public isWalkableTile(x: number, y: number): boolean {
    if (x < 0 || x >= TILE_COUNT_X || y < 0 || y >= TILE_COUNT_Y) {
      return false;
    }

    return this.data[y][x] !== this.blockedTileId;
  }

  public isWalkableWorld(x: number, y: number): boolean {
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);
    return this.isWalkableTile(tileX, tileY);
  }

  public clampToNearestWalkable(worldX: number, worldY: number, maxRadiusTiles = 5): Point | null {
    const originX = Math.floor(worldX / TILE_SIZE);
    const originY = Math.floor(worldY / TILE_SIZE);

    if (this.isWalkableTile(originX, originY)) {
      return { x: worldX, y: worldY };
    }

    for (let radius = 1; radius <= maxRadiusTiles; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) {
            continue;
          }

          const tx = originX + dx;
          const ty = originY + dy;
          if (!this.isWalkableTile(tx, ty)) {
            continue;
          }

          return {
            x: tx * TILE_SIZE + TILE_SIZE * 0.5,
            y: ty * TILE_SIZE + TILE_SIZE * 0.5,
          };
        }
      }
    }

    return null;
  }

  public nextStep(from: Point, target: Point, maxStep: number): Point {
    const dx = target.x - from.x;
    const dy = target.y - from.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 1e-6) {
      return from;
    }

    const step = Math.min(maxStep, distance);
    const baseAngle = Math.atan2(dy, dx);

    const angleOffsets = [0, 0.26, -0.26, 0.52, -0.52, 0.79, -0.79, 1.05, -1.05, 1.31, -1.31, Math.PI];

    for (const offset of angleOffsets) {
      const angle = baseAngle + offset;
      const nx = from.x + Math.cos(angle) * step;
      const ny = from.y + Math.sin(angle) * step;
      if (this.isWalkableWorld(nx, ny)) {
        return { x: nx, y: ny };
      }
    }

    return from;
  }
}
