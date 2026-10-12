import React, { useState } from 'react';
import { 
  Volume2, 
  Languages, 
  HelpCircle, 
  Headphones, 
  Sparkles, 
  BookA, 
  Lightbulb, 
  Check 
} from 'lucide-react';
import { CORE_VOCABULARY } from '../data/curriculumData';
import { CoreVocabularyItem } from '../types';
import { speakGerman } from '../utils/speech';

type TranslationLang = 'en' | 'uk' | 'ar' | 'tr' | 'fr' | 'es' | 'ru';

interface LanguageOption {
  code: TranslationLang;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'ar', label: 'العربية', flag: '🇸🇾' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🌐' }
];

const ALPHABET_LIST = [
  { letter: 'A a', example: 'Apfel', phonetic: '[a:]', audio: 'A wie Apfel' },
  { letter: 'B b', example: 'Brot', phonetic: '[be:]', audio: 'B wie Brot' },
  { letter: 'C c', example: 'Computer', phonetic: '[tse:]', audio: 'C wie Computer' },
  { letter: 'D d', example: 'Danke', phonetic: '[de:]', audio: 'D wie Danke' },
  { letter: 'E e', example: 'Elefant', phonetic: '[e:]', audio: 'E wie Elefant' },
  { letter: 'F f', example: 'Familie', phonetic: '[ɛf]', audio: 'F wie Familie' },
  { letter: 'G g', example: 'Guten Tag', phonetic: '[ge:]', audio: 'G wie Guten Tag' },
  { letter: 'H h', example: 'Hallo', phonetic: '[ha:]', audio: 'H wie Hallo' },
  { letter: 'I i', example: 'Igel', phonetic: '[i:]', audio: 'I wie Igel' },
  { letter: 'J j', example: 'Ja', phonetic: '[jɔt]', audio: 'J wie Ja' },
  { letter: 'K k', example: 'Kaffee', phonetic: '[ka:]', audio: 'K wie Kaffee' },
  { letter: 'L l', example: 'Lernen', phonetic: '[ɛl]', audio: 'L wie Lernen' },
  { letter: 'M m', example: 'Montag', phonetic: '[ɛm]', audio: 'M wie Montag' },
  { letter: 'N n', example: 'Name', phonetic: '[ɛn]', audio: 'N wie Name' },
  { letter: 'O o', example: 'Orange', phonetic: '[o:]', audio: 'O wie Orange' },
  { letter: 'P p', example: 'Pause', phonetic: '[pe:]', audio: 'P wie Pause' },
  { letter: 'Q q', example: 'Quelle', phonetic: '[ku:]', audio: 'Q wie Quelle' },
  { letter: 'R r', example: 'Reisen', phonetic: '[ɛr]', audio: 'R wie Reisen' },
  { letter: 'S s', example: 'Sonne', phonetic: '[ɛs]', audio: 'S wie Sonne' },
  { letter: 'T t', example: 'Tisch', phonetic: '[te:]', audio: 'T wie Tisch' },
  { letter: 'U u', example: 'Uhr', phonetic: '[u:]', audio: 'U wie Uhr' },
  { letter: 'V v', example: 'Vater', phonetic: '[faʊ]', audio: 'V wie Vater' },
  { letter: 'W w', example: 'Wasser', phonetic: '[ve:]', audio: 'W wie Wasser' },
  { letter: 'X x', example: 'Xylofon', phonetic: '[ɪks]', audio: 'X wie Xylofon' },
  { letter: 'Y y', example: 'Yoga', phonetic: '[ˈʏpsilɔn]', audio: 'Ypsilon wie Yoga' },
  { letter: 'Z z', example: 'Zahl', phonetic: '[tsɛt]', audio: 'Z wie Zahl' },
  { letter: 'Ä ä', example: 'Äpfel', phonetic: '[ɛ:]', audio: 'Ä wie Äpfel' },
  { letter: 'Ö ö', example: 'Öl', phonetic: '[ø:]', audio: 'Ö wie Öl' },
  { letter: 'Ü ü', example: 'Übung', phonetic: '[y:]', audio: 'Ü wie Übung' },
  { letter: 'ß', example: 'Straße', phonetic: '[ɛsˈtsɛt]', audio: 'Eszett wie Straße' }
];

