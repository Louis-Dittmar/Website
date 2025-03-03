// Feuerwerk-Effekte

// Liste aller verfügbaren Feuerwerke
const fireworkElements = [];

// Farben für Feuerwerke
const fireworkColors = ['red', 'green', 'blue', 'purple', 'gold'];

// Feuerwerke initialisieren
function initFireworks() {
  // Bestehende Feuerwerke entfernen
  const existingFireworks = document.querySelectorAll('.pyro');
  existingFireworks.forEach(elem => {
    elem.remove();
  });

  // 5 Feuerwerke erstellen
  for (let i = 1; i <= 5; i++) {
    createFirework(i);
  }
}

// Ein einzelnes Feuerwerk erstellen
function createFirework(index) {
  const firework = document.createElement('div');
  firework.id = `fireworks${index}`;
  firework.className = `pyro pyro${index} ${getRandomColor()}`;
  firework.style.display = 'none';

  // Feuerwerk-Elemente hinzufügen
  const before = document.createElement('div');
  before.className = 'before';

  const after = document.createElement('div');
  after.className = 'after';

  firework.appendChild(before);
  firework.appendChild(after);

  // Zum Body hinzufügen
  document.body.appendChild(firework);

  // In die Liste eintragen
  fireworkElements.push(firework);
}

// Zufällige Farbe auswählen
function getRandomColor() {
  return fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
}

// Alle Feuerwerke ausblenden
function hideAllFireworks() {
  fireworkElements.forEach(elem => {
    elem.style.display = 'none';
  });
}

// Zufällige Feuerwerke anzeigen
function showRandomFireworks(count = 2) {
  hideAllFireworks();

  // Feuerwerk-Farben zufällig ändern
  fireworkElements.forEach(elem => {
    elem.className = elem.className.replace(/red|green|blue|purple|gold/g, '');
    elem.classList.add(getRandomColor());
  });

  // Array-Indizes mischen
  const indices = fireworkElements.map((_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Zufällige Feuerwerke anzeigen
  for (let i = 0; i < Math.min(count, indices.length); i++) {
    fireworkElements[indices[i]].style.display = 'block';
  }

  // Nach einiger Zeit wieder ausblenden
  setTimeout(hideAllFireworks, 2500);
}

// Beim Laden der Seite Feuerwerke initialisieren
window.addEventListener('DOMContentLoaded', initFireworks);
