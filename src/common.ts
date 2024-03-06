import { Application } from 'pixi.js'

export let app: Application

export function initApp() {
  app = new Application({
    background: '#2f3542',
    resizeTo: window,
  })
  // @ts-ignore
  globalThis.__PIXI_APP__ = app
  // @ts-ignore
  document.body.appendChild(app.view)
}
