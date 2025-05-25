import * as UI from './ui.js';      // Für die Anzeige und Interaktion
import * as Audio from './audio.js'; // Für Soundeffekte

let playerCards = [];
let cpuCards = [];
let isPlayerTurnToChoose = true; // Spieler startet
let currentChosenStatKey = null;
let gameOver = false;
let allCardsData = [];

// Die vier Kategorien deines Jetfighter-Quartetts
const STAT_KEYS = {
  SPEED: 'speed',
  POWER: 'power',
  CEILING: 'ceiling',
  RANGE: 'range'
};

// Vergleicht zwei Werte, gibt Gewinner zurück
function compareStats(playerValue, cpuValue) {
  if (playerValue > cpuValue) return 'player';
  if (cpuValue > playerValue) return 'cpu';
  return 'draw';
}

// Initialisiert das Spiel mit den übergebenen Karten
export function initGame(cardsData) {
  allCardsData = cardsData;
  gameOver = false;

  // Karten mischen und aufteilen
  const shuffledCards = [...allCardsData].sort(() => Math.random() - 0.5);
  playerCards = [];
  cpuCards = [];
  shuffledCards.forEach((card, index) => {
    if (index % 2 === 0) {
      playerCards.push(card);
    } else {
      cpuCards.push(card);
    }
  });

  isPlayerTurnToChoose = true; // Spieler beginnt
  UI.updateCardCounts(playerCards.length, cpuCards.length);
  startRound();
}

// Startet eine neue Runde
function startRound() {
  if (gameOver) return;

  if (playerCards.length === 0) {
    endGame(false); // Spieler hat verloren
    return;
  }
  if (cpuCards.length === 0) {
    endGame(true); // Spieler hat gewonnen
    return;
  }

  UI.clearHighlights();
  currentChosenStatKey = null;

  const playerTopCard = playerCards[0];
  const cpuTopCard = cpuCards[0];

  UI.renderPlayerCard(playerTopCard, handleStatClick);
  UI.renderCpuCard(cpuTopCard, !isPlayerTurnToChoose); // CPU-Karte verdeckt, außer CPU wählt

  if (isPlayerTurnToChoose) {
    UI.displayMessage("Your turn: Select a category from your card.");
  } else {
    UI.displayMessage("CPU is choosing a category...");
    UI.renderPlayerCard(playerTopCard, null); // Spielerkarte nicht anklickbar
    setTimeout(cpuChooseStat, 1500); // CPU "denkt" kurz nach
  }
}

// Wird aufgerufen, wenn Spieler eine Kategorie auswählt
function handleStatClick(statKey) {
  if (!isPlayerTurnToChoose || gameOver || currentChosenStatKey) return;
  currentChosenStatKey = statKey;
  Audio.playSound('flip');
  UI.flipCpuCard(cpuCards[0]);
  UI.highlightStat(statKey, 'player', playerCards[0].stats[statKey].value, cpuCards[0].stats[statKey].value);
  setTimeout(() => resolveRound(statKey), 1000);
}

// CPU wählt die beste Kategorie ihrer Karte
function cpuChooseStat() {
  if (gameOver || isPlayerTurnToChoose) return;
  const cpuTopCard = cpuCards[0];
  let bestStatKey = STAT_KEYS.SPEED;
  let maxStatValue = -Infinity;

  // CPU sucht die Kategorie mit dem höchsten Wert
  for (const key in cpuTopCard.stats) {
    if (cpuTopCard.stats[key].value > maxStatValue) {
      maxStatValue = cpuTopCard.stats[key].value;
      bestStatKey = key;
    }
  }

  currentChosenStatKey = bestStatKey;
  UI.displayMessage(`CPU chose: ${cpuTopCard.stats[bestStatKey].label}`);
  UI.highlightStat(bestStatKey, 'cpu', playerCards[0].stats[bestStatKey].value, cpuTopCard.stats[bestStatKey].value);
  setTimeout(() => resolveRound(bestStatKey), 1000);
}

// Runde auswerten
function resolveRound(statKey) {
  if (gameOver) return;

  const playerCard = playerCards[0];
  const cpuCard = cpuCards[0];
  const playerValue = playerCard.stats[statKey].value;
  const cpuValue = cpuCard.stats[statKey].value;
  const roundWinner = compareStats(playerValue, cpuValue);

  UI.highlightWinningLosingStats(statKey, playerValue, cpuValue, roundWinner);

  let message = '';
  if (roundWinner === 'player') {
    message = `You win this round! ${playerCard.stats[statKey].label}: ${playerValue} vs ${cpuValue}.`;
    isPlayerTurnToChoose = true;
  } else if (roundWinner === 'cpu') {
    message = `CPU wins this round! ${cpuCard.stats[statKey].label}: ${cpuValue} vs ${playerValue}.`;
    isPlayerTurnToChoose = false;
  } else {
    message = `It's a draw! ${playerCard.stats[statKey].label}: ${playerValue} vs ${cpuValue}.`;
    // Bei Unentschieden bleibt der Chooser gleich
  }

  UI.displayMessage(message);
  setTimeout(() => processRoundEnd(roundWinner), 2500);
}

// Nach der Runde: Karten verschieben und nächste Runde starten
function processRoundEnd(winner) {
  if (gameOver) return;

  const playerTopCard = playerCards.shift();
  const cpuTopCard = cpuCards.shift();

  if (winner === 'player') {
    playerCards.push(playerTopCard, cpuTopCard);
  } else if (winner === 'cpu') {
    cpuCards.push(cpuTopCard, playerTopCard);
  } else { // Unentschieden
    playerCards.push(playerTopCard);
    cpuCards.push(cpuTopCard);
  }

  UI.updateCardCounts(playerCards.length, cpuCards.length);

  if (playerCards.length === 0 || cpuCards.length === 0) {
    endGame(playerCards.length > 0);
  } else {
    startRound();
  }
}

// Spielende
function endGame(playerWon) {
  gameOver = true;
  if (playerWon) {
    UI.displayMessage("Congratulations! You've won all the cards!");
    UI.showFireworks();
    Audio.playSound('win_sound');
  } else {
    UI.displayMessage("CPU has won all the cards. Better luck next time!");
  }
  // "Play Again"-Button anzeigen
  UI.showPlayAgainButton(initGame, allCardsData);
}
