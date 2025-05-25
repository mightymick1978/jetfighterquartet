import * as Audio from './audio.js';

const playerCardSlot = document.getElementById('player-card-slot');
const cpuCardSlot = document.getElementById('cpu-card-slot');
const playerCardCount = document.getElementById('player-card-count');
const cpuCardCount = document.getElementById('cpu-card-count');
const gameMessage = document.getElementById('game-message');

export function renderPlayerCard(card, onStatClick) {
  playerCardSlot.innerHTML = createCardHTML(card, true, onStatClick);
}

export function renderCpuCard(card, flipped) {
  cpuCardSlot.innerHTML = createCardHTML(card, flipped, null);
}

function createCardHTML(card, showStats, onStatClick) {
  let statsHTML = '';
  if (showStats) {
    for (const key in card.stats) {
      const stat = card.stats[key];
      statsHTML += `<div class="stat" data-key="${key}">${stat.label}: ${stat.value} ${stat.unit}</div>`;
    }
  } else {
    statsHTML = '<div class="card-back"></div>';
  }

  const cardHTML = `
    <div class="card">
      <img src="${card.image}" alt="${card.name}" class="card-image" />
      <h3>${card.name}</h3>
      <div class="stats">${statsHTML}</div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = cardHTML;

  if (showStats && onStatClick) {
    const statElements = container.querySelectorAll('.stat');
    statElements.forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        Audio.playFlipSound();
        onStatClick(el.getAttribute('data-key'));
      });
    });
  }

  return container.innerHTML;
}

export function updateCardCounts(playerCount, cpuCount) {
  playerCardCount.textContent = `Deine Karten: ${playerCount}`;
  cpuCardCount.textContent = `CPU Karten: ${cpuCount}`;
}

export function displayMessage(message) {
  gameMessage.textContent = message;
}

export function clearHighlights() {
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    stat.style.backgroundColor = '';
    stat.style.color = '';
  });
}

export function highlightStat(statKey, chooser, playerValue, cpuValue) {
  const playerStats = playerCardSlot.querySelectorAll('.stat');
  const cpuStats = cpuCardSlot.querySelectorAll('.stat');

  playerStats.forEach(stat => {
    if (stat.getAttribute('data-key') === statKey) {
      stat.style.backgroundColor = chooser === 'player' ? 'lightgreen' : 'lightcoral';
      stat.style.fontWeight = 'bold';
    }
  });

  cpuStats.forEach(stat => {
    if (stat.getAttribute('data-key') === statKey) {
      stat.style.backgroundColor = chooser === 'cpu' ? 'lightgreen' : 'lightcoral';
      stat.style.fontWeight = 'bold';
    }
  });
}

export function highlightWinningLosingStats(statKey, playerValue, cpuValue, winner) {
  const playerStats = playerCardSlot.querySelectorAll('.stat');
  const cpuStats = cpuCardSlot.querySelectorAll('.stat');

  playerStats.forEach(stat => {
    if (stat.getAttribute('data-key') === statKey) {
      stat.style.backgroundColor = winner === 'player' ? 'green' : 'red';
      stat.style.color = 'white';
      stat.style.fontWeight = 'bold';
    }
  });

  cpuStats.forEach(stat => {
    if (stat.getAttribute('data-key') === statKey) {
      stat.style.backgroundColor = winner === 'cpu' ? 'green' : 'red';
      stat.style.color = 'white';
      stat.style.fontWeight = 'bold';
    }
  });
}

export function flipCpuCard(card) {
  // Ersetze die Rückseite durch die Vorderseite der CPU-Karte
  cpuCardSlot.innerHTML = createCardHTML(card, true, null);
}

export function showPlayAgainButton(restartCallback, cards) {
  const messageArea = document.getElementById('message-area');
  const button = document.createElement('button');
  button.textContent = 'Nochmal spielen';
  button.addEventListener('click', () => {
    button.remove();
    restartCallback(cards);
  });
  messageArea.appendChild(button);
}

export function showFireworks() {
  if (window.confetti) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}