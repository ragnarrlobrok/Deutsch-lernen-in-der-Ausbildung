import { 
  DiagnosticQuestion, 
  Participant, 
  LessonPhase, 
  CoreVocabularyItem 
} from '../types';

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'p-1',
    name: 'Olena Shevchenko',
    originCountry: 'Ukraine',
    nativeLanguage: 'Ukrainisch',
    scriptBackground: 'Kyrillisch',
    previousGermanStudy: 'Keine (nur DuoLingo ca. 2 Wochen)',
    primaryGoal: 'Alltag & Einkaufen, Schule der Kinder',
    testCompleted: true,
    testScore: 8,
    testMaxScore: 15,
    assignedLevel: 'A1.1',
    targetLevel: 'A1.2',
    subScores: {
      phonetics: 2,
      vocabulary: 3,
      grammar: 2,
      reading: 1
    },
    testedAt: '2026-10-12',
    attendanceHistory: { 1: true },
    homeworkHistory: { 1: true },
    notes: 'Lateinisches Alphabet bekannt, aber Unsicherheiten beim Umlaut ä/ö/ü. Versteht Zahlen 1-10.'
  },
  {
    id: 'p-2',
    name: 'Tariq Al-Mansoor',
    originCountry: 'Syrien',
    nativeLanguage: 'Arabisch',
    scriptBackground: 'Arabisch',
    previousGermanStudy: 'Keine formale Bildung auf Deutsch',
    primaryGoal: 'Arbeit & Handwerk, Führerschein',
    testCompleted: true,
    testScore: 4,
    testMaxScore: 15,
    assignedLevel: 'A0',
    targetLevel: 'A1.1',
    subScores: {
      phonetics: 2,
      vocabulary: 1,
      grammar: 1,
      reading: 0
    },
    testedAt: '2026-10-12',
    attendanceHistory: { 1: true },
    homeworkHistory: { 1: false },
    notes: 'Braucht gezielte Unterstützung beim lateinischen Alphabet und Rechtschreibung. Sehr gute mündliche Auffassungsgabe!'
  },
  {
    id: 'p-3',
    name: 'Maria Santos',
    originCountry: 'Kolumbien',
    nativeLanguage: 'Spanisch',
    scriptBackground: 'Lateinisch',
    previousGermanStudy: '1 Monat Volkshochschule vor einem Jahr',
    primaryGoal: 'Berufliche Anerkennung & Studium',
    testCompleted: true,
    testScore: 12,
    testMaxScore: 15,
    assignedLevel: 'A1.2',
    targetLevel: 'A2.1',
    subScores: {
      phonetics: 3,
      vocabulary: 3,
      grammar: 3,
      reading: 3
    },
    testedAt: '2026-10-12',
    attendanceHistory: { 1: true },
    homeworkHistory: { 1: true },
    notes: 'Gute Vorkenntnisse bei Satzbau und Begrüßung. Kann im Kurs als Tandem-Partnerin für Einsteiger fungieren.'
  },
  {
    id: 'p-4',
    name: 'Kenan Yilmaz',
    originCountry: 'Türkei',
    nativeLanguage: 'Türkisch',
    scriptBackground: 'Lateinisch',
    previousGermanStudy: 'Im Alltag einige Wörter aufgeschnappt',
    primaryGoal: 'Familie & Behörden',
    testCompleted: true,
    testScore: 7,
    testMaxScore: 15,
    assignedLevel: 'A1.1',
    targetLevel: 'A1.2',
    subScores: {
      phonetics: 2,
      vocabulary: 2,
      grammar: 2,
      reading: 1
    },
    testedAt: '2026-10-12',
    attendanceHistory: { 1: true },
    homeworkHistory: { 1: false },
    notes: 'Kennt Begrüßungsformeln gut. Verwechselt noch "du" und "Sie" sowie die Artikel.'
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // 1. Phonetik & Hören: Begrüßung erkennen
  {
    id: 1,
    category: 'phonetics',
    categoryLabel: 'Hörverstehen & Phonetik',
    questionText: 'Hören Sie die Begrüßung an. Welcher Gruß wird gesprochen?',
    instruction: 'Klicken Sie auf das Lautsprecher-Symbol zum Anhören.',
    audioText: 'Guten Tag! Wie geht es Ihnen?',
    options: [
      { id: '1a', text: 'Guten Morgen!', subtext: 'Morning' },
      { id: '1b', text: 'Guten Tag! Wie geht es Ihnen?', subtext: 'Good day! How are you?', isCorrect: true },
      { id: '1c', text: 'Gute Nacht, bis morgen!', subtext: 'Good night' },
      { id: '1d', text: 'Auf Wiedersehen!', subtext: 'Goodbye' }
    ],
    explanation: 'Die Begrüßung lautet "Guten Tag! Wie geht es Ihnen?". Dies ist die formelle Standardbegrüßung am Tag.',
    level: 'A0'
  },
  // 2. Phonetik & Hören: Zahlen hören
  {
    id: 2,
    category: 'phonetics',
    categoryLabel: 'Hörverstehen & Phonetik',
    questionText: 'Hören Sie die Zahl. Welche Zahl wird gesprochen?',
    instruction: 'Achten Sie genau auf den Laut und die Endung.',
    audioText: 'siebzehn',
    options: [
      { id: '2a', text: '7 (sieben)', subtext: 'sieben' },
      { id: '2b', text: '70 (siebzig)', subtext: 'siebzig' },
      { id: '2c', text: '17 (siebzehn)', subtext: 'siebzehn', isCorrect: true },
      { id: '2d', text: '16 (sechzehn)', subtext: 'sechzehn' }
    ],
    explanation: '"siebzehn" ist die Zahl 17. Typischer Stolperstein im Deutschen: die Unterscheidung von -zehn (13-19) und -zig (30-90).',
    level: 'A1.1'
  },
  // 3. Phonetik: Umlaute & Laute erkennen
  {
    id: 3,
    category: 'phonetics',
    categoryLabel: 'Hörverstehen & Phonetik',
    questionText: 'Hören Sie das Wort. Welcher Umlaut bzw. Vokal ist im Wort enthalten?',
    instruction: 'Hören Sie auf den Umlaut-Laut in der Silbe.',
    audioText: 'Tschüss',
    options: [
      { id: '3a', text: 'ü (Tschüss)', subtext: 'Umlaut ü', isCorrect: true },
      { id: '3b', text: 'u (Tschuss)', subtext: 'Normaler Vokal u' },
      { id: '3c', text: 'o (Tschoss)', subtext: 'Normaler Vokal o' },
      { id: '3d', text: 'ö (Tschöss)', subtext: 'Umlaut ö' }
    ],
    explanation: 'Das Wort "Tschüss" enthält den typisch deutschen Umlaut "ü". Er erfordert gerundete Lippen wie bei "u", aber die Zungenstellung wie bei "i".',
    level: 'A1.1'
  },
  // 4. Wortschatz: Begrüßungen im Tageslauf
  {
    id: 4,
    category: 'vocabulary',
    categoryLabel: 'Grundwortschatz & Alltag',
    questionText: 'Es ist 08:30 Uhr morgens im Kursraum. Wie begrüßen Sie die anderen?',
    instruction: 'Wählen Sie die passende Redewendung.',
    options: [
      { id: '4a', text: 'Guten Abend!', subtext: 'Good evening (abends)' },
      { id: '4b', text: 'Guten Morgen!', subtext: 'Good morning (morgens)', isCorrect: true },
      { id: '4c', text: 'Gute Nacht!', subtext: 'Good night (zum Schlafen)' },
      { id: '4d', text: 'Mahlzeit!', subtext: 'Mittagspause' }
    ],
    explanation: 'Um 08:30 Uhr sagt man "Guten Morgen!". "Guten Tag" ist ab ca. 11:00 Uhr passend, "Guten Abend" ab ca. 18:00 Uhr.',
    level: 'A0'
  },
  // 5. Wortschatz: Herkunft & Land
  {
    id: 5,
    category: 'vocabulary',
    categoryLabel: 'Grundwortschatz & Alltag',
    questionText: 'Ergänzen Sie das passende Wort: "Ich komme _____ der Ukraine / _____ Syrien."',
    instruction: 'Welche Präposition drückt Herkunft aus?',
    options: [
      { id: '5a', text: 'in', subtext: 'Ortsangabe' },
      { id: '5b', text: 'nach', subtext: 'Richtung' },
      { id: '5c', text: 'aus', subtext: 'Herkunft', isCorrect: true },
      { id: '5d', text: 'bei', subtext: 'Aufenthalt' }
    ],
    explanation: 'Herkunft wird im Deutschen mit "aus" gebildet: "Ich komme aus Deutschland / aus Syrien / aus der Ukraine".',
    level: 'A1.1'
  },
  // 6. Wortschatz: Wochentage & Kurszeit
  {
    id: 6,
    category: 'vocabulary',
    categoryLabel: 'Grundwortschatz & Alltag',
    questionText: 'Unser Kurs ist heute am ersten Arbeitstag der Woche. Welcher Wochentag ist das?',
    instruction: 'Wählen Sie den richtigen Wochentag.',
    options: [
      { id: '6a', text: 'Mittwoch', subtext: 'Wednesday' },
      { id: '6b', text: 'Montag', subtext: 'Monday', isCorrect: true },
      { id: '6c', text: 'Freitag', subtext: 'Friday' },
      { id: '6d', text: 'Sonntag', subtext: 'Sunday' }
    ],
    explanation: 'Der erste Tag der Arbeitswoche ist der Montag ("Monday").',
    level: 'A0'
  },
  // 7. Wortschatz: Klassenzimmer-Gegenstände
  {
    id: 7,
    category: 'vocabulary',
    categoryLabel: 'Grundwortschatz & Alltag',
    questionText: 'Womit schreiben die Kursteilnehmer im Unterricht?',
    instruction: 'Wählen Sie den Gegenstand.',
    options: [
      { id: '7a', text: 'der Stift / der Kugelschreiber', subtext: 'Pen', isCorrect: true },
      { id: '7b', text: 'das Fenster', subtext: 'Window' },
      { id: '7c', text: 'der Stuhl', subtext: 'Chair' },
      { id: '7d', text: 'die Tür', subtext: 'Door' }
    ],
    explanation: 'Man schreibt mit einem Stift oder Kugelschreiber.',
    level: 'A1.1'
  },
  // 8. Grammatik: Personalpronomen & Verb "heißen"
  {
    id: 8,
    category: 'grammar',
    categoryLabel: 'Grammatik & Satzmuster',
    questionText: 'Wie heißt die richtige Verbform? "Hallo, ich _____ Ali."',
    instruction: 'Konjugieren Sie das Verb "heißen" für "ich".',
    options: [
      { id: '8a', text: 'heißt', subtext: 'du / er / sie' },
      { id: '8b', text: 'heiße', subtext: 'ich-Form', isCorrect: true },
      { id: '8c', text: 'heißen', subtext: 'wir / Sie' },
      { id: '8d', text: 'bin heißen', subtext: 'Falsche Konstruktion' }
    ],
    explanation: 'Die Konjugation lautet: ich heiße, du heißt, er/sie heißt, wir heißen, Sie heißen.',
    level: 'A1.1'
  },
  // 9. Grammatik: Höflichkeitsform "Sie" vs "du"
  {
    id: 9,
    category: 'grammar',
    categoryLabel: 'Grammatik & Satzmuster',
    questionText: 'Sie sprechen mit der Lehrkraft oder einer fremden Person auf dem Amt. Welche Frage ist höflich (formell)?',
    instruction: 'Achten Sie auf das Höflichkeitspronomen.',
    options: [
      { id: '9a', text: 'Wie heißt du?', subtext: 'Informell (für Freunde / Kinder)' },
      { id: '9b', text: 'Wie heißen Sie?', subtext: 'Formell / Höflichkeitsform', isCorrect: true },
      { id: '9c', text: 'Wer bist?', subtext: 'Unvollständig' },
      { id: '9d', text: 'Was dein Name?', subtext: 'Grammatikalisch unvollständig' }
    ],
    explanation: 'Im formellen Deutsch (mit Lehrern, Vorgesetzten, Ämtern) verwendet man "Wie heißen Sie?". "Wie heißt du?" ist informell.',
    level: 'A1.1'
  },
  // 10. Grammatik: Artikel (der / die / das)
  {
    id: 10,
    category: 'grammar',
    categoryLabel: 'Grammatik & Satzmuster',
    questionText: 'Welcher bestimmte Artikel gehört zu "Tisch"? "_____ Tisch ist neu."',
    instruction: 'Wählen Sie das grammatikalische Geschlecht.',
    options: [
      { id: '10a', text: 'der', subtext: 'Maskulin (m)', isCorrect: true },
      { id: '10b', text: 'die', subtext: 'Feminin (f)' },
      { id: '10c', text: 'das', subtext: 'Neutral (n)' },
      { id: '10d', text: 'den', subtext: 'Akkusativ maskulin' }
    ],
    explanation: '"der Tisch" ist maskulin (m). Deutsche Substantive haben drei Geschlechter: der (blau), die (rot), das (grün).',
    level: 'A1.1'
  },
  // 11. Grammatik: Fragewörter (W-Fragen)
  {
    id: 11,
    category: 'grammar',
    categoryLabel: 'Grammatik & Satzmuster',
    questionText: 'Welches Fragewort passt zur Antwort: "_____ wohnen Sie?" – "In Berlin."',
    instruction: 'Es wird nach einem Ort gefragt.',
    options: [
      { id: '11a', text: 'Woher', subtext: 'Fragt nach Herkunft (Aus...)' },
      { id: '11b', text: 'Wo', subtext: 'Fragt nach Aufenthaltsort (In...)', isCorrect: true },
      { id: '11c', text: 'Wer', subtext: 'Fragt nach einer Person' },
      { id: '11d', text: 'Wann', subtext: 'Fragt nach der Zeit' }
    ],
    explanation: '"Wo wohnen Sie?" fragt nach dem aktuellen Wohnort (Antwort: "In..."). "Woher" fragt nach der Herkunft ("Aus...").',
    level: 'A1.2'
  },
  // 12. Leseverstehen: Visitenkarte / Ausweis lesen
  {
    id: 12,
    category: 'reading',
    categoryLabel: 'Lese- & Dialogverständnis',
    questionText: 'Lesen Sie die Kurskarte: "Vorname: Leila | Nachname: Haddad | Wohnort: Köln | Sprache: Arabisch, Deutsch". Wo wohnt Leila?',
    instruction: 'Entnehmen Sie die Information aus den Angaben.',
    options: [
      { id: '12a', text: 'In Arabien', subtext: 'Sprache' },
      { id: '12b', text: 'In Köln', subtext: 'Wohnort', isCorrect: true },
      { id: '12c', text: 'In Haddad', subtext: 'Familienname' },
      { id: '12d', text: 'In Berlin', subtext: 'Nicht genannt' }
    ],
    explanation: 'Unter "Wohnort" steht "Köln". Leila wohnt in Köln.',
    level: 'A1.1'
  },
  // 13. Leseverstehen: Kurzer Minidialog
  {
    id: 13,
    category: 'reading',
    categoryLabel: 'Lese- & Dialogverständnis',
    questionText: 'Welcher Satz vervollständigt den Dialog sinnvoll?\nA: "Guten Tag, sprechen Sie Deutsch?"\nB: "_____, ich lerne noch."',
    instruction: 'Wählen Sie die logische Antwort.',
    options: [
      { id: '13a', text: 'Ein bisschen', subtext: 'A little bit', isCorrect: true },
      { id: '13b', text: 'Auf Wiedersehen', subtext: 'Verabschiedung' },
      { id: '13c', text: 'Bitte sehr', subtext: 'Höflichkeitsfloskel' },
      { id: '13d', text: 'Keine Ahnung', subtext: 'Umgangssprachlich unpassend' }
    ],
    explanation: '"Ein bisschen, ich lerne noch" ist die typische, sympathische und korrekte Antwort für Sprachanfänger.',
    level: 'A1.1'
  },
  // 14. Leseverstehen: Satzbau im Hauptsatz (Verb an Position 2)
  {
    id: 14,
    category: 'reading',
    categoryLabel: 'Lese- & Dialogverständnis',
    questionText: 'Welcher deutsche Satz hat die richtige Reihenfolge (Verb an Position 2)?',
    instruction: 'Achten Sie auf die Position des Verbs.',
    options: [
      { id: '14a', text: 'Heute wir lernen Deutsch zusammen.', subtext: 'Falsche Verbstellung' },
      { id: '14b', text: 'Heute lernen wir Deutsch zusammen.', subtext: 'Korrekt: Verb "lernen" an Position 2', isCorrect: true },
      { id: '14c', text: 'Wir heute lernen zusammen Deutsch.', subtext: 'Falsche Verbstellung' },
      { id: '14d', text: 'Lernen heute wir Deutsch zusammen.', subtext: 'Fragesatzstruktur' }
    ],
    explanation: 'Im deutschen Aussagesatz steht das konjugierte Verb immer an Position 2: "Heute (1) lernen (2) wir Deutsch".',
    level: 'A1.2'
  },
  // 15. Selbsteinschätzung (GER Can-Do)
  {
    id: 15,
    category: 'reading',
    categoryLabel: 'Lese- & Dialogverständnis',
    questionText: 'Kann-Beschreibung nach GER: Was bedeutet das Schild am Raum: "EINGANG - BITTE ANKLOPFEN"?',
    instruction: 'Verstehen von Hinweisschildern im Alltag.',
    options: [
      { id: '15a', text: 'Hier ist die Tür zum Hineingehen, vorher an die Tür klopfen.', subtext: 'Entrance - please knock', isCorrect: true },
      { id: '15b', text: 'Hier darf niemand hinein.', subtext: 'Verboten' },
      { id: '15c', text: 'Hier ist der Notausgang.', subtext: 'Notausgang' },
      { id: '15d', text: 'Hier kann man Kaffee trinken.', subtext: 'Pause' }
    ],
    explanation: '"Eingang" ist der Zutritt zum Raum, "bitte anklopfen" bedeutet, vor dem Eintreten an die Tür zu klopfen.',
    level: 'A1.1'
  }
];

