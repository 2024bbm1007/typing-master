/**
 * Ad Unlock Service
 * Manages feature unlocking via ad watching
 */

import { AD_UNLOCK_CONFIG } from '../config/adUnlockConfig';

const STORAGE_KEY = 'adUnlockedFeatures';

const AdUnlockService = {
  /**
   * Get unlock status for a feature
   * @param {string} featureId - Feature ID to check
   * @returns {Object} Unlock status { unlocked: boolean, adsWatched: number, expiresAt?: number, expired?: boolean }
   */
  getFeatureUnlock(featureId) {
    const unlocks = this._getUnlocks();
    const unlock = unlocks[featureId];
    
    if (!unlock) {
      return { unlocked: false, adsWatched: 0 };
    }
    
    // Check if still valid
    if (unlock.expiresAt && Date.now() > unlock.expiresAt) {
      // Clean up expired unlock
      this._removeUnlock(featureId);
      return { unlocked: false, adsWatched: 0, expired: true };
    }
    
    return { 
      unlocked: true, 
      expiresAt: unlock.expiresAt,
      unlockedAt: unlock.unlockedAt 
    };
  },

  /**
   * Record ad watched for a feature
   * @param {string} featureId - Feature ID
   * @returns {Object} Updated unlock status
   */
  recordAdWatched(featureId) {
    const config = AD_UNLOCK_CONFIG.features[featureId];
    if (!config) {
      console.error(`Unknown feature ID: ${featureId}`);
      return { unlocked: false, adsWatched: 0 };
    }

    const unlocks = this._getUnlocks();
    const current = unlocks[featureId] || { adsWatched: 0 };
    
    // Increment ads watched
    const newAdsWatched = (current.adsWatched || 0) + 1;
    
    // Check if feature should be unlocked
    if (newAdsWatched >= config.adsRequired) {
      const expiresAt = config.unlockDuration > 0 
        ? Date.now() + config.unlockDuration 
        : null; // No expiration for one-time unlocks
      
      unlocks[featureId] = {
        adsWatched: newAdsWatched,
        unlockedAt: Date.now(),
        expiresAt
      };
      
      this._saveUnlocks(unlocks);
      
      return { 
        unlocked: true, 
        adsWatched: newAdsWatched,
        expiresAt 
      };
    } else {
      // Not yet unlocked, update progress
      unlocks[featureId] = {
        adsWatched: newAdsWatched
      };
      
      this._saveUnlocks(unlocks);
      
      return { 
        unlocked: false, 
        adsWatched: newAdsWatched,
        adsRemaining: config.adsRequired - newAdsWatched
      };
    }
  },

  /**
   * Check if feature is accessible (premium OR ad-unlocked)
   * @param {string} featureId - Feature ID
   * @param {boolean} isPremium - Whether user has premium
   * @returns {boolean} Is feature accessible
   */
  isFeatureAccessible(featureId, isPremium) {
    if (isPremium) return true;
    
    const unlock = this.getFeatureUnlock(featureId);
    return unlock.unlocked;
  },

  /**
   * Get time remaining for unlock
   * @param {string} featureId - Feature ID
   * @returns {number} Milliseconds remaining (0 if expired/not unlocked)
   */
  getTimeRemaining(featureId) {
    const unlock = this.getFeatureUnlock(featureId);
    
    if (!unlock.unlocked || !unlock.expiresAt) {
      return 0;
    }
    
    return Math.max(0, unlock.expiresAt - Date.now());
  },

  /**
   * Get formatted time remaining
   * @param {string} featureId - Feature ID
   * @returns {string} Formatted time (e.g., "23h 45m")
   */
  getFormattedTimeRemaining(featureId) {
    const ms = this.getTimeRemaining(featureId);
    if (ms === 0) return '0m';
    
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  },

  /**
   * Get progress for a feature unlock
   * @param {string} featureId - Feature ID
   * @returns {Object} Progress { current: number, required: number, unlocked: boolean }
   */
  getProgress(featureId) {
    const config = AD_UNLOCK_CONFIG.features[featureId];
    if (!config) return { current: 0, required: 0, unlocked: false };
    
    const unlock = this.getFeatureUnlock(featureId);
    const unlocks = this._getUnlocks();
    const current = unlock.unlocked ? config.adsRequired : (unlocks[featureId]?.adsWatched || 0);
    
    return {
      current,
      required: config.adsRequired,
      unlocked: unlock.unlocked
    };
  },

  /**
   * Clear unlock for a feature (for testing or expiration)
   * @param {string} featureId - Feature ID
   */
  clearFeatureUnlock(featureId) {
    this._removeUnlock(featureId);
  },

  /**
   * Clear all unlocks (for testing)
   */
  clearAllUnlocks() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Private methods
  _getUnlocks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading ad unlocks:', e);
      return {};
    }
  },

  _saveUnlocks(unlocks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocks));
    } catch (e) {
      console.error('Error saving ad unlocks:', e);
    }
  },

  _removeUnlock(featureId) {
    const unlocks = this._getUnlocks();
    delete unlocks[featureId];
    this._saveUnlocks(unlocks);
  }
};

export default AdUnlockService;
