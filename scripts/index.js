import { Sprite } from "./Sprite.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite(canvas, {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 }
});

player.render();

const enemy = new Sprite(canvas, {
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 }
});

enemy.render();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();

window.addEventListener( 'event', () => {

});