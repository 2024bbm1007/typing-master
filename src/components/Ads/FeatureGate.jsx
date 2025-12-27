import React, { useState, useEffect } from 'react';
import { Lock, Clock } from 'lucide-react';
import AdUnlockModal from './AdUnlockModal';
import AdUnlockService from '../../services/adUnlockService';

/**
 * FeatureGate Component
 * Wrapper component that gates premium features
 * Shows content if premium OR ad-unlocked, otherwise shows unlock prompt
 */
const FeatureGate = ({
  featureId,
  onUnlock,
  children
}) => {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    checkAccess();

    // Update time remaining every second
    const interval = setInterval(() => {
      checkAccess();
    }, 1000);

    return () => clearInterval(interval);
  }, [featureId]);

  const checkAccess = () => {
    const accessible = AdUnlockService.isFeatureAccessible(featureId);
    setIsUnlocked(accessible);

    if (accessible) {
      const time = AdUnlockService.getFormattedTimeRemaining(featureId);
      setTimeRemaining(time);
    }
  };

  const handleUnlockClick = () => {
    setShowUnlockModal(true);
  };

  const handleUnlocked = () => {
    checkAccess();
    if (onUnlock) onUnlock();
  };

  // Ad-unlocked users get access with timer badge
  if (isUnlocked) {
    return (
      <div className="relative">
        {/* Timer Badge */}
        {timeRemaining && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 bg-orange-500/90 backdrop-blur-sm rounded-lg text-xs font-semibold">
            <Clock className="w-3 h-3" />
            {timeRemaining}
          </div>
        )}
        <div className="border-2 border-orange-500/30 rounded-xl">
          {children}
        </div>
      </div>
    );
  }

  // Locked state - show unlock prompt
  return (
    <>
      <div className="bg-gray-800/50 border-2 border-cyan-500/30 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-cyan-400" />
        </div>

        <h3 className="text-lg font-bold mb-2">
          {AdUnlockService.getProgress(featureId).current > 0
            ? 'Continue Unlocking'
            : 'Unlock This Feature'}
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          Watch ads to unlock temporarily
        </p>

        <button
          onClick={handleUnlockClick}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
        >
          🎬 Watch Ads to Unlock
        </button>
      </div>

      {showUnlockModal && (
        <AdUnlockModal
          featureId={featureId}
          onClose={() => setShowUnlockModal(false)}
          onUnlock={handleUnlocked}
        />
      )}
    </>
  );
};

export default FeatureGate;