export const MONDAY_LESSON_PLAN: {
  topic: string;
  subtopic: string;
  totalMinutes: number;
  date: string;
  overview: string;
  phases: LessonPhase[];
} = {
  topic: 'Einheit 1: Erste Kontakte, Begrüßung & Alphabet',
  subtopic: 'Sich vorstellen, Buchstabieren, Höflichkeitsformen im Alltag',
  totalMinutes: 120,
  date: 'Montag, 1. Unterrichtstag',
  overview: 'Erste 120-minütige Sitzung des Deutschkurses. Fokus auf angstfreiem Erstkontakt, Phonetik (Umlaute & deutsche Laute), elementaren Begrüßungsformeln und der Ist-Zustandserhebung.',
  phases: [
    {
      id: 'phase-1',
      timeRange: '00:00 - 00:15',
      durationMinutes: 15,
      title: 'Phase 1: Ankommen & Warm-Up',
      objective: 'Angstfreier Einstieg, gegenseitiges Wahrnehmen, Namensschilder gestalten',
      activity: 'Begrüßungsritual im Kreis: Ball oder Gegenstand zuwerfen. Lehrkraft beginnt: "Guten Tag, ich heiße [Name]. Und wie heißen Sie?". Teilnehmer antworten kurz.',
      teacherTips: 'Langsam und deutlich sprechen. Blickkontakt halten. Ggf. Muttersprachen-Begrüßungen kurz wertschätzen, um Vertrauen aufzubauen.',
      material: 'Namensschilder, bunte Stifte, Begrüßungs-Bildkarten',
      dialoguePrompts: [
        { de: 'Guten Tag! Ich heiße Martin.', en: 'Good day! My name is Martin.', audio: 'Guten Tag! Ich heiße Martin.' },
        { de: 'Wie heißen Sie?', en: 'What is your name? (formal)', audio: 'Wie heißen Sie?' },
        { de: 'Ich heiße Fatima.', en: 'My name is Fatima.', audio: 'Ich heiße Fatima.' }
      ]
    },
    {
      id: 'phase-2',
      timeRange: '00:15 - 00:50',
      durationMinutes: 35,
      title: 'Phase 2: Phonetik & Das deutsche Alphabet',
      objective: 'Lateinisches Alphabet wiederholen, deutsche Sonderlaute (ä, ö, ü, ß, ei, eu, sch, ch) isolieren und rhythmisch sprechen',
      activity: 'Tafelbild: Alphabet von A bis Z mit Lautbeispielen. Chorisches Nachsprechen. Umlaute-Training mit Lippenform (u -> ü, o -> ö). Kurzer Buchstabier-Check: "Wie schreibt man Ihren Namen?".',
      teacherTips: 'Für Teilnehmer mit arabischer oder kyrillischer Schrift: Schreibrichtung von links nach rechts hervorheben und Druckbuchstaben zeigen.',
      material: 'Tafelbild mit Umlauten, Handout: Deutsches Alphabet & Aussprachehilfen',
      dialoguePrompts: [
        { de: 'Buchstabieren Sie bitte: M - A - R - T - I - N', en: 'Please spell: M - A - R - T - I - N', audio: 'Buchstabieren Sie bitte' },
        { de: 'Ä wie Äpfel, Ö wie Öl, Ü wie Übung', en: 'Umlauts: Ä like apples, Ö like oil, Ü like practice', audio: 'Ä wie Äpfel, Ö wie Öl, Ü wie Übung' }
      ]
    },
    {
      id: 'phase-3',
      timeRange: '00:50 - 01:20',
      durationMinutes: 30,
      title: 'Phase 3: Dialog-Training & Herkunft',
      objective: 'Redemittel "Woher kommen Sie? - Ich komme aus..." und "Wo wohnen Sie? - Ich wohne in..." festigen',
      activity: 'Partnerarbeit in Tandems (wenn möglich: unterschiedliche Muttersprachen mischen). Dialog-Karten verwenden. Jeder Teilnehmer stellt danach seinen Partner der Gruppe vor.',
      teacherTips: 'Formelle Form "Sie" für den Unterricht etablieren, aber den Unterschied zu "du" kurz erwähnen. Weltkarte an die Wand projizieren.',
      material: 'Visuelle Dialogkarten, Weltkarte / Deutschlandkarte',
      dialoguePrompts: [
        { de: 'Woher kommen Sie? - Ich komme aus der Ukraine / aus Syrien.', en: 'Where are you from? - I come from Ukraine / Syria.', audio: 'Woher kommen Sie? Ich komme aus der Ukraine.' },
        { de: 'Wo wohnen Sie? - Ich wohne in Berlin.', en: 'Where do you live? - I live in Berlin.', audio: 'Wo wohnen Sie? Ich wohne in Berlin.' }
      ]
    },
    {
      id: 'phase-4',
      timeRange: '01:20 - 01:35',
      durationMinutes: 15,
      title: 'Phase 4: Didaktische Pause & Informeller Austausch',
      objective: 'Gehirn lüften, informelle Begegnung, Sprachhemmungen abbauen',
      activity: 'Wasser / Tee trinken, Raum lüften. Wer möchte, hört leise deutsche Hintergrundmusik oder übt spielerisch Zahlen mit dem Nachbarn.',
      teacherTips: 'Beobachten, wer im Raum Anschluss gefunden hat und wer Unterstützung braucht.',
      material: 'Getränke, frische Luft'
    },
    {
      id: 'phase-5',
      timeRange: '01:35 - 02:00',
      durationMinutes: 25,
      title: 'Phase 5: Lernstandssicherung & Wochenauftrag',
      objective: 'Erste Ergebnisse sichern, Ist-Zustand per App-Test abrufen, Ausblick auf nächsten Montag geben',
      activity: 'Gemeinsame Reflexion: "Was habe ich heute gelernt?". Durchführen des Lernstandstests (oder Ausgabe des Ergebnisses). Hausaufgabe: 3 Begrüßungen im Alltag ausprobieren.',
      teacherTips: 'Erfolge loben! Bei 1x pro Woche Unterricht ist die Motivation für das selbstständige Wiederholen unter der Woche entscheidend.',
      material: 'DeutschStart-Portal, Mini-Lernkarte für die Tasche',
      dialoguePrompts: [
        { de: 'Auf Wiedersehen! Bis nächsten Montag!', en: 'Goodbye! Until next Monday!', audio: 'Auf Wiedersehen! Bis nächsten Montag!' },
        { de: 'Schöne Woche noch!', en: 'Have a nice week!', audio: 'Schöne Woche noch!' }
      ]
    }
  ]
};

