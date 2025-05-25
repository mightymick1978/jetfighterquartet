import * as ui from './ui.js';
import * as game from './game.js';

const nextRoundBtn = document.getElementById('next-round-btn');

function onStatSelected(statKey) {
  game.playRound(statKey);
}

function init() {
  game.initGame(ui, onStatSelected);
  nextRoundBtn.addEventListener('click', () => {
    game.nextRound();
  });
}

document.addEventListener('DOMContentLoaded', init);