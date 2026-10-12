export type CefrLevel = 'A0' | 'A1.1' | 'A1.2' | 'A2.1';

export type NativeLanguage = 
  | 'Arabisch' 
  | 'Ukrainisch' 
  | 'Russisch' 
  | 'Türkisch' 
  | 'Englisch' 
  | 'Französisch' 
  | 'Spanisch' 
  | 'Farsi/Dari' 
  | 'Sonstige';

export type ScriptBackground = 'Lateinisch' | 'Kyrillisch' | 'Arabisch' | 'Andere';

export interface Participant {
  id: string;
  name: string;
  originCountry: string;
  nativeLanguage: NativeLanguage;
  scriptBackground: ScriptBackground;
  previousGermanStudy: string; // e.g. "Keine", "1-3 Monate", "Selbst gelernt mit App"
  primaryGoal: string; // e.g. "Alltag & Einkaufen", "Arbeit & Beruf", "Behörden & Schule"
  testCompleted: boolean;
  testScore?: number; // max 15
  testMaxScore?: number;
  assignedLevel?: CefrLevel;
  targetLevel?: CefrLevel;
  subScores?: {
    phonetics: number; // max 3
    vocabulary: number; // max 4
    grammar: number; // max 4
    reading: number; // max 4
  };
  testedAt?: string;
  notes?: string;
  attendanceHistory?: Record<number, boolean>; // weekNumber -> wasPresent
  homeworkHistory?: Record<number, boolean>; // weekNumber -> homeworkDone
}

export interface SemesterSession {
  weekNumber: number; // 1 to 24
  dateFormatted: string; // e.g. "12. Okt 2026"
  moduleTitle: string; // e.g. "Modul 1: Orientierung & Grundlagen"
  topicTitle: string; // e.g. "Einheit 1: Begrüßung, Alphabet & Ist-Zustand"
  competencies: string[]; // e.g. ["Sich vorstellen", "Alphabet buchstabieren", "Umlaute sprechen"]
  status: 'completed' | 'current' | 'upcoming';
  homeworkTask: string;
  teacherSessionNotes?: string;
}

export interface SemesterModule {
  id: number;
  title: string;
  weeks: string;
  description: string;
  goal: string;
  color: string;
}

export type QuestionCategory = 'phonetics' | 'vocabulary' | 'grammar' | 'reading' | 'self_assessment';

export interface QuestionOption {
  id: string;
  text: string;
  subtext?: string;
  isCorrect?: boolean;
}

export interface DiagnosticQuestion {
  id: number;
  category: QuestionCategory;
  categoryLabel: string;
  questionText: string;
  instruction: string;
  audioText?: string;
  options: QuestionOption[];
  explanation: string;
  level: CefrLevel;
}

export interface LessonPhase {
  id: string;
  timeRange: string;
  durationMinutes: number;
  title: string;
  objective: string;
  activity: string;
  teacherTips: string;
  material: string;
  dialoguePrompts?: { de: string; en: string; audio: string }[];
}

export interface CoreVocabularyItem {
  id: string;
  german: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  category: 'Begrüßung' | 'Vorstellung' | 'Zahlen' | 'Wochentage' | 'Klassenzimmer' | 'Alphabet';
  audio: string;
  translations: {
    en: string;
    uk: string;
    ar: string;
    tr: string;
    fr: string;
    es: string;
    ru: string;
  };
  pronunciationTip?: string;
}
