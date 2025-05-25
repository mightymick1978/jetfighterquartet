import * as UI from './ui.js';
import * as Audio from './audio.js';

let playerDeck = [];
let cpuDeck = [];
let currentPlayerCard = null;
let currentCpuCard = null;
let currentChooser = 'player'; // 'player' oder 'cpu'
let cardsData = [];

export function initGame(cards) {
  cardsData = [...cards];
  shuffle(cardsData);
  // Karten aufteilen
  playerDeck = cardsData.filter((_, i) => i % 2 === 0);
  cpuDeck = cardsData.filter((_, i) => i % 2 !== 0);
  currentChooser = 'player';
  UI.updateCardCounts(playerDeck.length, cpuDeck.length);
  UI.displayMessage("Wähle eine Statistik aus deiner Karte.");
  nextRound();
}

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextRound() {
  UI.clearHighlights();

  if (playerDeck.length === 0) {
    UI.displayMessage("Du hast verloren!");
    UI.showPlayAgainButton(initGame, cardsData);
    return;
  }
  if (cpuDeck.length === 0) {
    UI.displayMessage("Du hast gewonnen!");
    UI.showFireworks();
    UI.showPlayAgainButton(initGame, cardsData);
    return;
  }

  currentPlayerCard = playerDeck[0];
  currentCpuCard = cpuDeck[0];

  UI.renderPlayerCard(currentPlayerCard, statKey => {
    if (currentChooser !== 'player') return; // Nur Spieler darf wählen
    playRound(statKey);
  });

  UI.renderCpuCard(currentCpuCard, false);
  UI.updateCardCounts(playerDeck.length, cpuDeck.length);
  UI.displayMessage(currentChooser === 'player' ? "Wähle eine Statistik aus." : "CPU wählt eine Statistik...");
  
  if (currentChooser === 'cpu') {
    // CPU wählt zufällig eine Statistik nach kurzer Verzögerung
    setTimeout(() => {
      const statKeys = Object.keys(currentCpuCard.stats);
      const chosenStat = statKeys[Math.floor(Math.random() * statKeys.length)];
      playRound(chosenStat);
    }, 1500);
  }
}

function playRound(statKey) {
  UI.clearHighlights();
  UI.highlightStat(statKey, currentChooser, currentPlayerCard.stats[statKey].value, currentCpuCard.stats[statKey].value);
  UI.flipCpuCard(currentCpuCard);

  const playerValue = currentPlayerCard.stats[statKey].value;
  const cpuValue = currentCpuCard.stats[statKey].value;

  let winner = null;
  if (playerValue > cpuValue) {
    winner = 'player';
  } else if (cpuValue > playerValue) {
    winner = 'cpu';
  }

  if (winner === null) {
    UI.displayMessage(`Unentschieden bei ${statKey}. Karten bleiben.`);
    // Keine Kartenverschiebung, nächste Runde mit gleichem Spieler
  } else {
    UI.highlightWinningLosingStats(statKey, playerValue, cpuValue, winner);
    UI.displayMessage(`${winner === 'player' ? 'Du' : 'CPU'} gewinnt die Runde mit ${statKey}!`);
    Audio.playWinSound();

    if (winner === 'player') {
      // Spieler gewinnt: nimmt CPU-Karte
      playerDeck.push(cpuDeck.shift());
      playerDeck.push(playerDeck.shift());
      currentChooser = 'player';
    } else {
      // CPU gewinnt: nimmt Spieler-Karte
      cpuDeck.push(playerDeck.shift());
      cpuDeck.push(cpuDeck.shift());
      currentChooser = 'cpu';
    }
  }

  UI.updateCardCounts(playerDeck.length, cpuDeck.length);

  // Kurze Pause vor nächster Runde
  setTimeout(nextRound, 2000);
}