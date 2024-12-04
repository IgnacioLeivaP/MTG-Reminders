import React, { useState } from 'react';
import { Settings, Palette, Languages, FileText, Coffee, MessageSquare, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { usePersistentStore } from '../store/usePersistentStore';
import { Toast } from './Toast';

export function Configuration() {
  const resetAllState = usePersistentStore(state => state.resetAllState);
  const [showToast, setShowToast] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const handleReset = () => {
    resetAllState();
    setShowToast(true);
  };

  const handleEmailFeedback = () => {
    window.location.href = 'mailto:feedback@mtgreminders.app?subject=MTG%20Reminders%20Feedback';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-gray-100">Configuration</h2>
      </div>

      <div className="space-y-4">
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold dark:text-gray-100">Appearance</h3>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 ml-8">
                Toggle between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-accent hover:bg-gray-200 dark:hover:bg-dark-highlight transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Languages className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold dark:text-gray-100">Language</h3>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 ml-8">
                Select your preferred language
              </p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Changelog */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold dark:text-gray-100">Changelog</h3>
          </div>
          <div className="ml-8 prose prose-purple dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              The application is in an advanced state of development, but we continue working on improvements and new features. As new Magic: The Gathering sets are released, we may take some time to implement new mechanics and functionalities.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              The Emblems section is currently being expanded, and we're gradually adding more planeswalker emblems to the collection.
            </p>
          </div>
        </div>

        {/* Support Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://www.buymeacoffee.com/mtgreminders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#FFDD00] text-gray-900 p-4 rounded-lg hover:bg-[#FFED4A] transition-colors font-medium"
          >
            <Coffee className="w-5 h-5" />
            <span>Buy me a coffee</span>
          </a>
          
          <button
            onClick={handleEmailFeedback}
            className="flex items-center justify-center space-x-2 bg-purple-100 dark:bg-dark-accent text-purple-700 dark:text-purple-200 p-4 rounded-lg hover:bg-purple-200 dark:hover:bg-dark-highlight transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Send Feedback</span>
          </button>
        </div>

        {/* Reset Button */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold dark:text-gray-100">Reset Application</h3>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 ml-8">
                Reset all application state to default values
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Application state has been reset successfully"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}