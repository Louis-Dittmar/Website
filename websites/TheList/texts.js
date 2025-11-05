// Alle Texte mit Kategorien
const texts = [

  {
    "text": "Du bist wie ein schöner Hintergrund – nett anzuschauen, aber bitte nichts anklicken.",
    "categories": ["sarkastisch", "frech"]
  },
  {
    "text": "Ich schwöre, selbst mein WLAN hat stabilere Verbindungen als du.",
    "categories": ["beziehung", "witzig"]
  },
  {
    "text": "Ich hab versucht, dich zu mögen, aber mein Körper hat die Freundschaftsanfrage abgelehnt.",
    "categories": ["frech", "witzig"]
  },
  {
    "text": "Deine Meinung interessiert mich ungefähr so sehr wie ein Cookie-Banner.",
    "categories": ["sarkastisch", "trocken"]
  },
  {
    "text": "Ich respektiere deine Meinung. Also… theoretisch.",
    "categories": ["sarkastisch", "trocken"]
  },
  {
    "text": "Selbst mein Spamfilter hätte dich erkannt.",
    "categories": ["frech", "digital"]
  },
  {
    "text": "Ich wollte dich verstehen, aber mein IQ hat sich geweigert, so tief zu sinken.",
    "categories": ["beleidigend", "sarkastisch"]
  },
  {
    "text": "Beeindruckend, wie du so laut reden kannst, ohne was zu sagen.",
    "categories": ["frech", "sarkastisch"]
  },
  {
    "text": "Mein Fehler war, dich ernst zu nehmen.",
    "categories": ["beziehung", "bitter"]
  },
  {
    "text": "Du bist wie ein Pop-up-Fenster: nervig, aber leicht zu schließen.",
    "categories": ["witzig", "digital"]
  },
  {
    "text": "Selbst mein Kalender hat mehr Persönlichkeit.",
    "categories": ["frech", "kurz"]
  },
  {
    "text": "Dein Charakter hat weniger Tiefe als dein letzter Post.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Dein Feed hat mehr Filter als dein Gewissen.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Deine Storys sind das Beste an dir – sie verschwinden nach 24 Stunden.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Wenn Selbstliebe ein Filter ist, hast du ihn überdosiert.",
    "categories": ["social", "witzig"]
  },
  {
    "text": "Du hast die Persönlichkeit einer Push-Benachrichtigung.",
    "categories": ["digital", "trocken"]
  },
  {
    "text": "Wenn Doppelmoral olympisch wäre, du hättest Gold.",
    "categories": ["sarkastisch", "frech"]
  },
  {
    "text": "Wenn dein Charakter so gut belichtet wäre wie dein Gesicht, wärst du fast sympathisch.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Dein Profilbild ist das Beste an dir – weil’s dich nicht reden lässt.",
    "categories": ["social", "trocken"]
  },
  {
    "text": "Dein Charakter glänzt wie Sonnencreme: oberflächlich und schmierig.",
    "categories": ["frech", "bildlich"]
  },
  {
    "text": "Du bist wie ein Cocktail ohne Alkohol – sieht gut aus, schmeckt nach nichts.",
    "categories": ["frech", "metaphorisch"]
  },
  {
    "text": "Deine Persönlichkeit hat ungefähr so viel Tiefe wie ein Kinderpool.",
    "categories": ["frech", "kurz"]
  },
  {
    "text": "Wenn Oberflächlichkeit ein Kunststil wär, du wärst das Original.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Deine Instagram-Bilder sind nicht der einzige Kunstfehler, den ich bei dir sehe.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Du hast mehr Pixel als Prinzipien.",
    "categories": ["social", "kurz"]
  },
  {
    "text": "Manchmal ist selbst Photoshop ehrlich.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Du bist das Mädchen, das die Mathehausaufgaben ihrer Freundinnen macht, während sie sich mit deinem Schwarm rumknutschen.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Ich wette, du wärst wirklich hübsch, wenn du nicht so aussehen würdest.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Du siehst aus, als wärst du mit einer Tinder-Vorlage gebaut worden.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Du siehst aus wie jemand, der ständig die gleichen Selfies auf Instagram postet, anstatt einfach mal eine Persönlichkeit zu haben.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Die Zeit, die du gebraucht hast, um deine Posts zu machen, ist länger als all deine Beziehungen zusammen.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Du siehst aus wie der Typ Mensch, der Popcorn mit einem Löffel isst.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Dein Gesicht sagt „Ich weine beim Sex“, aber dein aussehen sagt „Ich habe keinen Sex“.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Aber immerhin hast du noch den Ring, Gollum. Obwohl, nein selbst der Ring hat dich verlassen.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Deine Zeit rennt, in 4 Jahren steht niemand mehr auf dich!",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Wow, du scheinst männliche Aufmerksamkeit ja wirklich zu lieben.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Du siehst aus wie das Mädchen in der 4. Klasse, das ständig damit angibt, wie viele Bücher es in einer Woche liest.",
    "categories": ["social", "sarkastisch"]
  },
  {
    "text": "Wenn Ignoranz leuchten würde, wärst du ein Leuchtturm.",
    "categories": ["frech", "sarkastisch"]
  },
  {
    "text": "Wenn Oberflächlichkeit ein Beruf wäre, wärst du CEO.",
    "categories": ["social", "frech"]
  },
  {
    "text": "Wenn Lästern Kalorien verbrennen würde, wärst du längst Model.",
    "categories": ["frech", "witzig"]
  },
  {
    "text": "Ich glaub, dein größtes Talent ist, Erwartungen zu untertreffen.",
    "categories": ["sarkastisch", "trocken"]
  },
  {
    "text": "Dein Humor ist wie dein Stil – irgendwo zwischen peinlich und 2009.",
    "categories": ["sarkastisch", "frech"]
  },
  {
    "text": "Wenn dein Kuchen so süß wäre wie dein Charakter, wäre er ungenießbar.",
    "categories": ["backen", "frech"]
  },
  {
    "text": "Du bist der Grund, warum Rauchmelder Angst haben.",
    "categories": ["kochen", "sarkastisch"]
  },
  {
    "text": "Du erinnerst mich an Hefeteig – viel Drama, wenig Wachstum.",
    "categories": ["backen", "witzig"]
  },
  {
    "text": "Deine Plätzchen könnten als Waffe durchgehen – hart, kalt und gefährlich.",
    "categories": ["backen", "witzig"]
  },
  {
    "text": "Du bist wie ein Thermomix – laut, teuer und überschätzt.",
    "categories": ["alltag", "frech"]
  },
  {
    "text": "Wenn Peinlichkeit Prozente hätte, wärst du Doppelkorn.",
    "categories": ["trinken", "frech"]
  },
  {
    "text": "Du trinkst, als wäre Selbstachtung etwas, das man verdünnen kann.",
    "categories": ["trinken", "bissig"]
  },
  {
    "text": "Du bist der Grund, warum Barkeeper kündigen.",
    "categories": ["trinken", "frech"]
  },
  {
    "text": "Du nennst es 'Mädelsabend', ich nenne es 'charakterlichen Verfall mit Deko'.",
    "categories": ["trinken", "sarkastisch"]
  },
  {
    "text": "Du brauchst keinen Alkohol, um peinlich zu sein – er beschleunigt’s nur.",
    "categories": ["trinken", "frech"]
  },
  {
    "text": "Wenn Doppelmoral ein Tier wäre, wärst du ein Chamäleon auf Speed.",
    "categories": ["tiere", "frech"]
  },
  {
    "text": "Du bist wie ein Pfau – viel Feder, wenig Substanz.",
    "categories": ["tiere", "sarkastisch"]
  }
];
