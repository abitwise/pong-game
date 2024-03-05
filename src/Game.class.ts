import {Ball} from '@/Ball.class'
import {Paddle} from '@/Paddle.class'
import * as PIXI from "pixi.js";
import {Score} from "@/Score.class";
import type {KeyState} from "@/types/KeyState.interface";
import {PaddleType} from "@/types/PaddleType.enum";

export class Game {
  keyState: KeyState
  app: PIXI.Application
  score: Score
  leftPaddle: Paddle
  rightPaddle: Paddle
  ball: Ball
  constructor(app: PIXI.Application) {
    this.app = app
    this.keyState = {
      ArrowUp: false,
      ArrowDown: false,
      w: false,
      s: false,
    }
    this.score = new Score(app)
    this.leftPaddle = new Paddle(app, 50, app.screen.height / 2 - 50, PaddleType.Left)
    this.rightPaddle = new Paddle(app, app.screen.width - 50, app.screen.height / 2 - 50, PaddleType.Right)
    this.ball = new Ball(app, this.score)

    this.initKeyListeners()
    this.initTicker()
  }

  initTicker() {
    this.app.ticker.add(() => {
      this.ball.update()
      this.ball.checkCollisionWithPaddles(this.leftPaddle, this.rightPaddle)
      this.leftPaddle.update(this.keyState)
      this.rightPaddle.update(this.keyState)
    });
  }

  initKeyListeners () {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (Object.keys(this.keyState).includes(e.key)) {
        this.keyState[e.key as keyof KeyState] = true;
      }
    });

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (Object.keys(this.keyState).includes(e.key)) {
        this.keyState[e.key as keyof KeyState] = false;
      }
    });
  }
}


