import React, { useState, useEffect } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { AD_CONFIG } from '../../config/adConfig';

/**
 * AdRewarded Component
 * Rewarded ad component for "watch to unlock" features
 */
const AdRewarded = ({ 
  onRewardEarned, 
  rewardType = 'feature',
  rewardDescription = 'Premium Feature',
  onCancel
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const adDuration = 5; // 5 seconds for test ads

  useEffect(() => {
    if (isPlaying && !completed) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCompleted(true);
            return 100;
          }
          return prev + (100 / (adDuration * 10)); // Update every 100ms
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, completed]);

  const handleComplete = () => {
    if (onRewardEarned) {
      onRewardEarned();
    }
  };

  const startAd = () => {
    setIsPlaying(true);
  };

  return (
    <div className="bg-gray-800 border-2 border-cyan-500/30 rounded-xl overflow-hidden">
      {/* Ad Player */}
      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
        {!isPlaying && !completed && (
          <button
            onClick={startAd}
            className="flex flex-col items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">Watch Ad</p>
              <p className="text-sm text-gray-400">to unlock {rewardDescription}</p>
            </div>
          </button>
        )}

        {isPlaying && !completed && (
          <div className="text-center">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-xl font-bold mb-2">Rewarded Ad Playing</h3>
            {AD_CONFIG.testMode && (
              <p className="text-gray-400 text-sm">TEST MODE</p>
            )}
          </div>
        )}

        {completed && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Ad Complete!</h3>
            <p className="text-gray-400">You've earned your reward</p>
          </div>
        )}

        {/* Progress bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-900/50 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {!isPlaying && !completed && `Watch ad to unlock ${rewardDescription}`}
          {isPlaying && !completed && 'Please watch the entire ad...'}
          {completed && 'Reward earned!'}
        </div>
        <div className="flex gap-2">
          {!completed && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all"
            >
              Cancel
            </button>
          )}
          {completed && (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
            >
              Claim Reward
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdRewarded;
