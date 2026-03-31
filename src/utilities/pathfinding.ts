import { TILE_COUNT_X, TILE_COUNT_Y } from "../types/constants";

export interface Point {
  x: number;
  y: number;
}

class Node {
  constructor(public x: number, public y: number, public walkable: boolean, public g = 0, public h = 0, public f = 0, public parent: Node | null = null) {}
}

export class Pathfinding {
  private grid: Node[][] = [];

  constructor(data: number[][]) {
    for (let y = 0; y < TILE_COUNT_Y; y++) {
      this.grid[y] = [];
      for (let x = 0; x < TILE_COUNT_X; x++) {
        // Any non-zero tile in the "Paths" layer is walkable
        const isWalkable = data[y][x] === 73;
        this.grid[y][x] = new Node(x, y, isWalkable);
      }
    }
  }

  public findPath(start: Point, end: Point): Point[] {
    const startNode = this.grid[start.y]?.[start.x];
    const endNode = this.grid[end.y]?.[end.x];

    if (!startNode || !endNode || !endNode.walkable) {
      // If end is not walkable, try to find nearest walkable neighbor
      const nearest = this.findNearestWalkable(end.x, end.y);
      if (!nearest) return [];
      return this.findPath(start, nearest);
    }

    const openSet: Node[] = [startNode];
    const closedSet: Set<Node> = new Set();

    // Reset grid
    for (let y = 0; y < TILE_COUNT_Y; y++) {
      for (let x = 0; x < TILE_COUNT_X; x++) {
        const node = this.grid[y][x];
        node.g = 0;
        node.h = 0;
        node.f = 0;
        node.parent = null;
      }
    }

    while (openSet.length > 0) {
      let currentIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }

      const current = openSet[currentIndex];

      if (current === endNode) {
        const path: Point[] = [];
        let temp: Node | null = current;
        while (temp) {
          path.push({ x: temp.x, y: temp.y });
          temp = temp.parent;
        }
        return path.reverse();
      }

      openSet.splice(currentIndex, 1);
      closedSet.add(current);

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor) || !neighbor.walkable) continue;

        const tentativeG = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tentativeG < neighbor.g) {
            neighbor.g = tentativeG;
            newPath = true;
          }
        } else {
          neighbor.g = tentativeG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    return [];
  }

  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    for (const dir of dirs) {
      const nx = node.x + dir.x;
      const ny = node.y + dir.y;
      if (nx >= 0 && nx < TILE_COUNT_X && ny >= 0 && ny < TILE_COUNT_Y) {
        neighbors.push(this.grid[ny][nx]);
      }
    }
    return neighbors;
  }

  private findNearestWalkable(x: number, y: number): Point | null {
    let radius = 1;
    const maxRadius = 5;

    while (radius <= maxRadius) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < TILE_COUNT_X && ny >= 0 && ny < TILE_COUNT_Y) {
            if (this.grid[ny][nx].walkable) {
              return { x: nx, y: ny };
            }
          }
        }
      }
      radius++;
    }
    return null;
  }
}
