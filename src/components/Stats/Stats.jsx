import React from 'react';
import { TrendingUp, Target, AlertCircle } from 'lucide-react';

const Stats = ({ wpm, accuracy, errors, currentIndex, totalChars, className = '' }) => {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
        <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1">
          <TrendingUp className="w-4 h-4" />
          Speed
        </div>
        <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
        <div className="text-xs text-gray-400">WPM</div>
      </div>
      
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
        <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1">
          <Target className="w-4 h-4" />
          Accuracy
        </div>
        <div className="text-3xl font-bold text-emerald-400">{accuracy}%</div>
        <div className="text-xs text-gray-400">
          {currentIndex}/{totalChars}
        </div>
      </div>
      
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
        <div className="text-sm text-gray-400 mb-1 flex items-center justify-center gap-1">
          <AlertCircle className="w-4 h-4" />
          Errors
        </div>
        <div className="text-3xl font-bold text-purple-400">{errors}</div>
        <div className="text-xs text-gray-400">mistakes</div>
      </div>
    </div>
  );
};

export default Stats;
