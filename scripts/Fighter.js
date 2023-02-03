import { Sprite } from './Sprite.js'

export class Fighter extends Sprite {
  constructor(canvas,
    { position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites }) {

    super(canvas, {
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.position = position;
    this.color = color
    this.health = 100
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.isAttacking = false;
    this.lastKey = undefined;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
      direction: "right"
    }
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  render() {
    super.render()
    if (this.attackBox.direction === "right" && this.isAttacking) {
    } else if (this.attackBox.direction === "left" && this.isAttacking) {
    }
  }

  update() {
    this.render();
    this.animateFrames();
    if (this.allowMove()) {
      this.position.x += this.velocity.x;
    }
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += 0.7
    }
  }

  isJumping() {
    if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
      return false;
    }
    return true;
  }

  attack() {
    this.isAttacking = true;
    this.switchSprite('attack1')
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }

  allowMove() {
    return (this.position.x + this.width + this.velocity.x <= this.canvas.width && this.position.x + this.velocity.x >= 0)
  }

  switchSprite(sprite) {
    if(this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.framesMax-1) return
    switch (sprite) {
      case 'idle':
        if (this.image != this.sprites.idle.image) {
          this.framesMax = this.sprites.idle.framesMax;
          this.image = this.sprites.idle.image;
          this.currentFrame = 0;
        }
        break;
      case 'run':
        if (this.image != this.sprites.run.image) {
          this.framesMax = this.sprites.run.framesMax;
          this.image = this.sprites.run.image;
          this.currentFrame = 0;
        }
        break;
      case 'jump':
        if (this.image != this.sprites.jump.image) {
          this.framesMax = this.sprites.jump.framesMax;
          this.image = this.sprites.jump.image;
          this.currentFrame = 0;
        }
        break;
      case 'fall':
        if (this.image != this.sprites.fall.image) {
          this.framesMax = this.sprites.fall.framesMax;
          this.image = this.sprites.fall.image;
          this.currentFrame = 0;
        }
        break;
      case 'attack1':
        if (this.image != this.sprites.attack1.image) {
          this.framesMax = this.sprites.attack1.framesMax;
          this.image = this.sprites.attack1.image;
          this.currentFrame = 0;
        }
        break;
      case 'attack2':
        if (this.image != this.sprites.attack2.image) {
          this.framesMax = this.sprites.attack2.framesMax;
          this.image = this.sprites.attack2.image;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
