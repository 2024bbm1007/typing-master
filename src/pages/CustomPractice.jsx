import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

const CustomPractice = ({ setShowCustomTextModal }) => {
    return (
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
    );
};

export default CustomPractice;