export const CORE_VOCABULARY: CoreVocabularyItem[] = [
  {
    id: 'v-1',
    german: 'Guten Tag',
    category: 'Begrüßung',
    audio: 'Guten Tag',
    translations: {
      en: 'Good day / Hello',
      uk: 'Доброго дня',
      ar: 'يوم سعيد / مرحباً',
      tr: 'İyi günler',
      fr: 'Bonjour',
      es: 'Buenos días',
      ru: 'Добрый день'
    },
    pronunciationTip: 'Betonung auf "Tag" mit langem [a:].'
  },
  {
    id: 'v-2',
    german: 'Guten Morgen',
    category: 'Begrüßung',
    audio: 'Guten Morgen',
    translations: {
      en: 'Good morning',
      uk: 'Доброго ранку',
      ar: 'صباح الخير',
      tr: 'Günaydın',
      fr: 'Bonjour (matin)',
      es: 'Buenos días (mañana)',
      ru: 'Доброе утро'
    },
    pronunciationTip: 'Verwendet bis ca. 11 Uhr vormittags.'
  },
  {
    id: 'v-3',
    german: 'Auf Wiedersehen',
    category: 'Begrüßung',
    audio: 'Auf Wiedersehen',
    translations: {
      en: 'Goodbye',
      uk: 'До побачення',
      ar: 'إلى اللقاء',
      tr: 'Görüşmek üzere',
      fr: 'Au revoir',
      es: 'Adiós / Hasta la vista',
      ru: 'До свидания'
    },
    pronunciationTip: '"Wieder" = langes [i:], "sehen" mit sanftem [z].'
  },
  {
    id: 'v-4',
    german: 'Tschüss',
    category: 'Begrüßung',
    audio: 'Tschüss',
    translations: {
      en: 'Bye (informal)',
      uk: 'Бувай / Па-па',
      ar: 'مع السلامة',
      tr: 'Hoşça kal',
      fr: 'Salut',
      es: 'Chao',
      ru: 'Пока'
    },
    pronunciationTip: 'Kurzer, spitzer Umlaut [ʏ] mit Zischlaut [s].'
  },
  {
    id: 'v-5',
    german: 'Wie heißen Sie?',
    category: 'Vorstellung',
    audio: 'Wie heißen Sie?',
    translations: {
      en: 'What is your name? (formal)',
      uk: 'Як Вас звати?',
      ar: 'ما اسمك؟ (رسمي)',
      tr: 'Adınız nedir?',
      fr: 'Comment vous vous appelez ?',
      es: '¿Cómo se llama usted?',
      ru: 'Как вас зовут?'
    },
    pronunciationTip: 'Großes "Sie" = Höflichkeitsform!'
  },
  {
    id: 'v-6',
    german: 'Ich heiße...',
    category: 'Vorstellung',
    audio: 'Ich heiße',
    translations: {
      en: 'My name is...',
      uk: 'Мене звати...',
      ar: 'اسمي...',
      tr: 'Benim adım...',
      fr: 'Je m’appelle...',
      es: 'Me llamo...',
      ru: 'Меня зовут...'
    },
    pronunciationTip: '"Ich" hat einen weichen Ich-Laut [ç], nicht wie [k].'
  },
  {
    id: 'v-7',
    german: 'Woher kommen Sie?',
    category: 'Vorstellung',
    audio: 'Woher kommen Sie?',
    translations: {
      en: 'Where do you come from?',
      uk: 'Звідки Ви?',
      ar: 'من أين أنت؟',
      tr: 'Nerelisiniz?',
      fr: 'D’où venez-vous ?',
      es: '¿De dónde es usted?',
      ru: 'Откуда вы?'
    },
    pronunciationTip: '"Woher" = Wo + her (Betonung auf der zweiten Silbe).'
  },
  {
    id: 'v-8',
    german: 'Ich komme aus...',
    category: 'Vorstellung',
    audio: 'Ich komme aus',
    translations: {
      en: 'I come from...',
      uk: 'Я родом з...',
      ar: 'أنا من...',
      tr: '... geliyorum',
      fr: 'Je viens de...',
      es: 'Vengo de...',
      ru: 'Я из...'
    },
    pronunciationTip: '"aus" verlangt den Dativ bei Ländern mit Artikel (z.B. aus der Ukraine).'
  },
  {
    id: 'v-9',
    german: 'der Stift',
    article: 'der',
    plural: 'die Stifte',
    category: 'Klassenzimmer',
    audio: 'der Stift',
    translations: {
      en: 'the pen / pencil',
      uk: 'ручка / олівець',
      ar: 'القلم',
      tr: 'kalem',
      fr: 'le stylo',
      es: 'el bolígrafo',
      ru: 'ручка'
    },
    pronunciationTip: 'Maskulin (der = Blau). "St" am Anfang wie [ʃt] (Sch-t).'
  },
  {
    id: 'v-10',
    german: 'die Tafel',
    article: 'die',
    plural: 'die Tafeln',
    category: 'Klassenzimmer',
    audio: 'die Tafel',
    translations: {
      en: 'the blackboard / board',
      uk: 'дошка',
      ar: 'السبورة',
      tr: 'yazı tahtası',
      fr: 'le tableau',
      es: 'la pizarra',
      ru: 'доска'
    },
    pronunciationTip: 'Feminin (die = Rot).'
  },
  {
    id: 'v-11',
    german: 'das Buch',
    article: 'das',
    plural: 'die Bücher',
    category: 'Klassenzimmer',
    audio: 'das Buch',
    translations: {
      en: 'the book',
      uk: 'книга',
      ar: 'الكتاب',
      tr: 'kitap',
      fr: 'le livre',
      es: 'el libro',
      ru: 'книга'
    },
    pronunciationTip: 'Neutral (das = Grün). "ch" nach "u" ist der Ach-Laut [x].'
  },
  {
    id: 'v-12',
    german: 'der Montag',
    article: 'der',
    category: 'Wochentage',
    audio: 'der Montag',
    translations: {
      en: 'Monday',
      uk: 'Понеділок',
      ar: 'الاثنين',
      tr: 'Pazartesi',
      fr: 'Lundi',
      es: 'Lunes',
      ru: 'Понедельник'
    },
    pronunciationTip: 'Alle Wochentage sind maskulin: der Montag, der Dienstag...'
  }
];

