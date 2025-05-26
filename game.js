// game.js

let selectedCategory = null;
let playerCards = [];
let computerCards = [];
let currentPlayer = 'player';

function startGame() {
  const deck = [...cards];
  shuffle(deck);
  playerCards = deck.slice(0, deck.length / 2);
  computerCards = deck.slice(deck.length / 2);

  currentPlayer = 'player';
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
  renderCards(playerCards, gameBoard);
  addCardClickListeners();
}

function addCardClickListeners() {
  const cardsOnBoard = document.querySelectorAll('#game-board .card');
  cardsOnBoard.forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      if (currentPlayer === 'player') {
        const cardId = parseInt(cardEl.dataset.id);
        const card = playerCards.find(c => c.id === cardId);
        if (card) {
          // Player selects category on their card
          if (!selectedCategory) {
            selectedCategory = promptCategory(card);
            if (selectedCategory) {
              playRound(card, selectedCategory);
            }
          }
        }
      }
    });
  });
}

function promptCategory(card) {
  const categories = Object.keys(card.categories);
  let category = prompt(`Select category:\n${categories.join('\n')}`);
  if (categories.includes(category)) {
    return category;
  } else {
    alert('Invalid category selected.');
    return null;
  }
}

function playRound(playerCard, category) {
  const playerValue = playerCard.categories[category];
  const computerCard = computerCards[0];
  const computerValue = computerCard.categories[category];

  showMessage(`You chose ${category}: ${playerValue}. Computer has ${computerValue}.`);

  if (playerValue > computerValue) {
    playerCards.push(computerCard);
    computerCards.shift();
    showMessage(`You win this round! You take the computer's card.`);
  } else if (playerValue < computerValue) {
    computerCards.push(playerCard);
    playerCards = playerCards.filter(c => c.id !== playerCard.id);
    showMessage(`You lose this round! Computer takes your card.`);
  } else {
    showMessage(`It's a tie! No cards exchanged.`);
  }

  selectedCategory = null;
  currentPlayer = 'player';

  if (playerCards.length === 0) {
    showMessage("You lost the game!");
  } else if (computerCards.length === 0) {
    showMessage("You won the game!");
  } else {
    updateUI();
  }
}

function showMessage(msg) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
}