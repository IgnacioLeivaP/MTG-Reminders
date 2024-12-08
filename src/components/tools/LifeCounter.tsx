import React from 'react';
import { Heart, Plus, Minus, Crown, Skull, Radiation } from 'lucide-react';
import { useLifeCounterStore } from '../../store/useLifeCounterStore';
import { GameModeSelector } from '../GameModeSelector';

interface PlayerLifeProps {
  name: string;
  life: number;
  onLifeChange: (amount: number) => void;
  radiation: number;
  poison: number;
  isMonarch: boolean;
  onRadiationChange: (amount: number) => void;
  onPoisonChange: (amount: number) => void;
  onMonarchToggle: () => void;
}

function PlayerLife({ 
  name, 
  life, 
  onLifeChange,
  radiation,
  poison,
  isMonarch,
  onRadiationChange,
  onPoisonChange,
  onMonarchToggle 
}: PlayerLifeProps) {
  const isDefeated = life <= 0;

  return (
    <div className={`p-6 rounded-lg shadow-md transition-all ${
      isDefeated 
        ? 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 dark:border-red-700' 
        : 'bg-white dark:bg-dark-card'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-semibold ${
          isDefeated 
            ? 'text-red-700 dark:text-red-400' 
            : 'text-gray-900 dark:text-dark-text'
        }`}>{name}</h3>
        {isMonarch && (
          <Crown className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      {/* Contador principal de vida */}
      <div className="flex items-center justify-between space-x-4 mb-4">
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

      {/* Contadores secundarios */}
      <div className="grid grid-cols-3 gap-2">
        {/* Contador de veneno */}
        <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center space-x-1">
            <Skull className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">{poison}</span>
          </div>
          <div className="flex space-x-1 mt-1">
            <button
              onClick={() => onPoisonChange(-1)}
              className="p-1 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 
                hover:bg-green-200 dark:hover:bg-green-800/50"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onPoisonChange(1)}
              className="p-1 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 
                hover:bg-green-200 dark:hover:bg-green-800/50"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Contador de radiación */}
        <div className="flex flex-col items-center p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-center space-x-1">
            <Radiation className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{radiation}</span>
          </div>
          <div className="flex space-x-1 mt-1">
            <button
              onClick={() => onRadiationChange(-1)}
              className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400 
                hover:bg-yellow-200 dark:hover:bg-yellow-800/50"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onRadiationChange(1)}
              className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400 
                hover:bg-yellow-200 dark:hover:bg-yellow-800/50"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Botón de Monarch */}
        <button
          onClick={onMonarchToggle}
          className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
            isMonarch
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
              : 'bg-gray-100 dark:bg-gray-800/30 text-gray-400 dark:text-gray-500'
          }`}
        >
          <Crown className="w-5 h-5" />
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
  const { players, updateLife, updateRadiation, updatePoison, toggleMonarch } = useLifeCounterStore();

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
            radiation={player.radiation}
            poison={player.poison}
            isMonarch={player.isMonarch}
            onLifeChange={(amount) => updateLife(player.id, amount)}
            onRadiationChange={(amount) => updateRadiation(player.id, amount)}
            onPoisonChange={(amount) => updatePoison(player.id, amount)}
            onMonarchToggle={() => toggleMonarch(player.id)}
          />
        ))}
      </div>
    </div>
  );
}