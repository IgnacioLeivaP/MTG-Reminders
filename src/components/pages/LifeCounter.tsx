import React from 'react';
import { Heart, Plus, Minus } from 'lucide-react';
import { useLifeCounterStore } from '../../store/useLifeCounterStore';
import { GameModeSelector } from '../GameModeSelector';

interface PlayerLifeProps {
  name: string;
  life: number;
  onLifeChange: (amount: number) => void;
}

function PlayerLife({ name, life, onLifeChange }: PlayerLifeProps) {
  const isDefeated = life <= 0;

  return (
    <div className={`p-6 rounded-lg shadow-md transition-all ${
      isDefeated 
        ? 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-700' 
        : 'bg-white dark:bg-dark-card'
    }`}>
      <h3 className={`text-xl font-semibold mb-4 ${
        isDefeated 
          ? 'text-red-700 dark:text-red-400' 
          : 'text-gray-900 dark:text-dark-text'
      }`}>{name}</h3>
      <div className="flex items-center justify-between space-x-4">
        <button
          onClick={() => onLifeChange(-1)}
          className={`p-3 rounded-full transition-colors ${
            isDefeated
              ? 'bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-400 hover:bg-red-300 dark:hover:bg-red-800'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
          }`}
        >
          <Minus className="w-6 h-6" />
        </button>
        <span className={`text-4xl font-bold ${
          isDefeated 
            ? 'text-red-700 dark:text-red-400' 
            : 'text-gray-900 dark:text-dark-text'
        }`}>{life}</span>
        <button
          onClick={() => onLifeChange(1)}
          className={`p-3 rounded-full transition-colors ${
            isDefeated
              ? 'bg-red-200 dark:bg-red-800/50 text-red-700 dark:text-red-400 hover:bg-red-300 dark:hover:bg-red-800'
              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
          }`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      {isDefeated && (
        <div className="mt-4 text-center">
          <span className="text-red-700 dark:text-red-400 font-medium">Defeated</span>
        </div>
      )}
    </div>
  );
}

export function LifeCounter() {
  const { players, updateLife } = useLifeCounterStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Life Counter</h2>
      </div>

      <GameModeSelector />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map(player => (
          <PlayerLife
            key={player.id}
            name={player.name}
            life={player.life}
            onLifeChange={(amount) => updateLife(player.id, amount)}
          />
        ))}
      </div>
    </div>
  );
}