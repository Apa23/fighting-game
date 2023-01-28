export class Sprite{
  constructor(canvas, {position, velocity}){
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.position = position;
    this.velocity = velocity;
    this.height = 150;  
  }

  render(){
    this.context.fillStyle = 'red';
    this.context.fillRect(this.position.x, this.position.y, 50, this.height);

  }

  update(){
    this.render();
    this.position.y += this.velocity.y;
    if(this.position.y + this.height + this.velocity.y >= this.canvas.height){
      this.velocity.y = 0;
    }else{
      this.velocity.y += 0.2
    }
  }

}