export const DIDACTIC_SOURCES = [
  {
    title: 'Gemeinsamer Europäischer Referenzrahmen für Sprachen (GER / CEFR)',
    subtitle: 'Europarat, Companion Volume 2020 mit neuen Deskriptoren',
    focus: 'A0/A1.1 Stufenkriterien: Elementare Sprachverwendung, Verstehen von vertrauten Wörtern und ganz einfachen Sätzen.',
    relevance: 'Verbindliche Grundlage für alle Einstufungen und Bildungszertifikate in der EU.'
  },
  {
    title: 'BAMF Rahmencurriculum für Integrationskurse & Erstorientierung (EOK)',
    subtitle: 'Bundesamt für Migration und Flüchtlinge, aktuelle Fassung',
    focus: 'Handlungsorientierung im Alltag: Orientierung vor Ort, Arztbesuche, Ämter, Arbeit und Schule.',
    relevance: 'Standard für Deutschkurse mit international zusammengesetzten Teilnehmendengruppen in Deutschland.'
  },
  {
    title: 'Goethe-Institut: Start Deutsch 1 (A1) Prüfungsrichtlinien',
    subtitle: 'Prüfungsziele & Wortschatzlisten A1',
    focus: 'Hören (Einfache Ansagen im öffentlichen Raum), Lesen (Schilder, Notizen), Schreiben (Formulare) und Sprechen (Sich vorstellen).',
    relevance: 'International anerkannter Referenztest für Zuwanderer und Visa-Verfahren.'
  },
  {
    title: 'Didaktik für 1x wöchentlich 120 Minuten (Teilzeit-Rhythmus)',
    subtitle: 'Methodik für erwachsene Kursteilnehmer',
    focus: '3-Säulen-Prinzip: 1. Strukturiertes Ankommen & Rhythmus, 2. Hoher Sprechanteil in Partnerarbeit, 3. Mikrolerneinheiten zur Brückenbildung zwischen den Montagen.',
    relevance: 'Verhindert das Vergessen von Lerninhalten über die 7-tägige Pause zwischen den Unterrichtseinheiten.'
  }
];
