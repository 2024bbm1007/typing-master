import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import StorageService from '../utils/storage';
import { calculateWPM, calculateXP, calculateLevel } from '../utils/calculateStats';
import { generateId, isToday, isYesterday } from '../utils/helpers';
import { ACHIEVEMENTS } from '../data';

const TypingContext = createContext();

export const useTyping = () => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTyping must be used within a TypingProvider');
  }
  return context;
};

export const TypingProvider = ({ children }) => {
  // User data state
  const [userData, setUserData] = useState(StorageService.getDefaultUserData());
  
  // Session state
  const [practiceText, setPracticeText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionResults, setSessionResults] = useState(null);
  
  // Current content state
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentEssay, setCurrentEssay] = useState(null);
  const [currentDoc, setCurrentDoc] = useState(null);
  
  // Notification state
  const [notification, setNotification] = useState(null);
  
  const inputRef = useRef(null);

  // Load user data on mount
  useEffect(() => {
    const data = StorageService.getUserData();
    setUserData(data);
    checkStreak(data);
  }, []);

  // Save user data on change
  useEffect(() => {
    StorageService.setUserData(userData);
  }, [userData]);

  // Calculate WPM in real-time
  useEffect(() => {
    if (isTyping && startTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        if (elapsed > 0 && userInput.length > 0) {
          const calculatedWpm = calculateWPM(userInput.length, elapsed);
          setWpm(calculatedWpm);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isTyping, startTime, userInput]);

  const checkStreak = (data) => {
    if (!data.lastPracticeDate) return;
    const today = new Date().toDateString();
    const lastDate = new Date(data.lastPracticeDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastDate !== today && lastDate !== yesterday) {
      setUserData(prev => ({ ...prev, currentStreak: 0 }));
    }
  };

  const showNotificationMsg = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const startSession = useCallback((text, lesson = null, essay = null, doc = null) => {
    setPracticeText(text);
    setUserInput('');
    setCurrentIndex(0);
    setErrors([]);
    setIsTyping(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentLesson(lesson);
    setCurrentEssay(essay);
    setCurrentDoc(doc);
    setSessionComplete(false);
    setSessionResults(null);
    
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleTyping = useCallback((e) => {
    const value = e.target.value;
    
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    setUserInput(value);
    
    const newErrors = [];
    let correct = 0;
    
    for (let i = 0; i < value.length && i < practiceText.length; i++) {
      if (value[i] === practiceText[i]) {
        correct++;
      } else {
        newErrors.push(i);
      }
    }
    
    setErrors(newErrors);
    setCurrentIndex(value.length);
    
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(acc);

    if (value.length >= practiceText.length) {
      completeSession(wpm, acc, newErrors);
    }
  }, [isTyping, practiceText, wpm]);

  const checkAchievements = (data) => {
    const unlocked = [];
    
    ACHIEVEMENTS.forEach(ach => {
      if (data.achievements.includes(ach.id)) return;
      
      const { type, value } = ach.requirement;
      
      switch (type) {
        case 'wpm':
          if (data.bestWpm >= value) unlocked.push(ach.id);
          break;
        case 'accuracy': 
          if (data.sessionHistory.some(s => s.accuracy >= value)) unlocked.push(ach.id);
          break;
        case 'accuracy_streak':
          if (data.accuracyStreak >= value) unlocked.push(ach.id);
          break;
        case 'streak':
          if (data.currentStreak >= value) unlocked.push(ach.id);
          break;
        case 'sessions': 
          if (data.totalSessions >= value) unlocked.push(ach.id);
          break;
        case 'lessons':
          if (data.lessonsCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'essays': 
          if (data.essaysCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'docs': 
          if (data.docsCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'time':
          if (data.totalTime >= value) unlocked.push(ach.id);
          break;
        case 'premium':
          if (data.isPremium) unlocked.push(ach.id);
          break;
        default:
          break;
      }
    });
    
    return unlocked;
  };

  const completeSession = useCallback((finalWpm, finalAccuracy, finalErrors) => {
    if (sessionComplete) return;
    setSessionComplete(true);
    setIsTyping(false);
    
    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;
    const today = new Date().toDateString();
    
    const keyErrorsUpdate = { ...userData.keyErrors };
    finalErrors.forEach(idx => {
      if (idx < practiceText.length) {
        const expectedKey = practiceText[idx];
        keyErrorsUpdate[expectedKey] = (keyErrorsUpdate[expectedKey] || 0) + 1;
      }
    });
    
    const xpEarned = calculateXP(finalWpm, finalAccuracy, practiceText.length);
    
    let newStreak = userData.currentStreak;
    if (userData.lastPracticeDate) {
      const lastDate = new Date(userData.lastPracticeDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastDate === yesterday) {
        newStreak = userData.currentStreak + 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newAccuracyStreak = finalAccuracy >= 95 ? userData.accuracyStreak + 1 : 0;

    const sessionRecord = {
      id: generateId(),
      date: Date.now(),
      wpm: finalWpm,
      accuracy: finalAccuracy,
      duration,
      type: currentLesson ? 'lesson' : currentEssay ? 'essay' : currentDoc ? 'doc' : 'custom'
    };

    const updatedData = {
      ...userData,
      bestWpm: Math.max(userData.bestWpm, finalWpm),
      averageWpm: userData.totalSessions > 0 
        ? Math.round((userData.averageWpm * userData.totalSessions + finalWpm) / (userData.totalSessions + 1))
        : finalWpm,
      averageAccuracy: userData.totalSessions > 0
        ? Math.round((userData.averageAccuracy * userData.totalSessions + finalAccuracy) / (userData.totalSessions + 1))
        : finalAccuracy,
      totalSessions: userData.totalSessions + 1,
      totalTime: userData.totalTime + Math.round(duration),
      currentStreak: newStreak,
      longestStreak: Math.max(userData.longestStreak, newStreak),
      lastPracticeDate: Date.now(),
      sessionHistory: [...userData.sessionHistory, sessionRecord].slice(-500),
      keyErrors: keyErrorsUpdate,
      wpmHistory: [...userData.wpmHistory, { date: Date.now(), wpm: finalWpm }].slice(-100),
      accuracyHistory: [...userData.accuracyHistory, { date: Date.now(), accuracy: finalAccuracy }].slice(-100),
      accuracyStreak: newAccuracyStreak,
      xp: userData.xp + xpEarned,
      level: calculateLevel(userData.xp + xpEarned)
    };

    if (finalAccuracy >= 95) {
      if (currentLesson && !userData.lessonsCompleted.includes(currentLesson.id)) {
        updatedData.lessonsCompleted = [...userData.lessonsCompleted, currentLesson.id];
      }
      if (currentEssay && !userData.essaysCompleted.includes(currentEssay.id)) {
        updatedData.essaysCompleted = [...userData.essaysCompleted, currentEssay.id];
      }
      if (currentDoc && !userData.docsCompleted.includes(currentDoc.id)) {
        updatedData.docsCompleted = [...userData.docsCompleted, currentDoc.id];
      }
    }

    const newAchievements = checkAchievements(updatedData);
    const brandNewAchievements = newAchievements.filter(a => !userData.achievements.includes(a));
    updatedData.achievements = [...new Set([...userData.achievements, ...newAchievements])];

    setUserData(updatedData);
    setSessionResults({
      wpm: finalWpm,
      accuracy: finalAccuracy,
      duration,
      xpEarned,
      newAchievements: brandNewAchievements
    });

    if (brandNewAchievements.length > 0) {
      const ach = ACHIEVEMENTS.find(a => a.id === brandNewAchievements[0]);
      if (ach) {
        showNotificationMsg(`🎉 Achievement unlocked: ${ach.name}`);
      }
    }
  }, [sessionComplete, startTime, userData, currentLesson, currentEssay, currentDoc, practiceText, showNotificationMsg]);

  const isLessonUnlocked = useCallback((lesson) => {
    if (lesson.id === 1) return true;
    return userData.lessonsCompleted.includes(lesson.id - 1);
  }, [userData.lessonsCompleted]);

  const handlePayment = useCallback(() => {
    const premiumUntil = new Date();
    premiumUntil.setFullYear(premiumUntil.getFullYear() + 1);
    
    setUserData(prev => ({
      ...prev,
      isPremium: true,
      premiumUntil: premiumUntil.toISOString(),
      achievements: [...new Set([...prev.achievements, 'premium'])]
    }));
    
    showNotificationMsg('🎉 Premium activated! Enjoy all analytics features.');
  }, [showNotificationMsg]);

  const value = {
    // User data
    userData,
    setUserData,
    
    // Session state
    practiceText,
    userInput,
    isTyping,
    startTime,
    wpm,
    accuracy,
    errors,
    currentIndex,
    sessionComplete,
    sessionResults,
    
    // Current content
    currentLesson,
    currentEssay,
    currentDoc,
    
    // Notification
    notification,
    showNotificationMsg,
    
    // Actions
    startSession,
    handleTyping,
    completeSession,
    isLessonUnlocked,
    handlePayment,
    
    // Refs
    inputRef
  };

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
};

export default TypingContext;
