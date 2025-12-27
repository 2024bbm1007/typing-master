import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import AdRewarded from './AdRewarded';
import AdUnlockService from '../../services/adUnlockService';
import AdService from '../../services/adService';
import { AD_UNLOCK_CONFIG } from '../../config/adUnlockConfig';

/**
 * AdUnlockModal Component
 * Modal for unlocking premium features by watching ads
 */
const AdUnlockModal = ({
  featureId,
  onClose,
  onUnlock,
}) => {
  const [showAd, setShowAd] = useState(false);
  const [progress, setProgress] = useState({ current: 0, required: 0, unlocked: false });
  const [unlockStatus, setUnlockStatus] = useState({ unlocked: false, adsWatched: 0 });
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  const feature = AD_UNLOCK_CONFIG.features[featureId];

  useEffect(() => {
    updateStatus();

    // Update time remaining every second if unlocked
    const interval = setInterval(() => {
      updateStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, [featureId]);

  const updateStatus = () => {
    const status = AdUnlockService.getFeatureUnlock(featureId);
    const prog = AdUnlockService.getProgress(featureId);
    const cooldown = AdService.getRewardedAdCooldown(featureId);

    setUnlockStatus(status);
    setProgress(prog);
    setCooldownRemaining(cooldown);

    if (status.unlocked && status.expiresAt) {
      setTimeRemaining(AdUnlockService.getFormattedTimeRemaining(featureId));
    }
  };

  const handleWatchAd = () => {
    if (cooldownRemaining > 0) return;
    setShowAd(true);
  };

  const handleAdComplete = () => {
    // Record ad watched
    const result = AdUnlockService.recordAdWatched(featureId);
    AdService.recordRewardedAdWatched(featureId);

    setShowAd(false);
    updateStatus();

    // If unlocked, notify parent
    if (result.unlocked && onUnlock) {
      setTimeout(() => {
        onUnlock();
        onClose();
      }, 1500);
    }
  };

  if (!feature) {
    return null;
  }

  if (showAd) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <AdRewarded
            rewardType={feature.id}
            rewardDescription={feature.name}
            onRewardEarned={handleAdComplete}
            onCancel={() => setShowAd(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-cyan-500/30 rounded-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{feature.name}</h2>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Unlock Status */}
        {unlockStatus.unlocked ? (
          <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Feature Unlocked!</h3>
              {unlockStatus.expiresAt ? (
                <p className="text-gray-300">
                  Access for <span className="font-bold text-emerald-400">{timeRemaining}</span>
                </p>
              ) : (
                <p className="text-gray-300">Unlocked until used</p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl p-6 mb-6">
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Progress</span>
                <span className="text-sm font-bold text-cyan-400">
                  {progress.current}/{progress.required} ads
                </span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${(progress.current / progress.required) * 100}%` }}
                />
              </div>
            </div>

            {/* Watch Ad Button */}
            <button
              onClick={handleWatchAd}
              disabled={cooldownRemaining > 0}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cooldownRemaining > 0
                ? `Wait ${cooldownRemaining}s`
                : `Watch Ad (${progress.current + 1}/${progress.required})`
              }
            </button>

            {feature.unlockDuration > 0 && (
              <p className="text-xs text-gray-400 text-center mt-2">
                Unlocks for {Math.round(feature.unlockDuration / (1000 * 60 * 60))} hours
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdUnlockModal;
