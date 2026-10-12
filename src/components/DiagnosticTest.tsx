import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  UserPlus, 
  RotateCcw, 
  Printer, 
  Award, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { DiagnosticQuestion, Participant, CefrLevel, NativeLanguage, ScriptBackground } from '../types';
import { DIAGNOSTIC_QUESTIONS } from '../data/curriculumData';
import { speakGerman, stopSpeech } from '../utils/speech';

interface DiagnosticTestProps {
  onSaveParticipant: (participant: Participant) => void;
  existingParticipants: Participant[];
  initialParticipantId?: string;
  onGoToLesson: () => void;
}

export const DiagnosticTest: React.FC<DiagnosticTestProps> = ({
  onSaveParticipant,
  existingParticipants,
  initialParticipantId,
  onGoToLesson
}) => {
  // Test stages: 'profile' -> 'questions' -> 'result'
  const [stage, setStage] = useState<'profile' | 'questions' | 'result'>('profile');

  // Participant biography form
  const [name, setName] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState<NativeLanguage>('Ukrainisch');
  const [scriptBackground, setScriptBackground] = useState<ScriptBackground>('Kyrillisch');
  const [previousGermanStudy, setPreviousGermanStudy] = useState('Keine Vorkenntnisse');
  const [primaryGoal, setPrimaryGoal] = useState('Alltag & Einkaufen');

  // Test progression state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85);
  const [completedParticipant, setCompletedParticipant] = useState<Participant | null>(null);

  const currentQuestion: DiagnosticQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    speakGerman(text, audioSpeed, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleSelectOption = (optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStage('questions');
    setCurrentIndex(0);
    setUserAnswers({});
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      stopSpeech();
    } else {
      finishTest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      stopSpeech();
    }
  };

  const finishTest = () => {
    stopSpeech();
    // Calculate results
    let totalScore = 0;
    let phonetics = 0;
    let vocabulary = 0;
    let grammar = 0;
    let reading = 0;

    DIAGNOSTIC_QUESTIONS.forEach(q => {
      const selectedOptionId = userAnswers[q.id];
      const correctOption = q.options.find(opt => opt.isCorrect);
      const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;

      if (isCorrect) {
        totalScore += 1;
        if (q.category === 'phonetics') phonetics += 1;
        if (q.category === 'vocabulary') vocabulary += 1;
        if (q.category === 'grammar') grammar += 1;
        if (q.category === 'reading') reading += 1;
      }
    });

    // Determine GER level
    let level: CefrLevel = 'A1.1';
    if (totalScore <= 4) {
      level = 'A0';
    } else if (totalScore <= 9) {
      level = 'A1.1';
    } else if (totalScore <= 13) {
      level = 'A1.2';
    } else {
      level = 'A2.1';
    }

    const newParticipant: Participant = {
      id: `p-${Date.now()}`,
      name,
      originCountry: originCountry || 'Nicht angegeben',
      nativeLanguage,
      scriptBackground,
      previousGermanStudy,
      primaryGoal,
      testCompleted: true,
      testScore: totalScore,
      testMaxScore: DIAGNOSTIC_QUESTIONS.length,
      assignedLevel: level,
      subScores: {
        phonetics,
        vocabulary,
        grammar,
        reading
      },
      testedAt: new Date().toISOString().split('T')[0],
      notes: `Ergebnis: ${totalScore}/${DIAGNOSTIC_QUESTIONS.length} Punkte. Einstufung: ${level}.`
    };

    setCompletedParticipant(newParticipant);
    onSaveParticipant(newParticipant);
    setStage('result');
  };

  const handleRetake = () => {
    setStage('profile');
    setUserAnswers({});
    setCurrentIndex(0);
    setCompletedParticipant(null);
  };

  const selectedAnswerId = userAnswers[currentQuestion?.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ---------------- STAGE 1: SPRACHBIOGRAFIE & ERFASSUNG ---------------- */}
      {stage === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Schritt 1 von 2 · Ist-Zustand & Sprachbiografie
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Lernstandstest für neue Kursteilnehmer
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              Erfassen Sie vorab die Sprachbiografie des Teilnehmers. Der anschließende Einstufungstest (15 praxisnahe Aufgaben nach GER/BAMF A1-Standards mit Audio) liefert eine präzise Diagnose für Ihre heutigen 2 Unterrichtsstunden.
            </p>
          </div>

          <form onSubmit={handleStartTest} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Vollständiger Name des Teilnehmers *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Amina Khalil"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Herkunftsland
                </label>
                <input
                  type="text"
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  placeholder="z.B. Syrien, Ukraine, Kolumbien"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Muttersprache / Erstsprache *
                </label>
                <select
                  value={nativeLanguage}
                  onChange={(e) => {
                    const lang = e.target.value as NativeLanguage;
                    setNativeLanguage(lang);
                    // Smart script suggestion
                    if (lang === 'Ukrainisch' || lang === 'Russisch') setScriptBackground('Kyrillisch');
                    else if (lang === 'Arabisch' || lang === 'Farsi/Dari') setScriptBackground('Arabisch');
                    else if (lang === 'Türkisch' || lang === 'Englisch' || lang === 'Französisch' || lang === 'Spanisch') setScriptBackground('Lateinisch');
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                >
                  <option value="Ukrainisch">Ukrainisch</option>
                  <option value="Arabisch">Arabisch</option>
                  <option value="Russisch">Russisch</option>
                  <option value="Türkisch">Türkisch</option>
                  <option value="Farsi/Dari">Farsi / Dari</option>
                  <option value="Spanisch">Spanisch</option>
                  <option value="Französisch">Französisch</option>
                  <option value="Englisch">Englisch</option>
                  <option value="Sonstige">Sonstige Erstsprache</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Schrift-Hintergrund (Alphabet) *
                </label>
                <select
                  value={scriptBackground}
                  onChange={(e) => setScriptBackground(e.target.value as ScriptBackground)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                >
                  <option value="Lateinisch">Lateinisches Alphabet (wie Deutsch/Englisch)</option>
                  <option value="Kyrillisch">Kyrillisches Alphabet (z.B. Ukraine, Osteuropa)</option>
                  <option value="Arabisch">Arabische Schrift (von rechts nach links)</option>
                  <option value="Andere">Anderes Schriftsystem / Zweitschriftlerner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Deutsch-Vorkenntnisse
                </label>
                <select
                  value={previousGermanStudy}
                  onChange={(e) => setPreviousGermanStudy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                >
                  <option value="Keine Vorkenntnisse">Keine Vorkenntnisse (Absoluter Anfänger)</option>
                  <option value="Nur Lern-Apps (z.B. DuoLingo, wenige Wochen)">Nur Lern-Apps (DuoLingo, wenige Wochen)</option>
                  <option value="Einige Wörter im Alltag aufgeschnappt">Einige Wörter im Alltag aufgeschnappt</option>
                  <option value="Bereits Vorkurs oder Schule im Herkunftsland">Bereits Vorkurs oder Schule im Herkunftsland</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Primäres Lernziel des Teilnehmers
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 text-sm bg-white"
                >
                  <option value="Alltag & Einkaufen">Alltag, Einkaufen & Orientierung</option>
                  <option value="Arbeit, Handwerk & Beruf">Arbeit, Handwerk & Beruf</option>
                  <option value="Kinder, Schule & Kita">Kinder, Schule & Kita-Kommunikation</option>
                  <option value="Behörden, Arzt & Gesundheit">Behörden, Arztbesuche & Gesundheit</option>
                  <option value="Studium & akademische Anerkennung">Studium & akademische Anerkennung</option>
                </select>
              </div>
            </div>

            {/* Quick Didactic Hint for the Teacher */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Didaktischer Hinweis für den Kursstart heute: </span>
              Teilnehmer aus nicht-lateinischen Schriftsystemen (Kyrillisch, Arabisch) benötigen zu Beginn gezielte phonetische Unterstützung bei Laut-Buchstaben-Zuordnungen (besonders Umlaute ä/ö/ü und Konsonantencluster wie sch/ch).
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                15 Multiple-Choice & Hörfragen · Dauer ca. 5-8 Minuten
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Test jetzt durchführen</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- STAGE 2: INTERAKTIVER TEST MIT AUDIO ---------------- */}
      {stage === 'questions' && currentQuestion && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Progress Header */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <span>Frage {currentIndex + 1} von {DIAGNOSTIC_QUESTIONS.length}</span>
                <span>·</span>
                <span className="text-slate-800">{currentQuestion.categoryLabel}</span>
              </div>
              <div className="text-sm text-slate-600">
                Teilnehmer: <span className="font-medium text-slate-900">{name}</span> ({nativeLanguage})
              </div>
            </div>

            {/* Audio speed control */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Sprechtempo:</span>
              <button
                type="button"
                onClick={() => setAudioSpeed(0.65)}
                className={`px-2.5 py-1 rounded-md transition-colors ${audioSpeed === 0.65 ? 'bg-slate-900 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
              >
                0.65x (Langsam)
              </button>
              <button
                type="button"
                onClick={() => setAudioSpeed(0.85)}
                className={`px-2.5 py-1 rounded-md transition-colors ${audioSpeed === 0.85 ? 'bg-slate-900 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
              >
                0.85x (Normal)
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5">
            <div 
              className="bg-amber-400 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {currentQuestion.questionText}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                {currentQuestion.instruction}
              </p>
            </div>

            {/* Audio Listening Block if applicable */}
            {currentQuestion.audioText && (
              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                      Hörbeispiel (Deutsche Aussprache)
                    </div>
                    <div className="text-sm text-amber-800">
                      Klicken Sie zum Abspielen, so oft wie nötig.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayAudio(currentQuestion.audioText!)}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingAudio ? 'Wird abgespielt...' : 'Audio anhören'}</span>
                </button>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswerId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all flex items-start justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className={`text-base font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                        {option.text}
                      </div>
                      {option.subtext && (
                        <div className="text-xs text-slate-500 mt-0.5">
                          {option.subtext}
                        </div>
                      )}
                    </div>
                    
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-slate-900 bg-slate-900' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-400'
                    : 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswerId}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                  selectedAnswerId
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Auswertung anzeigen' : 'Nächste Frage'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- STAGE 3: DIAGNOSEBERICHT & IST-ZUSTAND ---------------- */}
      {stage === 'result' && completedParticipant && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Diagnosebericht & Ist-Zustandserhebung (GER / BAMF Standard)
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Lernstandsanalyse: {completedParticipant.name}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Herkunft: {completedParticipant.originCountry}</span>
                  <span>·</span>
                  <span>Muttersprache: {completedParticipant.nativeLanguage}</span>
                  <span>·</span>
                  <span>Schrift: {completedParticipant.scriptBackground}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Drucken / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Neuen Test</span>
                </button>
              </div>
            </div>

            {/* GER Level Placement Banner */}
            <div className="mt-6 p-6 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                  Ermittelter Einstufungsgrad
                </div>
                <div className="text-3xl font-extrabold tracking-tight mt-1">
                  GER-Stufe: {completedParticipant.assignedLevel}
                </div>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">
                  {completedParticipant.assignedLevel === 'A0' && 
                    'Benötigt gezielte Alphabetisierungs- und Phonetik-Unterstützung. Ideal für schrittweises Lauttraining und Nachspuren lateinischer Buchstaben.'}
                  {completedParticipant.assignedLevel === 'A1.1' && 
                    'Idealer Einsteiger für die heutige 1. Unterrichtseinheit! Kennt wenige Grußformeln, profitiert sofort von Minidialogen und Wortschatzaufbau.'}
                  {completedParticipant.assignedLevel === 'A1.2' && 
                    'Gute elementare Vorkenntnisse vorhanden. Kann heute als Stütze in Partnerübungen dienen und leichtere Führungsrollen übernehmen.'}
                  {completedParticipant.assignedLevel === 'A2.1' && 
                    'Sehr solide Basis. Für diesen Teilnehmer empfiehlt es sich, Zusatzaufgaben oder freiere Sprechimpulse bereitzuhalten.'}
                </p>
              </div>

              <div className="bg-white/10 px-6 py-4 rounded-xl text-center shrink-0">
                <div className="text-xs text-slate-300">Gesamtpunktzahl</div>
                <div className="text-3xl font-extrabold text-amber-300 tabular-nums">
                  {completedParticipant.testScore} / {completedParticipant.testMaxScore}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  ({Math.round(((completedParticipant.testScore || 0) / (completedParticipant.testMaxScore || 15)) * 100)}%)
                </div>
              </div>
            </div>

            {/* Sub-competencies Breakdown */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Kompetenzbereiche im Detail
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Phonetik */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs text-slate-500">Phonetik & Hören</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                    {completedParticipant.subScores?.phonetics} / 3 Punkte
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${((completedParticipant.subScores?.phonetics || 0) / 3) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Umlaute, Hörübung, Grußerkennung
                  </div>
                </div>

                {/* Wortschatz */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs text-slate-500">Grundwortschatz</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                    {completedParticipant.subScores?.vocabulary} / 4 Punkte
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${((completedParticipant.subScores?.vocabulary || 0) / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Begrüßung, Zahlen, Wochentag
                  </div>
                </div>

                {/* Grammatik */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs text-slate-500">Grammatik & Strukturen</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                    {completedParticipant.subScores?.grammar} / 4 Punkte
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${((completedParticipant.subScores?.grammar || 0) / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    heißen/sein, Sie vs du, Artikel
                  </div>
                </div>

                {/* Lesen */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs text-slate-500">Leseverstehen & Satzbau</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
                    {completedParticipant.subScores?.reading} / 4 Punkte
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${((completedParticipant.subScores?.reading || 0) / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Minidialoge, Schilder, Verbposition 2
                  </div>
                </div>
              </div>
            </div>

            {/* Didactic Teacher Recommendations for Today's 2-hour lesson */}
            <div className="mt-8 p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Didaktischer Aktionsplan für die heutigen 2 Stunden (Montag)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="p-4 rounded-lg bg-white border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-1">
                    1. Empfohlene Unterrichts-Rolle heute:
                  </div>
                  <p>
                    {completedParticipant.assignedLevel === 'A0' && 'Gemeinsam mit einem sprachverwandten Lernpartner setzen. Zuerst Fokus auf das Nachsprechen und Buchstabieren des eigenen Namens legen.'}
                    {completedParticipant.assignedLevel === 'A1.1' && 'Standard-Ablauf: Aktiv in der Namensrunde mitsprechen lassen, Dialogkarte "Woher kommen Sie?" zuweisen.'}
                    {completedParticipant.assignedLevel === 'A1.2' || completedParticipant.assignedLevel === 'A2.1' ? 'Ideal als Partner für Lerner mit geringeren Vorkenntnissen. Strukturierte Frage-Antwort-Sequenzen im Partnerdialog anleiten lassen.' : ''}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-1">
                    2. Spezifischer Förderimpuls:
                  </div>
                  <p>
                    {completedParticipant.scriptBackground !== 'Lateinisch' 
                      ? 'Schriftunterschiede beachten: Zeigen Sie die Druckbuchstaben groß an der Tafel. Loben Sie die ersten geschriebenen Wörter auf dem Namensschild!' 
                      : 'Alphabet ist bereits vertraut: Direkter Fokus auf typische deutsche Ausspracheeigenheiten (z.B. Auslautverhärtung, Umlaute, "ch"-Laute).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Forward Action to Lesson Planner */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Ergebnis wurde automatisch im Kurs-Dashboard gespeichert.
              </div>
              <button
                type="button"
                onClick={onGoToLesson}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Zum 120-Minuten Montags-Unterrichtsplaner</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
