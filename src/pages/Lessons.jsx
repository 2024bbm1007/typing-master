import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock } from 'lucide-react';
import { LESSONS } from '../data';
import { useUser } from '../context/UserContext';
import { useTyping } from '../context/TypingContext';
import AdService from '../services/adService';
import { AdBanner } from '../components/Ads';

const Lessons = () => {
    const navigate = useNavigate();
    const { userData, isLessonUnlocked } = useUser();
    const { startSession: startContextSession } = useTyping();
    const [selectedSection, setSelectedSection] = useState('all');

    const startSession = (text, lesson) => {
        startContextSession(text, lesson, null, null);
        navigate('/typing');
    };

    const sections = [... new Set(LESSONS.map(l => l.section))];
    const filteredLessons = selectedSection === 'all'
        ? LESSONS
        : LESSONS.filter(l => l.section === selectedSection);

    return (
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
    );
};

export default Lessons;
