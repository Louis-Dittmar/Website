// Alle Date-Ideen mit Kategorien
const allDateIdeas = [
  // Romantisch
  {text: "Pralinen selber machen", categories: ["kreativ", "romantisch"]},
  {text: "Fotoshooting (er fotografiert sie)", categories: ["kreativ", "romantisch"]},
  {text: "Gegenseitiges Fotoshooting", categories: ["kreativ", "outdoor"]},
  {text: "Fotoshooting an cooler Location (altes Industriegebiet)", categories: ["kreativ", "abenteuer"]},
  {text: "Gemeinsamer IKEA/Möbelhaus-Besuch", categories: ["kreativ", "entspannt"]},
  {text: "Cocktails selbst mixen", categories: ["kreativ", "romantisch"]},
  {text: "Gemeinsam töpfern", categories: ["kreativ", "entspannt"]},
  {text: "Mit Fingerfarben malen", categories: ["kreativ", "romantisch"]},
  {text: "Landschaften malen", categories: ["kreativ", "entspannt"]},
  {text: "Portraits voneinander malen", categories: ["kreativ", "romantisch"]},

  // Aktiv
  {text: "Bladen oder Skaten gehen", categories: ["aktiv", "outdoor"]},
  {text: "Besuch in einer Rollerdisco", categories: ["aktiv", "abenteuer"]},
  {text: "Frisbee spielen", categories: ["aktiv", "outdoor"]},
  {text: "Badminton spielen", categories: ["aktiv", "outdoor"]},
  {text: "Tischtennis spielen", categories: ["aktiv", "outdoor"]},
  {text: "Speedminton spielen", categories: ["aktiv", "outdoor"]},
  {text: "Paintball spielen", categories: ["aktiv", "abenteuer"]},
  {text: "Erlebnispfade im Wald erkunden", categories: ["aktiv", "outdoor"]},
  {text: "Indoor Klettern", categories: ["aktiv", "abenteuer"]},
  {text: "Tretboot fahren", categories: ["aktiv", "romantisch", "outdoor"]},
  {text: "Ruderboot fahren", categories: ["aktiv", "romantisch", "outdoor"]},
  {text: "Mit dem Elektroboot fahren", categories: ["aktiv", "entspannt", "outdoor"]},
  {text: "Mit dem Schlauchboot fahren", categories: ["aktiv", "abenteuer", "outdoor"]},
  {text: "Schwimmen gehen", categories: ["aktiv", "outdoor"]},
  {text: "Nachtschwimmen", categories: ["aktiv", "romantisch", "abenteuer"]},
  {text: "Schwimmen im geschlossenen Freibad", categories: ["aktiv", "abenteuer", "romantisch"]},
  {text: "Schlittschuhlaufen", categories: ["aktiv", "romantisch"]},
  {text: "Schlittschuhlaufen mit Glühwein", categories: ["aktiv", "romantisch"]},
  {text: "Schlittschuhlaufen in der Innenstadt", categories: ["aktiv", "romantisch"]},
  {text: "Geocaching", categories: ["aktiv", "abenteuer", "outdoor"]},
  {text: "Crossgolfen", categories: ["aktiv", "outdoor"]},
  {text: "Probetanzstunde nehmen", categories: ["aktiv", "romantisch"]},
  {text: "Tanzparty oder Salsaparty besuchen", categories: ["aktiv", "romantisch"]},
  {text: "Billard spielen", categories: ["aktiv", "entspannt"]},
  {text: "Minigolf spielen", categories: ["aktiv", "entspannt"]},
  {text: "Skifahren gehen", categories: ["aktiv", "outdoor", "abenteuer"]},
  {text: "Snowboarden gehen", categories: ["aktiv", "outdoor", "abenteuer"]},
  {text: "Erlebnisbad besuchen", categories: ["aktiv", "entspannt"]},
  {text: "Miramar besuchen", categories: ["aktiv", "entspannt"]},
  {text: "Alpamare besuchen", categories: ["aktiv", "entspannt"]},
  {text: "Thermenbesuch", categories: ["aktiv", "entspannt", "romantisch"]},
  {text: "Schlittenfahren", categories: ["aktiv", "outdoor"]},
  {text: "Nacht-Schlittenfahren", categories: ["aktiv", "outdoor", "romantisch"]},
  {text: "Schlittenfahren mit Glühwein", categories: ["aktiv", "outdoor", "romantisch"]},
  {text: "Bowling spielen", categories: ["aktiv", "entspannt"]},
  {text: "Go-Kart fahren", categories: ["aktiv", "abenteuer"]},
  {text: "Tandem fahren", categories: ["aktiv", "outdoor", "romantisch"]},
  {text: "Drachen steigen lassen", categories: ["aktiv", "outdoor"]},
  {text: "Canyoning", categories: ["aktiv", "abenteuer", "outdoor"]},
  {text: "Schneemann oder Iglu bauen", categories: ["aktiv", "outdoor", "romantisch"]},
  {text: "Schneeballschlacht", categories: ["aktiv", "outdoor"]},
  {text: "Modellflugzeug fliegen", categories: ["aktiv", "outdoor"]},
  {text: "Modellschiff fahren", categories: ["aktiv", "outdoor"]},
  {text: "Modellauto fahren", categories: ["aktiv", "outdoor"]},
  {text: "Kitesurf Schnupperkurs", categories: ["aktiv", "abenteuer", "outdoor"]},
  {text: "Golf Schnupperstunden", categories: ["aktiv", "outdoor"]},
  {text: "Erdbeeren pflücken", categories: ["aktiv", "outdoor", "romantisch"]},

  // Chillig
  {text: "Café oder Coffee Shop besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Shisha Café besuchen", categories: ["entspannt"]},
  {text: "Lounge besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Gemütliche Bar besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Strandbar besuchen", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Gemeinsam shoppen gehen", categories: ["entspannt"]},
  {text: "Schaufensterbummel machen", categories: ["entspannt", "romantisch"]},
  {text: "Festival besuchen", categories: ["entspannt", "abenteuer"]},
  {text: "Flohmarktbummel", categories: ["entspannt", "kreativ"]},
  {text: "Gemeinsam Eis essen", categories: ["entspannt", "romantisch"]},
  {text: "Spaziergang im Park", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Spaziergang im Schlosspark", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Waldspaziergang", categories: ["entspannt", "outdoor"]},
  {text: "Nachtspaziergang mit Fackeln", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Wellnesstag zuhause", categories: ["entspannt", "romantisch"]},
  {text: "Wellnesstag im Hotel", categories: ["entspannt", "romantisch"]},
  {text: "Museumsbesuch", categories: ["entspannt", "kreativ"]},
  {text: "Museum mit Versuchsvorführungen", categories: ["entspannt", "kreativ"]},
  {text: "Interaktives Museum besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Ausstellung besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Körperwelten-Ausstellung besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Außergewöhnliche Ausstellung besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Interessante Messe besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Picknick mit Aussicht", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Picknick auf einem Dach", categories: ["entspannt", "romantisch", "abenteuer"]},
  {text: "Picknick in schöner Natur", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Picknick vor toller Kulisse", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Picknick im Maisfeld", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Stadtführung machen", categories: ["entspannt", "kreativ"]},
  {text: "Persönliche Stadtführung (von ihm für sie)", categories: ["entspannt", "romantisch", "kreativ"]},
  {text: "Biergarten besuchen", categories: ["entspannt"]},
  {text: "Ins Kino gehen", categories: ["entspannt", "romantisch"]},
  {text: "Open Air Kino besuchen", categories: ["entspannt", "romantisch", "outdoor"]},
  {text: "Autokino besuchen", categories: ["entspannt", "romantisch"]},
  {text: "3D/4D/IMAX-Kino besuchen", categories: ["entspannt", "abenteuer"]},
  {text: "Theater besuchen", categories: ["entspannt", "romantisch"]},
  {text: "In die Oper gehen", categories: ["entspannt", "romantisch"]},
  {text: "Musical besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Improtheater besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Improoper besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Schifffahrt machen", categories: ["entspannt", "romantisch"]},
  {text: "Sauna besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Saunalandschaft besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Türkisches Hamam besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Sushibar besuchen", categories: ["entspannt"]},
  {text: "Sushi-Fließband-Restaurant besuchen", categories: ["entspannt", "kreativ"]},
  {text: "Weihnachtsmarkt besuchen", categories: ["entspannt", "romantisch"]},
  {text: "Lokales Kulturangebot besuchen", categories: ["entspannt", "kreativ"]},
  {text: "DVD-Abend machen", categories: ["entspannt", "romantisch"]},
  {text: "DVD-Abend an ungewöhnlichen Orten (im Kombi/im Zelt)", categories: ["entspannt", "romantisch", "kreativ"]},
  {text: "Eishockeyspiel im Stadion anschauen", categories: ["entspannt", "abenteuer"]},
  {text: "Fußballspiel anschauen", categories: ["entspannt", "abenteuer"]},
  {text: "Formel 1 anschauen", categories: ["entspannt", "abenteuer"]},
  {text: "Pyjama-Party", categories: ["entspannt", "romantisch"]},
  {text: "Dinner zu Hause", categories: ["entspannt", "romantisch"]},
  {text: "Dinner von einem Mietkoch zubereiten lassen", categories: ["entspannt", "romantisch"]},
  {text: "Angeln gehen", categories: ["entspannt", "outdoor"]},
  {text: "Weinprobe machen", categories: ["entspannt", "romantisch"]},
  {text: "Brettspiele spielen", categories: ["entspannt", "kreativ"]},
  {text: "Floating ausprobieren", categories: ["entspannt"]},

  // Faszinierend
  {text: "Aussichtsplattform des Flughafens besuchen", categories: ["faszinierend", "entspannt"]},
  {text: "Aussichtsplattform auf Bergen besuchen", categories: ["faszinierend", "outdoor", "romantisch"]},
  {text: "Aussichtsplattform auf Gebäuden besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Aussichtsplattform bei Dunkelheit besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Planetarium besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Sternwarte besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Natürliche Sehenswürdigkeiten besichtigen", categories: ["faszinierend", "outdoor"]},
  {text: "Natürliche Sehenswürdigkeiten mit Proviant besichtigen", categories: ["faszinierend", "outdoor", "romantisch"]},
  {text: "Burg oder Schloss besichtigen", categories: ["faszinierend", "romantisch"]},
  {text: "Erlebnisrestaurant besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Lying Dinner erleben", categories: ["faszinierend", "romantisch"]},
  {text: "Restaurant auf Aussichtstürmen besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Dunkelrestaurant besuchen", categories: ["faszinierend", "abenteuer", "romantisch"]},
  {text: "Rittermahl erleben", categories: ["faszinierend", "abenteuer"]},
  {text: "Zirkus besuchen", categories: ["faszinierend", "entspannt"]},
  {text: "Hubschrauber-Rundflug", categories: ["faszinierend", "abenteuer", "romantisch"]},
  {text: "Rundflug mit kleinem Flieger", categories: ["faszinierend", "abenteuer", "romantisch"]},
  {text: "Aussichtsturm besuchen", categories: ["faszinierend", "romantisch"]},
  {text: "Ballonfahrt machen", categories: ["faszinierend", "abenteuer", "romantisch"]},
  {text: "Sterne beobachten", categories: ["faszinierend", "romantisch", "outdoor"]},
  {text: "Sterne mit Teleskop beobachten", categories: ["faszinierend", "romantisch", "outdoor"]},
  {text: "Salzbergwerk besichtigen", categories: ["faszinierend", "abenteuer"]},
  {text: "Nostalgiefotos machen lassen", categories: ["faszinierend", "kreativ", "romantisch"]},
  {text: "Escape Room besuchen", categories: ["faszinierend", "abenteuer"]},
  {text: "Indoor Skydiving ausprobieren", categories: ["faszinierend", "abenteuer"]},

  // Abenteuerlich
  {text: "Zoo besuchen", categories: ["abenteuer", "outdoor"]},
  {text: "Wildpark besuchen", categories: ["abenteuer", "outdoor"]},
  {text: "Alpentierpark besuchen", categories: ["abenteuer", "outdoor"]},
  {text: "Spielhalle besuchen", categories: ["abenteuer", "entspannt"]},
  {text: "Karaoke Bar besuchen", categories: ["abenteuer", "kreativ"]},
  {text: "Kissenschlacht machen", categories: ["abenteuer", "romantisch"]},
  {text: "Kasino besuchen", categories: ["abenteuer", "entspannt"]},
  {text: "Labyrinth im Maisfeld erkunden", categories: ["abenteuer", "outdoor", "romantisch"]},
  {text: "Kurztrip in die Berge", categories: ["abenteuer", "outdoor", "romantisch"]},
  {text: "Kurztrip nach Paris", categories: ["abenteuer", "romantisch"]},
  {text: "Kurztrip ans Meer", categories: ["abenteuer", "outdoor", "romantisch"]},
  {text: "Sommerrodelbahn ausprobieren", categories: ["abenteuer", "outdoor"]},
  {text: "Freizeitpark besuchen", categories: ["abenteuer", "romantisch"]},
  {text: "Westernpark besuchen", categories: ["abenteuer", "kreativ"]},
  {text: "Floßfahrt machen", categories: ["abenteuer", "outdoor", "romantisch"]},
  {text: "Bungee-Springen", categories: ["abenteuer", "outdoor"]},
  {text: "Rafting ausprobieren", categories: ["abenteuer", "outdoor"]},
  {text: "Bodyflying ausprobieren", categories: ["abenteuer"]},
  {text: "Fallschirmspringen", categories: ["abenteuer", "outdoor"]},
  {text: "Pilze suchen", categories: ["abenteuer", "outdoor"]},
  {text: "Ausflug ins Blaue machen", categories: ["abenteuer", "romantisch"]},
  {text: "Ritterfest besuchen", categories: ["abenteuer", "kreativ"]},
  {text: "Segway Tour machen", categories: ["abenteuer", "outdoor"]},
  {text: "Segeltour machen", categories: ["abenteuer", "outdoor", "romantisch"]},
  {text: "Hochseilgarten besuchen", categories: ["abenteuer", "outdoor"]}
];
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
// Hauptskript für den Date-Ideen Generator

document.addEventListener('DOMContentLoaded', function() {
  // DOM-Elemente
  const ideaButton = document.getElementById('ideaButton');
  const resultText = document.getElementById('resultText');
  const tags = document.querySelectorAll('.tag');
  const favoriteButton = document.getElementById('favoriteButton');
  const favoriteIcon = document.getElementById('favoriteIcon');
  const favoritesContainer = document.getElementById('favorites-container');
  const favoritesList = document.getElementById('favorites-list');
  const shareButton = document.getElementById('shareButton');
  const themeSwitch = document.getElementById('themeSwitch');
  const lightIcon = document.getElementById('lightIcon');
  const darkIcon = document.getElementById('darkIcon');
  const body = document.body;

  // Statusvariablen
  let isSpinning = false;
  let selectedCategory = null;
  let currentIdea = null;
  let favoriteIdeas = [];

// Beim Laden gespeicherte Favoriten abrufen
  function loadFavorites() {
    if (localStorage.getItem('favoriteIdeas')) {
      try {
        favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas'));
        if (favoriteIdeas.length > 0) {
          favoritesContainer.style.display = 'block';
          renderFavorites();
        }
      } catch (e) {
        console.error('Fehler beim Laden der Favoriten:', e);
        favoriteIdeas = [];
      }
    }
  }

// Kategorie-Filter initialisieren
  function initCategoryFilters() {
    tags.forEach(tag => {
      tag.addEventListener('click', function() {
        if (this.classList.contains('active')) {
          // Wenn bereits aktiv, dann deaktivieren
          this.classList.remove('active');
          selectedCategory = null;
        } else {
          // Alle anderen deaktivieren und diesen aktivieren
          tags.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          selectedCategory = this.getAttribute('data-category');
        }
      });
    });
  }

// Filtere Ideen nach ausgewählter Kategorie
  function getFilteredIdeas() {
    if (!selectedCategory) {
      return allDateIdeas;
    }

    return allDateIdeas.filter(idea =>
      idea.categories.includes(selectedCategory)
    );
  }

// Funktion zum Rendern der Favoriten
  function renderFavorites() {
    favoritesList.innerHTML = '';

    favoriteIdeas.forEach((idea, index) => {
      const favoriteTag = document.createElement('span');
      favoriteTag.className = 'tag';
      favoriteTag.textContent = idea.text;
      favoriteTag.addEventListener('click', () => {
        resultText.textContent = idea.text;
        currentIdea = idea;
        favoriteButton.style.display = 'inline-block';
        updateFavoriteButton();
      });

      favoritesList.appendChild(favoriteTag);
    });
  }

// Favoriten-Button aktualisieren
  function updateFavoriteButton() {
    if (!currentIdea) return;

    const isFavorite = favoriteIdeas.some(idea => idea.text === currentIdea.text);

    if (isFavorite) {
      favoriteIcon.textContent = '❤';
      favoriteButton.title = 'Von Favoriten entfernen';
      favoriteButton.setAttribute('data-action', 'remove');
    } else {
      favoriteIcon.textContent = '♡';
      favoriteButton.title = 'Als Favorit speichern';
      favoriteButton.setAttribute('data-action', 'add');
    }
  }

// Favorit hinzufügen oder entfernen
  function initFavoriteButton() {
    favoriteButton.addEventListener('click', function() {
      if (!currentIdea) return;

      const action = this.getAttribute('data-action');

      if (action === 'add') {
        // Zu Favoriten hinzufügen
        favoriteIdeas.push(currentIdea);
        favoritesContainer.style.display = 'block';
      } else {
        // Aus Favoriten entfernen
        favoriteIdeas = favoriteIdeas.filter(idea => idea.text !== currentIdea.text);
        if (favoriteIdeas.length === 0) {
          favoritesContainer.style.display = 'none';
        }
      }

      // Favoriten speichern und aktualisieren
      localStorage.setItem('favoriteIdeas', JSON.stringify(favoriteIdeas));
      renderFavorites();
      updateFavoriteButton();
    });
  }

// Teilen-Funktion initialisieren
  function initShareButton() {
    shareButton.addEventListener('click', function() {
      if (navigator.share && currentIdea) {
        navigator.share({
          title: 'Date Idee',
          text: currentIdea.text,
          url: window.location.href
        })
          .catch(error => console.log('Fehler beim Teilen:', error));
      } else {
        alert('Teilen-Funktion nicht verfügbar oder keine Idee ausgewählt');
      }
    });
  }

// Hauptfunktion zum Generieren einer zufälligen Idee
  function generateRandomIdea() {
    if (isSpinning) return;
    isSpinning = true;

    // Button-Animation
    ideaButton.disabled = true;
    ideaButton.textContent = "Generiere...";

    // Verstecke Feuerwerk
    hideAllFireworks();

    // Filtere Ideen nach Kategorie
    const filteredIdeas = getFilteredIdeas();

    // Falls keine passenden Ideen gefunden
    if (filteredIdeas.length === 0) {
      resultText.textContent = "Keine passenden Ideen gefunden. Wähle eine andere Kategorie.";
      ideaButton.disabled = false;
      ideaButton.textContent = "Date Idee finden";
      isSpinning = false;
      currentIdea = null;
      favoriteButton.style.display = 'none';
      return;
    }

    // Starte Animation durch schnelles Durchwechseln der Texte
    let counter = 0;
    const maxIterations = 15; // Etwas reduziert für Mobile
    const initialSpeed = 50; // ms

    function animateText() {
      // Text ausblenden
      resultText.style.opacity = '0';

      setTimeout(() => {
        // Zufällige Date-Idee auswählen
        const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
        const randomIdea = filteredIdeas[randomIndex];
        resultText.textContent = randomIdea.text;

        // Aktuelle Idee speichern
        if (counter === maxIterations - 1) {
          currentIdea = randomIdea;
        }

        // Text wieder einblenden
        resultText.style.opacity = '1';

        counter++;

        // Verlangsame die Geschwindigkeit gegen Ende
        const speed = initialSpeed + Math.floor(counter * counter / 4);

        if (counter < maxIterations) {
          setTimeout(animateText, speed);
        } else {
          // Animation beenden und Feuerwerk anzeigen
          setTimeout(() => {
            // Mehrere Feuerwerke anzeigen
            showRandomFireworks(3);

            ideaButton.disabled = false;
            ideaButton.textContent = "Date Idee finden";
            isSpinning = false;

            // Favoriten-Button anzeigen
            favoriteButton.style.display = 'inline-block';
            updateFavoriteButton();
          }, 500);
        }
      }, 100);
    }

    animateText();
  }

  // Initialisiere die App
  loadFavorites();
  initCategoryFilters();
  initFavoriteButton();
  initShareButton();

  // Event Listener für den Ideen-Button hinzufügen
  ideaButton.addEventListener('click', generateRandomIdea);

  // Dark Mode / Light Mode Toggle
  themeSwitch.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');

    // Icons umschalten
    lightIcon.style.display = isDarkMode ? 'block' : 'none';
    darkIcon.style.display = isDarkMode ? 'none' : 'block';

    // Speichere Einstellung
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Dark Mode aus dem Local Storage laden
  if(localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
  } else {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  }
});
