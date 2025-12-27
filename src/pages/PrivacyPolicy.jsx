import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/')}
                className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to App
            </button>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-8">
                <div className="border-b border-gray-700 pb-6">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-emerald-400" />
                        Privacy Policy & Terms
                    </h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                {/* AdSense Requirement */}
                <section>
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">1. Advertising & Cookies</h2>
                    <p className="text-gray-300 mb-3">
                        Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                        <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Ad Settings</a>.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">2. Data Storage</h2>
                    <p className="text-gray-300">
                        This application stores your progress history and settings locally on your specific device using "Local Storage".
                        We do not collect, transmit, or store your personal typing data on any external servers.
                        Your data stays 100% private to your browser.
                    </p>
                </section>

                {/* Liability Disclaimer */}
                <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        3. Disclaimer of Liability
                    </h2>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p>
                            <strong>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.</strong>
                        </p>
                        <p>
                            By using this application, you agree that the creator/developer shall not be liable for any damages, including but not limited to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Data loss or corruption (e.g., loss of typing progress).</li>
                            <li>Hardware malfunction or overheating.</li>
                            <li>Physical strain or injury (e.g., Repetitive Strain Injury) resulting from excessive typing. Please take regular breaks.</li>
                            <li>Any other direct, indirect, incidental, or consequential damages arising from the use of this software.</li>
                        </ul>
                        <p className="mt-4 font-semibold text-gray-200">
                            Use this application at your own risk.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
