import React from 'react';
import { Settings as SettingsIcon, Keyboard as KeyboardIcon, Eye } from 'lucide-react';

const Settings = ({ settings, onSettingsChange, className = '' }) => {
  const defaultSettings = {
    showKeyboard: true,
    soundEnabled: false,
    showTimer: true,
    fontSize: 'medium',
    ...settings
  };

  const handleToggle = (key) => {
    if (onSettingsChange) {
      onSettingsChange({
        ...defaultSettings,
        [key]: !defaultSettings[key]
      });
    }
  };

  const handleFontSizeChange = (size) => {
    if (onSettingsChange) {
      onSettingsChange({
        ...defaultSettings,
        fontSize: size
      });
    }
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <SettingsIcon className="w-5 h-5" />
        Settings
      </h3>
      
      <div className="space-y-4">
        {/* Show Keyboard */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyboardIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Show Virtual Keyboard</span>
          </div>
          <button
            onClick={() => handleToggle('showKeyboard')}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              defaultSettings.showKeyboard ? 'bg-cyan-500' : 'bg-gray-700'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                defaultSettings.showKeyboard ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Show Timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Show Timer</span>
          </div>
          <button
            onClick={() => handleToggle('showTimer')}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              defaultSettings.showTimer ? 'bg-cyan-500' : 'bg-gray-700'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                defaultSettings.showTimer ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Font Size */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Font Size</label>
          <div className="flex gap-2">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  defaultSettings.fontSize === size
                    ? 'bg-cyan-500 border-cyan-400 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
