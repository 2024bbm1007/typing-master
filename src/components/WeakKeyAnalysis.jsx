import React from 'react';
import { Target } from 'lucide-react';
import { useUser } from '../context/UserContext';

const WeakKeyAnalysis = () => {
    const { userData } = useUser();

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

export default WeakKeyAnalysis;
