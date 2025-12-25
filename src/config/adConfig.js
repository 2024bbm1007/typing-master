/**
 * Ad Configuration
 * Configure ad settings, provider details, and display rules
 */

export const AD_CONFIG = {
  enabled: true,
  testMode: true, // Set to false in production
  provider: 'adsense', // 'adsense', 'admob', etc.
  
  // Google AdSense Configuration
  adsense: {
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // TODO: Add your publisher ID
    slots: {
      headerBanner: '1234567890',
      footerBanner: '1234567891',
      sidebarRect: '1234567892',
      sessionComplete: '1234567893',
      interstitial: '1234567894',
      rewarded: '1234567895',
      lessonList: '1234567896'
    }
  },
  
  // Ad display rules
  rules: {
    interstitialFrequency: 3, // Show every N sessions
    lessonListAdInterval: 6, // Show ad every N lessons
    rewardedAdCooldown: 300, // Seconds between rewarded ads (5 minutes)
  }
};

export default AD_CONFIG;
