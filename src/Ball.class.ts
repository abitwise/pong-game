import * as PIXI from 'pixi.js'
import { Score } from '@/Score.class'
import type { Paddle } from "@/Paddle.class"

export class Ball {
  app: PIXI.Application
  sprite: PIXI.Graphics
  speed: number
  initialSpeed: number
  velocityX: number
  velocityY: number
  radius: number
  score: Score

  constructor(app: PIXI.Application, score: Score) {
    this.app = app
    this.score = score
    this.radius = 5
    this.sprite = new PIXI.Graphics()
    this.sprite.beginFill(0xffffff) // White color
    this.sprite.drawCircle(0, 0, this.radius) // Radius of the ball
    this.sprite.endFill()
    this.sprite.x = app.screen.width / 2
    this.sprite.y = app.screen.height / 2
    this.initialSpeed = 1.5;
    this.speed = this.initialSpeed
    this.velocityX = Math.random() > 0.5 ? this.initialSpeed : -this.initialSpeed
    this.velocityY = Math.random() > 0.5 ? this.initialSpeed : -this.initialSpeed

    app.stage.addChild(this.sprite)
  }

  update() {
    this.sprite.x += this.velocityX;
    this.sprite.y += this.velocityY;

    // Assume there's a radius property for the ball
    const upperLimit: number = 50; // Assuming the score text's bottom Y coordinate is around 50px from the top
    const lowerLimit: number = this.app.screen.height - this.radius - 10

    // Check for collision with the top and bottom boundaries
    if (this.sprite.y - this.radius <= upperLimit || this.sprite.y + this.radius >= lowerLimit) {
      this.velocityY *= -1; // Reverse Y-direction
    }

    // Reset the ball when it goes out of bounds on the left or right
    if (this.sprite.x <= 0) {
      this.updateScores(true)
      this.reset()
    } else if (this.sprite.x >= this.app.screen.width) {
      this.updateScores(false)
      this.reset()
    }
  }

  updateScores (isLeftPlayer: boolean) {
    if (isLeftPlayer) {
      this.score.incrementRightScore()
    } else {
      this.score.incrementLeftScore()
    }
  }

  reset() {
    this.speed = this.initialSpeed
    this.sprite.x = this.app.screen.width / 2
    this.sprite.y = this.app.screen.height / 2
    this.velocityX = Math.random() > 0.5 ? this.speed : -this.speed
    this.velocityY = Math.random() > 0.5 ? this.speed : -this.speed
  }

  adjustBallSpeedAndAngle(paddle: Paddle) {
    // Adjust the ball's velocity based on where it hit the paddle
    const hitPoint = this.sprite.y - (paddle.sprite.y + paddle.sprite.height / 2)
    const normalizedHitPoint = hitPoint / (paddle.sprite.height / 2)
    const bounceAngle = normalizedHitPoint * Math.PI / 4

    this.velocityY = this.speed * Math.sin(bounceAngle)
    // Increase speed slightly on each paddle hit to increase difficulty
    this.speed += 0.15
    this.velocityX = (this.velocityX > 0 ? 1 : -1) * this.speed * Math.cos(bounceAngle)
  }

  checkCollisionWithPaddles(leftPaddle: Paddle, rightPaddle: Paddle) {
    // Assuming `leftPaddle` and `rightPaddle` are your paddle instances
    // This is a simplistic approach; you might need to adjust coordinates based on your paddle/ball size
    if (this.sprite.x < leftPaddle.sprite.x + leftPaddle.sprite.width &&
      this.sprite.x + this.sprite.width > leftPaddle.sprite.x &&
      this.sprite.y < leftPaddle.sprite.y + leftPaddle.sprite.height &&
      this.sprite.height + this.sprite.y > leftPaddle.sprite.y) {
      // Collision detected with the left paddle
      this.velocityX *= -1; // Reverse X velocity
      this.adjustBallSpeedAndAngle(leftPaddle)
    } else if (this.sprite.x < rightPaddle.sprite.x + rightPaddle.sprite.width &&
      this.sprite.x + this.sprite.width > rightPaddle.sprite.x &&
      this.sprite.y < rightPaddle.sprite.y + rightPaddle.sprite.height &&
      this.sprite.height + this.sprite.y > rightPaddle.sprite.y) {
      // Collision detected with the right paddle
      this.velocityX *= -1 // Reverse X velocity
      this.adjustBallSpeedAndAngle(rightPaddle)
    }
  }
}
