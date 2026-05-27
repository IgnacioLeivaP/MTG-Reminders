import React from 'react';
import { Users } from 'lucide-react';
import { useLifeCounterStore } from '../store/useLifeCounterStore';
import { useTranslation } from '../i18n/useTranslation';

export function GameModeSelector() {
  const setPlayerCount = useLifeCounterStore(state => state.setPlayerCount);
  const resetPlayers = useLifeCounterStore(state => state.resetPlayers);
  const t = useTranslation();

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    resetPlayers();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
        <span className="text-sm font-medium text-gray-700 dark:text-dark-text">{t.gameModeSelector.players}</span>
      </div>
      <div className="flex space-x-2">
        {[2, 3, 4, 5, 6].map((count) => (
          <button
            key={count}
            onClick={() => handlePlayerCountChange(count)}
            className="px-3 py-1 text-sm font-medium rounded-md 
              bg-theme-surface dark:bg-dark-accent/20 
              text-theme-primary dark:text-dark-accent 
              hover:bg-theme-surface-hover dark:hover:bg-dark-accent/30 
              transition-colors"
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}