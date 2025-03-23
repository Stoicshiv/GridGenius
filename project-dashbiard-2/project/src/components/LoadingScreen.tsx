import React from 'react';
import { Brain, Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="relative">
        <Brain className="h-24 w-24 text-blue-400 animate-pulse" />
        <Zap className="absolute -right-2 -top-2 h-8 w-8 text-yellow-400 animate-bounce" />
      </div>
      <h1 className="text-4xl font-bold text-white mt-8 mb-4">Grid Genius</h1>
      <div className="text-xl text-blue-400 mb-8">Intelligent City Management System</div>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-400 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-400 font-mono">
        <p>Initializing neural networks...</p>
        <p>Loading optimization algorithms...</p>
        <p>Connecting to city infrastructure...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;