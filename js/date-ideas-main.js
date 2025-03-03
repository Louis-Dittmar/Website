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
