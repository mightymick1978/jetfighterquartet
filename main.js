import * as Game from './game.js';
import * as Audio from './audio.js';
import * as Cards from './cards_data.js';
import * as UI from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  Audio.initAudio();
  Game.initGame(Cards.jetfighters);

  document.getElementById('volume-icon').addEventListener('click', () => {
    Audio.toggleMute();
    document.getElementById('volume-icon').src = Audio.isMuted() ? 'images/volume_off.png' : 'images/volume_on.png';
  });
});