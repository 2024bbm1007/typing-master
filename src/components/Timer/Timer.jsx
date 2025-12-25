import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ time, isRunning, formatTime, className = '' }) => {
  const formattedTime = formatTime ? formatTime() : `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-5 h-5 text-gray-400" />
      <span className={`font-mono text-lg ${isRunning ? 'text-cyan-400' : 'text-gray-400'}`}>
        {formattedTime}
      </span>
    </div>
  );
};

export default Timer;
