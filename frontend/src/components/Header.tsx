import React from 'react';
import { selectedStyle } from '../styles/theme';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className={`text-xl font-semibold ${selectedStyle.textPrimary}`}>Ranked Choice</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200">
              Share
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
