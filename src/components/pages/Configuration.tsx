import React, { useState } from 'react';
import { Settings, Palette, Languages, FileText, Coffee, MessageSquare, Sun, Moon, Globe, Smartphone } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';

export function Configuration() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const handleEmailFeedback = () => {
    window.location.href = 'mailto:ignacio.leiva06@gmail.com?subject=MTG%20Reminders%20Feedback';
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
            <div className="flex flex-col items-center space-y-2">
              <button
                disabled
                className="px-4 py-2 bg-gray-100 dark:bg-dark-accent text-gray-900 dark:text-gray-100 rounded-lg font-medium"
              >
                English
              </button>
              <span className="text-xs font-medium px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-center">
                More languages coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold dark:text-gray-100">Development Status</h3>
          </div>
          <div className="ml-8 prose prose-purple dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              This application is in constant development and expansion. The application is in an advanced state, but as a one-person team, updates may take some time. We continue working on improvements and new features, and we're committed to improving your experience. As new Magic: The Gathering sets are released, we may take some time to implement new mechanics and functionalities.
            </p>
          </div>
        </div>

        {/* Support Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://buymeacoffee.com/nispero"
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

        {/* PWA Instructions */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold dark:text-gray-100">Use as App</h3>
            </div>
            
            <div className="ml-8 space-y-6">
              {/* Android Instructions */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Install on Android
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Open Chrome and visit this website</li>
                  <li>Tap the menu button (three dots) in the top right</li>
                  <li>Tap "Add to Home Screen" and follow the prompts</li>
                </ol>
              </div>

              {/* iOS Instructions */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Install on iOS
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Open Safari and visit this website</li>
                  <li>Tap the Share button at the bottom</li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                </ol>
              </div>

              {/* Benefits */}
              <div className="bg-purple-50 dark:bg-dark-accent/30 p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  Installing as an app gives you faster access, offline support, and a better fullscreen experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Made by Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center space-x-3">
            <img src="./logo.png" alt="MTG Reminders Logo" className="w-8 h-8" />
            <p className="text-lg font-semibold dark:text-gray-100">Made by Nispero</p>
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-lg font-semibold dark:text-gray-100">
              Want to see my other projects?
            </h3>
            <a
              href="https://caniplaythisjapanesegame.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-purple-100 dark:bg-dark-accent text-purple-700 
                dark:text-purple-200 p-4 rounded-lg hover:bg-purple-200 dark:hover:bg-dark-highlight 
                transition-colors font-medium"
            >
              <img 
                src="https://caniplaythisjapanesegame.com/favicon.ico" 
                alt="Can I Play This Japanese Game?"
                className="w-5 h-5"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '';
                  // Fallback a un ícono genérico si falla la carga del favicon
                  e.currentTarget.style.display = 'none';
                  const globe = document.createElement('span');
                  globe.innerHTML = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
                  e.currentTarget.parentNode?.insertBefore(globe, e.currentTarget);
                }}
              />
              <span>Can I Play This Japanese Game?</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}