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
      spritesleft,
      spritesright,
      attackBox = { offset: {}, width: undefined, height: undefined } }) {

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
      width: attackBox.width,
      height: attackBox.height,
      direction: "right",
      offset: attackBox.offset
    }
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.spritesleft = spritesleft;
    this.spritesright = spritesright;
    this.dead = false;

    for (const sprite in this.spritesleft) {
      this.spritesleft[sprite].image = new Image();
      this.spritesleft[sprite].image.src = this.spritesleft[sprite].imgSrc;
    }
    for (const sprite in this.spritesright) {
      this.spritesright[sprite].image = new Image();
      this.spritesright[sprite].image.src = this.spritesright[sprite].imgSrc;
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
    if(!this.dead)   this.animateFrames();


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
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite('death')
    } else {
      this.switchSprite('hit')
    }
  }

  allowMove() {
    return (this.position.x + this.width + this.velocity.x <= this.canvas.width && this.position.x + this.velocity.x >= 0)
  }

  switchSprite(sprite) {
    if (this.attackBox.direction == "left") {
      //death animation
      if (this.image === this.spritesleft.death.image){
        if(this.currentFrame === this.spritesleft.death.framesMax -1) this.dead = true;
        return
      } 
        

      // attack animation override
      if (this.image === this.spritesleft.attack1.image &&
        this.currentFrame < this.spritesleft.attack1.framesMax - 1) return

      // hit animation override
      if (this.image === this.spritesleft.takehit.image &&
        this.currentFrame < this.spritesleft.takehit.framesMax - 1) return


      switch (sprite) {
        case 'idle':
          if (this.image != this.spritesleft.idle.image) {
            this.framesMax = this.spritesleft.idle.framesMax;
            this.image = this.spritesleft.idle.image;
            this.currentFrame = 0;
          }
          break;
        case 'run':
          if (this.image != this.spritesleft.run.image) {
            this.framesMax = this.spritesleft.run.framesMax;
            this.image = this.spritesleft.run.image;
            this.currentFrame = 0;
          }
          break;
        case 'jump':
          if (this.image != this.spritesleft.jump.image) {
            this.framesMax = this.spritesleft.jump.framesMax;
            this.image = this.spritesleft.jump.image;
            this.currentFrame = 0;
          }
          break;
        case 'fall':
          if (this.image != this.spritesleft.fall.image) {
            this.framesMax = this.spritesleft.fall.framesMax;
            this.image = this.spritesleft.fall.image;
            this.currentFrame = 0;
          }
          break;
        case 'attack1':
          if (this.image != this.spritesleft.attack1.image) {
            this.framesMax = this.spritesleft.attack1.framesMax;
            this.image = this.spritesleft.attack1.image;
            this.currentFrame = 0;
          }
          break;
        case 'attack2':
          if (this.image != this.spritesleft.attack2.image) {
            this.framesMax = this.spritesleft.attack2.framesMax;
            this.image = this.spritesleft.attack2.image;
            this.currentFrame = 0;
          }
          break;
        case 'hit':
          if (this.image != this.spritesleft.takehit.image) {
            this.framesMax = this.spritesleft.takehit.framesMax;
            this.image = this.spritesleft.takehit.image;
            this.currentFrame = 0;
          }
          break;
        case 'death':
          if (this.image != this.spritesleft.death.image) {
            this.framesMax = this.spritesleft.death.framesMax;
            this.image = this.spritesleft.death.image;
            this.currentFrame = 0;
          }
          break;
      }
    }
    else if (this.attackBox.direction == "right") {
      //death animation
      if (this.image === this.spritesright.death.image){
        if(this.currentFrame === this.spritesright.death.framesMax -1) this.dead = true;
        return
      } 

      // attack animation override
      if (this.image === this.spritesright.attack1.image &&
        this.currentFrame < this.spritesright.attack1.framesMax - 1) return

      // hit animation override
      if (this.image === this.spritesright.takehit.image &&
        this.currentFrame < this.spritesright.takehit.framesMax - 1) return

      switch (sprite) {
        case 'idle':
          if (this.image != this.spritesright.idle.image) {
            this.framesMax = this.spritesright.idle.framesMax;
            this.image = this.spritesright.idle.image;
            this.currentFrame = 0;
          }
          break;
        case 'run':
          if (this.image != this.spritesright.run.image) {
            this.framesMax = this.spritesright.run.framesMax;
            this.image = this.spritesright.run.image;
            this.currentFrame = 0;
          }
          break;
        case 'jump':
          if (this.image != this.spritesright.jump.image) {
            this.framesMax = this.spritesright.jump.framesMax;
            this.image = this.spritesright.jump.image;
            this.currentFrame = 0;
          }
          break;
        case 'fall':
          if (this.image != this.spritesright.fall.image) {
            this.framesMax = this.spritesright.fall.framesMax;
            this.image = this.spritesright.fall.image;
            this.currentFrame = 0;
          }
          break;
        case 'attack1':
          if (this.image != this.spritesright.attack1.image) {
            this.framesMax = this.spritesright.attack1.framesMax;
            this.image = this.spritesright.attack1.image;
            this.currentFrame = 0;
          }
          break;
        case 'attack2':
          if (this.image != this.spritesright.attack2.image) {
            this.framesMax = this.spritesright.attack2.framesMax;
            this.image = this.spritesright.attack2.image;
            this.currentFrame = 0;
          }
          break;
        case 'hit':
          if (this.image != this.spritesright.takehit.image) {
            this.framesMax = this.spritesright.takehit.framesMax;
            this.image = this.spritesright.takehit.image;
            this.currentFrame = 0;
          }
          break;
        case 'death':
          if (this.image != this.spritesright.death.image) {
            this.framesMax = this.spritesright.death.framesMax;
            this.image = this.spritesright.death.image;
            this.currentFrame = 0;
          }
          break;
      }
    }
  }
}
