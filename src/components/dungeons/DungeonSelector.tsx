import React from 'react';
import { useDungeonStore } from '../../store/useDungeonStore';
import { dungeons } from '../../data/dungeons';
import { DungeonProgress } from './DungeonProgress';

interface DungeonSelectorProps {
  dungeonId?: string;
}

export function DungeonSelector({ dungeonId }: DungeonSelectorProps) {
  const { getDungeonProgress, setDungeon } = useDungeonStore();
  const { activeDungeon } = getDungeonProgress(dungeonId);

  const availableDungeons = dungeonId 
    ? dungeons.filter(d => d.id === dungeonId)
    : dungeons.filter(d => d.id !== 'undercity');

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        {availableDungeons.map((dungeon) => (
          <button
            key={dungeon.id}
            onClick={() => setDungeon(dungeon.id)}
            className={`w-full p-2 text-xs text-left rounded-lg transition-colors ${
              activeDungeon?.id === dungeon.id
                ? 'bg-theme-surface dark:bg-dark-accent text-theme-primary-hover dark:text-dark-highlight font-medium'
                : 'bg-gray-50 dark:bg-dark-accent/30 text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-accent/50'
            }`}
          >
            {dungeon.name}
          </button>
        ))}
      </div>

      {activeDungeon && <DungeonProgress dungeonId={dungeonId} />}
    </div>
  );
}