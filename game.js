// game.js

let selectedCategory = null;
let playerCards = [];
let computerCards = [];
let currentPlayer = 'player';
let roundInProgress = false;

let playerRoundCards = [];
let computerRoundCards = [];

function startGame() {
  const deck = [...cards];
  shuffle(deck);
  playerCards = deck.slice(0, deck.length / 2);
  computerCards = deck.slice(deck.length / 2);

  playerRoundCards = [];
  computerRoundCards = [];

  currentPlayer = 'player';
  selectedCategory = null;
  roundInProgress = false;
  updateUI();
  showMessage("Game started! Your turn. Select a category.");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateUI() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  if (playerCards.length === 0) {
    showMessage("You lost the game!");
    playSound('win');
    return;
  }
  if (computerCards.length === 0) {
    showMessage("You won the game!");
    playSound('win');
    return;
  }

  // Spielerkarte (oberste)
  const playerCard = playerCards[0];
  const playerCardEl = createCardElement(playerCard, false, selectedCategory);
  gameBoard.appendChild(playerCardEl);

  // Kartenanzahl Spieler
  const playerCountEl = document.createElement('div');
  playerCountEl.classList.add('card-count');
  playerCountEl.textContent = `Deine Karten: ${playerCards.length}`;
  gameBoard.appendChild(playerCountEl);

  // Gegnerkarte (oberste)
  const computerCard = computerCards[0];
  // CPU-Karte nur verdeckt, wenn Spieler am Zug ist und keine Runde läuft
  const computerCardBack = (currentPlayer === 'player' && !roundInProgress);
  const computerCardEl = createCardElement(computerCard, computerCardBack, selectedCategory, true);
  gameBoard.appendChild(computerCardEl);

  // Kartenanzahl CPU
  const computerCountEl = document.createElement('div');
  computerCountEl.classList.add('card-count');
  computerCountEl.textContent = `CPU Karten: ${computerCards.length}`;
  gameBoard.appendChild(computerCountEl);

  if (!roundInProgress && currentPlayer === 'player') {
    addCategoryClickListeners(playerCardEl, playerCard);
  }
}

function createCardElement(card, isBackSide, selectedCategory, isOpponent = false) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  if (isBackSide) {
    cardElement.classList.add('back');
    cardElement.style.backgroundImage = "url('card_back.png')";
  } else {
    cardElement.classList.add('front');
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.name}" />
      <div class="info">
        <h3>${card.name}</h3>
        ${Object.entries(card.categories).map(([key, value]) => {
          const highlightClass = (key === selectedCategory) ? 'highlight' : '';
          return `<p class="${highlightClass}"><strong>${key}:</strong> ${value}</p>`;
        }).join('')}
      </div>
    `;
  }
  if (isOpponent) {
    cardElement.classList.add('opponent-card');
  }
  return cardElement;
}

function addCategoryClickListeners(cardElement, card) {
  const infoDiv = cardElement.querySelector('.info');
  if (!infoDiv) return;

  const paragraphs = infoDiv.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.style.cursor = 'pointer';
    p.onclick = () => {
      if (roundInProgress) return;
      const category = p.querySelector('strong').textContent.replace(':', '');
      selectedCategory = category;
      roundInProgress = true;
      playSound('flip');
      playRound(card, category);
    };
  });
}

function playRound(playerCard, category) {
  const playerValue = playerCard.categories[category];
  const computerCard = computerCards[0];
  const computerValue = computerCard.categories[category];

  updateUI();

  setTimeout(() => {
    showMessage(`You chose ${category}: ${playerValue}. Computer has ${computerValue}.`);

    playerRoundCards.push(playerCards.shift());
    computerRoundCards.push(computerCards.shift());

    if (playerValue > computerValue) {
      showMessage(`You win this round!`);
      playSound('win');
      playerCards.push(...playerRoundCards, ...computerRoundCards);
      playerRoundCards = [];
      computerRoundCards = [];
      currentPlayer = 'player';
    } else if (playerValue < computerValue) {
      showMessage(`You lose this round!`);
      computerCards.push(...playerRoundCards, ...computerRoundCards);
      playerRoundCards = [];
      computerRoundCards = [];
      currentPlayer = 'computer';
      setTimeout(cpuTurn, 1500);
    } else {
      showMessage(`It's a tie! Cards stay in the round.`);
      // Karten bleiben in Rundensammlungen, nächste Runde mit diesen Karten
      currentPlayer = 'player';
    }

    selectedCategory = null;
    roundInProgress = false;
    updateUI();
  }, 2000);
}

function cpuTurn() {
  if (playerCards.length === 0 || computerCards.length === 0) return;

  const cpuCard = computerCards[0];
  const categories = Object.keys(cpuCard.categories);
  const category = categories[Math.floor(Math.random() * categories.length)];
  selectedCategory = category;
  roundInProgress = true;
  playSound('flip');
  playRound(cpuCard, category);
}

function showMessage(msg) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
}