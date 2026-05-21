import React from 'react';
import { Settings, Palette, Languages, FileText, Coffee, MessageSquare, Sun, Moon, Github, Smartphone } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../i18n/useTranslation';

export function Configuration() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslation();

  const handleEmailFeedback = () => {
    window.location.href = 'mailto:ignacio.leiva06@gmail.com?subject=MTG%20Reminders%20Feedback';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-gray-100">{t.settings.title}</h2>
      </div>

      <div className="space-y-4">
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.appearance}</h3>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 ml-8">{t.settings.appearanceDesc}</p>
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
                <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.language}</h3>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 ml-8">{t.settings.languageDesc}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-purple-600 text-white dark:bg-dark-accent'
                      : 'bg-gray-100 dark:bg-dark-accent/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-accent'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    language === 'es'
                      ? 'bg-purple-600 text-white dark:bg-dark-accent'
                      : 'bg-gray-100 dark:bg-dark-accent/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-accent'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.devStatus}</h3>
          </div>
          <div className="ml-8 prose prose-purple dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">{t.settings.devStatusDesc}</p>
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
            <span>{t.settings.buyCoffee}</span>
          </a>

          <button
            onClick={handleEmailFeedback}
            className="flex items-center justify-center space-x-2 bg-purple-100 dark:bg-dark-accent text-purple-700 dark:text-purple-200 p-4 rounded-lg hover:bg-purple-200 dark:hover:bg-dark-highlight transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.settings.sendFeedback}</span>
          </button>
        </div>

        {/* PWA Instructions */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.useAsApp}</h3>
            </div>

            <div className="ml-8 space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{t.settings.installAndroid}</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {t.settings.androidSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{t.settings.installIOS}</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {t.settings.iosSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>

              <div className="bg-purple-50 dark:bg-dark-accent/30 p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 text-sm">{t.settings.pwaDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Made by Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center space-x-3">
            <img src="./logo.png" alt="MTG Reminders Logo" className="w-8 h-8" />
            <p className="text-lg font-semibold dark:text-gray-100">{t.settings.madeBy}</p>
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.otherProjects}</h3>
            <a
              href="https://github.com/IgnacioLeivaP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-purple-100 dark:bg-dark-accent text-purple-700
                dark:text-purple-200 p-4 rounded-lg hover:bg-purple-200 dark:hover:bg-dark-highlight
                transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              <span>{t.settings.githubLink}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
