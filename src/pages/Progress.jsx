import React from 'react';
import { useUser } from '../context/UserContext';
import { LESSONS, ESSAYS, TECHNICAL_DOCS, ACHIEVEMENTS } from '../data';

const Progress = () => {
    const { userData } = useUser();

    return (
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
    );
};

export default Progress;
