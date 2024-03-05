import * as PIXI from 'pixi.js'

export class Paddle {
  sprite: PIXI.Graphics
  constructor(app: PIXI.Application, x: number, y: number) {
    this.sprite = new PIXI.Graphics()
    this.sprite.beginFill(0xffffff) // White color
    this.sprite.drawRect(0, 0, 10, 100) // Size of the paddle
    this.sprite.endFill()
    this.sprite.x = x
    this.sprite.y = y

    app.stage.addChild(this.sprite)
  }

  move(y: number) {
    this.sprite.y = y
  }
}
