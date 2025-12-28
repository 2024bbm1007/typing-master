import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Keyboard } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6">
                <Keyboard className="w-12 h-12 text-cyan-400" />
            </div>

            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                404
            </h1>

            <h2 className="text-2xl font-semibold text-white mb-2">
                Page Not Found
            </h2>

            <p className="text-gray-400 max-w-md mb-8">
                Oops! The page you're looking for doesn't exist.
                Maybe you mistyped the URL? Let's get you back on track.
            </p>

            <div className="flex gap-4">
                <Link
                    to="/"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                    <Home className="w-5 h-5" />
                    Go Home
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-700 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
