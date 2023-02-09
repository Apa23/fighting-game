import { Sprite } from "./Sprite.js";
import { Fighter } from "./Fighter.js";
import { Interface } from "./Interface.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite(canvas, {
  position: {
    x: 0, y: 0
  },
  imageSrc: './assets/background.png'
})

const shop = new Sprite(canvas, {
  position: {
    x: 600, y: 128
  },
  imageSrc: './assets/shop.png',
  scale: 2.75,
  framesMax: 6,
})


const player = new Fighter(canvas, {
  position: { x: 340, y: 0 },
  velocity: { x: 0, y: 0 },
  imageSrc: './assets/samuraiMack/Idle-L.png',
  framesMax: 8,
  scale: 2.5,
  offset: { x: 235, y: 157 },
  spritesleft: {
    idle: { imgSrc: './assets/samuraiMack/Idle-L.png', framesMax: 8 },
    run: { imgSrc: './assets/samuraiMack/Run-L.png', framesMax: 8 },
    jump: { imgSrc: './assets/samuraiMack/Jump-L.png', framesMax: 2 },
    fall: { imgSrc: './assets/samuraiMack/Fall-L.png', framesMax: 2 },
    attack1: { imgSrc: './assets/samuraiMack/Attack1-L.png', framesMax: 6 },
    attack2: { imgSrc: './assets/samuraiMack/Attack2-L.png', framesMax: 6 },
    takehit: { imgSrc: './assets/samuraiMack/TakeHit-L.png', framesMax: 4 },
    death: { imgSrc: './assets/samuraiMack/Death-L.png', framesMax: 6 },

  },
  spritesright: {
    idle: { imgSrc: './assets/samuraiMack/Idle-R.png', framesMax: 8 },
    run: { imgSrc: './assets/samuraiMack/Run-R.png', framesMax: 8 },
    jump: { imgSrc: './assets/samuraiMack/Jump-R.png', framesMax: 2 },
    fall: { imgSrc: './assets/samuraiMack/Fall-R.png', framesMax: 2 },
    attack1: { imgSrc: './assets/samuraiMack/Attack1-R.png', framesMax: 6 },
    attack2: { imgSrc: './assets/samuraiMack/Attack2-R.png', framesMax: 6 },
    takehit: { imgSrc: './assets/samuraiMack/TakeHit-R.png', framesMax: 4 },
    death: { imgSrc: './assets/samuraiMack/Death-L.png', framesMax: 6 },

  },
  attackBox: {
    offset: { x: 50, y: 50 },
    width: 185,
    height: 50,
  }
});

player.render();

const enemy = new Fighter(canvas, {
  position: { x: 680, y: 100 },
  velocity: { x: 0, y: 0 },
  imageSrc: './assets/kenji/Idle-L.png',
  framesMax: 4,
  scale: 2.5,
  offset: { x: 215, y: 170 },
  spritesleft: {
    idle: { imgSrc: './assets/kenji/Idle-L.png', framesMax: 4 },
    run: { imgSrc: './assets/kenji/Run-L.png', framesMax: 8 },
    jump: { imgSrc: './assets/kenji/Jump-L.png', framesMax: 2 },
    fall: { imgSrc: './assets/kenji/Fall-L.png', framesMax: 2 },
    attack1: { imgSrc: './assets/kenji/Attack1-L.png', framesMax: 4 },
    attack2: { imgSrc: './assets/kenji/Attack2-L.png', framesMax: 4 },
    takehit: { imgSrc: './assets/kenji/TakeHit-L.png', framesMax: 3 },
    death: { imgSrc: './assets/kenji/Death-L.png', framesMax: 7 },


  },
  spritesright: {
    idle: { imgSrc: './assets/kenji/Idle-R.png', framesMax: 4 },
    run: { imgSrc: './assets/kenji/Run-R.png', framesMax: 8 },
    jump: { imgSrc: './assets/kenji/Jump-R.png', framesMax: 2 },
    fall: { imgSrc: './assets/kenji/Fall-R.png', framesMax: 2 },
    attack1: { imgSrc: './assets/kenji/Attack1-R.png', framesMax: 4 },
    attack2: { imgSrc: './assets/kenji/Attack2-R.png', framesMax: 4 },
    takehit: { imgSrc: './assets/kenji/TakeHit-R.png', framesMax: 3 },
    death: { imgSrc: './assets/kenji/Death-L.png', framesMax: 7 },

  },
  attackBox: {
    offset: { x: 50, y: 50 },
    width: 170,
    height: 50,
  }
});

enemy.framesHold = 8;

enemy.render();

const gameInterface = new Interface({ player: player, enemy: enemy });

let time = document.querySelector("#timer").innerHTML

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

gameInterface.timerTick(time);

function animate() {
  window.requestAnimationFrame(animate);
  background.update();
  shop.update();
  context.fillStyle = "rgba(255,255,255,0.15)"
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -7;
    player.switchSprite('run');

  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 7;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  if (keys.w.pressed && !player.isJumping()) {
    player.velocity.y = -18;
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  }

  if (player.position.y + player.height <= canvas.height - 97 && player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.allowMove()) {
    enemy.velocity.x = -7;
    enemy.switchSprite('run');

  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.allowMove()) {
    enemy.velocity.x = 7;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  if (keys.ArrowUp.pressed && !enemy.isJumping()) {
    enemy.velocity.y = -18;
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  }

  if (enemy.position.y + enemy.height <= canvas.height - 97 && enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
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
  if (player.isAttacking && player.currentFrame === 4) {
    if (player.attackBox.direction === "left") {
      if (gameInterface.detectColitionLeft({ rec1: player, rec2: enemy })) {
        enemy.takeHit()
        player.isAttacking = false;
        gsap.to('#enemy-health', {
          width: enemy.health + '%'
        })
      }
    } else if (player.attackBox.direction === "right") {
      if (gameInterface.detectColitionRight({ rec1: player, rec2: enemy })) {
        enemy.takeHit()
        player.isAttacking = false;
        gsap.to('#enemy-health', {
          width: enemy.health + '%'
        })
      }
    }
  }
  if (enemy.isAttacking && enemy.currentFrame === 2) {
    if (enemy.attackBox.direction === "left") {

      if (gameInterface.detectColitionLeft({ rec1: enemy, rec2: player })) {
        player.takeHit()
        enemy.isAttacking = false;
        gsap.to('#player-health', {
          width: player.health + '%'
        })
      }
    } else if (enemy.attackBox.direction === "right") {
      if (gameInterface.detectColitionRight({ rec1: enemy, rec2: player })) {
        player.takeHit()
        enemy.isAttacking = false;
        gsap.to('#player-health', {
          width: player.health + '%'
        })
      }
    }
  }

  // missed attack
  if (player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false;
  }
  if (enemy.isAttacking && enemy.currentFrame === 2) {
    enemy.isAttacking = false;
  }

  // GameOver detection
  if (player.health <= 0 || enemy.health <= 0) {
    document.querySelector("#game-result").style.display = 'flex';
    gameInterface.determinateWinner();
  }

}

animate();

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
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
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
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