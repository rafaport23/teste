const deck = [
  // PAR 1 – foto da Mabê
  { id: 1, content: '<img src="assets/DSC06389.JPG" alt="Mabê">' },
  { id: 1, content: '<img src="assets/DSC06389.JPG" alt="Mabê">' },

  // PAR 2 – foto da Tetê
  { id: 2, content: '<img src="assets/IMG_20180710_123158_HDR.jpg" alt="Tetê">' },
  { id: 2, content: '<img src="assets/IMG_20180710_123158_HDR.jpg" alt="Tetê">' },

  // PAR 3 – foto do Papai
  { id: 3, content: '<img src="assets/IMG_20200401_234517.jpg" alt="Papai">' },
  { id: 3, content: '<img src="assets/IMG_20200401_234517.jpg" alt="Papai">' },

  // PAR 4–8 – emojis
  { id: 4, content: '🦄' }, { id: 4, content: '🦄' },
  { id: 5, content: '🌈' }, { id: 5, content: '🌈' },
  { id: 6, content: '🍓' }, { id: 6, content: '🍓' },
  { id: 7, content: '🧸' }, { id: 7, content: '🧸' },
  { id: 8, content: '🎨' }, { id: 8, content: '🎨' }
];

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function winCondition(pairsFound) {
  return pairsFound === 8;
}

if (typeof document !== "undefined") {

const game = document.getElementById('game');
const attemptsSpan = document.getElementById('attempts');
const pairsSpan = document.getElementById('pairs');
const bar = document.getElementById('bar');
const ding = document.getElementById('ding');
const winDiv = document.getElementById('win');
const restartBtn = document.getElementById('restart');
const confetti = new JSConfetti();

let firstCard = null;
let secondCard = null;
let attempts = 0;
let pairsFound = 0;

function updateHUD() {
  attemptsSpan.textContent = `Tentativas: ${attempts}`;
  pairsSpan.textContent = `Pares: ${pairsFound}/8`;
  bar.style.width = `${(pairsFound / 8) * 100}%`;
}

function checkMatch() {
  if (!firstCard || !secondCard) return;
  attempts++;
  if (firstCard.dataset.id === secondCard.dataset.id) {
    pairsFound++;
    ding.play();
    confetti.addConfetti();
    firstCard.removeEventListener('click', onCardClick);
    secondCard.removeEventListener('click', onCardClick);
    firstCard = null;
    secondCard = null;
    if (winCondition(pairsFound)) {
      winDiv.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.setAttribute('aria-label', 'Carta virada');
      secondCard.setAttribute('aria-label', 'Carta virada');
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
  updateHUD();
}

function onCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || secondCard) return;
  card.classList.add('flipped');
  card.setAttribute('aria-label', card.querySelector('.card-back').textContent);
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function createCard({ id, content }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = id;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Carta virada');

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const front = document.createElement('div');
  front.className = 'card-front';

  const back = document.createElement('div');
  back.className = 'card-back';
  back.innerHTML = content;
  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);
  card.addEventListener('click', onCardClick);
  return card;
}

function init() {
  const shuffled = shuffle([...deck]);
  shuffled.forEach(cardData => {
    const card = createCard(cardData);
    game.appendChild(card);
  });
  updateHUD();
}

restartBtn.addEventListener('click', () => location.reload());

init();
}
