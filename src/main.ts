import './assets/main.css'

import { appInjectKey, createApp } from 'vue3-pixi'
import { Application } from 'pixi.js'
import App from './App.vue'
import { Game } from './Game.class'

const pixiApp = new Application({
  resizeTo: window,
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
})

new Game(pixiApp)

document.body.appendChild(pixiApp.view as HTMLCanvasElement)

let resizeTimeout: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }, 100); // Adjust the timeout as needed
});

const app = createApp(App)

app.provide(appInjectKey, pixiApp)
app.mount(pixiApp.stage)
