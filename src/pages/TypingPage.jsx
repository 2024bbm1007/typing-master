import React, { useEffect } from 'react';
import { Trophy, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTyping } from '../context/TypingContext';
import { useUser } from '../context/UserContext';
import { LESSONS, ESSAYS } from '../data';
import TypingArea from '../components/TypingArea';
import Keyboard from '../components/Keyboard';

const TypingPage = () => {
    const navigate = useNavigate();
    const { userData, isLessonUnlocked } = useUser();
    const {
        practiceText,
        userInput,
        wpm,
        accuracy,
        errors,
        currentIndex,
        currentLesson,
        currentEssay,
        currentDoc,
        sessionComplete,
        sessionResults,
        handleTyping,
        inputRef,
        startSession
    } = useTyping();

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [inputRef]);

    if (!practiceText) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-400">No active session</h2>
                <p className="text-gray-500 mt-2">Go back and select a lesson to start typing.</p>
                <button
                    onClick={() => navigate('/lessons')}
                    className="mt-4 px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-500"
                >
                    Go to Lessons
                </button>
            </div>
        );
    }

    return (
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

                <TypingArea
                    text={practiceText}
                    userInput={userInput}
                    currentIndex={currentIndex}
                    errors={errors}
                    onInputChange={handleTyping}
                    inputRef={inputRef}
                    showResults={sessionComplete}
                    disabled={sessionComplete}
                />

                {/* Keyboard (Only show when session is active and not complete) */}
                {!sessionComplete && (
                    <div className="mt-6">
                        <Keyboard
                            activeKey={practiceText[currentIndex]}
                            nextKey={practiceText[currentIndex + 1]}
                            isError={errors.includes(currentIndex)}
                        />
                    </div>
                )}

                {/* Session Results */}
                {sessionComplete && sessionResults && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                            {sessionResults.accuracy >= 80 && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold">
                                        <Trophy className="w-5 h-5" />
                                        <span>Lesson Completed!</span>
                                    </div>
                                    {sessionResults.newAchievements.length > 0 && (
                                        <div className="text-sm text-purple-400 animate-bounce">
                                            {sessionResults.newAchievements.length} New Achievement(s) Unlocked!
                                        </div>
                                    )}
                                </div>
                            )}
                            {sessionResults.accuracy < 80 && (
                                <div className="text-red-400 font-medium">
                                    Accuracy too low. Try again!
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center flex-wrap">
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
                                    if (currentLesson) navigate('/lessons');
                                    else if (currentEssay) navigate('/essays');
                                    else if (currentDoc) navigate('/technical');
                                    else navigate('/home');
                                }}
                                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Tip */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm mt-6">
                <strong className="text-blue-400">💡 Tip: </strong> Focus on accuracy first, speed will come naturally!
            </div>
        </div>
    );
};

export default TypingPage;
