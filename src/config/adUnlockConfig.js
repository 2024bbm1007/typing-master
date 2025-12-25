/**
 * Ad Unlock Configuration
 * Define which premium features can be unlocked by watching ads
 */

export const AD_UNLOCK_CONFIG = {
  // Each premium feature can be unlocked by watching ads
  features: {
    progressCharts: {
      id: 'progressCharts',
      name: 'Progress Charts',
      description: 'View WPM improvement over time',
      adsRequired: 2, // Watch 2 ads to unlock
      unlockDuration: 24 * 60 * 60 * 1000, // 24 hours access in milliseconds
      icon: 'TrendingUp'
    },
    weakKeyAnalysis: {
      id: 'weakKeyAnalysis', 
      name: 'Weak Key Analysis',
      description: 'Identify keys that need practice',
      adsRequired: 2,
      unlockDuration: 24 * 60 * 60 * 1000, // 24 hours
      icon: 'Target'
    },
    sessionHistory: {
      id: 'sessionHistory',
      name: 'Session History',
      description: 'View all past sessions',
      adsRequired: 1,
      unlockDuration: 12 * 60 * 60 * 1000, // 12 hours
      icon: 'Clock'
    },
    advancedAnalytics: {
      id: 'advancedAnalytics',
      name: 'Advanced Analytics Dashboard',
      description: 'Deep performance insights',
      adsRequired: 3,
      unlockDuration: 24 * 60 * 60 * 1000, // 24 hours
      icon: 'BarChart3'
    },
    unlockNextLesson: {
      id: 'unlockNextLesson',
      name: 'Unlock Next Lesson',
      description: 'Skip lesson requirement',
      adsRequired: 1,
      unlockDuration: 0, // One-time use (no expiration)
      icon: 'Unlock'
    }
  }
};

export default AD_UNLOCK_CONFIG;
