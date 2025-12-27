import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM } from '../utils/calculateStats';
import { useUser } from './UserContext';

const TypingContext = createContext();

export const useTyping = () => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTyping must be used within a TypingProvider');
  }
  return context;
};

export const TypingProvider = ({ children }) => {
  // Get user context
  const { userData, updateUserAfterSession, showNotificationMsg, isLessonUnlocked, notification } = useUser();

  // Session state only
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

  const inputRef = useRef(null);
  const userInputLengthRef = useRef(0);

  // Keep ref in sync with userInput length
  useEffect(() => {
    userInputLengthRef.current = userInput.length;
  }, [userInput]);

  // Calculate WPM in real-time (fixed: no longer recreates interval on every keystroke)
  useEffect(() => {
    if (isTyping && startTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        if (elapsed > 0 && userInputLengthRef.current > 0) {
          const calculatedWpm = calculateWPM(userInputLengthRef.current, elapsed);
          setWpm(calculatedWpm);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isTyping, startTime]);

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

  const completeSession = useCallback((finalWpm, finalAccuracy, finalErrors) => {
    if (sessionComplete) return;
    setSessionComplete(true);
    setIsTyping(false);

    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

    // Delegate user data update to UserContext
    const { xpEarned, newAchievements } = updateUserAfterSession({
      finalWpm,
      finalAccuracy,
      finalErrors,
      duration,
      practiceText,
      currentLesson,
      currentEssay,
      currentDoc
    });

    setSessionResults({
      wpm: finalWpm,
      accuracy: finalAccuracy,
      duration,
      xpEarned,
      newAchievements
    });
  }, [sessionComplete, startTime, practiceText, currentLesson, currentEssay, currentDoc, updateUserAfterSession]);

  const value = {
    // User data (from UserContext)
    userData,
    isLessonUnlocked,

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

    // Notification (from UserContext)
    notification,
    showNotificationMsg,

    // Actions
    startSession,
    handleTyping,
    completeSession,

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
