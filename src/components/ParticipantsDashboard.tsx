import React, { useState, useRef } from 'react';
import { 
  Users, 
  Award, 
  Languages, 
  BookOpen, 
  Search, 
  Download, 
  Upload,
  UserPlus, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Clock,
  Sparkles,
  Eye,
  Trash2,
  Calendar,
  CheckSquare,
  Square,
  Server,
  Cloud,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Check,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Participant, CefrLevel, SemesterSession } from '../types';
import { SEMESTER_MODULES, INITIAL_SEMESTER_SESSIONS } from '../data/semesterData';

interface ParticipantsDashboardProps {
  participants: Participant[];
  onStartTestForNew: () => void;
  onDeleteParticipant?: (id: string) => void;
  onSelectParticipantForTest: (id: string) => void;
  onUpdateParticipant?: (participant: Participant) => void;
  onRestoreParticipants?: (participants: Participant[]) => void;
}

export const ParticipantsDashboard: React.FC<ParticipantsDashboardProps> = ({
  participants,
  onStartTestForNew,
  onDeleteParticipant,
  onSelectParticipantForTest,
  onUpdateParticipant,
  onRestoreParticipants
}) => {
  // Sub-navigation tabs inside Dashboard
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'sessions' | 'milestones' | 'hosting'>('overview');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [selectedDetailParticipant, setSelectedDetailParticipant] = useState<Participant | null>(null);

  // 24-Week Sessions State (stored in localStorage)
  const [sessions, setSessions] = useState<SemesterSession[]>(() => {
    try {
      const saved = localStorage.getItem('deutschkurs_semester_sessions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load sessions from localStorage', e);
    }
    return INITIAL_SEMESTER_SESSIONS;
  });

  // Selected session in the 24-week manager
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);

  // File input ref for JSON restore
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoreFeedback, setRestoreFeedback] = useState<string | null>(null);

  // Sync sessions to localStorage
  const saveSessions = (updatedSessions: SemesterSession[]) => {
    setSessions(updatedSessions);
    try {
      localStorage.setItem('deutschkurs_semester_sessions', JSON.stringify(updatedSessions));
    } catch (e) {
      console.warn('Failed to save sessions', e);
    }
  };

  // Toggle attendance for participant on current selected week
  const handleToggleAttendance = (participantId: string, weekNum: number) => {
    const participant = participants.find(p => p.id === participantId);
    if (!participant || !onUpdateParticipant) return;

    const currentAttendance = participant.attendanceHistory || {};
    const updated = {
      ...participant,
      attendanceHistory: {
        ...currentAttendance,
        [weekNum]: !currentAttendance[weekNum]
      }
    };
    onUpdateParticipant(updated);
  };

  // Toggle homework for participant on current selected week
  const handleToggleHomework = (participantId: string, weekNum: number) => {
    const participant = participants.find(p => p.id === participantId);
    if (!participant || !onUpdateParticipant) return;

    const currentHw = participant.homeworkHistory || {};
    const updated = {
      ...participant,
      homeworkHistory: {
        ...currentHw,
        [weekNum]: !currentHw[weekNum]
      }
    };
    onUpdateParticipant(updated);
  };

  // Filter participants
  const filteredParticipants = participants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.nativeLanguage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || p.assignedLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Analytics
  const total = participants.length;
  const a0Count = participants.filter(p => p.assignedLevel === 'A0').length;
  const a1_1Count = participants.filter(p => p.assignedLevel === 'A1.1').length;
  const a1_2Count = participants.filter(p => p.assignedLevel === 'A1.2' || p.assignedLevel === 'A2.1').length;
  const nonLatinScriptCount = participants.filter(p => p.scriptBackground !== 'Lateinisch').length;

  // Active session
  const activeSession = sessions.find(s => s.weekNumber === selectedWeekNum) || sessions[0];

  // Export full JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      semesterName: 'Deutschkurs Halbjahr (Montags 2 Zeitstunden)',
      totalWeeks: 24,
      participants,
      sessions
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deutschkurs_backup_6_monate_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.participants && Array.isArray(json.participants)) {
          if (onRestoreParticipants) {
            onRestoreParticipants(json.participants);
          }
          if (json.sessions && Array.isArray(json.sessions)) {
            saveSessions(json.sessions);
          }
          setRestoreFeedback('Sicherung erfolgreich wiederhergestellt!');
          setTimeout(() => setRestoreFeedback(null), 4000);
        } else {
          setRestoreFeedback('Ungültiges Dateiformat.');
        }
      } catch (err) {
        setRestoreFeedback('Fehler beim Einlesen der Datei.');
      }
    };
    reader.readAsText(file);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Herkunft', 'Muttersprache', 'Schrift', 'Ist-Stufe', 'Ziel-Stufe', 'Test-Punkte', 'Woche 1 Anwesend'];
    const rows = participants.map(p => [
      `"${p.name}"`,
      `"${p.originCountry}"`,
      `"${p.nativeLanguage}"`,
      `"${p.scriptBackground}"`,
      `"${p.assignedLevel || 'N/A'}"`,
      `"${p.targetLevel || 'A1.2'}"`,
      p.testScore || 0,
      p.attendanceHistory?.[1] ? 'Ja' : 'Nein'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `deutschkurs_halbjahr_anwesenheit_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ---------------- SEMESTER PROGRESS BAR & HEADER ---------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Fortlaufende Instanz · 6 Monate (Halbjahr)</span>
              <span>·</span>
              <span>24 Montage · 48 Zeitstunden</span>
              <span>·</span>
              <span className="text-emerald-700 font-bold">Woche 1 von 24 aktiv</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Halbjahres-Dashboard & Lernstands-Instanz
            </h1>
            <p className="mt-1 text-slate-600 text-sm sm:text-base max-w-3xl">
              Fortlaufende Dokumentation für Ihren 6-monatigen Kurs: Verfolgen Sie den Lernfortschritt vom Ist-Zustand (A0/A1.1) bis zur A1.2-Zertifikatsreife mit Anwesenheitstracker und Datensicherung.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Vollständige Semester-Sicherung als JSON herunterladen"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Backup sichern</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab('hosting')}
              className="px-3.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Cloud className="w-4 h-4 text-emerald-600" />
              <span>Netlify Hosting</span>
            </button>

            <button
              type="button"
              onClick={onStartTestForNew}
              className="px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>Neuer Teilnehmer</span>
            </button>
          </div>
        </div>

        {/* 6-Month Semester Visual Progression Tracker */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-900">
              Semester-Fortschritt: Woche 1 von 24 (Start: 12. Okt 2026 ➜ Ende: 22. Mär 2027)
            </span>
            <span className="tabular-nums font-semibold text-slate-900">
              2 von 48 Zeitstunden absolviert (4%)
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
            {/* Week 1 is completed/current */}
            <div className="bg-amber-400 h-full w-[4.16%]" title="Woche 1: Begonnen" />
            {/* Remaining 23 weeks */}
            <div className="bg-slate-200 h-full flex-1" />
          </div>

          {/* Module Pill Milestones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
            {SEMESTER_MODULES.map((mod) => (
              <div key={mod.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                <div className="font-bold text-slate-800 truncate">{mod.title.split(':')[0]}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{mod.weeks.split('(')[0]}</div>
                <div className="text-[11px] font-semibold text-amber-700 mt-1">{mod.goal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Segmented Sub-Navigation for Dashboard */}
        <div className="pt-2 flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setDashboardTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === 'overview'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>Lerngruppe & Visuelle Karten</span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab('sessions')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === 'sessions'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>24-Wochen Semesterplan & Anwesenheit</span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab('milestones')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === 'milestones'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Lernkurve & Meilensteine</span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab('hosting')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              dashboardTab === 'hosting'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-indigo-500" />
            <span>Netlify Hosting & Backup</span>
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: VISUELLE ÜBERSICHT & TEILNEHMERKARTEN ---------------- */}
      {dashboardTab === 'overview' && (
        <div className="space-y-8">
          {/* Visual KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">Erfasste Teilnehmer</div>
                <div className="text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {total}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Ist-Zustand erhoben</span>
                <span className="font-semibold text-emerald-600">100%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">A0 (Erstalphabetisierung / Basis)</div>
                <div className="text-3xl font-extrabold text-amber-600 mt-1 tabular-nums">
                  {a0Count}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Schwerpunkt: Lautung & Schrift</span>
                <span className="font-semibold">{Math.round((a0Count / Math.max(1, total)) * 100)}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">A1.1 (Standard-Einsteiger)</div>
                <div className="text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">
                  {a1_1Count}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Ideal für heutigen Start</span>
                <span className="font-semibold">{Math.round((a1_1Count / Math.max(1, total)) * 100)}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">Zweitschriftlerner (Nicht-Latein)</div>
                <div className="text-3xl font-extrabold text-indigo-600 mt-1 tabular-nums">
                  {nonLatinScriptCount}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Kyrillisch / Arabisch</span>
                <span className="font-semibold">{Math.round((nonLatinScriptCount / Math.max(1, total)) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Teilnehmer suchen (Name, Land, Sprache)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
              {['all', 'A0', 'A1.1', 'A1.2'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'all' ? 'Alle Niveaus' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Participant Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredParticipants.map(participant => {
              const testScorePercent = Math.round(((participant.testScore || 0) / (participant.testMaxScore || 15)) * 100);
              const initials = participant.name.split(' ').map(n => n[0]).join('').substring(0, 2);

              return (
                <div 
                  key={participant.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between gap-5 hover:border-slate-300 transition-colors"
                >
                  {/* Top Bar: Avatar, Name, Flags */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-sm shadow-2xs">
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            {participant.name}
                          </h3>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {participant.originCountry} · Erstsprache: {participant.nativeLanguage}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                          participant.assignedLevel === 'A0' ? 'bg-amber-100 text-amber-900' :
                          participant.assignedLevel === 'A1.1' ? 'bg-emerald-100 text-emerald-900' :
                          'bg-blue-100 text-blue-900'
                        }`}>
                          Ist: {participant.assignedLevel}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Ziel: <span className="font-semibold text-slate-700">{participant.targetLevel || 'A1.2'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta info tags */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                      <span>Schrift: {participant.scriptBackground}</span>
                      <span>·</span>
                      <span className="truncate">{participant.primaryGoal}</span>
                    </div>

                    {/* Visual Competency Bars */}
                    <div className="mt-4 space-y-2.5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>Kompetenzen aus Lernstandstest:</span>
                        <span className="tabular-nums font-semibold text-slate-900">
                          {participant.testScore || 0} / {participant.testMaxScore || 15} ({testScorePercent}%)
                        </span>
                      </div>

                      {/* 1. Phonetik */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Hören & Phonetik</span>
                          <span className="tabular-nums font-medium">{participant.subScores?.phonetics || 0}/3</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full rounded-full" 
                            style={{ width: `${((participant.subScores?.phonetics || 0) / 3) * 100}%` }} 
                          />
                        </div>
                      </div>

                      {/* 2. Wortschatz */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Grundwortschatz</span>
                          <span className="tabular-nums font-medium">{participant.subScores?.vocabulary || 0}/4</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${((participant.subScores?.vocabulary || 0) / 4) * 100}%` }} 
                          />
                        </div>
                      </div>

                      {/* 3. Grammatik */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Grammatik & Strukturen</span>
                          <span className="tabular-nums font-medium">{participant.subScores?.grammar || 0}/4</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full" 
                            style={{ width: `${((participant.subScores?.grammar || 0) / 4) * 100}%` }} 
                          />
                        </div>
                      </div>

                      {/* 4. Lesen */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                          <span>Leseverstehen & Satzbau</span>
                          <span className="tabular-nums font-medium">{participant.subScores?.reading || 0}/4</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full rounded-full" 
                            style={{ width: `${((participant.subScores?.reading || 0) / 4) * 100}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Attendance & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(participant.id, 1)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer flex items-center gap-1 transition-colors ${
                          participant.attendanceHistory?.[1]
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Anwesenheit für heute (Woche 1) an-/abwählen"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Woche 1: {participant.attendanceHistory?.[1] ? 'Anwesend' : 'Fehlt'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDetailParticipant(participant)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Diagnose</span>
                      </button>

                      {onDeleteParticipant && (
                        <button
                          type="button"
                          onClick={() => onDeleteParticipant(participant.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: 24-WOCHEN SEMESTERPLAN & ANWESENHEIT ---------------- */}
      {dashboardTab === 'sessions' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Fortlaufende Instanz · Alle 24 Montags-Sitzungen (120 Min)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Semesterplan & Wöchentliche Anwesenheits-Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Wählen Sie einen Montag aus, um Unterrichtsthemen, Hausaufgaben und die Anwesenheit der Teilnehmer zu erfassen. Alle Einträge bleiben für das halbe Jahr persistent gespeichert.
              </p>
            </div>

            {/* Week Selector Chips Carousel */}
            <div>
              <div className="text-xs font-semibold text-slate-600 mb-2">
                Montags-Sitzung auswählen (Woche 1 bis 24):
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                {sessions.map(s => {
                  const isSelected = s.weekNumber === selectedWeekNum;
                  return (
                    <button
                      key={s.weekNumber}
                      type="button"
                      onClick={() => setSelectedWeekNum(s.weekNumber)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      <div className="text-[10px] opacity-75">Mo. {s.weekNumber}</div>
                      <div>{s.dateFormatted.split('.')[0]}. {s.dateFormatted.split('.')[1]?.trim().split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Session Detail Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                    {activeSession.moduleTitle} · {activeSession.dateFormatted}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {activeSession.topicTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    activeSession.weekNumber === 1 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {activeSession.weekNumber === 1 ? 'Heute aktiv' : `Woche ${activeSession.weekNumber}`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-800">Lernziele & Kompetenzen:</span>
                  <ul className="mt-1 space-y-1 list-disc list-inside text-slate-600">
                    {activeSession.competencies.map((comp, i) => (
                      <li key={i}>{comp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-slate-800">Hausaufgabe bis zum nächsten Montag:</span>
                  <div className="mt-1 p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs">
                    {activeSession.homeworkTask}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance & Homework Taker for Active Session */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Teilnehmer-Anwesenheit für Woche {selectedWeekNum} ({activeSession.dateFormatted})
                </h3>
                <span className="text-xs text-slate-500">Klicken zum An-/Abwählen</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold">
                      <th className="py-3 px-4">Teilnehmer</th>
                      <th className="py-3 px-4">Muttersprache</th>
                      <th className="py-3 px-4 text-center">Unterricht anwesend (120 Min)</th>
                      <th className="py-3 px-4 text-center">Hausaufgabe erledigt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {participants.map(p => {
                      const isPresent = !!p.attendanceHistory?.[selectedWeekNum];
                      const isHwDone = !!p.homeworkHistory?.[selectedWeekNum];

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {p.name}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {p.nativeLanguage} ({p.originCountry})
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleAttendance(p.id, selectedWeekNum)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                                isPresent 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {isPresent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                              <span>{isPresent ? 'Anwesend' : 'Nicht anwesend'}</span>
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleHomework(p.id, selectedWeekNum)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                                isHwDone 
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {isHwDone ? <Check className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                              <span>{isHwDone ? 'Erledigt' : 'Offen'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: HALBJAHRES-MEILENSTEINE & LERNKURVE ---------------- */}
      {dashboardTab === 'milestones' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Lernentwicklung über 6 Monate (Halbjahr)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Soll-/Ist-Entwicklung & Meilensteine nach GER
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Vom Erhebungsstand (Heute, Woche 1) zum Goethe Start Deutsch 1 / BAMF A1.2 Abschluss nach 24 Wochen.
              </p>
            </div>

            {/* 4 Core Milestones Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-900">
                    Meilenstein 1 · Woche 1 (Heute!)
                  </span>
                  <span className="text-xs text-amber-900 font-semibold">12. Okt 2026</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Ist-Zustandserhebung & Angstfreies Ankommen
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Diagnose aller Teilnehmer mit dem 15-Fragen-Test. Erfassung der Schrifterfahrung und Bildung erster Tandems.
                </p>
                <div className="text-xs font-semibold text-emerald-800">
                  Status: Erfolgreich gestartet
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800">
                    Meilenstein 2 · Woche 6
                  </span>
                  <span className="text-xs text-slate-500">16. Nov 2026</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Modul 1 Orientierungs-Check
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Freies Buchstabieren von Namen und Adressen, Beherrschen aller Zahlen von 1 bis 100, sicheres Verstehen der Wochentage und Uhrzeiten.
                </p>
                <div className="text-xs text-slate-500">
                  Ziel: Festigung GER A0 ➜ A1.1
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800">
                    Meilenstein 3 · Woche 12 (Halbzeit)
                  </span>
                  <span className="text-xs text-slate-500">28. Dez 2026</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Halbzeit-Diagnosetest A1.1
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formelle Zwischenbilanz: Wiederholung des Einstufungstests zur Messung des individuellen Lernzuwachses in den Bereichen Hören, Wortschatz und Lesen.
                </p>
                <div className="text-xs text-slate-500">
                  Ziel: 100% der Teilnehmer auf gesichertem A1.1
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800">
                    Meilenstein 4 · Woche 24 (Abschluss)
                  </span>
                  <span className="text-xs text-slate-500">22. Mär 2027</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Semesterabschluss & Zertifikatsreife A1.2
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vorbereitung auf offizielle Prüfungen (Goethe Start Deutsch 1 / telc Deutsch A1). Erstellung des Abschlussberichts und Zertifikatsübergabe.
                </p>
                <div className="text-xs text-slate-500">
                  Ziel: Vorbereitung auf A2
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 4: NETLIFY HOSTING & DATENSICHERUNG ---------------- */}
      {dashboardTab === 'hosting' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Dauerhafte Verfügbarkeit · Hosting & Datensicherheit
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Anleitung: Diese App kostenlos auf Netlify hosten
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ja, Sie können diese App problemlos und dauerhaft auf Netlify hosten! Da es sich um eine moderne Single Page Application (SPA) mit React, Vite und Tailwind CSS handelt, ist das Deployment in wenigen Minuten einsatzbereit.
              </p>
            </div>

            {/* Step-by-Step Netlify Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  GitHub-Repository verbinden
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Laden Sie den Code in Ihr GitHub- oder GitLab-Konto hoch. Loggen Sie sich bei <strong>netlify.com</strong> ein und wählen Sie <em>„Add new site“ ➜ „Import an existing project“</em>.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Build-Einstellungen eintragen
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Netlify erkennt Vite automatisch. Die Einstellungen lauten:<br />
                  • <strong>Build command:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">npm run build</code><br />
                  • <strong>Publish directory:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">dist</code>
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Bereits konfigurierte Dateien
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Wir haben für Sie bereits die fertige <strong>netlify.toml</strong> sowie die Routing-Weiterleitung <strong>public/_redirects</strong> im Projekt hinterlegt. Die App funktioniert direkt fehlerfrei!
                </p>
              </div>
            </div>

            {/* 6-Month Backup & Restore Center */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  6-Monats-Datensicherung (Backup & Wiederherstellung)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Da Ihr Kurs über ein halbes Jahr läuft, können Sie jederzeit mit einem Klick alle Teilnehmer, Einstufungen, Anwesenheiten und Notizen als JSON-Sicherungsdatei herunterladen und auf jedem beliebigen Gerät oder Browser wieder einspielen.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Semester-Sicherung herunterladen (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Sicherung wiederherstellen (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Anwesenheitsliste als CSV exportieren</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportBackup}
                  accept=".json"
                  className="hidden"
                />
              </div>

              {restoreFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                  {restoreFeedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Participant Detail Modal */}
      {selectedDetailParticipant && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Teilnehmer-Diagnose · Ist-Zustand
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedDetailParticipant.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailParticipant(null)}
                className="text-slate-400 hover:text-slate-700 text-sm cursor-pointer"
              >
                Schließen
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500">Herkunftsland:</span>
                <div className="font-semibold text-slate-900">{selectedDetailParticipant.originCountry}</div>
              </div>
              <div>
                <span className="text-slate-500">Muttersprache:</span>
                <div className="font-semibold text-slate-900">{selectedDetailParticipant.nativeLanguage}</div>
              </div>
              <div>
                <span className="text-slate-500">Schrifthintergrund:</span>
                <div className="font-semibold text-slate-900">{selectedDetailParticipant.scriptBackground}</div>
              </div>
              <div>
                <span className="text-slate-500">Ermittelter GER-Grad:</span>
                <div className="font-bold text-slate-900">{selectedDetailParticipant.assignedLevel}</div>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Lernziel für dieses Halbjahr:</span>
                <div className="font-medium text-slate-900">{selectedDetailParticipant.primaryGoal}</div>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Lehrkraft-Notizen:</span>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 mt-1 text-slate-800">
                  {selectedDetailParticipant.notes || 'Keine Notizen hinterlegt.'}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedDetailParticipant(null)}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
