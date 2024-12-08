import React from 'react';
import { Users } from 'lucide-react';
import { useLifeCounterStore } from '../store/useLifeCounterStore';

export function GameModeSelector() {
  const setPlayerCount = useLifeCounterStore(state => state.setPlayerCount);
  const resetPlayers = useLifeCounterStore(state => state.resetPlayers);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    resetPlayers();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-dark-text">Players:</span>
      </div>
      <div className="flex space-x-2">
        {[2, 3, 4, 5, 6].map((count) => (
          <button
            key={count}
            onClick={() => handlePlayerCountChange(count)}
            className="px-3 py-1 text-sm font-medium rounded-md 
              bg-purple-100 dark:bg-purple-900/30 
              text-purple-600 dark:text-purple-400 
              hover:bg-purple-200 dark:hover:bg-purple-900/50 
              transition-colors"
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}