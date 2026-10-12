import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Sparkles, 
  Award, 
  FileCheck 
} from 'lucide-react';
import { DIDACTIC_SOURCES } from '../data/curriculumData';

export const DidacticSources: React.FC = () => {
  const WEEKLY_ROADMAP = [
    { week: 'Woche 1 (Heute)', topic: 'Erste Kontakte & Alphabet', focus: 'Begrüßungen, Wie heißen Sie?, Alphabet, Umlaute, Ist-Zustand erheben' },
    { week: 'Woche 2 (Montag)', topic: 'Zahlen & Herkunft', focus: 'Zahlen 1-100, Telefonnummer, Woher kommen Sie?, Herkunftsländer' },
    { week: 'Woche 3 (Montag)', topic: 'Im Kursraum & Gegenstände', focus: 'Artikel der/die/das, Einzahl/Mehrzahl, Schulsachen, Verneinung (kein/nicht)' },
    { week: 'Woche 4 (Montag)', topic: 'Wochentage & Uhrzeit', focus: 'Tageszeiten, Termine vereinbaren, Wann beginnt der Kurs?, Verben im Alltag' },
    { week: 'Woche 5 (Montag)', topic: 'Einkaufen & Lebensmittel', focus: 'Auf dem Markt / Supermarkt, Preise, "Ich möchte...", Mengenangaben' },
    { week: 'Woche 6 (Montag)', topic: 'Wohnen & Orientierung', focus: 'Wo wohnen Sie?, Zimmer, Möbel, Nach dem Weg fragen (links/rechts/geradeaus)' },
    { week: 'Woche 7 (Montag)', topic: 'Familie & Freizeit', focus: 'Mein/Dein, Familienmitglieder, Hobbys, Vorlieben ("Ich mag...")' },
    { week: 'Woche 8 (Montag)', topic: 'Ämter & Arztpraxis', focus: 'Krankmeldung, Termine beim Arzt, Höfliche Bitten, Zwischenbilanz A1.1' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Pädagogische Grundlagen · Quellen & Standards
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Didaktischer Leitfaden & Offizielle Referenzen
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Diese Anwendung basiert auf den neuesten sprachwissenschaftlichen und integrationspädagogischen Standards für Deutsch als Zweitsprache (DaZ). Alle Einstufungskriterien und Phasen sind abgestimmt auf den Gemeinsamen Europäischen Referenzrahmen (GER) und das BAMF-Rahmencurriculum.
        </p>
      </div>

      {/* Authority Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DIDACTIC_SOURCES.map((source, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Quelle 0{idx + 1}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {source.title}
              </h2>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                {source.subtitle}
              </div>

              <div className="mt-3 text-sm text-slate-700 leading-relaxed">
                {source.focus}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Relevanz für diesen Kurs: </span>
              {source.relevance}
            </div>
          </div>
        ))}
      </div>

      {/* Special Section: 120-Minutes Weekly Didactics */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Didaktisches Modell</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Erfolgsfaktoren für 1x wöchentlich 2 Zeitstunden (120 Minuten)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Ein Unterrichtsrhythmus von einmal wöchentlich für 120 Minuten bringt besondere didaktische Anforderungen mit sich:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-amber-600 font-bold text-base">
              1. Das 15-Minuten Ankommens-Ritual
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Erwachsene Teilnehmer kommen oft direkt aus stressigem Alltag, Arbeit oder Ämtergängen. Feste Einstiegsrituale (wie die Namensrunde im Kreis) schalten das Sprachzentrum sanft auf Deutsch um.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-amber-600 font-bold text-base">
              2. 60% Mündlicher Sprechanteil
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Frontalunterricht über 2 Stunden übermüdet schnell. Die Lehrkraft sollte maximal 30-40 Minuten sprechen; mindestens 50 Minuten müssen in Partnerübungen (Tandems) aktiv von den Lernenden gesprochen werden.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-amber-600 font-bold text-base">
              3. Die Wochen-Brücke (Mikro-Aufgaben)
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Ohne Kontakt zur Sprache geht in 7 Tagen bis zum nächsten Montag viel verloren. Geben Sie immer 1-2 reale Mini-Missionen mit (z.B. "Beim Bäcker auf Deutsch 'Guten Morgen' sagen").
            </p>
          </div>
        </div>
      </div>

      {/* Suggested 8-Week Course Plan */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Curriculare Struktur
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Curriculum-Roadmap: 8 Montage (GER A1.1)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Empfohlener Verlauf für Ihre Montags-Kurseinheiten über die nächsten 8 Wochen:
          </p>
        </div>

        <div className="space-y-3">
          {WEEKLY_ROADMAP.map((week, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                idx === 0 
                  ? 'border-amber-300 bg-amber-50/40 ring-1 ring-amber-300' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  idx === 0 ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-700'
                }`}>
                  {week.week}
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {week.topic}
                </span>
              </div>

              <div className="text-xs text-slate-600 sm:text-right">
                {week.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
