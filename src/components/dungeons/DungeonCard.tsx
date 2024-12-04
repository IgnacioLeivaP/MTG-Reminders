import React from 'react';
import { Castle } from 'lucide-react';
import { DungeonSelector } from './DungeonSelector';
import { useDungeonStore } from '../../store/useDungeonStore';

export function DungeonCard() {
  const { activeDungeon } = useDungeonStore();

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-dark-accent/50 rounded-lg">
          <Castle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">
            Dungeon
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-text">
            As you venture deeper, mark your progress through the dungeon.
          </p>
        </div>
      </div>

      <DungeonSelector />

      {!activeDungeon && (
        <p className="text-sm text-gray-500 dark:text-dark-text/60 text-center mt-4">
          Select a dungeon to begin your venture
        </p>
      )}
    </div>
  );
}