(function () {
  // Jahresvariable (einfach anpassen):
  const year = 2024;

  // Speichern der ChatGPT Nutzungsdaten im localStorage
  const STORAGE_KEY = 'chatgpt-usage-data';

  // Hilfsfunktionen für Datumformatierung
  function formatDate(date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD Format
  }

  function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Daten laden oder initialisieren
  function loadUsageData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  }

  function saveUsageData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // Nutzungslevel basierend auf der Anzahl der Nutzungen bestimmen
  function getUsageLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 10) return 3;
    return 4;
  }

  // Kalender initialisieren
  const firstOfYear = new Date(year, 0, 1);
  const lastOfYear = new Date(year + 1, 0, 1);
  const totalDays = (lastOfYear - firstOfYear) / (1000 * 60 * 60 * 24);
  // Wochentag von 0=Mo bis 6=So für den 1.1.
  const firstDow = (firstOfYear.getDay() + 6) % 7;
  // Anzahl benötigter Wochen
  const weeks = Math.ceil((totalDays + firstDow) / 7);

  const calendar = document.getElementById('calendar');
  // CSS Variable setzen
  calendar.style.setProperty('--weeks', weeks);

  // Referenzen auf DOM-Elemente
  const dateInput = document.getElementById('date-input');
  const usageInput = document.getElementById('usage-input');
  const addDataBtn = document.getElementById('add-data-btn');
  const generateRandomBtn = document.getElementById('generate-random-btn');
  const clearDataBtn = document.getElementById('clear-data-btn');
  const showCountsCheckbox = document.getElementById('show-counts');
  const showMonthsCheckbox = document.getElementById('show-months');
  const showWeeksCheckbox = document.getElementById('show-weeks');

  // Datum-Input auf das aktuelle Jahr beschränken
  dateInput.min = `${year}-01-01`;
  dateInput.max = `${year}-12-31`;
  dateInput.value = formatDate(new Date());

  // Event-Listener für Buttons
  addDataBtn.addEventListener('click', addUsageData);
  generateRandomBtn.addEventListener('click', generateRandomData);
  clearDataBtn.addEventListener('click', clearAllData);
  showCountsCheckbox.addEventListener('change', updateCalendar);
  showMonthsCheckbox.addEventListener('change', toggleMonthDisplay);
  showWeeksCheckbox.addEventListener('change', toggleWeekDisplay);

  // Funktion zum Hinzufügen von Nutzungsdaten
  function addUsageData() {
    const date = dateInput.value;
    const usage = parseInt(usageInput.value, 10);

    if (!date || isNaN(usage) || usage < 0) {
      alert('Bitte gib ein gültiges Datum und eine positive Zahl für die Nutzungen ein.');
      return;
    }

    const data = loadUsageData();
    data[date] = (data[date] || 0) + usage;
    saveUsageData(data);
    updateCalendar();

    // Feedback für den Benutzer
    alert(`${usage} Nutzungen für ${formatDateForDisplay(date)} hinzugefügt.`);
  }

  // Funktion zum Generieren von Zufallsdaten
  function generateRandomData() {
    if (!confirm('Möchtest du zufällige Nutzungsdaten für das ganze Jahr generieren? Bestehende Daten werden überschrieben.')) {
      return;
    }

    const data = {};
    const currentDate = new Date();

    // Nur Daten bis zum aktuellen Datum generieren, wenn wir im Jahr 2024 sind
    const endDate = currentDate.getFullYear() === year ?
      new Date(currentDate.getTime()) :
      new Date(year, 11, 31);

    for (let d = new Date(year, 0, 1); d <= endDate; d.setDate(d.getDate() + 1)) {
      // Zufällige Nutzung zwischen 0 und 15, mit höherer Wahrscheinlichkeit für niedrigere Werte
      const rand = Math.random();
      let usage = 0;

      if (rand < 0.3) {
        usage = 0; // 30% Chance für keine Nutzung
      } else if (rand < 0.6) {
        usage = Math.floor(Math.random() * 3) + 1; // 30% Chance für 1-3 Nutzungen
      } else if (rand < 0.8) {
        usage = Math.floor(Math.random() * 3) + 4; // 20% Chance für 4-6 Nutzungen
      } else if (rand < 0.95) {
        usage = Math.floor(Math.random() * 4) + 7; // 15% Chance für 7-10 Nutzungen
      } else {
        usage = Math.floor(Math.random() * 10) + 11; // 5% Chance für 11-20 Nutzungen
      }

      // Wochenenden haben tendenziell mehr Nutzungen
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) { // Samstag oder Sonntag
        usage = Math.floor(usage * 1.5);
      }

      data[formatDate(d)] = usage;
    }

    saveUsageData(data);
    updateCalendar();

    alert('Zufällige Nutzungsdaten wurden generiert.');
  }

  // Funktion zum Zurücksetzen aller Daten
  function clearAllData() {
    if (confirm('Möchtest du wirklich alle Nutzungsdaten löschen?')) {
      localStorage.removeItem(STORAGE_KEY);
      updateCalendar();
      alert('Alle Nutzungsdaten wurden gelöscht.');
    }
  }

  // Funktion zum Aktualisieren des Kalenders basierend auf den Nutzungsdaten
  function updateCalendar() {
    const data = loadUsageData();
    const showCounts = showCountsCheckbox.checked;

    // Alle Tageszellen aktualisieren
    document.querySelectorAll('.day').forEach(cell => {
      const date = cell.dataset.date;
      if (date) {
        const usage = data[date] || 0;
        const level = getUsageLevel(usage);

        // Alle Level-Klassen entfernen
        cell.classList.remove('level-0', 'level-1', 'level-2', 'level-3', 'level-4');
        // Neue Level-Klasse hinzufügen
        cell.classList.add(`level-${level}`);

        // Tooltip aktualisieren
        cell.title = `${formatDateForDisplay(date)}: ${usage} Nutzungen`;

        // Nutzungszahl anzeigen oder ausblenden
        if (showCounts && usage > 0) {
          cell.textContent = usage;
          cell.classList.add('show-count');
        } else {
          cell.textContent = '';
          cell.classList.remove('show-count');
        }
      }
    });
  }

  // 1) Monatsbeschriftungen (Zeile 1)
  const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  monthNames.forEach((m, mi) => {
    const first = new Date(year, mi, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(year, mi + 1, 0).getDate();
    const monthStartDayIndex = (first - firstOfYear) / (1000 * 60 * 60 * 24);
    const startWeek = Math.floor((monthStartDayIndex + firstDow) / 7);
    const spanWeeks = Math.ceil((offset + days) / 7);
    const label = document.createElement('div');
    label.className = 'month-label';
    label.textContent = m;
    label.style.gridColumnStart = startWeek + 1;
    label.style.gridColumnEnd = `span ${spanWeeks}`;
    calendar.appendChild(label);
  });

  // 2) Tageszellen (Zeilen 2–8)
  let dayCount = 0;
  for (let d = new Date(firstOfYear); d < lastOfYear; d.setDate(d.getDate() + 1), dayCount++) {
    const dow = (d.getDay() + 6) % 7; // 0=Mo..6=So
    const weekIndex = Math.floor((dayCount + firstDow) / 7);
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.dataset.date = formatDate(d);
    cell.title = `${formatDateForDisplay(formatDate(d))}: 0 Nutzungen`;
    cell.style.gridColumnStart = weekIndex + 1;
    cell.style.gridRowStart = dow + 2; // +1 für Monatszeile, +1 für 1-based
    calendar.appendChild(cell);
  }

  // 3) Wochenzahlen (Zeile 9)
  for (let w = 0; w < weeks; w++) {
    const label = document.createElement('div');
    label.className = 'week-label';
    label.textContent = (w + 1);
    label.style.gridColumnStart = w + 1;
    calendar.appendChild(label);
  }


  // Funktionen zum Umschalten der Monats- und Wochenanzeige
  function toggleMonthDisplay() {
    const showMonths = showMonthsCheckbox.checked;
    document.querySelectorAll('.month-label').forEach(label => {
      label.style.display = showMonths ? 'block' : 'none';
    });
  }

  function toggleWeekDisplay() {
    const showWeeks = showWeeksCheckbox.checked;
    document.querySelectorAll('.week-label').forEach(label => {
      label.style.display = showWeeks ? 'block' : 'none';
    });
  }

  // Kalender mit vorhandenen Daten initialisieren
  updateCalendar();

  // Initial die Anzeige entsprechend der Checkbox-Zustände setzen
  toggleMonthDisplay();
  toggleWeekDisplay();
})();
