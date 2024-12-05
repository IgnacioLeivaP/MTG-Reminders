import React, { useState } from 'react';
import { Home as HomeIcon, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { usePersistentStore } from '../../store/usePersistentStore';
import { Toast } from '../Toast';

export function Home() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const resetAllState = usePersistentStore(state => state.resetAllState);
  const [showToast, setShowToast] = useState(false);

  const handleReset = () => {
    resetAllState();
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Welcome to MTG Reminders</h2>
      </div>

      <div className="prose prose-purple dark:prose-invert max-w-none">
        <p className="text-lg">
          We're here to help you enhance your Magic: The Gathering gameplay experience. Our tools are designed to make your games smoother and more enjoyable.
        </p>

        <div className="mt-8 card-base p-8 bg-gradient-to-br from-purple-500 to-purple-700 dark:from-dark-accent dark:to-purple-900 text-white">
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

        <div className="mt-8 card-base p-6 border-2 border-red-200 dark:border-red-900">
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

        <div className="grid gap-8 mt-8">
          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Helper Cards</h3>
            <p className="mb-4">
              Access a comprehensive collection of reminder cards and tokens, along with various counters. Find special function cards like Day/Night, The Ring, and Monarch, as well as reminder cards for mechanics like Solved Case and Suspected.
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
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Emblems</h3>
            <p className="mb-4">
              Find emblems from your favorite Planeswalkers. Click on an emblem to move it to the top of the screen for easy access during your game.
            </p>
            <button
              onClick={() => setActiveSection('emblems')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              View Emblems
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="card-base p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Game Phases</h3>
            <p className="mb-4">
              Understand the game phases better and add custom reminders for specific phases to keep track of important triggers and effects.
            </p>
            <button
              onClick={() => setActiveSection('game-phases')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              Learn Game Phases
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