export const PhrasesAndPhonetics: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLang>('en');
  const [activeCategory, setActiveCategory] = useState<string>('Alle');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const categories = ['Alle', 'Begrüßung', 'Vorstellung', 'Klassenzimmer', 'Wochentage'];

  const filteredVocab = CORE_VOCABULARY.filter(item => {
    if (activeCategory === 'Alle') return true;
    return item.category === activeCategory;
  });

  const handlePlay = (text: string, id: string) => {
    setActivePlayingId(id);
    speakGerman(text, speechSpeed, () => setActivePlayingId(null));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Phonetik & Redemittel-Center · Einsteiger-Training
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Deutsche Aussprache & Alltagsredemittel
          </h1>
          <p className="mt-1 text-slate-600 text-sm sm:text-base max-w-2xl">
            Mehrsprachige Übersetzungshilfen, authentische Audio-Aussprache mit verlangsamtem Tempo und Lauttraining nach den Standards des Goethe-Instituts und des BAMF.
          </p>
        </div>

        {/* Translation Language Selector */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shrink-0 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>Übersetzungshilfe für Teilnehmer:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedLanguage === lang.code
                    ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: Interaktives Alphabet & Phonetik-Raster */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lauttraining & Alphabetisierung
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Das deutsche Alphabet von A bis Z & Umlaute
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Klicken Sie auf einen Buchstaben, um die Standard-Aussprache und ein deutsches Beispielwort anzuhören.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Audio-Tempo:</span>
            <button
              type="button"
              onClick={() => setSpeechSpeed(0.65)}
              className={`px-2.5 py-1 rounded-md ${speechSpeed === 0.65 ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-700'}`}
            >
              0.65x
            </button>
            <button
              type="button"
              onClick={() => setSpeechSpeed(0.85)}
              className={`px-2.5 py-1 rounded-md ${speechSpeed === 0.85 ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-700'}`}
            >
              0.85x
            </button>
          </div>
        </div>

        {/* Alphabet Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {ALPHABET_LIST.map((item, idx) => {
            const isPlaying = activePlayingId === `alpha-${idx}`;
            const isSpecial = ['Ä ä', 'Ö ö', 'Ü ü', 'ß'].includes(item.letter);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePlay(item.audio, `alpha-${idx}`)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  isSpecial 
                    ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-extrabold ${isSpecial ? 'text-amber-900' : 'text-slate-900'}`}>
                    {item.letter}
                  </span>
                  <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-600 animate-bounce' : 'text-slate-400'}`} />
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    {item.example}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {item.phonetic}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Kern-Redemittel & Vokabular mit Audio & Übersetzung */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Wortschatz für den Einstieg
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Häufigste Alltagsredemittel & Klassenzimmer-Wörter
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Farbcodierte Artikel:</span>
              <span className="font-semibold text-blue-600">der (blau)</span>
              <span>·</span>
              <span className="font-semibold text-rose-600">die (rot)</span>
              <span>·</span>
              <span className="font-semibold text-emerald-600">das (grün)</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vocab Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocab.map(item => {
            const isPlaying = activePlayingId === item.id;
            const translatedText = item.translations[selectedLanguage] || item.translations.en;
            return (
              <div 
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-400">
                      {item.category}
                    </span>
                    {item.article && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
                        item.article === 'der' ? 'bg-blue-100 text-blue-800' :
                        item.article === 'die' ? 'bg-rose-100 text-rose-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.article}
                      </span>
                    )}
                  </div>

                  <div className="text-lg font-bold text-slate-900 mt-2">
                    {item.german}
                  </div>

                  {item.plural && (
                    <div className="text-xs text-slate-500">
                      Plural: {item.plural}
                    </div>
                  )}

                  {/* Translation in selected native language */}
                  <div className="text-sm font-medium text-slate-600 mt-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    {translatedText}
                  </div>

                  {item.pronunciationTip && (
                    <div className="text-xs text-amber-800 bg-amber-50/60 p-2 rounded-lg mt-2 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item.pronunciationTip}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePlay(item.audio, item.id)}
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-300 animate-bounce' : 'text-white'}`} />
                  <span>{isPlaying ? 'Wird gesprochen...' : 'Auf Deutsch anhören'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Didaktische Stolpersteine nach Muttersprachen */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Typische Aussprache- & Grammatik-Hürden nach Sprachhintergrund
        </h3>
        <p className="text-xs text-slate-600">
          Wissenschaftlich fundierte Erkenntnisse für die Unterrichtspraxis (nach DaZ-Fachdidaktik):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 text-sm">
              Arabisch / Farsi (Semitische & Indoiranische Sprachen)
            </div>
            <ul className="text-xs text-slate-700 mt-2 space-y-1.5 list-disc list-inside">
              <li>Keine Unterscheidung zwischen [p] und [b] im Schriftbild ➜ Stimmhaft vs. stimmlos üben (Hand vor den Mund halten für den Luftstoß bei "P").</li>
              <li>Im Arabischen existiert kein Vokal am Wortanfang ohne Knacklaut ➜ Vokalbindung üben ("ich habe" statt "'ich 'habe").</li>
              <li>Schreibrichtung von rechts nach links ➜ Schreibhaltung des Stifts und Zeilenführung unterstützen.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 text-sm">
              Ukrainisch / Russisch (Slawische Sprachen)
            </div>
            <ul className="text-xs text-slate-700 mt-2 space-y-1.5 list-disc list-inside">
              <li>Kein Artikelsystem in der Muttersprache ➜ Artikel (der/die/das) immer zusammen mit dem Nomen lernen lassen.</li>
              <li>Hauchlaut [h] fehlt im Russischen oft ➜ Lautes Ausatmen üben ("Hallo", "heute").</li>
              <li>Verbkonjugation ist vertraut, aber die feste Verbstellung an Position 2 im deutschen Hauptsatz muss automatisiert werden.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
