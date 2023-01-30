export class Sprite {
  constructor(canvas, { position, velocity, color = 'red' }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.position = position;
    this.color = color
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.offset = 50;
    this.isAttacking = false;
    this.lastKey = undefined;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
      direction: "right"
    }
  }

  render() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.attackBox.direction === "right" && this.isAttacking) {
      this.context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    } else if (this.attackBox.direction === "left" && this.isAttacking) {
      this.context.fillRect(this.attackBox.position.x - this.offset, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
  }

  update() {
    this.render();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= this.canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += 0.7
    }
  }

  isJumping() {
    if (this.position.y + this.height + this.velocity.y >= this.canvas.height) {
      return false;
    }
    return true;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }
}
