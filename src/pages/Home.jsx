import React from 'react';
import { Target, Zap, Trophy, TrendingUp, Award, FileText, Code, Upload, Clock } from 'lucide-react';
import { formatTime } from '../utils/helpers';
import { ACHIEVEMENTS, LESSONS, ESSAYS, TECHNICAL_DOCS } from '../data';
import { useUser } from '../context/UserContext';
import { useTyping } from '../context/TypingContext';

const Home = ({ setMode, setShowCustomTextModal }) => {
    const { userData } = useUser();

    return (
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
    );
};

export default Home;
