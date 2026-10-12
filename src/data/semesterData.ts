import { SemesterSession, SemesterModule } from '../types';

export const SEMESTER_MODULES: SemesterModule[] = [
  {
    id: 1,
    title: 'Modul 1: Orientierung & Grundlagen',
    weeks: 'Woche 1 – 6 (Okt/Nov 2026)',
    description: 'Alphabet, Phonetik, Begrüßungen, Zahlen, Wochentage & erste Orientierung im Alltag.',
    goal: 'GER A0 ➜ A1.1 Einstieg',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 2,
    title: 'Modul 2: Alltag, Konsum & Mobilität',
    weeks: 'Woche 7 – 12 (Nov/Dez 2026)',
    description: 'Einkaufen, Lebensmittel, Preise, Restaurant, ÖPNV, Orientierung in der Stadt.',
    goal: 'GER A1.1 Festigung (Halbzeit-Meilenstein)',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 3,
    title: 'Modul 3: Wohnen, Gesundheit & Soziales',
    weeks: 'Woche 13 – 18 (Jan/Feb 2027)',
    description: 'Wohnungssuche, Familie, Freizeitaktivitäten, Arztbesuch, Termine vereinbaren & Telefonieren.',
    goal: 'GER A1.1 ➜ A1.2 Übergang',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 4,
    title: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    weeks: 'Woche 19 – 24 (Feb/Mär 2027)',
    description: 'Arbeitswelt, Lebenslauf, Formulare auf Behörden, Prüfungssimulation (Goethe/BAMF).',
    goal: 'GER A1.2 Zertifikatsreife (Abschluss)',
    color: 'from-purple-500 to-rose-600'
  }
];

