import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/calculateStats';

/**
 * Custom hook for typing test mechanics
 * @param {string} targetText - Text to type
 * @param {Function} onComplete - Callback when test completes
 * @returns {Object} Typing test state and handlers
 */
const useTypingTest = (targetText = '', onComplete = null) => {
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);
  
  const inputRef = useRef(null);

  // Calculate WPM in real-time
  useEffect(() => {
    if (isActive && startTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
        if (elapsed > 0 && userInput.length > 0) {
          const calculatedWpm = calculateWPM(userInput.length, elapsed);
          setWpm(calculatedWpm);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isActive, startTime, userInput]);

  const handleInput = useCallback((value) => {
    // Start timer on first keystroke
    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    setUserInput(value);
    
    // Calculate errors and accuracy
    const newErrors = [];
    let correctChars = 0;
    
    for (let i = 0; i < value.length && i < targetText.length; i++) {
      if (value[i] === targetText[i]) {
        correctChars++;
      } else {
        newErrors.push(i);
      }
    }
    
    setErrors(newErrors);
    setCurrentIndex(value.length);
    
    const acc = calculateAccuracy(correctChars, value.length);
    setAccuracy(acc);

    // Check if test is complete
    if (value.length >= targetText.length) {
      complete(value, correctChars, newErrors);
    }
  }, [isActive, targetText]);

  const complete = useCallback((finalInput, correctChars, finalErrors) => {
    if (isComplete) return;
    
    setIsComplete(true);
    setIsActive(false);
    
    const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    const finalWpm = calculateWPM(finalInput.length, elapsed);
    const finalAccuracy = calculateAccuracy(correctChars, finalInput.length);
    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;
    
    const results = {
      wpm: finalWpm,
      accuracy: finalAccuracy,
      errors: finalErrors.length,
      duration,
      charactersTyped: finalInput.length,
      correctCharacters: correctChars
    };
    
    if (onComplete) {
      onComplete(results);
    }
  }, [isComplete, startTime, onComplete]);

  const reset = useCallback(() => {
    setUserInput('');
    setIsActive(false);
    setStartTime(null);
    setCurrentIndex(0);
    setErrors([]);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    inputRef.current?.focus();
  }, []);

  const restart = useCallback(() => {
    reset();
  }, [reset]);

  return {
    userInput,
    isActive,
    currentIndex,
    errors,
    wpm,
    accuracy,
    isComplete,
    handleInput,
    reset,
    restart,
    inputRef
  };
};

export default useTypingTest;
