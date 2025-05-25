import { jetfighters } from './cards_data.js';

let playerDeck = [];
let cpuDeck = [];
let currentPlayerCard = null;
let currentCpuCard = null;
let uiModule = null;
let statSelectedCallback = null;
let roundInProgress = false;

export function initGame(ui, onStatClick) {
  uiModule = ui;
  statSelectedCallback = onStatClick;

  // Karten mischen und aufteilen
  const shuffled = shuffleArray([...jetfighters]);
  const half = Math.ceil(shuffled.length / 2);
  playerDeck = shuffled.slice(0, half);
  cpuDeck = shuffled.slice(half);

  uiModule.updateCardCounts(playerDeck.length, cpuDeck.length);
  uiModule.showMessage('Wähle eine Eigenschaft, um zu starten.');

  roundInProgress = false;
  showCurrentCards(false);
}

export function playRound(statKey) {
  if (roundInProgress) return; // Verhindere Mehrfachklicks
  roundInProgress = true;

  if (!currentPlayerCard || !currentCpuCard) {
    uiModule.showMessage('Keine Karten zum Spielen.');
    roundInProgress = false;
    return;
  }

  const playerValue = currentPlayerCard.stats[statKey].value;
  const cpuValue = currentCpuCard.stats[statKey].value;

  uiModule.highlightStat(statKey, true);

  if (playerValue > cpuValue) {
    // Spieler gewinnt
    playerDeck.push(currentCpuCard);
    uiModule.showMessage(`Du gewinnst diese Runde mit ${statKey}!`);
  } else if (playerValue < cpuValue) {
    // CPU gewinnt
    cpuDeck.push(currentPlayerCard);
    uiModule.showMessage(`CPU gewinnt diese Runde mit ${statKey}.`);
  } else {
    // Unentschieden: beide Karten zurück ins Deck
    playerDeck.push(currentPlayerCard);
    cpuDeck.push(currentCpuCard);
    uiModule.showMessage('Unentschieden! Beide behalten ihre Karten.');
  }

  // Karten entfernen
  playerDeck.shift();
  cpuDeck.shift();

  uiModule.updateCardCounts(playerDeck.length, cpuDeck.length);

  // Prüfen ob Spiel vorbei
  if (playerDeck.length === 0) {
    uiModule.showMessage('Du hast verloren! Spiel vorbei.');
    roundInProgress = false;
    return;
  } else if (cpuDeck.length === 0) {
    uiModule.showMessage('Du hast gewonnen! Spiel vorbei.');
    roundInProgress = false;
    return;
  }

  // Karten anzeigen für nächste Runde
  showCurrentCards(true);
  roundInProgress = false;
}

export function nextRound() {
  if (roundInProgress) return;

  if (playerDeck.length === 0 || cpuDeck.length === 0) {
    uiModule.showMessage('Das Spiel ist vorbei. Bitte neu laden.');
    return;
  }

  showCurrentCards(true);
  uiModule.showMessage('Wähle eine Eigenschaft.');
}

function showCurrentCards(showPlayerStats) {
  currentPlayerCard = playerDeck[0];
  currentCpuCard = cpuDeck[0];

  uiModule.renderPlayerCard(currentPlayerCard, statSelectedCallback);
  if (showPlayerStats) {
    uiModule.renderCpuCard(currentCpuCard);
  } else {
    // CPU Karte verdeckt anzeigen
    uiModule.renderCpuCard(null);
  }
}

// Hilfsfunktion zum Mischen
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}