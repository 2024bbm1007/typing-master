/**
 * Ad Service
 * Manages ad display logic and tracking
 */

import { AD_CONFIG } from '../config/adConfig';

const AdService = {
  /**
   * Check if ads should be displayed
   * @param {boolean} isPremium - Whether user has premium
   * @returns {boolean} Should show ads
   */
  shouldShowAds(isPremium) {
    return AD_CONFIG.enabled && !isPremium;
  },

  /**
   * Check if interstitial ad should be shown
   * @param {number} sessionCount - Total sessions completed
   * @param {boolean} isPremium - Whether user has premium
   * @returns {boolean} Should show interstitial
   */
  shouldShowInterstitial(sessionCount, isPremium) {
    if (!this.shouldShowAds(isPremium)) return false;
    return sessionCount > 0 && sessionCount % AD_CONFIG.rules.interstitialFrequency === 0;
  },

  /**
   * Check if lesson list ad should be shown
   * @param {number} lessonIndex - Index of lesson in list
   * @returns {boolean} Should show ad after this lesson
   */
  shouldShowLessonListAd(lessonIndex) {
    return (lessonIndex + 1) % AD_CONFIG.rules.lessonListAdInterval === 0;
  },

  /**
   * Get ad slot ID for a specific placement
   * @param {string} slotName - Name of the ad slot
   * @returns {string} Ad slot ID
   */
  getAdSlot(slotName) {
    return AD_CONFIG.adsense.slots[slotName] || '';
  },

  /**
   * Check if user can watch rewarded ad (cooldown check)
   * @param {string} featureId - Feature ID to check
   * @returns {boolean} Can watch rewarded ad
   */
  canWatchRewardedAd(featureId) {
    const lastWatched = localStorage.getItem(`lastRewardedAd_${featureId}`);
    if (!lastWatched) return true;
    
    const timeSinceLastAd = (Date.now() - parseInt(lastWatched)) / 1000;
    return timeSinceLastAd >= AD_CONFIG.rules.rewardedAdCooldown;
  },

  /**
   * Record that user watched a rewarded ad
   * @param {string} featureId - Feature ID
   */
  recordRewardedAdWatched(featureId) {
    localStorage.setItem(`lastRewardedAd_${featureId}`, Date.now().toString());
  },

  /**
   * Get time remaining until next rewarded ad can be watched
   * @param {string} featureId - Feature ID
   * @returns {number} Seconds remaining (0 if can watch now)
   */
  getRewardedAdCooldown(featureId) {
    const lastWatched = localStorage.getItem(`lastRewardedAd_${featureId}`);
    if (!lastWatched) return 0;
    
    const timeSinceLastAd = (Date.now() - parseInt(lastWatched)) / 1000;
    const remaining = AD_CONFIG.rules.rewardedAdCooldown - timeSinceLastAd;
    return Math.max(0, Math.ceil(remaining));
  }
};

export default AdService;
