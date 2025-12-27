import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, Flame, Star, Home as HomeIcon, FileText, Code, Upload, BarChart3, Trophy, BookOpen } from 'lucide-react';

import ThemeToggle from './components/ThemeToggle';
import { AdBanner, AdInterstitial } from './components/Ads';
import { useTyping } from './context/TypingContext';
import { useUser } from './context/UserContext';
import AdService from './services/adService';

// Pages
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Essays from './pages/Essays';
import TechnicalDocs from './pages/TechnicalDocs';
import CustomPractice from './pages/CustomPractice';
import Analytics from './pages/Analytics';
import Progress from './pages/Progress';
import TypingPage from './pages/TypingPage';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';


export default function TypingMasterApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUser();
  const { startSession: startContextSession, showNotificationMsg, notification } = useTyping();

  const [showCustomTextModal, setShowCustomTextModal] = useState(false);
  const [customText, setCustomText] = useState('');
  const [showInterstitial, setShowInterstitial] = useState(false);

  // Derive mode from URL path
  const mode = useMemo(() => {
    const path = location.pathname.substring(1); // Remove leading '/'
    const validModes = ['home', 'lessons', 'essays', 'technical', 'custom', 'analytics', 'progress', 'typing', 'privacy', 'blog'];
    return validModes.includes(path) ? path : 'home';
  }, [location.pathname]);

  const setMode = (newMode) => {
    navigate(`/${newMode}`);
  };

  const handleCustomTextSubmit = () => {
    if (customText.trim().length < 20) {
      showNotificationMsg('Please enter at least 20 characters', 'error');
      return;
    }
    startContextSession(customText.trim());
    setMode('typing');
    setShowCustomTextModal(false);
    setCustomText('');
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
              <div
                className="cursor-pointer"
                onClick={() => setMode('home')}
              >
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
              { id: 'home', label: 'Home', icon: HomeIcon },
              { id: 'lessons', label: 'Lessons', icon: FileText },
              { id: 'essays', label: 'Essays', icon: FileText },
              { id: 'technical', label: 'Technical', icon: Code },
              { id: 'custom', label: 'Custom', icon: Upload },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'progress', label: 'Progress', icon: Trophy },
              { id: 'blog', label: 'Blog', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${mode === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
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
        {mode === 'home' && (
          <Home
            setMode={setMode}
            setShowCustomTextModal={setShowCustomTextModal}
          />
        )}
        {mode === 'lessons' && <Lessons />}
        {mode === 'essays' && <Essays />}
        {mode === 'technical' && <TechnicalDocs />}
        {mode === 'custom' && (
          <CustomPractice
            setShowCustomTextModal={setShowCustomTextModal}
          />
        )}
        {mode === 'analytics' && <Analytics />}
        {mode === 'progress' && <Progress />}
        {mode === 'blog' && <Blog />}
        {mode === 'typing' && <TypingPage />}
        {mode === 'privacy' && <PrivacyPolicy />}
      </main>

      {/* Footer Banner Ad */}
      <footer className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
        <AdBanner adSlot="footerBanner" size="728x90" />
        <div className="flex gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} TypeMaster Pro</span>
          <span>•</span>
          <button onClick={() => setMode('privacy')} className="hover:text-gray-300">Privacy & Terms</button>
        </div>
      </footer>
    </div>
  );
}
