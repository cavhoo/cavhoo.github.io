import { Container } from "pixi.js";

export class PageContainer extends Container {
  public setNavCallback(callback: (path:string) => void) {
    console.debug('Noop')
  }
}
