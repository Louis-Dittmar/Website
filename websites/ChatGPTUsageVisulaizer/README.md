# ChatGPT Usage Visualizer

Eine Webseite zur Visualisierung deiner ChatGPT-Nutzung im Stil der GitHub-Jahresansicht.

## Funktionen

- **Visualisierung der ChatGPT-Nutzung**: Zeigt deine ChatGPT-Nutzung in einem Kalender-Grid ähnlich der
  GitHub-Jahresansicht an.
- **Daten hinzufügen**: Füge manuell Nutzungsdaten für bestimmte Tage hinzu.
- **Zufallsdaten generieren**: Generiere zufällige Nutzungsdaten für das ganze Jahr zum Testen.
- **Daten zurücksetzen**: Lösche alle gespeicherten Nutzungsdaten.
- **Lokale Speicherung**: Alle Daten werden lokal in deinem Browser gespeichert (localStorage).

## Verwendung

1. **Daten hinzufügen**:
  - Wähle ein Datum aus dem Kalender
  - Gib die Anzahl der ChatGPT-Nutzungen ein
  - Klicke auf "Hinzufügen"

2. **Zufallsdaten generieren**:
  - Klicke auf "Zufallsdaten generieren", um Testdaten für das ganze Jahr zu erstellen
  - Bestätige den Dialog
    a
3. **Daten zurücksetzen**:
  - Klicke auf "Daten zurücksetzen", um alle gespeicherten Daten zu löschen
  - Bestätige den Dialog

## Farbcodierung

Die Intensität der Nutzung wird durch verschiedene Grüntöne dargestellt:

- **Hellgrau**: 0 Nutzungen
- **Hellgrün**: 1-3 Nutzungen
- **Mittelgrün**: 4-6 Nutzungen
- **Dunkelgrün**: 7-10 Nutzungen
- **Sehr dunkelgrün**: 10+ Nutzungen

## Technische Details

- Die Anwendung verwendet HTML, CSS und JavaScript
- Die Daten werden im localStorage des Browsers gespeichert
- Das Kalendergrid wird dynamisch mit JavaScript generiert
- Die Visualisierung ist für das Jahr 2024 konfiguriert

## Datenschutz

Alle Daten werden ausschließlich lokal in deinem Browser gespeichert und nicht an externe Server übertragen.
