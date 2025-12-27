import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, CheckCircle } from 'lucide-react';
import { TECHNICAL_DOCS } from '../data';
import { useUser } from '../context/UserContext';
import { useTyping } from '../context/TypingContext';

const TechnicalDocs = () => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const { startSession: startContextSession } = useTyping();

    const startSession = (text, doc) => {
        startContextSession(text, null, null, doc);
        navigate('/typing');
    };

    return (
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
                            onClick={() => startSession(doc.text, doc)}
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
    );
};

export default TechnicalDocs;
