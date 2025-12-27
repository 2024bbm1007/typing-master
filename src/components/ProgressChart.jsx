import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProgressChart = () => {
    const { userData } = useUser();

    if (userData.wpmHistory.length < 3) {
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">WPM Progress</h3>
                <p className="text-gray-400 text-sm">Complete at least 3 sessions to see chart. </p>
            </div>
        );
    }

    const data = userData.wpmHistory.slice(-15);
    const maxWpm = Math.max(...data.map(d => d.wpm), 1);
    const chartHeight = 120;

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                WPM Progress
            </h3>
            <div className="relative" style={{ height: chartHeight }}>
                <svg width="100%" height={chartHeight} className="overflow-visible">
                    <polyline
                        points={data.map((d, i) => {
                            const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
                            const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
                            return `${x}%,${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    {data.map((d, i) => {
                        const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
                        const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
                        return <circle key={i} cx={`${x}%`} cy={y} r="3" fill="#06b6d4" />;
                    })}
                </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Oldest</span>
                <span className="text-cyan-400 font-semibold">Latest:  {data[data.length - 1]?.wpm} WPM</span>
            </div>
        </div>
    );
};

export default ProgressChart;
