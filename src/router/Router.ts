import { Container } from "pixi.js";
import { Route } from "../models/Route.model";

export class Router extends Container {
  private routes: Route[] = []
  private activeRoute: Route


  constructor(routeConfig: Route[]) {
    super()
    this.routes = routeConfig
    this.activeRoute = routeConfig[0]
    this.init()
  }

  private init() {
    const baseRoute = this.routes.find((route) => route.path === '/')
    if (baseRoute) {
      baseRoute.container.setNavCallback(this.onNavigate)
      this.addChild(baseRoute?.container)
      this.activeRoute = baseRoute
    }
  }

  public onNavigate = (navigateTo: string) => {
    if (navigateTo !== this.activeRoute.path) {
      const newRoute = this.routes.find(route => route.path === navigateTo)
      if (newRoute) {
        newRoute.container.setNavCallback(this.onNavigate)
        this.removeChild(this.activeRoute.container)
        this.addChild(newRoute.container)
        this.activeRoute = newRoute
      }
    }
  }
}
