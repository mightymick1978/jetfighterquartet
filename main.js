import * as Game from './game.js';
import * as Audio from './audio.js';
import * as Cards from './cards_data.js';

document.addEventListener('DOMContentLoaded', () => {
  Audio.initAudio();
  Game.initGame(Cards.jetfighters);

  const volumeIcon = document.getElementById('volume-icon');
  if (volumeIcon) {
    volumeIcon.addEventListener('click', () => {
      Audio.toggleMute();
      volumeIcon.src = Audio.isMuted() ? 'images/volume_off.png' : 'images/volume_on.png';
    });
  }
});