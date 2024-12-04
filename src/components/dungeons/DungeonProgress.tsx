import React from 'react';
import { useDungeonStore } from '../../store/useDungeonStore';
import { dungeons } from '../../data/dungeons';

interface DungeonProgressProps {
  dungeonId?: string;
}

export function DungeonProgress({ dungeonId }: DungeonProgressProps) {
  const { getDungeonProgress, visitRoom, canVisitRoom, resetDungeon } = useDungeonStore();
  const { activeDungeon, currentRoom } = getDungeonProgress(dungeonId);

  if (!activeDungeon) return null;

  const dungeon = dungeons.find(d => d.id === activeDungeon.id);
  if (!dungeon) return null;

  const isComplete = currentRoom && currentRoom.connections.length === 0;

  return (
    <div className="space-y-3">
      {dungeon.rooms.map((room) => {
        const isVisited = currentRoom?.id === room.id;
        const canVisit = canVisitRoom(room.id, dungeonId);
        
        if (!canVisit && !isVisited) return null;

        return (
          <button
            key={room.id}
            onClick={() => canVisit && visitRoom(room.id, dungeonId)}
            disabled={!canVisit}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              isVisited
                ? 'bg-purple-100 dark:bg-dark-accent border-2 border-purple-500 dark:border-dark-highlight'
                : canVisit
                ? 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-accent/50 border-2 border-transparent'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="font-medium text-gray-900 dark:text-dark-highlight">
              {room.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-dark-text">
              {room.effect}
            </div>
          </button>
        );
      })}

      {isComplete && (
        <button
          onClick={resetDungeon}
          className="w-full p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 
            rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          Complete Dungeon
        </button>
      )}
    </div>
  );
}