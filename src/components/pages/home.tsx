import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Library } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { usePersistentStore } from '../../store/usePersistentStore';
import { Toast } from '../Toast';

export function Home() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const resetAllState = usePersistentStore(state => state.resetAllState);
  const [showToast, setShowToast] = useState(false);
  const [isBeginnerGuideOpen, setIsBeginnerGuideOpen] = useState(false);

  const handleReset = () => {
    resetAllState();
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Welcome to MTG Reminders</h2>
      </div>

      <div className="prose prose-purple dark:prose-invert max-w-none">
        <p className="text-lg">
          We're here to help you enhance your Magic: The Gathering gameplay experience. Our tools are designed to make your games smoother and more enjoyable.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-base p-8 bg-gradient-to-br from-purple-500 to-purple-700 dark:from-dark-accent dark:to-purple-900 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start a Game?</h3>
            <p className="mb-6 text-purple-100">
              Use our Life Counter to keep track of life totals and manage different game modes.
            </p>
            <button
              onClick={() => setActiveSection('life-counter')}
              className="px-6 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors inline-flex items-center"
            >
              Start Life Counter
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
                  Go back to 0
                </h3>
                <p className="text-gray-600 dark:text-dark-text text-sm">
                  Reset app to default so you can play a new game
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 
                    dark:hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Reset
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
                  New to Magic: The Gathering?
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text">
                  Click here to learn the basics and get started
                </p>
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
                <h4 className="text-green-700 dark:text-green-400">Basic Concepts</h4>
                <ul className="space-y-2">
                  <li>Each player starts with 20 life points (40 in Commander)</li>
                  <li>Draw one card per turn during your draw phase</li>
                  <li>Play one land per turn</li>
                  <li>Use lands to generate mana and cast spells</li>
                </ul>

                <h4 className="text-green-700 dark:text-green-400 mt-4">Turn Structure</h4>
                <ul className="space-y-2">
                  <li>Beginning Phase (Untap, Upkeep, Draw)</li>
                  <li>Main Phase 1 (Play lands and spells)</li>
                  <li>Combat Phase (Attack with creatures)</li>
                  <li>Main Phase 2 (Play additional spells)</li>
                  <li>End Phase (Discard to 7 cards if needed)</li>
                </ul>

                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 mb-2">
                    Want to track your game phases and set up reminders for each step?
                  </p>
                  <button
                    onClick={() => setActiveSection('tools')}
                    className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 
                      font-medium inline-flex items-center"
                  >
                    Try our Game Phases tool
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
                    Official How to Play Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://magic.wizards.com/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 
                      inline-flex items-center"
                  >
                    Getting Started Guide
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
                Want to Build a Deck?
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-text">
                Learn about different formats and get deck building guidelines
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p className="text-blue-800 dark:text-blue-300 mb-2">
              Explore our deck building guide with format-specific recommendations and mana base calculator
            </p>
            <button
              onClick={() => setActiveSection('deck-builder')}
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                font-medium inline-flex items-center"
            >
              Try our Deck Builder Tool
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 mt-8">
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">Featured Tools</h3>
          
          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Helper Cards</h3>
            <p className="mb-4">
              Keep track of all the assistant cards with our collection. Find special function cards, tokens, and counters all in one place.
            </p>
            <button
              onClick={() => setActiveSection('helper-cards')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              Explore Helper Cards
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Game Phases</h3>
            <p className="mb-4">
              Are you new to the game or keep forgetting the phases? Don't worry, it happens to us, what forgetful wizards we are! 
              But fear not, our tool will help you keep track of them, and you can even add reminders for specific actions too.
            </p>
            <button
              onClick={() => setActiveSection('game-phases')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              Learn Game Phases
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Special Game Modes</h3>
            <p className="mb-4">
              Want to spice up your gameplay? Check out our selection of game modes! From the chaos of Planechase to the 
              epic battles of Archenemy, we've got something for everyone.
            </p>
            <button
              onClick={() => setActiveSection('special-modes')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              Explore Game Modes
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">All Tools</h3>
            <p className="mb-4">
              Discover our complete collection of tools designed to enhance your Magic: The Gathering experience. 
              From life counters to deck builders, we've got everything you need.
            </p>
            <button
              onClick={() => setActiveSection('tools')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              View All Tools
              <ArrowRight className="w-4 h-4 ml-2" />
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