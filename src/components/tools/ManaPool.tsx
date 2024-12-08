import React, { useState } from 'react';
import { Droplets, ArrowLeft, Plus, Minus, RotateCcw } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

interface ManaCount {
  white: number;
  blue: number;
  black: number;
  red: number;
  green: number;
  colorless: number;
}

export function ManaPool() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [manaPool, setManaPool] = useState<ManaCount>({
    white: 0,
    blue: 0,
    black: 0,
    red: 0,
    green: 0,
    colorless: 0
  });

  const handleManaChange = (color: keyof ManaCount, amount: number) => {
    setManaPool(prev => ({
      ...prev,
      [color]: Math.max(0, prev[color] + amount)
    }));
  };

  const resetManaPool = () => {
    setManaPool({
      white: 0,
      blue: 0,
      black: 0,
      red: 0,
      green: 0,
      colorless: 0
    });
  };

  const getManaSymbolClass = (color: string) => {
    switch (color) {
      case 'white': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'black': return 'bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300';
      case 'red': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>
          <Droplets className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Mana Pool</h2>
        </div>
        
        <button
          onClick={resetManaPool}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(manaPool).map(([color, amount]) => (
          <div
            key={color}
            className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getManaSymbolClass(color)}`}>
                {color === 'colorless' ? 'C' : color[0].toUpperCase()}
              </div>
              <span className="text-2xl font-bold dark:text-dark-highlight">
                {amount}
              </span>
            </div>
            
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleManaChange(color as keyof ManaCount, -1)}
                className="flex-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200
                  dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => handleManaChange(color as keyof ManaCount, 1)}
                className="flex-1 px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200
                  dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 