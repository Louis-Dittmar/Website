// Alle Texte mit Kategorien
const texts = [
  {
    text: "Du bist wie ein schöner Hintergrund – nett anzuschauen, aber bitte nichts anklicken.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Ich schwöre, selbst mein WLAN hat stabilere Verbindungen als du.",
    categories: ["beziehung", "witzig"]
  },
  {
    text: "Ich hab versucht, dich zu mögen, aber mein Körper hat die Freundschaftsanfrage abgelehnt.",
    categories: ["frech", "witzig"]
  },
  {
    text: "Deine Meinung interessiert mich ungefähr so sehr wie ein Cookie-Banner.",
    categories: ["sarkastisch", "trocken"]
  },
  {
    text: "Ich respektiere deine Meinung. Also… theoretisch.",
    categories: ["sarkastisch", "trocken"]
  },
  {
    text: "Selbst mein Spamfilter hätte dich erkannt.",
    categories: ["frech", "digital"]
  },
  {
    text: "Ich wollte dich verstehen, aber mein IQ hat sich geweigert, so tief zu sinken.",
    categories: ["beleidigend", "sarkastisch"]
  },
  {
    text: "Beeindruckend, wie du so laut reden kannst, ohne was zu sagen.",
    categories: ["frech", "sarkastisch"]
  },
  {
    text: "Mein Fehler war, dich ernst zu nehmen.",
    categories: ["beziehung", "bitter"]
  },
  {
    text: "Du bist wie ein Pop-up-Fenster: nervig, aber leicht zu schließen.",
    categories: ["witzig", "digital"]
  },
  {
    text: "Selbst mein Kalender hat mehr Persönlichkeit.",
    categories: ["frech", "kurz"]
  },
  {
    text: "Dein Charakter hat weniger Tiefe als dein letzter Post.",
    categories: ["social", "frech"]
  },
  {
    text: "Dein Feed hat mehr Filter als dein Gewissen.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Deine Storys sind das Beste an dir – sie verschwinden nach 24 Stunden.",
    categories: ["social", "frech"]
  },
  {
    text: "Wenn Selbstliebe ein Filter ist, hast du ihn überdosiert.",
    categories: ["social", "witzig"]
  },
  {
    text: "Du hast die Persönlichkeit einer Push-Benachrichtigung.",
    categories: ["digital", "trocken"]
  },
  {
    text: "Wenn Doppelmoral olympisch wäre, du hättest Gold.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Wenn dein Charakter so gut belichtet wäre wie dein Gesicht, wärst du fast sympathisch.",
    categories: ["social", "frech"]
  },
  {
    text: "Dein Profilbild ist das Beste an dir – weil’s dich nicht reden lässt.",
    categories: ["social", "trocken"]
  },
  {
    text: "Dein Charakter glänzt wie Sonnencreme: oberflächlich und schmierig.",
    categories: ["frech", "bildlich"]
  },
  {
    text: "Du bist wie ein Cocktail ohne Alkohol – sieht gut aus, schmeckt nach nichts.",
    categories: ["frech", "metaphorisch"]
  },
  {
    text: "Deine Persönlichkeit hat ungefähr so viel Tiefe wie ein Kinderpool.",
    categories: ["frech", "kurz"]
  },
  {
    text: "Wenn Oberflächlichkeit ein Kunststil wär, du wärst das Original.",
    categories: ["social", "frech"]
  },
  {
    text: "Deine Instagram-Bilder sind nicht der einzige Kunstfehler, den ich bei dir sehe.",
    categories: ["social", "frech"]
  },
  {
    text: "Du hast mehr Pixel als Prinzipien.",
    categories: ["social", "kurz"]
  },
  {
    text: "Manchmal ist selbst Photoshop ehrlich.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Du bist das Mädchen, das die Mathehausaufgaben ihrer Freundinnen macht, während sie sich mit deinem Schwarm rumknutschen.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Ich wette, du wärst wirklich hübsch, wenn du nicht so aussehen würdest.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Du siehst aus, als wärst du mit einer Tinder-Vorlage gebaut worden.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Du siehst aus wie jemand, der ständig die gleichen Selfies auf Instagram postet, anstatt einfach mal eine Persönlichkeit zu haben.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Die Zeit, die du gebraucht hast, um deine Posts zu machen, ist länger als all deine Beziehungen zusammen.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Du siehst aus wie der Typ Mensch, der Popcorn mit einem Löffel isst.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Dein Gesicht sagt „Ich weine beim Sex“, aber dein aussehen sagt „Ich habe keinen Sex“.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Aber immerhin hast du noch den Ring, Gollum. Obwohl, nein selbst der Ring hat dich verlassen.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Deine Zeit rennt, in 4 Jahren steht niemand mehr auf dich!",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Wow, du scheinst männliche Aufmerksamkeit ja wirklich zu lieben.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Du siehst aus wie das Mädchen in der 4. Klasse, das ständig damit angibt, wie viele Bücher es in einer Woche liest.",
    categories: ["social", "sarkastisch"]
  },
  {
    text: "Wenn Ignoranz leuchten würde, wärst du ein Leuchtturm.",
    categories: ["frech", "sarkastisch"]
  },
  {
    text: "Wenn Oberflächlichkeit ein Beruf wäre, wärst du CEO.",
    categories: ["social", "frech"]
  },
  {
    text: "Wenn Lästern Kalorien verbrennen würde, wärst du längst Model.",
    categories: ["frech", "witzig"]
  },
  {
    text: "Ich glaub, dein größtes Talent ist, Erwartungen zu untertreffen.",
    categories: ["sarkastisch", "trocken"]
  },
  {
    text: "Dein Humor ist wie dein Stil – irgendwo zwischen peinlich und 2009.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Wenn dein Kuchen so süß wäre wie dein Charakter, wäre er ungenießbar.",
    categories: ["backen", "frech"]
  },
  {
    text: "Du bist der Grund, warum Rauchmelder Angst haben.",
    categories: ["kochen", "sarkastisch"]
  },
  {
    text: "Du erinnerst mich an Hefeteig – viel Drama, wenig Wachstum.",
    categories: ["backen", "witzig"]
  },
  {
    text: "Deine Plätzchen könnten als Waffe durchgehen – hart, kalt und gefährlich.",
    categories: ["backen", "witzig"]
  },
  {
    text: "Du bist wie ein Thermomix – laut, teuer und überschätzt.",
    categories: ["alltag", "frech"]
  },
  {
    text: "Wenn Peinlichkeit Prozente hätte, wärst du Doppelkorn.",
    categories: ["trinken", "frech"]
  },
  {
    text: "Du trinkst, als wäre Selbstachtung etwas, das man verdünnen kann.",
    categories: ["trinken", "bissig"]
  },
  {
    text: "Du bist der Grund, warum Barkeeper kündigen.",
    categories: ["trinken", "frech"]
  },
  {
    text: "Du nennst es 'Mädelsabend', ich nenne es 'charakterlichen Verfall mit Deko'.",
    categories: ["trinken", "sarkastisch"]
  },
  {
    text: "Du brauchst keinen Alkohol, um peinlich zu sein – er beschleunigt’s nur.",
    categories: ["trinken", "frech"]
  },
  {
    text: "Du bist wie ein Pfau – viel Feder, wenig Substanz.",
    categories: ["tiere", "sarkastisch"]
  },
  {
    text: "Wenn man mit dir Redet, lästert gleich die ganze Stadt über mich.",
    categories: ["tiere", "sarkastisch"]
  },
  {
    text: "Wenn man mit dir Redet, lästert gleich die ganze Stadt über mich.",
    categories: ["tiere", "sarkastisch"]
  },
  {
    text: "Deine Brüste sind flacher als dein Respekt.",
    categories: ["tiere", "sarkastisch"]
  },
  {
    text: "Das N in deinem Namen steht für 'niemals ehrlich'.",
    categories: ["frech", "sarkastisch"]
  },
  {
    text: "Das N in deinem Namen steht für 'nach Aufmerksamkeit süchtig'.",
    categories: ["frech", "bissig"]
  },
  {
    text: "Das N in deinem Namen steht für 'nein danke'.",
    categories: ["kurz", "trocken"]
  },
  {
    text: "Das N in deinem Namen steht für 'negative Energie auf zwei Beinen'.",
    categories: ["frech", "bissig"]
  },
  {
    text: "Das N in deinem Namen steht für 'nichts als Drama'.",
    categories: ["frech", "social"]
  },
  {
    text: "Das N in deinem Namen steht für 'nicht mein Problem, aber trotzdem nervig'.",
    categories: ["sarkastisch", "trocken"]
  },
  {
    text: "Das N in deinem Namen steht für 'nie reflektiert, immer laut'.",
    categories: ["frech", "bissig"]
  },
  {
    text: "Das E in deinem Namen steht für 'ewig anstrengend'.",
    categories: ["frech", "bissig"]
  },
  {
    text: "Das E in deinem Namen steht für 'egozentrisch bis zum Anschlag'.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Das E in deinem Namen steht für 'Energie saugen statt geben'.",
    categories: ["frech", "bitter"]
  },
  {
    text: "Das E in deinem Namen steht für 'ewig beleidigt'.",
    categories: ["frech", "kurz"]
  },
  {
    text: "Das E in deinem Namen steht für 'Erinnerung, die keiner behalten will'.",
    categories: ["bitter", "sarkastisch"]
  },
  {
    text: "Das E in deinem Namen steht für 'exakt null Selbstreflexion'.",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Ich weiß wir sind gerade beide Traurig, aber sind wir auch beide Horny?",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Dein Safewort wäre 'Kannst du das bitte machen'",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Beeindruckend, wie konsequent bei dir alles klein ist, vom Respekt bis zur Oberweite.",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Nach dem ersten date mir dir, sind alle Männer mit denen du etwas hattest Schwul.",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Irgendwie werden alle Typen nach dir schwul. Muss an deinem Charme liegen.",
    categories: ["sarkastisch", "bitter"]
  },
  {
    text: "Wenn Einbildung eine Währung wäre, wärst du Millionärin.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Du bist wie ein schlechter Screenshot – unscharf, überflüssig und peinlich, wenn man’s zeigt.",
    categories: ["social", "bissig"]
  },
  {
    text: "Nach dir sind Männer nicht mehr hetero, nur noch hoffnungslos.",
    categories: ["social", "bissig"]
  },
  {
    text: "Deine Dates verlaufen wie dein Charakter, steil bergab.",
    categories: ["dating", "frech"]
  },
  {
    text: "Du bist die Art Ex, wegen der Leute sagen: 'Ich bleib lieber Single.'",
    categories: ["dating", "bissig"]
  },
  {
    text: "Du hast die Romantik einer Steuererklärung.",
    categories: ["dating", "trocken"]
  },
  {
    text: "Du bist der Grund, warum Ghosting erfunden wurde.",
    categories: ["dating", "frech"]
  },
  {
    text: "Du bist der Grund, warum Leute leiber alleine Bleiben.",
    categories: ["dating", "bitter"]
  },
  {
    text: "Wenn Fremdscham ein Tanzstil wäre, du wärst die Choreografin.",
    categories: ["tanzen", "bissig"]
  },
  {
    text: "Deine Tanzmoves sehen aus, als wärst du von einem Geist mit zwei linken Füßen besessen.",
    categories: ["tanzen", "frech"]
  },
  {
    text: "Deine Art zu tanzen ist der Grund, warum Clubs dunkles Licht haben.",
    categories: ["tanzen", "frech"]
  },
  {
    text: "Deine Liebe zur Schokolade ist das Einzige an dir, das süß ist.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Du feierst, als wäre das dein Beruf. Schade, dass du beim Helfen immer Urlaub hast.",
    categories: ["faulheit", "frech"]
  },
  {
    text: "Du trinkst Cocktails wie deine Ausreden – schnell, billig und zu viel.",
    categories: ["trinken", "frech"]
  },
  {
    text: "Sie tanzt, als gäbe es Preise fürs Peinlichsein.",
    categories: ["tanzen", "frech"]
  },
  {
    text: "Sie sagt, sie liebt Schokolade – irgendwas muss sie ja mögen.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Es gibt einen Grund, warum alle gehen, wenn sie kommt.",
    categories: ["sozial", "gemein"]
  },
  {
    text: "Sie verzieht ihr Gesicht auf jedem Snap, weil das Original keiner sehen will.",
    categories: ["aussehen", "frech"]
  },
  {
    text: "Gibt’s dich auch in süß?",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Bei dir wusste man wohl noch nicht, dass Abtreibung legal ist.",
    categories: ["beleidigend", "tabu"]
  },
  {
    text: "Für dich hat eine Frau ihre Muschi ruiniert.",
    categories: ["beleidigend", "tabu"]
  },
  {
    text: "Immer wenn ich dich sehe, denke ich mir: Wie wolltest du denn eigentlich aussehen?",
    categories: ["aussehen", "sarkastisch"]
  },
  {
    text: "Bei dir fragt man sich, wie man dich fickbar in zwei Stunden bekommt.",
    categories: ["sexuell", "beleidigend"]
  },
  {
    text: "Du brauchst keinen Sport machen. Es gibt keine Übungen für Charakter.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wann denkst du, fängt man an zu sehen, dass du existierst?",
    categories: ["existenz", "sarkastisch"]
  },
  {
    text: "Es freut mich, dass du versuchst, dich um deinen Körper zu kümmern. Aber du weißt schon, dass dein Gesicht einfach hässlich ist.",
    categories: ["aussehen", "gemein"]
  },
  {
    text: "Du bist die einzige die beim Sport noch zunimmt.",
    categories: ["aussehen", "gemein"]
  },
  {
    text: "Dinge, die overrated sind? Du!",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Du begrüßt deinen Mann auch nach zehn Jahren mit ‚Hallo‘, weil ihr vor neun Jahren einmal Streit hattet.",
    categories: ["beziehung", "frech"]
  },
  {
    text: "Selbst die AfD hat mehr Werte als du.",
    categories: ["charakter", "sarkastisch"]
  },
  {
    text: "Dein Gesicht ist so entstellt, dass du dich in CapCut richtig austoben kannst.",
    categories: ["aussehen", "frech"]
  },
  {
    text: "Dich kindisch zu nennen würde nur Kinder beleidigen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Bei dir war der Eintritt auch schon mal billiger.",
    categories: ["sexuell", "frech"]
  },
  {
    text: "Du bist nüchtern gesehen ganz schön scheiße.",
    categories: ["sarkastisch", "frech"]
  },
  {
    text: "Bei dir sind die ersten drei Minuten beim Sex schon spielentscheidend.",
    categories: ["sexuell", "frech"]
  },
  {
    text: "Du bist wie ein NFT – einzigartig, aber trotzdem nutzlos.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Respekt ist eine großartige Eigenschaft. Du solltest in Erwägung ziehen, dir etwas davon anzueignen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Der häufigste Grund, warum du im Leben scheiterst: Du bist einfach nicht gut genug.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Vergleiche dich nicht mit anderen. Du bist nicht mal annähernd so gut wie sie.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Die meisten Kalorien verbrennst du mit Augenrollen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "ich dachte eines Tages würde alles besser werden. Und dann bist du gekommen. Es hört nie auf.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Manche Menschen erhellen einen Raum, wenn sie ihn betreten. Du hingegen, wenn nur du ihn verlässt.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Hör auf zu überlegen, ob du gut genug bist. Du bist es nicht.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bist echt schwer zu unterschätzen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wenn ich dir jetzt recht gebe, haben wir uns beide geirrt.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Für deine Kompetenz bist du aber wirklich sehr selbstbewusst.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wenn du mit anfasst, ist es, als ob zehn loslassen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wow, du hast das perfekte Gesicht fürs Radio.",
    categories: ["aussehen", "frech"]
  },
  {
    text: "Dein gesicht Passt perfekt für's Mikrofon",
    categories: ["aussehen", "frech"]
  },
  {
    text: "Wissen Sie, ich duze grundsätzlich alle Menschen, die ich sympathisch finde.",
    categories: ["charakter", "ironisch"]
  },
  {
    text: "Du warst immer ein Jäger der Weisheit, doch sie war dir immer einen Schritt voraus.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Ich verstehe, was die anderen sagen – ich find dich auch scheiße.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Die größte Freude, wenn wir uns sehen, ist die, auf Wiedersehen zu sagen.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bist wie eine alte Glühbirne – du ziehst ohne Ende, gibst aber nichts.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Gibt’s gegen dich nicht auch irgendwas von Ratiopharm?",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du hast den Mut, dich in Themen einzubringen, bei denen andere sich vorher erst informieren würden.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bist wie das beste Pferd im Stall – du machst Mist ohne Ende.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bist mein größtes Vorbild – so weit fallen möchte ich nie.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wärst du nicht zu hässlich für die Babyklappe gewesen, hätte man dich da abgegeben. Es ist nicht so, als wurde es nicht versucht.",
    categories: ["aussehen", "böse"]
  },
  {
    text: "Nicht mal die Babyklappe wollte dich, das sagt schon alles.",
    categories: ["aussehen", "böse"]
  },
  {
    text: "Für Abtreibung ist es nie zu spät, man kann dich sicher auch noch im 210. Monat abtreiben!",
    categories: ["aussehen", "böse"]
  },
  {
    text: "Du bist genauso dumm, wie du aussiehst. Mich wundert, dass du weißt, wie man läuft.",
    categories: ["intelligenz", "böse"]
  },
  {
    text: "Die Lücke, die du hinterlässt, ersetzt dich voll und ganz.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Wenn du dir die Finger in die Ohren steckst, ist das Hohlraumversiegelung.",
    categories: ["intelligenz", "frech"]
  },
  {
    text: "Du bist zwar nicht der Dümmste auf der Welt, aber du musst echt aufpassen, dass der andere nicht stirbt.",
    categories: ["intelligenz", "frech"]
  },
  {
    text: "Deine letzten beiden Gehirnzellen kämpfen um Platz drei.",
    categories: ["intelligenz", "frech"]
  },
  {
    text: "Mit dem, was du nicht weißt, können noch sechs andere durchfallen.",
    categories: ["intelligenz", "frech"]
  },
  {
    text: "Du lernst nach dem Motto: erst Panik, dann Pause.",
    categories: ["schule", "witzig"]
  },
  {
    text: "Du bist der Grund, warum Lehrer heimlich trinken.",
    categories: ["schule", "frech"]
  },
  {
    text: "Deine Noten sind wie du – konstant im Keller.",
    categories: ["schule", "bissig"]
  },
  {
    text: "Du bist die Person, wegen der Lehrer sagen: 'Ich hab alles gesehen.'",
    categories: ["schule", "sarkastisch"]
  },
  {
    text: "Du bist der lebende Beweis, dass man mit Glück auch durchfallen kann.",
    categories: ["schule", "frech"]
  },
  {
    text: "Wenn Verlieren ein Talent wäre, hättest du endlich eins.",
    categories: ["schule", "frech"]
  },
  {
    text: "Dein Name steht im Duden unter Toxisch.",
    categories: ["schule", "frech"]
  },
  {
    text: "Du und Abitur? Du warst schon bei der anmeldung Überfordert",
    categories: ["schule", "bissig"]
  },
  {
    text: "Diese Liste ist nur für Leute die Lesen können, du bist hier Falsch.",
    categories: ["schule", "bissig"]
  },
  {
    text: "Wenn dein Abi eine Note hätte, wäre sie Mitleid.",
    categories: ["schule", "bissig"]
  },
  {
    text: "Dein Abi-Motto sollte 'Versuch war’s wert' heißen.",
    categories: ["schule", "witzig"]
  },
  {
    text: "Deine Hilfsbereitschaft ist so inexistent, sie taucht nicht mal in der Theorie auf.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Deine Empathie ist so selten, sie müsste vom Aussterben bedroht sein.",
    categories: ["charakter", "bissig"]
  },
  {
    text: "Deine Intelligenz ist so gut versteckt, sie gilt offiziell als verschollen.",
    categories: ["intelligenz", "sarkastisch"]
  },
  {
    text: "Deine Loyalität wurde getestet – Ergebnis: nicht nachweisbar.",
    categories: ["charakter", "bissig"]
  },
  {
    text: "Deine Hilfsbereitschaft ist wie dunkle Materie – man glaubt, sie existiert, hat sie aber nie gesehen.",
    categories: ["charakter", "witzig"]
  },
  {
    text: "Deine Aufmerksamkeitsspanne hat das Zeitlimit eines TikToks.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bekommst Klausuren aus der ersten Klasse, weil dir die Lehrer nichts mehr zutrauen – und fällst trotzdem durch.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Deine Eltern werden bezahlt, sonst wären sie schon längst verschwunden.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Deine Eltern bekommen eine Entschädigung – niemand würde sonst so viel müssen.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Deine Eltern halten dich nur aus, weil’s im Vertrag steht.",
    categories: ["familie", "sarkastisch"]
  },
  {
    text: "Deine Eltern haben dich bestimmt nicht geplant – höchstens bereut.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Deine Eltern bekommen monatlich Schmerzensgeld.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Dein Bruder ist der Beweis, dass die Gene deiner Familie nicht immer versagen.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Dein Bruder ist wahrscheinlich der Grund, warum deine Eltern nicht komplett bereuen, Kinder zu haben.",
    categories: ["familie", "frech"]
  },
  {
    text: "Dein Bruder ist das Original, du die missglückte Kopie.",
    categories: ["familie", "frech"]
  },
  {
    text: "Dein Bruder war der Wunsch, du der überraschende Unfall.",
    categories: ["familie", "bissig"]
  },
  {
    text: "Dein Bruder ist der Grund, warum deine Eltern Hoffnung hatten – und dann bist du Gekommen",
    categories: ["familie", "frech"]
  },
  {
    text: "Wenn dein Bruder da ist, merkt man erst, wie überflüssig du bist.",
    categories: ["familie", "frech"]
  },
  {
    text: "Das Einzige, worauf deine Eltern bei dir stolz sind, ist, dass es unmöglich ist, noch schlechter zu werden.",
    categories: ["familie", "frech"]
  },
  {
    text: "Nicht mal ein Zuhälter würde dich wollen, weil er mit dir kein Geld machen würde.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Du bist so überflüssig wie ein Sandkasten in der Sahara.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Selbst dein imaginärer Freund spielt lieber mit anderen Kindern.",
    categories: ["charakter", "frech"]
  },
  {
    text: "Dich hat man auch nur großgezogen, weil man das Kindergeld brauchte.",
    categories: ["charakter", "frech"]
  }
];
