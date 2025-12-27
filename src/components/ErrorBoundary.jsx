import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/'; // Hard reset to home
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
                    <div className="bg-gray-800 border border-red-500/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-6 text-red-500">
                            <AlertTriangle className="w-10 h-10" />
                            <h1 className="text-2xl font-bold">Something went wrong</h1>
                        </div>

                        <p className="text-gray-300 mb-6">
                            The application encountered an unexpected error.
                        </p>

                        {this.state.error && (
                            <div className="bg-gray-900 rounded-lg p-4 mb-6 text-sm font-mono text-red-400 overflow-auto max-h-48">
                                {this.state.error.toString()}
                                <br />
                                {this.state.errorInfo?.componentStack}
                            </div>
                        )}

                        <button
                            onClick={this.handleReset}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Return to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
