import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  Presentation, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  Square,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { MONDAY_LESSON_PLAN } from '../data/curriculumData';
import { LessonPhase } from '../types';
import { speakGerman } from '../utils/speech';

export const MondayLessonPlanner: React.FC = () => {
  // Timer state (120 minutes = 7200 seconds)
  const TOTAL_SECONDS = 120 * 60;
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Digital Whiteboard / Presentation View
  const [showBoardModal, setShowBoardModal] = useState(false);

  // Teacher lesson notes & checklist
  const [teacherNotes, setTeacherNotes] = useState(
    'Notizen für heute:\n- Namensschilder auf den Tischen verteilen\n- Weltkarte aufhängen für Herkunftsrunde\n- 4 Teilnehmer haben Test bereits absolviert: Olena (A1.1), Tariq (A0), Maria (A1.2), Kenan (A1.1)\n- Maria & Tariq als Tandem für Phase 3 einteilen!'
  );

  const [checklist, setChecklist] = useState([
    { id: 'c1', text: 'Namensschilder und dicke Filzstifte bereitgelegt', done: true },
    { id: 'c2', text: 'Kennenlern-Ball / Gegenstand für den Stuhlkreis da', done: true },
    { id: 'c3', text: 'Tafelbild für Umlaute (ä, ö, ü) vorbereitet', done: false },
    { id: 'c4', text: 'Lernstandstest auf dem Tablet/Beamer aufgerufen', done: true },
    { id: 'c5', text: 'Kopien der Redemittel für Partnerarbeit verteilt', done: false }
  ]);

  // Audio dialogue playback
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handleSpeakDialogue = (text: string, id: string) => {
    setPlayingAudioId(id);
    speakGerman(text, 0.85, () => setPlayingAudioId(null));
  };

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          if (prev >= TOTAL_SECONDS) {
            setIsTimerRunning(false);
            return TOTAL_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, TOTAL_SECONDS]);

  // Auto-track active phase based on elapsed time
  useEffect(() => {
    const elapsedMinutes = Math.floor(secondsElapsed / 60);
    let cumulative = 0;
    for (let i = 0; i < MONDAY_LESSON_PLAN.phases.length; i++) {
      cumulative += MONDAY_LESSON_PLAN.phases[i].durationMinutes;
      if (elapsedMinutes < cumulative) {
        setActivePhaseIndex(i);
        break;
      }
    }
  }, [secondsElapsed]);

  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const jumpToPhase = (index: number) => {
    setActivePhaseIndex(index);
    let priorMinutes = 0;
    for (let i = 0; i < index; i++) {
      priorMinutes += MONDAY_LESSON_PLAN.phases[i].durationMinutes;
    }
    setSecondsElapsed(priorMinutes * 60);
  };

  const activePhase = MONDAY_LESSON_PLAN.phases[activePhaseIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Today's Lesson Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>{MONDAY_LESSON_PLAN.date}</span>
            <span>·</span>
            <span>2 Zeitstunden (120 Minuten)</span>
            <span>·</span>
            <span className="text-emerald-700 font-bold">Heute gestartet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {MONDAY_LESSON_PLAN.topic}
          </h1>
          <p className="mt-1 text-slate-600 text-sm sm:text-base max-w-3xl">
            {MONDAY_LESSON_PLAN.overview}
          </p>
        </div>

        {/* Live Lesson Pacing Timer Widget */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shrink-0 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-400 font-medium">Unterrichtszeit (120 Min)</div>
            <div className="text-3xl font-extrabold tracking-tight tabular-nums mt-0.5 text-amber-300">
              {formatTime(secondsElapsed)} <span className="text-xs text-slate-400 font-normal">/ 120:00</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Phase {activePhaseIndex + 1}: {activePhase.title.split(':')[1]?.trim() || activePhase.title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center cursor-pointer ${
                isTimerRunning 
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-900' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
              title={isTimerRunning ? 'Pause' : 'Start'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsElapsed(0);
                setActivePhaseIndex(0);
              }}
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowBoardModal(true)}
              className="px-3.5 py-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Tafelbild für Beamer öffnen"
            >
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline">Tafelbild</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Phase Navigator & Phase Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: 5 Structured Phases List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Unterrichtsphasen (120 Min)
            </h2>
            <span className="text-xs text-slate-500">Klicken zum Anspringen</span>
          </div>

          <div className="space-y-3">
            {MONDAY_LESSON_PLAN.phases.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => jumpToPhase(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isActive
                      ? 'border-slate-900 bg-white shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <span>{phase.timeRange}</span>
                      <span>·</span>
                      <span>{phase.durationMinutes} Min</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {phase.title}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {phase.objective}
                    </div>
                  </div>

                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${isActive ? 'bg-amber-400' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Checklist for Today */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 mt-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Checkliste für heute (Montag)
            </h3>
            <div className="space-y-2">
              {checklist.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  className="w-full text-left flex items-start gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={item.done ? 'line-through text-slate-400' : ''}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Active Phase Detail & Interactive Exercises */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <span>Aktive Phase {activePhaseIndex + 1} von {MONDAY_LESSON_PLAN.phases.length}</span>
                <span>·</span>
                <span>{activePhase.timeRange} ({activePhase.durationMinutes} Minuten)</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activePhase.title}
              </h2>
            </div>

            {/* Objective & Activity Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Lernziel dieser Phase
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {activePhase.objective}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                  Didaktischer Tipp für die Lehrkraft
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  {activePhase.teacherTips}
                </p>
              </div>
            </div>

            {/* Detailed Activity Description */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Ablauf & Methodik im Kursraum
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed">
                {activePhase.activity}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                <span className="font-medium text-slate-700">Benötigtes Material: </span>
                {activePhase.material}
              </div>
            </div>

            {/* Dialogue & Audio Practice Prompts if available */}
            {activePhase.dialoguePrompts && activePhase.dialoguePrompts.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span>Redemittel & Sprechkarten (Zum Vorlesen & Nachsprechen)</span>
                </div>

                <div className="space-y-3">
                  {activePhase.dialoguePrompts.map((d, dIdx) => {
                    const isPlaying = playingAudioId === `diag-${dIdx}`;
                    return (
                      <div 
                        key={dIdx}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-base font-bold text-slate-900">
                            {d.de}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {d.en}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSpeakDialogue(d.audio, `diag-${dIdx}`)}
                          className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                          <span>{isPlaying ? 'Spielt...' : 'Audio abspielen'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation between phases */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => jumpToPhase(Math.max(0, activePhaseIndex - 1))}
                disabled={activePhaseIndex === 0}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Vorherige Phase
              </button>

              <button
                type="button"
                onClick={() => jumpToPhase(Math.min(MONDAY_LESSON_PLAN.phases.length - 1, activePhaseIndex + 1))}
                disabled={activePhaseIndex === MONDAY_LESSON_PLAN.phases.length - 1}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Nächste Phase anspringen
              </button>
            </div>
          </div>

          {/* Teacher Course Notes Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Lehrkraft-Notizen für den heutigen Kurs
              </h3>
              <span className="text-xs text-slate-400">Wird automatisch im Browser gesichert</span>
            </div>
            <textarea
              rows={4}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="Beobachtungen eintragen: Wer braucht Hilfe beim Alphabet? Welche Partner harmonieren gut?"
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>
        </div>

      </div>

      {/* ---------------- DIGITAL WHITEBOARD / BEAMER MODAL ---------------- */}
      {showBoardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Digitale Tafel · Beamer-Projektionsansicht
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                  Tafelbild: Erste Kontakte & Umlaute
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowBoardModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Schließen
              </button>
            </div>

            {/* Board Section 1: Standard Begrüßungen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Begrüßung (Formell & Höflich)
                </div>
                <div className="text-2xl font-bold">Guten Tag!</div>
                <div className="text-lg text-slate-300">Wie heißen Sie?</div>
                <div className="text-lg font-semibold text-amber-300">➜ Ich heiße [Name].</div>
              </div>

              <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Herkunft & Wohnort
                </div>
                <div className="text-lg text-slate-300">Woher kommen Sie?</div>
                <div className="text-lg font-semibold text-emerald-400">➜ Ich komme aus [Land].</div>
                <div className="text-lg text-slate-300 pt-2">Wo wohnen Sie?</div>
                <div className="text-lg font-semibold text-emerald-400">➜ Ich wohne in [Stadt].</div>
              </div>
            </div>

            {/* Board Section 2: Die deutschen Umlaute */}
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Deutsche Sonderlaute (Die Umlaute)
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="text-4xl font-extrabold text-amber-300">Ä · ä</div>
                  <div className="text-sm font-medium text-slate-200">wie Äpfel</div>
                  <div className="text-xs text-slate-400">Mund offen wie [a], aber [e] sprechen</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="text-4xl font-extrabold text-amber-300">Ö · ö</div>
                  <div className="text-sm font-medium text-slate-200">wie Öl / hören</div>
                  <div className="text-xs text-slate-400">Lippen rund wie [o], aber [e] sprechen</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="text-4xl font-extrabold text-amber-300">Ü · ü</div>
                  <div className="text-sm font-medium text-slate-200">wie Übung / Tschüss</div>
                  <div className="text-xs text-slate-400">Lippen spitz wie [u], aber [i] sprechen</div>
                </div>
              </div>
            </div>

            {/* Board Section 3: Artikel Farbcodierung */}
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Die 3 Artikel im Deutschen (Farbcode-Regel)
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-200 font-bold">
                  <span className="text-2xl text-blue-400">der</span> (maskulin, blau)
                  <div className="text-xs font-normal text-blue-300/80 mt-1">der Stift · der Montag</div>
                </div>

                <div className="p-4 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 font-bold">
                  <span className="text-2xl text-rose-400">die</span> (feminin, rot)
                  <div className="text-xs font-normal text-rose-300/80 mt-1">die Tafel · die Woche</div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 font-bold">
                  <span className="text-2xl text-emerald-400">das</span> (neutral, grün)
                  <div className="text-xs font-normal text-emerald-300/80 mt-1">das Buch · das Wort</div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowBoardModal(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
              >
                Zurück zum Unterrichtsplan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
