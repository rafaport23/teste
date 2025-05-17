const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// updatePlayer is defined in player.js and attached to window

const player = { x: 390, y: 560, width: 20, height: 20, vx: 0 };
const stars = [];
let score = 0;
let lives = 3;
let gameOver = false;

const STAR_RADIUS = 10;

const catchSound = new Audio('');
const loseSound = new Audio('');

function spawnStar() {
  stars.push({ x: Math.random() * (canvas.width - STAR_RADIUS * 2) + STAR_RADIUS, y: 0 });
}
setInterval(spawnStar, 800);

let keys = { left: false, right: false };

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key.toLowerCase() === 'r' && gameOver) restart();
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});

function update() {
  if (gameOver) return;
  updatePlayer(player, keys, canvas.width);

  for (let i = stars.length - 1; i >= 0; i--) {
    const s = stars[i];
    s.y += 4;

    const dx = s.x - (player.x + player.width / 2);
    const dy = s.y - (player.y + player.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < STAR_RADIUS + player.width / 2) {
      stars.splice(i, 1);
      score += 10;
      catchSound.play().catch(() => {});
      continue;
    }

    if (s.y - STAR_RADIUS > canvas.height) {
      stars.splice(i, 1);
      lives -= 1;
      loseSound.play().catch(() => {});
      if (lives < 0) {
        gameOver = true;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffd1dc';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = '#fff176';
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, STAR_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#333';
  ctx.fillText(`Score: ${score}  Vidas: ${lives}`, 10, 20);

  if (gameOver) {
    ctx.fillText('GAME OVER - pressione R para reiniciar', canvas.width / 2 - 150, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function restart() {
  stars.length = 0;
  score = 0;
  lives = 3;
  gameOver = false;
}

loop();
