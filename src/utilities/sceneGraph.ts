import { Container } from "pixi.js";

export class SceneGraph {
  public static stage: Container;

  public static GetComponent<T extends Container>(name: string, startContainer?: T): T {
    if (startContainer) {
      const found = this.search(name, startContainer.children) as T;
      return found;
    }
    return this.search(name, this.stage.children) as T;
  }

  protected static search<T extends Container>(name: string, children: T[]): T {
    let found: T;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.label === name) {
        found = child;
      } else {
        found = this.search(name, child.children) as T;
      }

      if (found) {
        break;
      }
    }

    return found;
  }
}
