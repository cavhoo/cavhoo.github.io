import { Container } from "pixi.js";
import { Route } from "../models/Route.model";

export enum RouterState {
	FADING,
	IDLE,
	NAVIGATING,
}

export class Router extends Container {
	private routes: Route[] = [];
	private activeRoute: Route;
	private nextRoute: Route;
	private alphaFadeAmount: number = 0.1;
	private state: RouterState = RouterState.IDLE;

	constructor(routeConfig: Route[]) {
		super();
		this.routes = routeConfig;
		this.activeRoute = routeConfig[0];
		this.init();
	}

	private init() {
		const baseRoute = this.routes.find((route) => route.path === "/");
		if (baseRoute) {
			baseRoute.container.setNavCallback(this.onNavigate);
			this.addChild(baseRoute?.container);
			this.activeRoute = baseRoute;
		}
	}

	public onNavigate = (navigateTo: string) => {
		if (navigateTo !== this.activeRoute.path) {
			this.state = RouterState.NAVIGATING;
			const newRoute = this.routes.find((route) => route.path === navigateTo);
			if (newRoute) {
				newRoute.container.setNavCallback(this.onNavigate);
				this.addChild(newRoute.container);
				this.nextRoute = newRoute;
				this.nextRoute.container.alpha = 0;
				this.state = RouterState.FADING;
			}
		}
	};

	public update(delta: number) {
		this.children.forEach((child) => {
			switch (this.state) {
				case RouterState.IDLE:
				case RouterState.NAVIGATING:
					break;
				case RouterState.FADING:
					this.activeRoute.container.alpha -= 0.05;
					this.nextRoute.container.alpha += 0.05;
					if (this.nextRoute.container.alpha >= 1.0) {
						this.activeRoute.container.alpha = 0;
						this.removeChild(this.activeRoute.container);
						this.activeRoute = this.nextRoute;
						this.nextRoute = null;
						this.state = RouterState.IDLE;
					}
			}

			if ((child as any).update) {
				(child as any).update(delta);
			}
		});
	}
}
