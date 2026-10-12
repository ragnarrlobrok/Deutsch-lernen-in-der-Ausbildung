import React from 'react';
import { Sparkles, ClipboardCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'test' | 'lesson' | 'participants' | 'phrases' | 'sources';
  setActiveTab: (tab: 'test' | 'lesson' | 'participants' | 'phrases' | 'sources') => void;
  onStartNewTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onStartNewTest }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('lesson')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-amber-300 font-bold flex items-center justify-center text-sm">
            D
          </span>
          <span>DeutschStart</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('test')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'test'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Lernstandstest
          </button>

          <button
            onClick={() => setActiveTab('lesson')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'lesson'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Montags-Kurs (120 Min)
          </button>

          <button
            onClick={() => setActiveTab('participants')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'participants'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Kurs-Dashboard
          </button>

          <button
            onClick={() => setActiveTab('phrases')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'phrases'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Redemittel & Audio
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'sources'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Quellen & Didaktik
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartNewTest}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-amber-300" />
            <span>Neuen Test starten</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar for smaller viewports */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs">
        <button
          onClick={() => setActiveTab('test')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'test' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
        >
          Lernstandstest
        </button>
        <button
          onClick={() => setActiveTab('lesson')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'lesson' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
        >
          Montags-Kurs
        </button>
        <button
          onClick={() => setActiveTab('participants')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'participants' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('phrases')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'phrases' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
        >
          Redemittel
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'sources' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'}`}
        >
          Didaktik
        </button>
      </div>
    </header>
  );
};
