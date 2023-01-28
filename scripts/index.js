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

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false },
}

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 1;
  }


  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 1;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd'
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a'
      break;
    case 'w':
      player.velocity.y = -10;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -10;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
  }
});