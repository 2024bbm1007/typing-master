import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for timer functionality
 * @param {number} initialTime - Initial time in seconds (0 for count up, >0 for countdown)
 * @param {boolean} autoStart - Whether to start automatically
 * @returns {Object} Timer state and controls
 */
const useTimer = (initialTime = 0, autoStart = false) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCountdown] = useState(initialTime > 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (isCountdown) {
            if (prevTime <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isCountdown]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const restart = useCallback(() => {
    setTime(initialTime);
    setIsRunning(true);
  }, [initialTime]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  return {
    time,
    isRunning,
    isCountdown,
    start,
    pause,
    reset,
    restart,
    formatTime
  };
};

export default useTimer;
