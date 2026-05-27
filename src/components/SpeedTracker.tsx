import React from 'react';
import { Gauge } from 'lucide-react';
import { useSpeedStore } from '../store/useSpeedStore';

interface SpeedTrackerProps {
  isCompact?: boolean;
}

const speedSegments = [
  { level: 1, label: 'Engines On',      bg: 'bg-yellow-400',       text: 'text-yellow-900' },
  { level: 2, label: 'Picking Up',      bg: 'bg-orange-400',       text: 'text-orange-900' },
  { level: 3, label: 'Full Throttle',   bg: 'bg-orange-600',       text: 'text-white' },
  { level: 4, label: 'MAX SPEED',       bg: 'bg-red-600',          text: 'text-white' },
];

export function SpeedTracker({ isCompact = false }: SpeedTrackerProps) {
  const { speed, increaseSpeed, decreaseSpeed } = useSpeedStore();

  if (isCompact) {
    return (
      <div className="flex items-center space-x-2 mt-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={decreaseSpeed}
          disabled={speed === 0}
          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-accent/50 flex items-center justify-center
            text-gray-700 dark:text-dark-text hover:bg-gray-300 dark:hover:bg-dark-accent
            disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
        >
          −
        </button>
        <div className="flex space-x-1">
          {speedSegments.map((seg) => (
            <div
              key={seg.level}
              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all
                ${speed >= seg.level
                  ? seg.bg + ' ' + seg.text
                  : 'bg-gray-200 dark:bg-dark-accent/40 text-gray-400 dark:text-dark-text/40'
                }`}
            >
              {seg.level}
            </div>
          ))}
        </div>
        <button
          onClick={increaseSpeed}
          disabled={speed === 4}
          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-accent/50 flex items-center justify-center
            text-gray-700 dark:text-dark-text hover:bg-gray-300 dark:hover:bg-dark-accent
            disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
        >
          +
        </button>
        {speed === 4 && (
          <span className="text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">MAX!</span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Gauge className={`w-6 h-6 ${speed === 4 ? 'text-red-500' : speed > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          <span className="font-semibold text-gray-900 dark:text-dark-highlight">
            Speed: {speed} / 4
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={decreaseSpeed}
            disabled={speed === 0}
            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text
              hover:bg-gray-200 dark:hover:bg-dark-accent/70 disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors font-bold text-lg"
          >
            −
          </button>
          <button
            onClick={increaseSpeed}
            disabled={speed === 4}
            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text
              hover:bg-gray-200 dark:hover:bg-dark-accent/70 disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {speedSegments.map((seg) => (
          <div
            key={seg.level}
            className={`rounded-lg p-3 text-center transition-all
              ${speed >= seg.level
                ? seg.bg + ' ' + seg.text + ' shadow-md'
                : 'bg-gray-100 dark:bg-dark-accent/30 text-gray-400 dark:text-dark-text/40'
              }`}
          >
            <p className="text-2xl font-bold">{seg.level}</p>
            <p className="text-xs mt-1 font-medium leading-tight">{seg.label}</p>
          </div>
        ))}
      </div>

      {speed === 0 && (
        <p className="text-sm text-gray-500 dark:text-dark-text text-center">
          Speed starts at 0. Play a card with "Start your engines!" to reach Speed 1.
        </p>
      )}
      {speed === 4 && (
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="font-bold text-red-600 dark:text-red-400 text-lg">🏁 MAX SPEED!</p>
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            Cards with Max Speed abilities are now fully active.
          </p>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-dark-accent/20 rounded-lg p-3 text-sm text-gray-600 dark:text-dark-text space-y-1">
        <p className="font-medium text-gray-700 dark:text-dark-highlight mb-2">How Speed works:</p>
        <p>• Speed starts at 0. It becomes 1 when you control a "Start your engines!" permanent.</p>
        <p>• Once at 1+, it increases by 1 each turn an opponent loses life (max 4).</p>
        <p>• Speed does not use counters — it can't be proliferated or reduced by Solemnity.</p>
        <p>• Speed does not reset between turns or games unless stated otherwise.</p>
      </div>
    </div>
  );
}
