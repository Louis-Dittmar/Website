# ChatGPT Usage Calendar

Dieses Verzeichnis enthält eine minimale Kalenderansicht, ähnlich der GitHub-Jahresübersicht. Alle Bedienelemente wurden entfernt. 

Die Funktion `createCalendar(element, year, daten)` erzeugt das Kalender-Grid für das angegebene Jahr. Die Ausrichtung verläuft von links nach rechts – die Wochen stehen also nebeneinander wie bei der GitHub-Jahresübersicht. 
Mit dem optionalen Objekt `daten` kannst du Werte zu einzelnen Tagen anzeigen lassen.

## Verwendung
1. Füge in deinem HTML ein Element mit der ID `calendar` ein.
2. Binde `style.css` und `calendar.js` ein.
3. Rufe z.B. `createCalendar(document.getElementById('calendar'), 2024, { '2024-01-01': '1' });` auf.
