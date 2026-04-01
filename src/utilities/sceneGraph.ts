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

  public static GetComponents<T extends Container>(name: string | string[], startContainer?: T): T[] {
    const found: T[] = [];
    const names = Array.isArray(name) ? name : [name];
    if (startContainer) {
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const component = this.search(name, startContainer ? startContainer.children : this.stage.children) as T;
        if (component) {
          found.push(component);
        }
      }
    }
    return found;
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
