import React, { useState, useRef, useEffect } from 'react';
import { Dice6, ArrowLeft, Coins } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

interface DiceResult {
  label: string;
  result: number | string;
  timestamp: number;
}

interface ActiveDice {
  key: string;
  phase: 'rolling' | 'result';
  display: number | string;
}

export function DiceRoller() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [results, setResults] = useState<DiceResult[]>([]);
  const [activeDice, setActiveDice] = useState<ActiveDice | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslation();

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const diceTypes = [
    { key: 'Coin', sides: 2, name: t.diceRoller.coin.name, display: t.diceRoller.coin.display },
    { key: 'D4', sides: 4, name: t.diceRoller.d4.name, display: t.diceRoller.d4.display },
    { key: 'D6', sides: 6, name: t.diceRoller.d6.name, display: t.diceRoller.d6.display },
    { key: 'D8', sides: 8, name: t.diceRoller.d8.name, display: t.diceRoller.d8.display },
    { key: 'D10', sides: 10, name: t.diceRoller.d10.name, display: t.diceRoller.d10.display },
    { key: 'D12', sides: 12, name: t.diceRoller.d12.name, display: t.diceRoller.d12.display },
    { key: 'D20', sides: 20, name: t.diceRoller.d20.name, display: t.diceRoller.d20.display },
    { key: 'Planar', sides: 6, name: t.diceRoller.planar.name, display: t.diceRoller.planar.display },
  ];

  const getRandomDisplay = (key: string, sides: number): number | string => {
    if (key === 'Coin') return Math.random() < 0.5 ? 'H' : 'T';
    if (key === 'Planar') {
      const syms = ['?', '!', '~', '*', '⊕', '⊗'];
      return syms[Math.floor(Math.random() * syms.length)];
    }
    return Math.floor(Math.random() * sides) + 1;
  };

  const computeFinalResult = (key: string, sides: number): number | string => {
    if (key === 'Coin') return Math.random() < 0.5 ? t.diceRoller.heads : t.diceRoller.tails;
    if (key === 'Planar') {
      const roll = Math.floor(Math.random() * 6) + 1;
      return roll === 1 ? t.diceRoller.chaos : roll === 6 ? t.diceRoller.planeswalk : t.diceRoller.blank;
    }
    return Math.floor(Math.random() * sides) + 1;
  };

  const rollDice = (sides: number, key: string, label: string) => {
    if (activeDice) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const FLASHES = 8;
    const INTERVAL_MS = 80;
    let count = 0;

    setActiveDice({ key, phase: 'rolling', display: getRandomDisplay(key, sides) });

    intervalRef.current = setInterval(() => {
      count++;
      if (count < FLASHES) {
        setActiveDice(prev => prev ? { ...prev, display: getRandomDisplay(key, sides) } : null);
      } else {
        clearInterval(intervalRef.current!);
        const finalResult = computeFinalResult(key, sides);
        setResults(prev => [{ label, result: finalResult, timestamp: Date.now() }, ...prev].slice(0, 10));
        setActiveDice({ key, phase: 'result', display: finalResult });
        timeoutRef.current = setTimeout(() => setActiveDice(null), 1500);
      }
    }, INTERVAL_MS);
  };

  const getButtonClasses = (key: string) => {
    if (activeDice?.key === key) {
      if (activeDice.phase === 'rolling') {
        return 'p-4 rounded-lg shadow-md text-center space-y-1 bg-theme-surface dark:bg-dark-accent/20 scale-95 cursor-wait transition-all duration-75';
      }
      return 'p-4 rounded-lg shadow-md text-center space-y-1 bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-500 scale-105 transition-all duration-150';
    }
    if (activeDice && activeDice.key !== key) {
      return 'p-4 rounded-lg shadow-md text-center space-y-1 bg-white dark:bg-dark-card opacity-40 transition-all';
    }
    return 'p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all text-center space-y-1 hover:bg-theme-surface/50 dark:hover:bg-dark-accent/50 hover:scale-105';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveSection('tools')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          </button>
          <Dice6 className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
          <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.diceRoller.title}</h2>
        </div>
        <FavoriteButton toolId="dice-roller" toolName="Dice Roller" toolIcon="Dice6" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {diceTypes.map(dice => {
          const isThis = activeDice?.key === dice.key;
          const phase = isThis ? activeDice!.phase : null;

          return (
            <button
              key={dice.key}
              onClick={() => rollDice(dice.sides, dice.key, dice.name)}
              disabled={activeDice !== null}
              className={getButtonClasses(dice.key)}
            >
              <div className="flex justify-center">
                {dice.key === 'Coin' ? (
                  <Coins className={`w-8 h-8 transition-colors ${
                    phase === 'result' ? 'text-yellow-500 dark:text-yellow-400' : 'text-theme-primary dark:text-dark-accent'
                  }`} />
                ) : (
                  <Dice6 className={`w-8 h-8 transition-colors ${
                    phase === 'result' ? 'text-yellow-500 dark:text-yellow-400' : 'text-theme-primary dark:text-dark-accent'
                  }`} />
                )}
              </div>

              {isThis ? (
                <div className={`text-2xl font-bold tabular-nums transition-all ${
                  phase === 'result'
                    ? 'text-yellow-600 dark:text-yellow-400 scale-110'
                    : 'text-theme-primary dark:text-dark-accent/70'
                }`}>
                  {activeDice!.display}
                </div>
              ) : (
                <div className="font-medium text-gray-900 dark:text-dark-highlight text-sm">
                  {dice.display}
                </div>
              )}
            </button>
          );
        })}
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
                    ${index === 0 ? 'bg-theme-surface/50 dark:bg-dark-accent/50' : ''}`}
                >
                  <span className="text-gray-600 dark:text-dark-text">{result.label}</span>
                  <span className="font-medium text-theme-primary dark:text-dark-accent">{result.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
