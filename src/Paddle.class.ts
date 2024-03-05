import * as PIXI from 'pixi.js'
import type {KeyState} from "@/types/KeyState.interface"
import { PaddleType } from "@/types/PaddleType.enum"

export class Paddle {
  sprite: PIXI.Graphics
  app: PIXI.Application
  upperLimit: number
  lowerLimit: number
  paddleMovementSpeed: number
  type: PaddleType

  constructor(app: PIXI.Application, x: number, y: number, type: PaddleType) {
    this.app = app
    this.type = type
    this.sprite = new PIXI.Graphics()
    this.sprite.beginFill(0xffffff) // White color
    this.sprite.drawRect(0, 0, 10, 100) // Size of the paddle
    this.sprite.endFill()
    this.sprite.x = x
    this.sprite.y = y

    this.upperLimit = 50
    this.lowerLimit = this.app.screen.height - this.sprite.height - 10

    this.paddleMovementSpeed = 10

    app.stage.addChild(this.sprite)
  }

  move(y: number) {
    this.sprite.y = Math.max(this.upperLimit, Math.min(y, this.lowerLimit))
  }

  update(keyState: KeyState): void {
    if (this.type === PaddleType.Left) {
      if (keyState.w) this.move(this.sprite.y - this.paddleMovementSpeed);
      if (keyState.s) this.move(this.sprite.y + this.paddleMovementSpeed);
    } else {
      if (keyState.ArrowUp) this.move(this.sprite.y - this.paddleMovementSpeed);
      if (keyState.ArrowDown) this.move(this.sprite.y + this.paddleMovementSpeed);
    }
  }
}
