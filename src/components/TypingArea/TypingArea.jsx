import React from 'react';

const TypingArea = ({
  text,
  userInput,
  currentIndex,
  errors,
  onInputChange,
  inputRef,
  disabled = false,
  showResults = false,
  className = ''
}) => {

  const renderChar = (char, index) => {
    let charClass = 'inline transition-all duration-75';

    if (index < currentIndex) {
      if (errors.includes(index)) {
        charClass += ' bg-red-500 text-white rounded px-0.5';
      } else {
        charClass += ' text-emerald-400';
      }
    } else if (index === currentIndex) {
      charClass += ' bg-yellow-400 text-gray-900 rounded px-0.5 animate-pulse';
    } else {
      charClass += ' text-gray-500';
    }

    if (char === ' ') {
      return <span key={index} className={charClass}> </span>;
    }

    return <span key={index} className={charClass}>{char}</span>;
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 ${className}`}>
      {/* Text Display */}
      <div className="bg-gray-900/50 rounded-lg p-5 mb-5 font-mono text-lg leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
        {text.split('').map((char, idx) => renderChar(char, idx))}
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
            style={{ width: `${text.length > 0 ? (currentIndex / text.length) * 100 : 0}%` }}
          />
        </div>
        <div className="text-sm text-gray-400 mt-1 text-center">
          {text.length > 0 ? Math.round((currentIndex / text.length) * 100) : 0}% Complete
        </div>
      </div>

      {/* Input Field */}
      {!showResults && (
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={onInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          disabled={disabled}
          className="w-full bg-gray-900 border-2 border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 font-mono outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Start typing here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      )}
    </div>
  );
};

export default TypingArea;
