import { describe, it, expect } from 'vitest';
import {
    calculateWPM,
    calculateAccuracy,
    calculateCPM,
    calculateXP,
    calculateLevel,
    xpForNextLevel
} from '../utils/calculateStats';

describe('calculateWPM', () => {
    it('returns 0 when minutes is 0', () => {
        expect(calculateWPM(100, 0)).toBe(0);
    });

    it('returns 0 when charactersTyped is 0', () => {
        expect(calculateWPM(0, 5)).toBe(0);
    });

    it('calculates WPM correctly (chars / 5 / minutes)', () => {
        // 50 characters / 5 = 10 words, in 1 minute = 10 WPM
        expect(calculateWPM(50, 1)).toBe(10);
        // 100 characters / 5 = 20 words, in 2 minutes = 10 WPM
        expect(calculateWPM(100, 2)).toBe(10);
        // 250 characters / 5 = 50 words, in 1 minute = 50 WPM
        expect(calculateWPM(250, 1)).toBe(50);
    });
});

describe('calculateAccuracy', () => {
    it('returns 100 when totalChars is 0', () => {
        expect(calculateAccuracy(0, 0)).toBe(100);
    });

    it('calculates accuracy correctly', () => {
        expect(calculateAccuracy(90, 100)).toBe(90);
        expect(calculateAccuracy(50, 100)).toBe(50);
        expect(calculateAccuracy(100, 100)).toBe(100);
    });
});

describe('calculateCPM', () => {
    it('returns 0 when minutes is 0', () => {
        expect(calculateCPM(100, 0)).toBe(0);
    });

    it('calculates CPM correctly', () => {
        expect(calculateCPM(100, 1)).toBe(100);
        expect(calculateCPM(200, 2)).toBe(100);
    });
});

describe('calculateXP', () => {
    it('calculates XP based on text length, wpm, and accuracy', () => {
        // baseXP = 100 / 10 = 10
        // wpmBonus = 60 / 10 = 6
        // accuracyMultiplier = 100 / 100 = 1
        // XP = (10 + 6) * 1 = 16
        expect(calculateXP(60, 100, 100)).toBe(16);
    });

    it('reduces XP for lower accuracy', () => {
        // baseXP = 10, wpmBonus = 6, accuracyMultiplier = 0.5
        // XP = (10 + 6) * 0.5 = 8
        expect(calculateXP(60, 50, 100)).toBe(8);
    });
});

describe('calculateLevel', () => {
    it('returns level 1 for 0 XP', () => {
        expect(calculateLevel(0)).toBe(1);
    });

    it('returns level 2 for 100 XP', () => {
        // sqrt(100 / 100) + 1 = sqrt(1) + 1 = 1 + 1 = 2
        expect(calculateLevel(100)).toBe(2);
    });

    it('returns level 3 for 400 XP', () => {
        // sqrt(400 / 100) + 1 = sqrt(4) + 1 = 2 + 1 = 3
        expect(calculateLevel(400)).toBe(3);
    });
});

describe('xpForNextLevel', () => {
    it('calculates XP needed for next level', () => {
        // Level 1: 1^2 * 100 = 100
        expect(xpForNextLevel(1)).toBe(100);
        // Level 2: 2^2 * 100 = 400
        expect(xpForNextLevel(2)).toBe(400);
        // Level 5: 5^2 * 100 = 2500
        expect(xpForNextLevel(5)).toBe(2500);
    });
});
