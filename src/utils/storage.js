const StorageService = {
  KEYS: {
    USER_DATA: 'typingmaster_user_data',
    ACTIVE_SESSION: 'typingmaster_active_session',
    THEME: 'typingmaster_theme'
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  getUserData() {
    return this.get(this.KEYS.USER_DATA) || this.getDefaultUserData();
  },

  setUserData(data) {
    return this.set(this.KEYS.USER_DATA, data);
  },

  getDefaultUserData() {
    return {
      isPremium: false,
      premiumUntil: null,
      bestWpm: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      totalSessions: 0,
      totalTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      achievements: [],
      lessonsCompleted: [],
      essaysCompleted: [],
      docsCompleted: [],
      sessionHistory: [],
      keyErrors: {},
      wpmHistory: [],
      accuracyHistory: [],
      accuracyStreak: 0,
      xp: 0,
      level: 1
    };
  },

  clearActiveSession() {
    return this.remove(this.KEYS.ACTIVE_SESSION);
  },

  getTheme() {
    const theme = localStorage.getItem(this.KEYS.THEME);
    return theme || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
  }
};

export default StorageService;
