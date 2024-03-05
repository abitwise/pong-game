import * as PIXI from 'pixi.js'

export class Score {
  app: PIXI.Application
  textStyle: PIXI.TextStyle
  leftScore: number
  rightScore: number
  leftScoreText: PIXI.Text
  rightScoreText: PIXI.Text

  constructor(app: PIXI.Application) {
    this.app = app
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'white',
    })
    this.leftScore = 0
    this.rightScore = 0

    // Create text objects for displaying scores
    this.leftScoreText = new PIXI.Text(`Left Score: ${this.leftScore}`, this.textStyle);
    this.leftScoreText.x = 50; // Position according to your layout
    this.leftScoreText.y = 20;

    this.rightScoreText = new PIXI.Text(`Right Score: ${this.rightScore}`, this.textStyle);
    this.rightScoreText.x = this.app.screen.width - 190; // Position according to your layout
    this.rightScoreText.y = 20;

    // Add score texts to the stage
    this.app.stage.addChild(this.leftScoreText);
    this.app.stage.addChild(this.rightScoreText);
  }

  resetScores() {
    this.leftScore = 0
    this.rightScore = 0
  }

  incrementLeftScore() {
    this.leftScore += 1
    this.leftScoreText.text = `Left Score: ${this.leftScore}`
  }

  incrementRightScore() {
    this.rightScore += 1
    this.rightScoreText.text = `Right Score: ${this.rightScore}`
  }
}
