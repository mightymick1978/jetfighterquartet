// Kein Import von canvas-confetti, da es global geladen wird

const playerCardSlot = document.getElementById('player-card-slot');
const cpuCardSlot = document.getElementById('cpu-card-slot');
const playerCardCountEl = document.getElementById('player-card-count');
const cpuCardCountEl = document.getElementById('cpu-card-count');
const gameMessageEl = document.getElementById('game-message');

let currentStatClickHandler = null;

// Zeigt die Spielerkarte an und macht die Werte anklickbar
export function renderPlayerCard(cardData, statClickHandler) {
  currentStatClickHandler = statClickHandler;
  playerCardSlot.innerHTML = createCardHTML(cardData, 'player', false);
  if (statClickHandler) {
    // Statistiken anklickbar machen
    playerCardSlot.querySelectorAll('.card ul li').forEach(li => {
      li.addEventListener('click', () => {
        if (currentStatClickHandler) {
          currentStatClickHandler(li.dataset.statKey);
        }
      });
    });
  }
}

// Zeigt die CPU-Karte an (Werte nicht anklickbar)
export function renderCpuCard(cardData, isFaceUp) {
  cpuCardSlot.innerHTML = createCardHTML(cardData, 'cpu', !isFaceUp);
}

// "Dreht" die CPU-Karte um (zeigt Werte an)
export function flipCpuCard(cardData) {
  cpuCardSlot.innerHTML = createCardHTML(cardData, 'cpu', false);
}

// Erstellt das HTML für eine Karte
function createCardHTML(cardData, playerType, isFlipped) {
  if (!cardData) {
    return `<div class="card">No card data</div>`;
  }
  // Karte aufbauen
  let statsList = '';
  for (const key in cardData.stats) {
    const stat = cardData.stats[key];
    statsList += `<li data-stat-key="${key}">
      <span class="stat-label">${stat.label}:</span>
      <span class="stat-value">${stat.value} ${stat.unit || ''}</span>
    </li>`;
  }
  return `
    <div class="card${isFlipped ? ' flipped' : ''}">
      <div class="card-face card-front">
        <div class="card-image-container">
          <img src="images/${cardData.image}" alt="${cardData.name}" />
        </div>
        <h3>${cardData.name}</h3>
        <ul>
          ${statsList}
        </ul>
      </div>
      <div class="card-face card-back">
        <img src="images/card_back.png" alt="Card Back" />
      </div>
    </div>
  `;
}

// Aktualisiert die Kartenzähler
export function updateCardCounts(playerCount, cpuCount) {
  playerCardCountEl.textContent = `Your Cards: ${playerCount}`;
  cpuCardCountEl.textContent = `CPU Cards: ${cpuCount}`;
}

// Zeigt Nachrichten im Spiel an
export function displayMessage(msg) {
  gameMessageEl.textContent = msg;
}

// Hebt das gewählte Stat hervor (nur bei der Karte des Choosers)
export function highlightStat(statKey, chooser, playerValue, cpuValue) {
  if (chooser === 'player') {
    playerCardSlot.querySelectorAll('.card ul li').forEach(li => {
      if (li.dataset.statKey === statKey) li.classList.add('highlight-win');
    });
  } else {
    cpuCardSlot.querySelectorAll('.card ul li').forEach(li => {
      if (li.dataset.statKey === statKey) li.classList.add('highlight-win');
    });
  }
}

// Hebt Gewinner und Verlierer hervor
export function highlightWinningLosingStats(statKey, playerValue, cpuValue, winner) {
  // Spielerkarte
  playerCardSlot.querySelectorAll('.card ul li').forEach(li => {
    if (li.dataset.statKey === statKey) {
      if (winner === 'player') {
        li.classList.add('highlight-win');
      } else if (winner === 'cpu') {
        li.classList.add('highlight-lose');
      }
    }
  });
  // CPU-Karte
  cpuCardSlot.querySelectorAll('.card ul li').forEach(li => {
    if (li.dataset.statKey === statKey) {
      if (winner === 'cpu') {
        li.classList.add('highlight-win');
      } else if (winner === 'player') {
        li.classList.add('highlight-lose');
      }
    }
  });
}

// Entfernt alle Hervorhebungen
export function clearHighlights() {
  document.querySelectorAll('.highlight-win, .highlight-lose').forEach(el => {
    el.classList.remove('highlight-win', 'highlight-lose');
  });
}

// Feuerwerk bei Sieg
export function showFireworks() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// "Play Again"-Button anzeigen
export function showPlayAgainButton(restartFunction, cardsData) {
  const area = document.getElementById('message-area');
  const btn = document.createElement('button');
  btn.textContent = 'Play Again';
  btn.onclick = () => {
    btn.remove();
    restartFunction(cardsData);
  };
  area.appendChild(btn);
}