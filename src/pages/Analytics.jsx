import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { FeatureGate } from '../components/Ads';
import ProgressChart from '../components/ProgressChart';
import WeakKeyAnalysis from '../components/WeakKeyAnalysis';

const Analytics = () => {
    const { userData } = useUser();

    return (
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
                <FeatureGate featureId="progressCharts">
                    <ProgressChart />
                </FeatureGate>

                {/* Weak Key Analysis - Can unlock with ads */}
                <FeatureGate featureId="weakKeyAnalysis">
                    <WeakKeyAnalysis />
                </FeatureGate>
            </div>

            {/* Session History - Can unlock with ads */}
            {userData.sessionHistory.length > 0 && (
                <FeatureGate featureId="sessionHistory">
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
    );
};

export default Analytics;
