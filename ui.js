const playerCardSlot = document.getElementById('player-card-slot');
const cpuCardSlot = document.getElementById('cpu-card-slot');
const messageDiv = document.getElementById('game-message');
const playerCardCountDiv = document.getElementById('player-card-count');
const cpuCardCountDiv = document.getElementById('cpu-card-count');
const volumeIcon = document.getElementById('volume-icon');

let soundOn = true;

export function renderPlayerCard(card, onStatClick) {
  playerCardSlot.innerHTML = createCardHTML(card, true, onStatClick);
}

export function renderCpuCard(card) {
  cpuCardSlot.innerHTML = createCardHTML(card, false);
}

function createCardHTML(card, showStats, onStatClick) {
  let statsHTML = '';
  if (showStats) {
    for (const key in card.stats) {
      const stat = card.stats[key];
      statsHTML += `<div class="stat" data-key="${key}">${stat.label}: ${stat.value} ${stat.unit}</div>`;
    }
  } else {
    statsHTML = '<div class="card-back">?</div>';
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
        onStatClick(el.getAttribute('data-key'));
      });
    });
  }

  return container.innerHTML;
}

export function showMessage(text) {
  messageDiv.textContent = text;
}

export function updateCardCounts(playerCount, cpuCount) {
  playerCardCountDiv.textContent = `Deine Karten: ${playerCount}`;
  cpuCardCountDiv.textContent = `CPU Karten: ${cpuCount}`;
}

export function highlightStat(key, isWinner) {
  // Entferne vorherige Hervorhebungen
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    stat.classList.remove('selected');
    stat.style.backgroundColor = '';
  });

  // Füge Hervorhebung hinzu
  const statToHighlight = document.querySelector(`.stat[data-key="${key}"]`);
  if (statToHighlight) {
    statToHighlight.classList.add('selected');
    statToHighlight.style.backgroundColor = isWinner ? '#a0ffa0' : '#ffa0a0';
  }
}

export function toggleVolumeIcon() {
  if (!volumeIcon) return;
  if (soundOn) {
    volumeIcon.src = 'images/volume_off.png';
    volumeIcon.alt = 'Sound aus';
    volumeIcon.title = 'Sound aus';
  } else {
    volumeIcon.src = 'images/volume_on.png';
    volumeIcon.alt = 'Sound an';
    volumeIcon.title = 'Sound an';
  }
  soundOn = !soundOn;
}

export function isSoundOn() {
  return soundOn;
}

// Lautstärkesteuerung Event-Listener setzen
if (volumeIcon) {
  volumeIcon.style.cursor = 'pointer';
  volumeIcon.addEventListener('click', () => {
    toggleVolumeIcon();
    // Hier kannst du weitere Sound-Logik anstoßen, z.B. Audio stummschalten
  });
}