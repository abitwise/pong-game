import { Ball } from './this.class'
import { Paddle } from './Paddle.class'
import * as PIXI from "pixi.js";

export class Game {
  constructor(app: PIXI.Application) {
    const leftPaddle = new Paddle(app, 50, app.screen.height / 2 - 50)
    const rightPaddle = new Paddle(app, app.screen.width - 60, app.screen.height / 2 - 50)
    const ball = new Ball(app)

    const speed = 5
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        rightPaddle.move(rightPaddle.sprite.y - speed)
      } else if (e.key === 'ArrowDown') {
        rightPaddle.move(rightPaddle.sprite.y + speed)
      } else if (e.key === 'w') {
        leftPaddle.move(leftPaddle.sprite.y - speed)
      } else if (e.key === 's') {
        leftPaddle.move(leftPaddle.sprite.y + speed)
      }
    })

    app.ticker.add(() => {
      ball.update(app)
      ball.checkCollisionWithPaddles(leftPaddle, rightPaddle)
    });
  }
}


