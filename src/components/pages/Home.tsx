import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Library } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { usePersistentStore } from '../../store/usePersistentStore';
import { Toast } from '../Toast';
import { useTranslation } from '../../i18n/useTranslation';

export function Home() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const resetAllState = usePersistentStore(state => state.resetAllState);
  const [showToast, setShowToast] = useState(false);
  const [isBeginnerGuideOpen, setIsBeginnerGuideOpen] = useState(false);
  const t = useTranslation();

  const handleReset = () => {
    resetAllState();
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.home.title}</h2>
      </div>

      <div className="prose prose-purple dark:prose-invert max-w-none">
        <p className="text-lg">{t.home.subtitle}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-base p-8 bg-gradient-to-br from-purple-500 to-purple-700 dark:from-dark-accent dark:to-purple-900 text-white">
            <h3 className="text-2xl font-bold mb-4">{t.home.readyToStart}</h3>
            <p className="mb-6 text-purple-100">{t.home.lifeCounterDesc}</p>
            <button
              onClick={() => setActiveSection('life-counter')}
              className="px-6 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors inline-flex items-center"
            >
              {t.home.startLifeCounter}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="card-base p-6 border-2 border-red-200 dark:border-red-900 flex items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight mb-1">
                  {t.home.goBackToZero}
                </h3>
                <p className="text-gray-600 dark:text-dark-text text-sm">{t.home.resetDesc}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500
                    dark:hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  {t.home.reset}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 card-base p-6 bg-gradient-to-br from-green-50 to-green-100
          dark:from-dark-card dark:to-dark-accent border border-green-200 dark:border-green-900/30">
          <button
            onClick={() => setIsBeginnerGuideOpen(!isBeginnerGuideOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">
                  {t.home.newToMagic}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text">{t.home.newToMagicSubtitle}</p>
              </div>
            </div>
            {isBeginnerGuideOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-dark-text" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-dark-text" />
            )}
          </button>

          {isBeginnerGuideOpen && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div className="prose prose-green dark:prose-invert max-w-none">
                <h4 className="text-green-700 dark:text-green-400">{t.home.basicConcepts}</h4>
                <ul className="space-y-2">
                  {t.home.basics.map((item, i) => <li key={i}>{item}</li>)}
                </ul>

                <h4 className="text-green-700 dark:text-green-400 mt-4">{t.home.turnStructure}</h4>
                <ul className="space-y-2">
                  {t.home.turnSteps.map((item, i) => <li key={i}>{item}</li>)}
                </ul>

                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 mb-2">{t.home.trackPhases}</p>
                  <button
                    onClick={() => setActiveSection('tools')}
                    className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300
                      font-medium inline-flex items-center"
                  >
                    {t.home.tryGamePhases}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col space-y-2">
                  <a
                    href="https://magic.wizards.com/how-to-play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300
                      inline-flex items-center"
                  >
                    {t.home.officialHowToPlay}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://magic.wizards.com/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300
                      inline-flex items-center"
                  >
                    {t.home.gettingStarted}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="my-16 card-base p-6 bg-gradient-to-br from-blue-50 to-blue-100
          dark:from-dark-card dark:to-dark-accent border border-blue-200 dark:border-blue-900/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Library className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">
                {t.home.wantToBuild}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-text">{t.home.wantToBuildDesc}</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p className="text-blue-800 dark:text-blue-300 mb-2">{t.home.deckBuilderDesc}</p>
            <button
              onClick={() => setActiveSection('deck-builder')}
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300
                font-medium inline-flex items-center"
            >
              {t.home.tryDeckBuilder}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 mt-8">
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">{t.home.featuredTools}</h3>

          {(['helperCards', 'gamePhases', 'specialModes', 'allTools'] as const).map((key) => {
            const section = t.home[key];
            const sectionIds: Record<string, string> = {
              helperCards: 'helper-cards',
              gamePhases: 'game-phases',
              specialModes: 'special-modes',
              allTools: 'tools',
            };
            return (
              <div key={key} className="card-base p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">{section.title}</h3>
                <p className="mb-4">{section.description}</p>
                <button
                  onClick={() => setActiveSection(sectionIds[key])}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
                >
                  {section.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showToast && (
        <Toast
          message={t.home.resetSuccess}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
