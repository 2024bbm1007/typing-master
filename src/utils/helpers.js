/**
 * Generate a unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

/**
 * Format seconds to human-readable time string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const today = new Date().toDateString();
  const checkDate = new Date(date).toDateString();
  return today === checkDate;
};

/**
 * Check if a date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is yesterday
 */
export const isYesterday = (date) => {
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const checkDate = new Date(date).toDateString();
  return yesterday === checkDate;
};

/**
 * Get color based on accuracy value
 * @param {number} accuracy - Accuracy percentage
 * @returns {string} Tailwind color class
 */
export const getAccuracyColor = (accuracy) => {
  if (accuracy >= 95) return 'text-emerald-400';
  if (accuracy >= 85) return 'text-green-400';
  if (accuracy >= 75) return 'text-yellow-400';
  if (accuracy >= 60) return 'text-orange-400';
  return 'text-red-400';
};

/**
 * Get color based on WPM value
 * @param {number} wpm - Words per minute
 * @returns {string} Tailwind color class
 */
export const getWPMColor = (wpm) => {
  if (wpm >= 80) return 'text-purple-400';
  if (wpm >= 60) return 'text-cyan-400';
  if (wpm >= 40) return 'text-blue-400';
  if (wpm >= 20) return 'text-green-400';
  return 'text-gray-400';
};
