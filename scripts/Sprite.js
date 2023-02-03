export class Sprite {
  constructor(canvas, { position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 4;
    this.offset = offset
  }

  render() {
    this.context.drawImage(this.image,
      this.currentFrame * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width / this.framesMax * this.scale,
      this.image.height * this.scale);
  }

  animateFrames(){
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.framesMax - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.render();
    this.animateFrames();
  }


}
 