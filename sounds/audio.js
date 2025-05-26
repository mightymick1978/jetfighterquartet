// audio.js

const sounds = {
  flip: new Audio('flip.mp3'),
  win: new Audio('win_sound.mp3')
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0; // Start von Anfang
    sounds[name].play().catch(e => {
      // Fehlerbehandlung, z.B. wenn Autoplay blockiert wird
      console.warn(`Sound ${name} konnte nicht abgespielt werden:`, e);
    });
  } else {
    console.warn(`Sound ${name} nicht gefunden.`);
  }
}

// Beispiel: playSound('flip'); playSound('win');