declare let PIXI:any

import { Application } from 'pixi.js'

import FontLoader from './loaders/fontLoader'
import { Route } from './models/Route.model'
import { Landing } from './pages/Landing'
import { Main } from './pages/Main'
import { Router } from './router/Router'

 PIXI.WebGLRenderer = PIXI.Renderer;
window['__PIXI_INSPECTOR_GLOBAL_HOOK__'] &&
    window['__PIXI_INSPECTOR_GLOBAL_HOOK__'].register({ PIXI: PIXI });

const start = () => {
  const settings = {
    width: 1280,
    height: 720,
    antialias: true,
    transparent: false,
    resolution :1
  }

  const routeConfig: Route[] = [
    {
      path: '/',
      container: new Landing()
    },
    {
      path: '/main',
      container: new Main()
    }
  ]

  // Create new PIXI Canvas App
  const app = new Application(settings)

  const container = document.querySelector('#app')

  if (container) {
    container.appendChild(app.view)

    const router = new Router(routeConfig)

    app.stage.addChild(router)

    app.ticker.add((delta: number) => {
      router.update(delta)
    })


  } else {
    console.error("Unable to attach app to body! Reason: Body not found")
  }
}

FontLoader(start)
