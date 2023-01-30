import { Sprite } from "./Sprite.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite(canvas, {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: "green"
});

player.render();

const enemy = new Sprite(canvas, {
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
});

enemy.render();

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  Space: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false },
  Enter: { pressed: false },
}

function detectColitionLeft({ rec1, rec2 }) {
  return (rec1.attackBox.position.x - rec1.offset < rec2.position.x + rec2.width &&
    rec1.attackBox.position.x + rec1.attackBox.width - rec1.offset > rec2.position.x &&
    rec1.attackBox.position.y < rec2.position.y + rec2.height &&
    rec1.attackBox.position.y + rec1.attackBox.height > rec2.position.y)
}

function detectColitionRight({ rec1, rec2 }) {
  return (rec1.attackBox.position.x + rec1.attackBox.width > rec2.position.x &&
    rec1.attackBox.position.x < rec2.position.x + rec2.width &&
    rec1.attackBox.position.y < rec2.position.y + rec2.height &&
    rec1.attackBox.position.y + rec1.attackBox.height > rec2.position.y)
}
let time = 10;
function timerTick(){
  setTimeout(timerTick, 1000)
  if(time>0) time--
}

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.w.pressed && !player.isJumping()) {
    player.velocity.y = -20;
  }

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  // enemy movement
  if (keys.ArrowUp.pressed && !enemy.isJumping()) {
    enemy.velocity.y = -20;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  // Attacking direction
  if (player.position.x > enemy.position.x) {
    player.attackBox.direction = "left";
    enemy.attackBox.direction = "right";
  } else if (player.position.x < enemy.position.x) {
    player.attackBox.direction = "right";
    enemy.attackBox.direction = "left";
  }

  // Colition detecting
  if (player.isAttacking) {
    if (player.attackBox.direction === "left") {
      if (detectColitionLeft({ rec1: player, rec2: enemy })) {
        player.isAttacking = false;
        enemy.health -= 20
        document.querySelector('#enemy-health').style.width = enemy.health + '%';
      }
    } else if (player.attackBox.direction === "right") {
      if (detectColitionRight({ rec1: player, rec2: enemy })) {
        player.isAttacking = false;
        enemy.health -= 20
        document.querySelector('#enemy-health').style.width = enemy.health + '%';
      }
    }
  }

  if (enemy.isAttacking) {
    if (enemy.attackBox.direction === "left") {
      if (detectColitionLeft({ rec1: enemy, rec2: player })) {
        enemy.isAttacking = false;
        player.health -= 20
        document.querySelector('#player-health').style.width = player.health + '%';
      }
    } else if (enemy.attackBox.direction === "right") {
      if (detectColitionLeft({ rec1: player, rec2: enemy })) {
        player.isAttacking = false;
        document.querySelector('#player-health').style.width = player.health + '%';
      }
    }
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd'
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a'
      break;
    case 'w':
      keys.w.pressed = true;
      break;
    case " ":
      keys.Space.pressed = true;
      player.attack();
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
      keys.ArrowUp.pressed = true;
      break;
    case "Enter":
      keys.Enter.pressed = true;
      enemy.attack();
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
    case " ":
      keys.Space.pressed = false;
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
    case "Enter":
      keys.Enter.pressed = false;
      break;
  }
});