export const INITIAL_SEMESTER_SESSIONS: SemesterSession[] = [
  {
    weekNumber: 1,
    dateFormatted: '12. Okt 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 1: Begrüßung, Alphabet & Ist-Zustand',
    competencies: ['Sich vorstellen („Ich heiße...“)', 'Alphabet buchstabieren', 'Umlaute ä/ö/ü erkennen', 'GER Lernstandstest'],
    status: 'current',
    homeworkTask: 'Namen buchstabieren üben und im Alltag 3 Personen auf Deutsch begrüßen.',
    teacherSessionNotes: 'Auftaktsitzung heute: Alle 4 Erstteilnehmer erfasst. Hohe Motivation!'
  },
  {
    weekNumber: 2,
    dateFormatted: '19. Okt 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 2: Zahlen 1-100 & Telefonnummern',
    competencies: ['Zahlen 1 bis 100 aussprechen', 'Telefonnummern verstehen und notieren', 'Rechnen im Alltag'],
    status: 'upcoming',
    homeworkTask: 'Eigene Handynummer auf Deutsch auswendig sprechen können.'
  },
  {
    weekNumber: 3,
    dateFormatted: '26. Okt 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 3: Herkunft, Länder & Sprachen',
    competencies: ['„Woher kommen Sie? – Ich komme aus...“', 'Präpositionen aus/in', 'Sprachen benennen'],
    status: 'upcoming',
    homeworkTask: 'Kurzen Steckbrief über das eigene Heimatland verfassen.'
  },
  {
    weekNumber: 4,
    dateFormatted: '02. Nov 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 4: Gegenstände im Kursraum (Artikel der/die/das)',
    competencies: ['Bestimmte & unbestimmte Artikel', 'Farbcodierung der/die/das', 'Pluralformen'],
    status: 'upcoming',
    homeworkTask: '5 Gegenstände zuhause mit Zetteln (der/die/das) beschriften.'
  },
  {
    weekNumber: 5,
    dateFormatted: '09. Nov 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 5: Wochentage, Tageszeiten & Uhrzeit',
    competencies: ['Wochentage von Montag bis Sonntag', '„Um wie viel Uhr?“', 'Tagesablauf schildern'],
    status: 'upcoming',
    homeworkTask: 'Eigenen Wochenplan für Montag bis Freitag auf Deutsch notieren.'
  },
  {
    weekNumber: 6,
    dateFormatted: '16. Nov 2026',
    moduleTitle: 'Modul 1: Orientierung & Grundlagen',
    topicTitle: 'Einheit 6: Modul 1 Abschluss & Rollenspiel-Stationen',
    competencies: ['Minidialoge verknüpfen', 'Freies Sprechen ohne Notizen', 'Feedbackrunde Modul 1'],
    status: 'upcoming',
    homeworkTask: 'Wiederholung aller Vokabelkarten aus Modul 1 in der App.'
  },
  {
    weekNumber: 7,
    dateFormatted: '23. Nov 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 7: Einkaufen im Supermarkt & Lebensmittel',
    competencies: ['Lebensmittel benennen', '„Ich hätte gern...“', 'Mengen (Kilo, Liter, Packung)'],
    status: 'upcoming',
    homeworkTask: 'Einen deutschen Einkaufszettel mit mindestens 8 Artikeln schreiben.'
  },
  {
    weekNumber: 8,
    dateFormatted: '30. Nov 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 8: Wochenmarkt, Preise & Bezahlen',
    competencies: ['Preise erfragen („Was kostet das?“)', 'Euro & Cent', 'An der Kasse bar/Karte zahlen'],
    status: 'upcoming',
    homeworkTask: 'Einen echten Kassenbon auf Deutsch untersuchen und 3 Wörter markieren.'
  },
  {
    weekNumber: 9,
    dateFormatted: '07. Dez 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 9: Im Café & Restaurant',
    competencies: ['Speisekarte lesen', 'Bestellungen aufgeben', 'Zusammen oder getrennt bezahlen'],
    status: 'upcoming',
    homeworkTask: 'Einen Dialog im Restaurant mit Partner üben.'
  },
  {
    weekNumber: 10,
    dateFormatted: '14. Dez 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 10: Öffentlicher Nahverkehr (Bus & Bahn)',
    competencies: ['Fahrkartenautomat bedienen', 'Fahrpläne & Gleise lesen', 'Durchsagen verstehen'],
    status: 'upcoming',
    homeworkTask: 'Fahrplan der eigenen Buslinie nachschlagen und Abfahrtszeiten notieren.'
  },
  {
    weekNumber: 11,
    dateFormatted: '21. Dez 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 11: Wege & Orientierung in der Stadt',
    competencies: ['Nach dem Weg fragen', 'Richtungsangaben: geradeaus, links, rechts', 'Stadtplan lesen'],
    status: 'upcoming',
    homeworkTask: 'Den Weg von der Wohnung zum Kursraum auf Deutsch beschreiben.'
  },
  {
    weekNumber: 12,
    dateFormatted: '28. Dez 2026',
    moduleTitle: 'Modul 2: Alltag, Konsum & Mobilität',
    topicTitle: 'Einheit 12: Halbzeit-Meilenstein & Diagnosetest A1.1',
    competencies: ['Zwischenstandsprüfung durchführen', 'Individuelle Stärkenanalyse', 'Ziele für Halbjahr 2'],
    status: 'upcoming',
    homeworkTask: 'Selbsteinschätzungsbogen für die zweite Kurshälfte ausfüllen.'
  },
  {
    weekNumber: 13,
    dateFormatted: '04. Jan 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 13: Wohnen, Wohnungssuche & Zimmer',
    competencies: ['Wohnungsanzeigen verstehen', 'Zimmer benennen (Küche, Bad, Flur)', 'Möbel & Präpositionen'],
    status: 'upcoming',
    homeworkTask: 'Grundriss der eigenen Wohnung zeichnen und Zimmer beschriften.'
  },
  {
    weekNumber: 14,
    dateFormatted: '11. Jan 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 14: Familie, Verwandtschaft & Possessivpronomen',
    competencies: ['Familienmitglieder benennen', 'mein/meine, dein/deine', 'Über Beziehungen sprechen'],
    status: 'upcoming',
    homeworkTask: 'Kurzen Familienstammbaum auf Deutsch erstellen.'
  },
  {
    weekNumber: 15,
    dateFormatted: '18. Jan 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 15: Freizeit, Hobbys & Verabredungen',
    competencies: ['Über Freizeit sprechen („Ich spiele gern...“)', 'Vorschläge machen', 'Zusagen & Absagen'],
    status: 'upcoming',
    homeworkTask: 'Einen Freund zu einer gemeinsamen Aktivität auf Deutsch einladen.'
  },
  {
    weekNumber: 16,
    dateFormatted: '25. Jan 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 16: Beim Arzt & in der Apotheke',
    competencies: ['Körperteile benennen', 'Schmerzen & Symptome beschreiben', 'Medikamente in der Apotheke'],
    status: 'upcoming',
    homeworkTask: 'Die Packungsbeilage eines rezeptfreien Medikaments ansehen.'
  },
  {
    weekNumber: 17,
    dateFormatted: '01. Feb 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 17: Termine vereinbaren & Kalender',
    competencies: ['Arzttermine am Telefon buchen', 'Terminverschiebung', 'Pünktlichkeit & Absagen'],
    status: 'upcoming',
    homeworkTask: 'Telefon-Rollenspiel „Termin beim Zahnarzt“ vorbereiten.'
  },
  {
    weekNumber: 18,
    dateFormatted: '08. Feb 2027',
    moduleTitle: 'Modul 3: Wohnen, Gesundheit & Soziales',
    topicTitle: 'Einheit 18: Telefonieren & Anrufbeantworter',
    competencies: ['Standard-Telefongrüße', 'Namen buchstabieren am Hörer', 'Nachrichten hinterlassen'],
    status: 'upcoming',
    homeworkTask: 'Einen kurzen Text für einen Anrufbeantworter einsprechen.'
  },
  {
    weekNumber: 19,
    dateFormatted: '15. Feb 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 19: Berufe & Arbeitswelt in Deutschland',
    competencies: ['Berufsbezeichnungen (m/f)', 'Tätigkeiten im Beruf („Ich arbeite als...“)', 'Arbeitszeiten'],
    status: 'upcoming',
    homeworkTask: 'Den eigenen Traumberuf oder aktuellen Beruf auf Deutsch beschreiben.'
  },
  {
    weekNumber: 20,
    dateFormatted: '22. Feb 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 20: Der deutsche Lebenslauf (CV)',
    competencies: ['Tabellarischen Lebenslauf ausfüllen', 'Schulbildung & Berufserfahrung', 'Persönliche Daten'],
    status: 'upcoming',
    homeworkTask: 'Einen 1-seitigen Entwurf des eigenen Lebenslaufs erstellen.'
  },
  {
    weekNumber: 21,
    dateFormatted: '01. Mär 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 21: Am Arbeitsplatz & Kollegengespräche',
    competencies: ['Smalltalk mit Kollegen', 'Um Hilfe bitten', 'Krankmeldung beim Arbeitgeber'],
    status: 'upcoming',
    homeworkTask: 'Eine kurze schriftliche Krankmeldung an den Chef formulieren.'
  },
  {
    weekNumber: 22,
    dateFormatted: '08. Mär 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 22: Behörden, Bürgeramt & Formulare',
    competencies: ['Meldebescheinigung verstehen', 'Standard-Formulare ausfüllen', 'Wichtige behördliche Begriffe'],
    status: 'upcoming',
    homeworkTask: 'Ein Muster-Anmeldeformular fehlerfrei ausfüllen.'
  },
  {
    weekNumber: 23,
    dateFormatted: '15. Mär 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 23: Intensiv-Prüfungstraining (A1.2 Goethe/BAMF)',
    competencies: ['Prüfungsteile Hören & Lesen durchspielen', 'Schreibaufgabe: Kurze E-Mail verfassen', 'Mündliche Prüfung'],
    status: 'upcoming',
    homeworkTask: 'Eine Probeprüfung online oder auf Papier durcharbeiten.'
  },
  {
    weekNumber: 24,
    dateFormatted: '22. Mär 2027',
    moduleTitle: 'Modul 4: Beruf, Behörden & A1-Abschluss',
    topicTitle: 'Einheit 24: Abschluss-Lernstandstest, Zertifikate & Feier',
    competencies: ['Finaler GER A1.2 Lernstandstest', 'Vergleich mit Woche 1 (Lernerfolg sichtbar)', 'Zertifikatsausgabe'],
    status: 'upcoming',
    homeworkTask: 'Weiterlernen auf A2-Niveau planen & Erfolg feiern!'
  }
];
