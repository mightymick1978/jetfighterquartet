// game.js

let selectedCategory = null;
let playerCards = [];
let computerCards = [];
let currentPlayer = 'player';
let roundInProgress = false;

// Arrays für aktuell gespielte Karten in der Runde
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
    return;
  }
  if (computerCards.length === 0) {
    showMessage("You won the game!");
    return;
  }

  // Zeige die oberste Karte des Spielers (aktuelle Karte der Runde)
  const playerCard = playerCards[0];
  const playerCardEl = createCardElement(playerCard, false, selectedCategory);
  gameBoard.appendChild(playerCardEl);

  // Zeige die oberste Karte des Gegners (verdeckt, wenn noch nicht gespielt)
  const computerCard = computerCards[0];
  const computerCardEl = createCardElement(computerCard, !roundInProgress, selectedCategory, true);
  gameBoard.appendChild(computerCardEl);

  if (!roundInProgress) {
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
    p.addEventListener('click', () => {
      if (roundInProgress) return;
      const category = p.querySelector('strong').textContent.replace(':', '');
      selectedCategory = category;
      roundInProgress = true;
      playRound(card, category);
    });
  });
}

function playRound(playerCard, category) {
  const playerValue = playerCard.categories[category];
  const computerCard = computerCards[0];
  const computerValue = computerCard.categories[category];

  updateUI(); // Zeige Karten mit Hervorhebung und Gegnerkarte aufgedeckt

  setTimeout(() => {
    showMessage(`You chose ${category}: ${playerValue}. Computer has ${computerValue}.`);

    // Karten aus den Stapeln entfernen und in Rundensammlungen legen
    playerRoundCards.push(playerCards.shift());
    computerRoundCards.push(computerCards.shift());

    if (playerValue > computerValue) {
      showMessage(`You win this round!`);
      // Gewinner bekommt beide Karten ans Ende seines Stapels
      playerCards.push(...playerRoundCards, ...computerRoundCards);
      playerRoundCards = [];
      computerRoundCards = [];
    } else if (playerValue < computerValue) {
      showMessage(`You lose this round!`);
      computerCards.push(...playerRoundCards, ...computerRoundCards);
      playerRoundCards = [];
      computerRoundCards = [];
    } else {
      showMessage(`It's a tie! Cards stay in the round.`);
      // Karten bleiben in Rundensammlungen, nächste Runde mit diesen Karten
      // Keine Karten werden verteilt, Spieler spielt erneut mit oberster Karte
    }

    selectedCategory = null;
    roundInProgress = false;
    updateUI();
  }, 2000);
}

function showMessage(msg) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
}