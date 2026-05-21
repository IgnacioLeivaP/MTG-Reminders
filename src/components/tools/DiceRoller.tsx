import React, { useState } from 'react';
import { Dice6, ArrowLeft, Coins } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

interface DiceResult {
  label: string;
  result: number | string;
  timestamp: number;
}

export function DiceRoller() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [results, setResults] = useState<DiceResult[]>([]);
  const t = useTranslation();

  const diceTypes = [
    { key: 'Coin', sides: 2, icon: 'Coins', name: t.diceRoller.coin.name, display: t.diceRoller.coin.display },
    { key: 'D4', sides: 4, icon: 'Square', name: t.diceRoller.d4.name, display: t.diceRoller.d4.display },
    { key: 'D6', sides: 6, icon: 'Dice6', name: t.diceRoller.d6.name, display: t.diceRoller.d6.display },
    { key: 'D8', sides: 8, icon: 'Octagon', name: t.diceRoller.d8.name, display: t.diceRoller.d8.display },
    { key: 'D10', sides: 10, icon: 'Pentagon', name: t.diceRoller.d10.name, display: t.diceRoller.d10.display },
    { key: 'D12', sides: 12, icon: 'Hexagon', name: t.diceRoller.d12.name, display: t.diceRoller.d12.display },
    { key: 'D20', sides: 20, icon: 'Circle', name: t.diceRoller.d20.name, display: t.diceRoller.d20.display },
    { key: 'Planar', sides: 6, icon: 'Globe', name: t.diceRoller.planar.name, display: t.diceRoller.planar.display },
  ];

  const rollDice = (sides: number, key: string, label: string) => {
    let result: number | string;

    if (key === 'Coin') {
      result = Math.random() < 0.5 ? t.diceRoller.heads : t.diceRoller.tails;
    } else if (key === 'Planar') {
      const roll = Math.floor(Math.random() * 6) + 1;
      result = roll === 1 ? t.diceRoller.chaos : roll === 6 ? t.diceRoller.planeswalk : t.diceRoller.blank;
    } else {
      result = Math.floor(Math.random() * sides) + 1;
    }

    setResults(prev => [{
      label,
      result,
      timestamp: Date.now()
    }, ...prev].slice(0, 10));
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
          <Dice6 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.diceRoller.title}</h2>
        </div>
        <FavoriteButton 
          toolId="dice-roller"
          toolName="Dice Roller"
          toolIcon="Dice6"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {diceTypes.map(dice => (
          <button
            key={dice.key}
            onClick={() => rollDice(dice.sides, dice.key, dice.name)}
            className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg
              transition-all text-center space-y-2 hover:bg-purple-50 dark:hover:bg-dark-accent/50"
          >
            <div className="flex justify-center">
              {dice.key === 'Coin' ? (
                <Coins className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              ) : (
                <Dice6 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div className="font-medium text-gray-900 dark:text-dark-highlight">
              {dice.display}
            </div>
          </button>
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-highlight">
            {t.diceRoller.recentResults}
          </h3>
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={result.timestamp}
                  className={`flex justify-between items-center p-2 rounded-lg
                    ${index === 0 ? 'bg-purple-50 dark:bg-dark-accent/50' : ''}`}
                >
                  <span className="text-gray-600 dark:text-dark-text">
                    {result.label}
                  </span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {result.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 