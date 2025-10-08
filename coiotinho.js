const kids = [
  { name: 'Francisco', nickname: 'Chico' },
  { name: 'Nina', nickname: 'Ninoca' },
  { name: 'Stella', nickname: 'Telinha' },
  { name: 'Mabê', nickname: 'Mabê Estrelinha' },
  { name: 'Sofia', nickname: 'Fifi' },
  { name: 'Teresa', nickname: 'Tetê' },
  { name: 'Coiotinho', nickname: 'O mestre do bingo' }
];

const board = document.querySelector('#board');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');
const announcement = document.querySelector('#announcement');
const howl = document.querySelector('#howl');

let queue = [];

function setupBoard() {
  board.innerHTML = '';

  kids.forEach((kid) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.name = kid.name;
    card.innerHTML = `<span>${kid.name}</span><span class="nickname">${kid.nickname}</span>`;
    board.appendChild(card);
  });
}

function shuffleNames() {
  queue = kids
    .filter((kid) => kid.name !== 'Coiotinho')
    .map((kid) => kid.name);

  for (let i = queue.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  queue.push('Coiotinho');
}

function highlight(name) {
  const card = board.querySelector(`[data-name="${name}"]`);
  if (card) {
    card.classList.add('called');
  }
}

function resetHighlights() {
  board.querySelectorAll('.card').forEach((card) => card.classList.remove('called'));
}

function drawName() {
  if (queue.length === 0) {
    shuffleNames();
  }

  const name = queue.shift();
  highlight(name);
  howl.currentTime = 0;
  howl.play().catch(() => {});

  if (name === 'Coiotinho') {
    announcement.innerHTML = 'O Coiotinho apareceu! Todo mundo faz "auuu" bem alto! 🐺';
  } else {
    announcement.innerHTML = `<strong>${name}</strong>, vem correndo! O Coiotinho quer te dar um abraço!`;
  }
}

function resetGame() {
  resetHighlights();
  shuffleNames();
  announcement.textContent = 'Clique em "Sortear nome" para começar!';
}

setupBoard();
shuffleNames();



drawButton.addEventListener('click', drawName);
resetButton.addEventListener('click', resetGame);
