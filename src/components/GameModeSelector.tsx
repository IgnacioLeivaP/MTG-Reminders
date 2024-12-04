import React, { useState } from 'react';
import { Swords, Shield, Settings, X } from 'lucide-react';
import { useLifeCounterStore } from '../store/useLifeCounterStore';

interface CustomGameModalProps {
  onClose: () => void;
}

function CustomGameModal({ onClose }: CustomGameModalProps) {
  const [players, setPlayers] = useState('4');
  const [life, setLife] = useState('20');
  const setGameMode = useLifeCounterStore(state => state.setGameMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPlayers = Math.min(Math.max(2, parseInt(players, 10)), 8);
    const startingLife = Math.max(1, parseInt(life, 10));
    setGameMode('custom', numPlayers, startingLife);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b dark:border-dark-accent">
          <h3 className="text-lg font-semibold dark:text-dark-text">Custom Game Setup</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-dark-text" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="players" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
              Number of Players (2-8)
            </label>
            <input
              type="number"
              id="players"
              min="2"
              max="8"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-bg dark:text-dark-text"
            />
          </div>

          <div>
            <label htmlFor="life" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
              Starting Life Total
            </label>
            <input
              type="number"
              id="life"
              min="1"
              value={life}
              onChange={(e) => setLife(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-bg dark:text-dark-text"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 dark:bg-dark-accent text-white py-2 px-4 rounded-lg 
              hover:bg-purple-700 dark:hover:bg-dark-highlight transition-colors font-medium"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}

export function GameModeSelector() {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const setGameMode = useLifeCounterStore(state => state.setGameMode);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setGameMode('1v1', 2, 20)}
          className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-lg shadow-md 
            hover:shadow-lg transition-all space-y-2 hover:bg-gray-50 dark:hover:bg-dark-accent/50"
        >
          <Swords className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="font-medium dark:text-dark-text">1VS1</span>
        </button>

        <button
          onClick={() => setGameMode('commander', 4, 40)}
          className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-lg shadow-md 
            hover:shadow-lg transition-all space-y-2 hover:bg-gray-50 dark:hover:bg-dark-accent/50"
        >
          <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="font-medium dark:text-dark-text">Commander</span>
        </button>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-lg shadow-md 
            hover:shadow-lg transition-all space-y-2 hover:bg-gray-50 dark:hover:bg-dark-accent/50"
        >
          <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="font-medium dark:text-dark-text">Custom</span>
        </button>
      </div>

      {showCustomModal && (
        <CustomGameModal onClose={() => setShowCustomModal(false)} />
      )}
    </>
  );
}