import React, { memo } from 'react';

const Keyboard = memo(({ currentKey = '', pressedKeys = [], errorKeys = [] }) => {
  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl']
  ];

  const getKeyClass = (key) => {
    const baseClass = 'rounded-lg font-mono text-sm flex items-center justify-center transition-all border';

    // Special key sizes
    let sizeClass = 'px-3 py-2';
    if (key === 'Backspace' || key === 'Enter' || key === 'Shift') {
      sizeClass = 'px-6 py-2';
    } else if (key === 'Tab' || key === 'Caps') {
      sizeClass = 'px-5 py-2';
    } else if (key === 'Space') {
      sizeClass = 'px-32 py-2';
    } else if (key === 'Ctrl' || key === 'Alt' || key === 'Win' || key === 'Menu') {
      sizeClass = 'px-4 py-2';
    }

    // Check key state
    const keyUpper = key.toUpperCase();
    const currentKeyUpper = currentKey.toUpperCase();

    if (errorKeys.includes(key) || errorKeys.includes(keyUpper)) {
      return `${baseClass} ${sizeClass} bg-red-500/30 border-red-500 text-red-300`;
    }

    if (currentKeyUpper === keyUpper || (currentKey === ' ' && key === 'Space')) {
      return `${baseClass} ${sizeClass} bg-yellow-400 border-yellow-500 text-gray-900 font-bold scale-95`;
    }

    if (pressedKeys.includes(key) || pressedKeys.includes(keyUpper)) {
      return `${baseClass} ${sizeClass} bg-emerald-500/30 border-emerald-500 text-emerald-300`;
    }

    return `${baseClass} ${sizeClass} bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700`;
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <div className="space-y-2 max-w-4xl mx-auto">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key, keyIndex) => (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={getKeyClass(key)}
              >
                {key === 'Space' ? '' : key}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded"></span> Current Key
          <span className="w-3 h-3 bg-emerald-500/30 border border-emerald-500 rounded ml-3"></span> Correct
          <span className="w-3 h-3 bg-red-500/30 border border-red-500 rounded ml-3"></span> Error
        </span>
      </div>
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

export default Keyboard;
