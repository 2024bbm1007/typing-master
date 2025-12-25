/**
 * Calculate Words Per Minute (WPM)
 * @param {number} charactersTyped - Total characters typed
 * @param {number} minutes - Time elapsed in minutes
 * @returns {number} WPM value
 */
export const calculateWPM = (charactersTyped, minutes) => {
  if (minutes === 0 || charactersTyped === 0) return 0;
  return Math.round((charactersTyped / 5) / minutes);
};

/**
 * Calculate accuracy percentage
 * @param {number} correctChars - Number of correct characters
 * @param {number} totalChars - Total characters typed
 * @returns {number} Accuracy percentage (0-100)
 */
export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

/**
 * Calculate Characters Per Minute (CPM)
 * @param {number} charactersTyped - Total characters typed
 * @param {number} minutes - Time elapsed in minutes
 * @returns {number} CPM value
 */
export const calculateCPM = (charactersTyped, minutes) => {
  if (minutes === 0) return 0;
  return Math.round(charactersTyped / minutes);
};

/**
 * Calculate XP earned based on performance
 * @param {number} wpm - Words per minute
 * @param {number} accuracy - Accuracy percentage
 * @param {number} textLength - Length of text typed
 * @returns {number} XP earned
 */
export const calculateXP = (wpm, accuracy, textLength) => {
  const baseXP = Math.floor(textLength / 10);
  const wpmBonus = Math.floor(wpm / 10);
  const accuracyMultiplier = accuracy / 100;
  
  return Math.round((baseXP + wpmBonus) * accuracyMultiplier);
};

/**
 * Calculate level based on total XP
 * @param {number} xp - Total XP
 * @returns {number} Current level
 */
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

/**
 * Calculate XP needed for next level
 * @param {number} currentLevel - Current level
 * @returns {number} XP needed for next level
 */
export const xpForNextLevel = (currentLevel) => {
  return Math.pow(currentLevel, 2) * 100;
};
