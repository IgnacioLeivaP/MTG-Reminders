import React from 'react';
import { Droplet, ArrowLeft, Plus, Minus, RotateCcw, Sun, Skull, Flame, TreeDeciduous, Diamond } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useManaPoolStore } from '../../store/useManaPoolStore';
import { FavoriteButton } from '../FavoriteButton';

export function ManaPool() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const { manaPool, setMana, resetManaPool } = useManaPoolStore();

  const handleManaChange = (color: keyof typeof manaPool, amount: number) => {
    setMana(color, manaPool[color] + amount);
  };

  const getManaIcon = (color: string) => {
    switch (color) {
      case 'white': return <Sun className="w-5 h-5" />;
      case 'blue': return <Droplet className="w-5 h-5" />;
      case 'black': return <Skull className="w-5 h-5" />;
      case 'red': return <Flame className="w-5 h-5" />;
      case 'green': return <TreeDeciduous className="w-5 h-5" />;
      case 'colorless': return <Diamond className="w-5 h-5" />;
      default: return null;
    }
  };

  const getManaSymbolClass = (color: string) => {
    switch (color) {
      case 'white': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'black': return 'bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300';
      case 'red': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'colorless': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
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
          <Droplet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">Mana Pool</h2>
        </div>
        <FavoriteButton 
          toolId="mana-pool"
          toolName="Mana Pool"
          toolIcon="Droplet"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(manaPool).map(([color, amount]) => (
          <div
            key={color}
            className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getManaSymbolClass(color)}`}>
                {getManaIcon(color)}
              </div>
              <span className="text-2xl font-bold dark:text-dark-highlight">
                {amount}
              </span>
            </div>
            
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleManaChange(color as keyof typeof manaPool, -1)}
                className="flex-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200
                  dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => handleManaChange(color as keyof typeof manaPool, 1)}
                className="flex-1 px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200
                  dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={resetManaPool}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-dark-accent/30 
            dark:hover:bg-dark-accent/50 rounded-lg transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="text-gray-700 dark:text-dark-text">Reset Mana Pool</span>
        </button>
      </div>
    </div>
  );
} 