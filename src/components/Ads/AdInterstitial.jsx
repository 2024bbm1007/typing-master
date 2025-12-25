import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AD_CONFIG } from '../../config/adConfig';

/**
 * AdInterstitial Component
 * Full-screen interstitial ad modal
 */
const AdInterstitial = ({ 
  onClose, 
  onAdComplete,
  autoCloseDuration = 5,
  skipDelay = 3
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(autoCloseDuration);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Timer for skip button
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, skipDelay * 1000);

    // Countdown timer
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(interval);
    };
  }, []);

  const handleComplete = () => {
    if (onAdComplete) onAdComplete();
    onClose();
  };

  const handleSkip = () => {
    if (canSkip) {
      handleComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          {canSkip && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <X className="w-4 h-4" />
              Skip Ad
            </button>
          )}
        </div>

        {/* Ad Content */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl overflow-hidden">
          {AD_CONFIG.testMode ? (
            // Test mode placeholder
            <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="text-center">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-2xl font-bold mb-2">Interstitial Ad</h3>
                <p className="text-gray-400 mb-4">TEST MODE</p>
                <div className="text-5xl font-bold text-cyan-400 mb-2">{secondsRemaining}</div>
                <p className="text-gray-500 text-sm">
                  {canSkip ? 'You can skip now' : `Skip available in ${Math.max(0, skipDelay - (autoCloseDuration - secondsRemaining))}s`}
                </p>
              </div>
            </div>
          ) : (
            // TODO: Real ad implementation
            <div className="aspect-video flex items-center justify-center bg-gray-900">
              <p className="text-gray-500">Ad content would appear here</p>
            </div>
          )}
        </div>

        {/* Ad info */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {canSkip ? 'Ad can be skipped' : 'Please wait...'}
        </div>
      </div>
    </div>
  );
};

export default AdInterstitial;
