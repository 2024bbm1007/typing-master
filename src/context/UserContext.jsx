import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import StorageService from '../utils/storage';
import { calculateXP, calculateLevel } from '../utils/calculateStats';
import { generateId } from '../utils/helpers';
import { ACHIEVEMENTS } from '../data';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(StorageService.getDefaultUserData());
    const [notification, setNotification] = useState(null);

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

    const checkAchievements = useCallback((data) => {
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
                default:
                    break;
            }
        });

        return unlocked;
    }, []);

    const updateUserAfterSession = useCallback((sessionData) => {
        const { finalWpm, finalAccuracy, finalErrors, duration, practiceText, currentLesson, currentEssay, currentDoc } = sessionData;
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

        // Complete at 80% accuracy
        if (finalAccuracy >= 80) {
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

        if (brandNewAchievements.length > 0) {
            const ach = ACHIEVEMENTS.find(a => a.id === brandNewAchievements[0]);
            if (ach) {
                showNotificationMsg(`🎉 Achievement unlocked: ${ach.name}`);
            }
        }

        return { xpEarned, newAchievements: brandNewAchievements };
    }, [userData, checkAchievements, showNotificationMsg]);

    const isLessonUnlocked = useCallback((lesson) => {
        if (lesson.id === 1) return true;
        return userData.lessonsCompleted.includes(lesson.id - 1);
    }, [userData.lessonsCompleted]);

    const value = {
        userData,
        setUserData,
        notification,
        showNotificationMsg,
        updateUserAfterSession,
        isLessonUnlocked
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
