/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DiagnosticTest } from './components/DiagnosticTest';
import { MondayLessonPlanner } from './components/MondayLessonPlanner';
import { ParticipantsDashboard } from './components/ParticipantsDashboard';
import { PhrasesAndPhonetics } from './components/PhrasesAndPhonetics';
import { DidacticSources } from './components/DidacticSources';
import { INITIAL_PARTICIPANTS } from './data/curriculumData';
import { Participant } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'test' | 'lesson' | 'participants' | 'phrases' | 'sources'>('lesson');
  
  // Persistent participants list with localStorage fallback
  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const saved = localStorage.getItem('deutschkurs_participants');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load participants from localStorage', e);
    }
    return INITIAL_PARTICIPANTS;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('deutschkurs_participants', JSON.stringify(participants));
    } catch (e) {
      console.warn('Failed to save participants to localStorage', e);
    }
  }, [participants]);

  const handleSaveParticipant = (newParticipant: Participant) => {
    setParticipants(prev => {
      const existingIndex = prev.findIndex(p => p.id === newParticipant.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newParticipant;
        return updated;
      }
      return [newParticipant, ...prev];
    });
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const handleStartNewTest = () => {
    setActiveTab('test');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Strict 3-zone Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onStartNewTest={handleStartNewTest} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'test' && (
          <DiagnosticTest 
            onSaveParticipant={handleSaveParticipant}
            existingParticipants={participants}
            onGoToLesson={() => setActiveTab('lesson')}
          />
        )}

        {activeTab === 'lesson' && (
          <MondayLessonPlanner />
        )}

        {activeTab === 'participants' && (
          <ParticipantsDashboard 
            participants={participants}
            onStartTestForNew={() => setActiveTab('test')}
            onDeleteParticipant={handleDeleteParticipant}
            onSelectParticipantForTest={() => setActiveTab('test')}
            onUpdateParticipant={handleSaveParticipant}
            onRestoreParticipants={(restored) => setParticipants(restored)}
          />
        )}

        {activeTab === 'phrases' && (
          <PhrasesAndPhonetics />
        )}

        {activeTab === 'sources' && (
          <DidacticSources />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">DeutschStart</span>
            <span className="mx-2">·</span>
            <span>Konzipiert für 120-minütige Montags-Kurse</span>
            <span className="mx-2">·</span>
            <span>GER A0 / A1.1 Standards nach BAMF & Goethe-Institut</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => setActiveTab('sources')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Didaktik-Leitfaden
            </button>
            <span>·</span>
            <button 
              type="button" 
              onClick={() => setActiveTab('phrases')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Mehrsprachige Redemittel
            </button>
            <span>·</span>
            <button 
              type="button" 
              onClick={() => setActiveTab('test')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Lernstandstest
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
