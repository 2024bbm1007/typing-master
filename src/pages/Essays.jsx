import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { ESSAYS } from '../data';
import { useUser } from '../context/UserContext';
import { useTyping } from '../context/TypingContext';

const Essays = () => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const { startSession: startContextSession } = useTyping();

    const startSession = (text, essay) => {
        startContextSession(text, null, essay, null);
        navigate('/typing');
    };

    return (
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
                            onClick={() => startSession(essay.text, essay)}
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
    );
};

export default Essays;
