import React from 'react';
import { Clock, FileText } from 'lucide-react';

const ModeSelector = ({ onSelectMode, currentMode = null, className = '' }) => {
  const timeModes = [
    { id: 'time-15', label: '15s', value: 15, icon: Clock },
    { id: 'time-30', label: '30s', value: 30, icon: Clock },
    { id: 'time-60', label: '60s', value: 60, icon: Clock },
    { id: 'time-120', label: '120s', value: 120, icon: Clock },
  ];

  const wordModes = [
    { id: 'words-10', label: '10 words', value: 10, icon: FileText },
    { id: 'words-25', label: '25 words', value: 25, icon: FileText },
    { id: 'words-50', label: '50 words', value: 50, icon: FileText },
    { id: 'words-100', label: '100 words', value: 100, icon: FileText },
  ];

  const handleModeSelect = (mode) => {
    if (onSelectMode) {
      onSelectMode(mode);
    }
  };

  const ModeButton = ({ mode, isActive }) => {
    const Icon = mode.icon;
    return (
      <button
        onClick={() => handleModeSelect(mode)}
        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all border ${
          isActive
            ? 'bg-cyan-500 border-cyan-400 text-white'
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
        }`}
      >
        <Icon className="w-4 h-4" />
        {mode.label}
      </button>
    );
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-bold mb-4">Select Test Mode</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Timed Tests</h4>
          <div className="flex flex-wrap gap-2">
            {timeModes.map(mode => (
              <ModeButton
                key={mode.id}
                mode={mode}
                isActive={currentMode?.id === mode.id}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Word Count</h4>
          <div className="flex flex-wrap gap-2">
            {wordModes.map(mode => (
              <ModeButton
                key={mode.id}
                mode={mode}
                isActive={currentMode?.id === mode.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
