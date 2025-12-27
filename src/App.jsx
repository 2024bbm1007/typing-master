import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Target, Zap, TrendingUp, Award, Flame, Star, Clock, CheckCircle, ChevronRight, ChevronLeft, Upload, Code, FileText, BarChart3, Crown, Lock, RotateCcw, Home } from 'lucide-react';

// Import data, utilities, and components
import { ESSAYS, LESSONS, TECHNICAL_DOCS, ACHIEVEMENTS } from './data';
import { formatTime, generateId } from './utils/helpers';
import ThemeToggle from './components/ThemeToggle';
import Stats from './components/Stats';
import TypingArea from './components/TypingArea';
import Keyboard from './components/Keyboard';
import ModeSelector from './components/ModeSelector';


// Import Ad components
import { AdBanner, AdInterstitial, FeatureGate } from './components/Ads';
import { useTyping } from './context/TypingContext';
import AdService from './services/adService';
import AdUnlockService from './services/adUnlockService';


// ============================================
// MAIN APPLICATION
// ============================================

export default function TypingMasterApp() {
  const [mode, setMode] = useState('home');
  const [showCustomTextModal, setShowCustomTextModal] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [customText, setCustomText] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  // Connect to global TypingContext
  const {
    // State
    userData,
    practiceText,
    userInput,
    isTyping,
    wpm,
    accuracy,
    errors,
    currentIndex,
    currentLesson,
    currentEssay,
    currentDoc,
    sessionComplete,
    sessionResults,
    notification,

    // Actions
    startSession: startContextSession,
    handleTyping,
    isLessonUnlocked,
    showNotificationMsg,

    // Refs
    inputRef
  } = useTyping();



  const startSession = useCallback((text, lesson = null, essay = null, doc = null) => {
    startContextSession(text, lesson, essay, doc);
    setMode('typing');
  }, [startContextSession]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputRef]);












  const handleCustomTextSubmit = () => {
    if (customText.trim().length < 20) {
      showNotificationMsg('Please enter at least 20 characters', 'error');
      return;
    }
    startSession(customText.trim());
    setShowCustomTextModal(false);
    setCustomText('');
  };



  const renderChar = (char, index) => {
    let className = 'inline transition-all duration-75';

    if (index < currentIndex) {
      if (errors.includes(index)) {
        className += ' bg-red-500 text-white rounded px-0.5';
      } else {
        className += ' text-emerald-400';
      }
    } else if (index === currentIndex) {
      className += ' bg-yellow-400 text-gray-900 rounded px-0.5 animate-pulse';
    } else {
      className += ' text-gray-500';
    }

    if (char === ' ') {
      return <span key={index} className={className}>&nbsp;</span>;
    }

    return <span key={index} className={className}>{char}</span>;
  };

  const sections = [... new Set(LESSONS.map(l => l.section))];
  const filteredLessons = selectedSection === 'all'
    ? LESSONS
    : LESSONS.filter(l => l.section === selectedSection);

  // Analytics Components
  const WeakKeyAnalysis = () => {
    const sortedKeys = Object.entries(userData.keyErrors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    if (sortedKeys.length === 0) {
      return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Weak Key Analysis
          </h3>
          <p className="text-gray-400 text-sm">Complete more sessions to see data. </p>
        </div>
      );
    }

    const maxErrors = sortedKeys[0][1];

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-400" />
          Your Weak Keys
        </h3>
        <div className="space-y-2">
          {sortedKeys.map(([key, count]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono bg-gray-900 px-2 py-0.5 rounded">
                  {key === ' ' ? 'Space' : key}
                </span>
                <span className="text-red-400">{count} errors</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{ width: `${(count / maxErrors) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProgressChart = () => {
    if (userData.wpmHistory.length < 3) {
      return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">WPM Progress</h3>
          <p className="text-gray-400 text-sm">Complete at least 3 sessions to see chart. </p>
        </div>
      );
    }

    const data = userData.wpmHistory.slice(-15);
    const maxWpm = Math.max(...data.map(d => d.wpm), 1);
    const chartHeight = 120;

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          WPM Progress
        </h3>
        <div className="relative" style={{ height: chartHeight }}>
          <svg width="100%" height={chartHeight} className="overflow-visible">
            <polyline
              points={data.map((d, i) => {
                const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
                const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
                return `${x}%,${y}`;
              }).join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {data.map((d, i) => {
              const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
              const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
              return <circle key={i} cx={`${x}%`} cy={y} r="3" fill="#06b6d4" />;
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Oldest</span>
          <span className="text-cyan-400 font-semibold">Latest:  {data[data.length - 1]?.wpm} WPM</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-emerald-500' :
          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
          {notification.message}
        </div>
      )}

      {/* Interstitial Ad */}
      {showInterstitial && (
        <AdInterstitial
          onClose={() => setShowInterstitial(false)}
          onAdComplete={() => {
            console.log('Interstitial ad completed');
          }}
        />
      )}

      {/* Custom Text Modal */}
      {showCustomTextModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Import Custom Text</h2>
              <button onClick={() => setShowCustomTextModal(false)} className="text-gray-400 hover:text-white text-xl">×</button>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste or type your custom text here (minimum 20 characters)..."
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm focus:border-cyan-500 outline-none resize-none"
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                {customText.length} characters {customText.length >= 20 ? '✓' : `(need ${20 - customText.length} more)`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomTextModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomTextSubmit}
                  disabled={customText.length < 20}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold disabled:opacity-50"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                  TypeMaster Pro
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-semibold text-orange-400 text-sm">{userData.currentStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-purple-400 text-sm">Lv. {userData.level}</span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <nav className="flex gap-1.5 mt-3 overflow-x-auto pb-1">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'lessons', label: 'Lessons', icon: FileText },
              { id: 'essays', label: 'Essays', icon: FileText },
              { id: 'technical', label: 'Technical', icon: Code },
              { id: 'custom', label: 'Custom', icon: Upload },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'progress', label: 'Progress', icon: Trophy }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${mode === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Header Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
        <AdBanner adSlot="headerBanner" size="728x90" />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HOME MODE */}
        {mode === 'home' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Master Touch Typing
              </h2>
              <p className="text-gray-400">55 Lessons • 20 Essays • 8 Technical Docs • Custom Practice</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400 text-xs">Best WPM</span>
                </div>
                <div className="text-2xl font-bold text-cyan-400">{userData.bestWpm}</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400 text-xs">Avg Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">{userData.averageAccuracy}%</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-xs">Sessions</span>
                </div>
                <div className="text-2xl font-bold text-purple-400">{userData.totalSessions}</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-400 text-xs">Total Time</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">{formatTime(userData.totalTime)}</div>
              </div>
            </div>

            {/* Quick Start Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setMode('lessons')}
                className="p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all text-left"
              >
                <FileText className="w-7 h-7 text-cyan-400 mb-2" />
                <h3 className="font-bold mb-1">Lessons</h3>
                <p className="text-gray-400 text-xs">{userData.lessonsCompleted.length}/{LESSONS.length} completed</p>
              </button>
              <button
                onClick={() => setMode('essays')}
                className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl hover:border-purple-400 transition-all text-left"
              >
                <FileText className="w-7 h-7 text-purple-400 mb-2" />
                <h3 className="font-bold mb-1">Essays</h3>
                <p className="text-gray-400 text-xs">{userData.essaysCompleted.length}/{ESSAYS.length} completed</p>
              </button>
              <button
                onClick={() => setMode('technical')}
                className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl hover:border-emerald-400 transition-all text-left"
              >
                <Code className="w-7 h-7 text-emerald-400 mb-2" />
                <h3 className="font-bold mb-1">Technical</h3>
                <p className="text-gray-400 text-xs">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length} completed</p>
              </button>
              <button
                onClick={() => setShowCustomTextModal(true)}
                className="p-5 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl hover:border-yellow-400 transition-all text-left"
              >
                <Upload className="w-7 h-7 text-yellow-400 mb-2" />
                <h3 className="font-bold mb-1">Custom</h3>
                <p className="text-gray-400 text-xs">Practice your text</p>
              </button>
            </div>

            {/* Recent Achievements */}
            {userData.achievements.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Recent Achievements ({userData.achievements.length}/{ACHIEVEMENTS.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                  {userData.achievements.slice(-6).map(achId => {
                    const ach = ACHIEVEMENTS.find(a => a.id === achId);
                    if (!ach) return null;
                    return (
                      <div key={achId} className="bg-gray-900/50 rounded-lg px-3 py-2 border border-yellow-500/20">
                        <span className="text-xl mr-2">{ach.icon}</span>
                        <span className="text-sm font-medium">{ach.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* LESSONS MODE */}
        {mode === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold">Structured Lessons</h2>
                <p className="text-gray-400 text-sm">{userData.lessonsCompleted.length}/{LESSONS.length} completed</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedSection('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${selectedSection === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                    }`}
                >
                  All
                </button>
                {sections.map(section => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${selectedSection === section ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                      }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson, index) => {
                const isCompleted = userData.lessonsCompleted.includes(lesson.id);
                const isUnlocked = isLessonUnlocked(lesson);

                return (
                  <React.Fragment key={lesson.id}>
                    <button
                      onClick={() => isUnlocked && startSession(lesson.text, lesson)}
                      disabled={!isUnlocked}
                      className={`p-4 rounded-xl text-left transition-all ${!isUnlocked
                        ? 'bg-gray-800/30 border border-gray-700/50 opacity-50 cursor-not-allowed'
                        : isCompleted
                          ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-500/50'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-xs text-gray-500">{lesson.section}</div>
                          <div className="font-bold">{lesson.id}. {lesson.title}</div>
                        </div>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                        {!isUnlocked && <Lock className="w-5 h-5 text-gray-500" />}
                      </div>
                      <div className="text-xs text-gray-400 truncate mb-2 font-mono">{lesson.text}</div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-xs ${lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                          lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                          {lesson.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">~{lesson.estimatedTime}min</span>
                      </div>
                    </button>

                    {/* Ad placement every 6 lessons */}
                    {AdService.shouldShowLessonListAd(index) && (
                      <div className="col-span-full flex justify-center py-2">
                        <AdBanner adSlot="lessonList" size="300x250" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ESSAYS MODE */}
        {mode === 'essays' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Essay Practice</h2>
              <p className="text-gray-400 text-sm">{userData.essaysCompleted.length}/{ESSAYS.length} completed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ESSAYS.map(essay => {
                const isCompleted = userData.essaysCompleted.includes(essay.id);

                return (
                  <button
                    key={essay.id}
                    onClick={() => startSession(essay.text, null, essay)}
                    className={`p-5 rounded-xl text-left transition-all ${isCompleted
                      ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-purple-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-lg">{essay.title}</div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{essay.text}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs ${essay.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        essay.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {essay.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">~{essay.estimatedTime}min</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TECHNICAL MODE */}
        {mode === 'technical' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-400" />
                Technical Documentation
              </h2>
              <p className="text-gray-400 text-sm">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length} completed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECHNICAL_DOCS.map(doc => {
                const isCompleted = userData.docsCompleted.includes(doc.id);

                return (
                  <button
                    key={doc.id}
                    onClick={() => startSession(doc.text, null, null, doc)}
                    className={`p-5 rounded-xl text-left transition-all ${isCompleted
                      ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-emerald-500/50'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-500">{doc.category}</div>
                        <div className="font-bold">{doc.title}</div>
                      </div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <pre className="text-xs text-gray-400 bg-gray-900/50 p-2 rounded overflow-hidden whitespace-pre-wrap line-clamp-3 mb-3">
                      {doc.text}
                    </pre>
                    <span className="text-xs text-gray-500">~{doc.estimatedTime}min</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CUSTOM MODE */}
        {mode === 'custom' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Upload className="w-6 h-6 text-yellow-400" />
                Custom Text Practice
              </h2>
              <p className="text-gray-400 text-sm">Import your own text for personalized practice</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-4">Import Text</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Paste any text you want to practice - articles, documents, or study materials.
                </p>
                <button
                  onClick={() => setShowCustomTextModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Import Text
                </button>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-4">Suggestions</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Study notes for exams
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Work documents and reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Code snippets from projects
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Book excerpts or articles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS MODE */}
        {mode === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
                Advanced Analytics
              </h2>
              <p className="text-gray-400 text-sm">
                Unlock detailed insights
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Charts - Can unlock with ads */}
              <FeatureGate
                featureId="progressCharts"
              >
                <ProgressChart />
              </FeatureGate>

              {/* Weak Key Analysis - Can unlock with ads */}
              <FeatureGate
                featureId="weakKeyAnalysis"
              >
                <WeakKeyAnalysis />
              </FeatureGate>
            </div>

            {/* Session History - Can unlock with ads */}
            {userData.sessionHistory.length > 0 && (
              <FeatureGate
                featureId="sessionHistory"
              >
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-bold mb-4">Recent Sessions</h3>
                  <div className="space-y-2">
                    {userData.sessionHistory.slice(-10).reverse().map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
                        <span className="text-sm text-gray-400">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-cyan-400 font-semibold">{session.wpm} WPM</span>
                          <span className="text-emerald-400 font-semibold">{session.accuracy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FeatureGate>
            )}
          </div>
        )}

        {/* PROGRESS MODE */}
        {mode === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Progress</h2>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Lessons</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${(userData.lessonsCompleted.length / LESSONS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.lessonsCompleted.length}/{LESSONS.length}</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Essays</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                    style={{ width: `${(userData.essaysCompleted.length / ESSAYS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.essaysCompleted.length}/{ESSAYS.length}</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Technical Docs</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                    style={{ width: `${(userData.docsCompleted.length / TECHNICAL_DOCS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length}</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold mb-4">Achievements ({userData.achievements.length}/{ACHIEVEMENTS.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ACHIEVEMENTS.map(ach => {
                  const unlocked = userData.achievements.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`rounded-lg p-3 text-center border ${unlocked
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-gray-900/50 border-gray-700/50 opacity-40'
                        }`}
                    >
                      <div className="text-2xl mb-1">{ach.icon}</div>
                      <div className="font-semibold text-xs">{ach.name}</div>
                      <div className="text-xs text-gray-400">{ach.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TYPING MODE */}
        {mode === 'typing' && practiceText && (
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Speed</div>
                <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
                <div className="text-xs text-gray-400">WPM</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                <div className="text-3xl font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-gray-400">{currentIndex}/{practiceText.length}</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Errors</div>
                <div className="text-3xl font-bold text-purple-400">{errors.length}</div>
                <div className="text-xs text-gray-400">mistakes</div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              {/* Session Info */}
              {(currentLesson || currentEssay || currentDoc) && (
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm text-gray-400">
                    {currentLesson && `Lesson ${currentLesson.id}:  ${currentLesson.title}`}
                    {currentEssay && currentEssay.title}
                    {currentDoc && `${currentDoc.category}:  ${currentDoc.title}`}
                  </div>
                </div>
              )}

              {/* Text Display */}
              <div className="bg-gray-900/50 rounded-lg p-5 mb-5 font-mono text-lg leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                {practiceText.split('').map((char, idx) => renderChar(char, idx))}
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
                    style={{ width: `${(currentIndex / practiceText.length) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-1 text-center">
                  {Math.round((currentIndex / practiceText.length) * 100)}% Complete
                </div>
              </div>

              {/* Input Field */}
              {!sessionComplete && (
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleTyping}
                  className="w-full bg-gray-900 border-2 border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 font-mono outline-none mb-5"
                  placeholder="Start typing here..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              )}

              {/* Session Results */}
              {sessionComplete && sessionResults && (
                <>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-5 text-center">
                    <h3 className="text-xl font-bold text-emerald-400 mb-3">Session Complete!</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">{sessionResults.wpm}</div>
                        <div className="text-xs text-gray-400">WPM</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-400">{sessionResults.accuracy}%</div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">+{sessionResults.xpEarned}</div>
                        <div className="text-xs text-gray-400">XP Earned</div>
                      </div>
                    </div>
                    {sessionResults.accuracy >= 95 && (
                      <p className="text-sm text-emerald-400">✓ Content marked as completed! </p>
                    )}
                    {sessionResults.accuracy < 95 && (
                      <p className="text-sm text-yellow-400">⚠ Need 95%+ accuracy to complete</p>
                    )}
                  </div>

                  {/* Ad after session complete */}
                  <div className="flex justify-center mb-5">
                    <AdBanner adSlot="sessionComplete" size="300x250" />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => startSession(practiceText, currentLesson, currentEssay, currentDoc)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>

                {currentLesson && (
                  <button
                    onClick={() => {
                      const nextLesson = LESSONS.find(l => l.id === currentLesson.id + 1);
                      if (nextLesson && isLessonUnlocked(nextLesson)) {
                        startSession(nextLesson.text, nextLesson);
                      }
                    }}
                    disabled={!LESSONS.find(l => l.id === currentLesson.id + 1) || !userData.lessonsCompleted.includes(currentLesson.id)}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {currentEssay && (
                  <button
                    onClick={() => {
                      const nextEssay = ESSAYS.find(e => e.id === currentEssay.id + 1);
                      if (nextEssay) startSession(nextEssay.text, null, nextEssay);
                    }}
                    disabled={!ESSAYS.find(e => e.id === currentEssay.id + 1)}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2"
                  >
                    Next Essay
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    if (currentLesson) setMode('lessons');
                    else if (currentEssay) setMode('essays');
                    else if (currentDoc) setMode('technical');
                    else setMode('home');
                  }}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm">
              <strong className="text-blue-400">💡 Tip: </strong> Focus on accuracy first, speed will come naturally!
            </div>
          </div>
        )}
      </main>

      {/* Footer Banner Ad */}
      <footer className="max-w-7xl mx-auto px-4 py-6 flex justify-center">
        <AdBanner adSlot="footerBanner" size="728x90" />
      </footer>

      {/* CSS for line-clamp */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
