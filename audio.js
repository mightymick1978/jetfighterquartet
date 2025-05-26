// audio.js

const sounds = {
  flip: new Audio('flip.mp3'),
  win: new Audio('win_sound.mp3')
};

let soundEnabled = true;

function playSound(name) {
  if (!soundEnabled) return;
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(e => {
      console.warn(`Sound ${name} konnte nicht abgespielt werden:`, e);
    });
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle');
  btn.textContent = soundEnabled ? '🔊 Sound an' : '🔇 Sound aus';
}