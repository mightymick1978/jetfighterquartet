let audioContext;
let flipSound;
let winSound;
let muted = false;

export function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Lade Soundeffekte
    loadSound("flip.mp3").then(buffer => flipSound = buffer);
    loadSound("win_sound.mp3").then(buffer => winSound = buffer);

  } catch (e) {
    console.warn('Web Audio API wird in diesem Browser nicht unterstützt.');
  }
}

async function loadSound(filename) {
  try {
    const response = await fetch(`sounds/${filename}`);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error(`Fehler beim Laden der Sounddatei ${filename}:`, error);
    return null;
  }
}

export function playFlipSound() {
  if (!flipSound || muted) return;
  playSound(flipSound);
}

export function playWinSound() {
  if (!winSound || muted) return;
  playSound(winSound);
}

function playSound(audioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}

export function toggleMute() {
  muted = !muted;
}

export function isMuted() {
  return muted;
}