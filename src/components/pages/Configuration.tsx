import React from 'react';
import { Settings, Palette, Languages, FileText, Coffee, MessageSquare, Sun, Moon, Github, Smartphone, Check } from 'lucide-react';
import { useThemeStore, ColorTheme } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../i18n/useTranslation';

interface ColorOption {
  id: ColorTheme;
  labelKey: keyof ReturnType<typeof useTranslation>['settings']['themes'];
  /** swatch color shown in the picker (light mode representative) */
  swatch: string;
  /** darker tint shown beside the main swatch */
  swatchDark: string;
  /** mana symbol letter / glyph */
  symbol: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: 'default',   labelKey: 'default', swatch: '#9333ea', swatchDark: '#6e49e1', symbol: '✦' },
  { id: 'mtg-white', labelKey: 'white',   swatch: '#d4af37', swatchDark: '#b5890a', symbol: 'W' },
  { id: 'mtg-blue',  labelKey: 'blue',    swatch: '#1976d2', swatchDark: '#0d47a1', symbol: 'U' },
  { id: 'mtg-black', labelKey: 'black',   swatch: '#4a2d6f', swatchDark: '#1a0d2e', symbol: 'B' },
  { id: 'mtg-red',   labelKey: 'red',     swatch: '#e53935', swatchDark: '#b71c1c', symbol: 'R' },
  { id: 'mtg-green', labelKey: 'green',   swatch: '#388e3c', swatchDark: '#1b5e20', symbol: 'G' },
];

export function Configuration() {
  const { isDarkMode, toggleTheme, colorTheme, setColorTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslation();

  const handleEmailFeedback = () => {
    window.location.href = 'mailto:ignacio.leiva06@gmail.com?subject=MTG%20Reminders%20Feedback';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
        <h2 className="text-2xl font-bold dark:text-gray-100">{t.settings.title}</h2>
      </div>

      <div className="space-y-4">
        {/* Light / Dark toggle */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
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
                <Moon className="w-5 h-5 text-theme-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Color identity picker */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-1">
            <Palette className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
            <h3 className="text-lg font-semibold dark:text-gray-100">{t.settings.colorTheme}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-8 mb-4">{t.settings.colorThemeDesc}</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 ml-8">
            {COLOR_OPTIONS.map((opt) => {
              const isActive = colorTheme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setColorTheme(opt.id)}
                  title={t.settings.themes[opt.labelKey]}
                  className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all
                    ${isActive
                      ? 'border-gray-800 dark:border-white scale-105 shadow-md'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105'
                    }`}
                >
                  {/* Swatch gradient */}
                  <div
                    className="w-10 h-10 rounded-full shadow-inner relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${opt.swatch} 50%, ${opt.swatchDark} 50%)` }}
                  >
                    {/* Symbol badge */}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
                    >
                      {opt.symbol}
                    </span>
                    {/* Active checkmark */}
                    {isActive && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                    {t.settings.themes[opt.labelKey]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Languages className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
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
                      ? 'bg-theme-primary text-white dark:bg-dark-accent'
                      : 'bg-gray-100 dark:bg-dark-accent/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-accent'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    language === 'es'
                      ? 'bg-theme-primary text-white dark:bg-dark-accent'
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
            <FileText className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
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
            className="flex items-center justify-center space-x-2 bg-theme-surface dark:bg-dark-accent text-theme-primary dark:text-white p-4 rounded-lg hover:bg-theme-surface-hover dark:hover:bg-dark-highlight transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.settings.sendFeedback}</span>
          </button>
        </div>

        {/* PWA Instructions */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
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

              <div className="bg-theme-surface dark:bg-dark-accent/30 p-4 rounded-lg">
                <p className="text-theme-primary-hover dark:text-dark-accent text-sm">{t.settings.pwaDesc}</p>
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
              className="flex items-center space-x-2 bg-theme-surface dark:bg-dark-accent text-theme-primary
                dark:text-white p-4 rounded-lg hover:bg-theme-surface-hover dark:hover:bg-dark-highlight
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
