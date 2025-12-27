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
    try {
      const storedData = this.get(this.KEYS.USER_DATA);
      if (!storedData) return this.getDefaultUserData();

      // Merge stored data with default data to ensure all fields exist
      // This handles backward compatibility when new fields are added
      const defaults = this.getDefaultUserData();
      const merged = { ...defaults, ...storedData };

      // Validate and fix array fields - ensure they are actually arrays
      const arrayFields = [
        'achievements', 'lessonsCompleted', 'essaysCompleted',
        'docsCompleted', 'sessionHistory', 'wpmHistory', 'accuracyHistory'
      ];

      arrayFields.forEach(field => {
        if (!Array.isArray(merged[field])) {
          console.warn(`Storage: Invalid ${field} data, resetting to default`);
          merged[field] = defaults[field];
        }
      });

      // Validate keyErrors is an object
      if (typeof merged.keyErrors !== 'object' || merged.keyErrors === null) {
        merged.keyErrors = {};
      }

      // Validate numeric fields
      const numericFields = [
        'bestWpm', 'averageWpm', 'averageAccuracy', 'totalSessions',
        'totalTime', 'currentStreak', 'longestStreak', 'accuracyStreak', 'xp', 'level'
      ];

      numericFields.forEach(field => {
        if (typeof merged[field] !== 'number' || isNaN(merged[field])) {
          merged[field] = defaults[field];
        }
      });

      // Explicitly remove legacy premium fields if they exist
      delete merged.isPremium;
      delete merged.premiumUntil;

      return merged;
    } catch (e) {
      console.error('Storage: Error loading user data, resetting to defaults', e);
      // Clear corrupted data and return fresh defaults
      this.remove(this.KEYS.USER_DATA);
      return this.getDefaultUserData();
    }
  },

  setUserData(data) {
    return this.set(this.KEYS.USER_DATA, data);
  },

  getDefaultUserData() {
    return {
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
