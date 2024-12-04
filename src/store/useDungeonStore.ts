import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dungeons } from '../data/dungeons';
import { Dungeon, DungeonRoom } from '../types';

interface DungeonProgress {
  activeDungeon: Dungeon | null;
  currentRoom: DungeonRoom | null;
  visitedRooms: string[];
}

interface DungeonState {
  regularDungeon: DungeonProgress;
  undercityDungeon: DungeonProgress;
  setDungeon: (dungeonId: string) => void;
  visitRoom: (roomId: string, dungeonId?: string) => void;
  canVisitRoom: (roomId: string, dungeonId?: string) => boolean;
  resetDungeon: () => void;
  getDungeonProgress: (dungeonId?: string) => DungeonProgress;
}

const initialProgress: DungeonProgress = {
  activeDungeon: null,
  currentRoom: null,
  visitedRooms: []
};

export const useDungeonStore = create<DungeonState>()(
  persist(
    (set, get) => ({
      regularDungeon: initialProgress,
      undercityDungeon: initialProgress,
      getDungeonProgress: (dungeonId) => {
        const isUndercity = dungeonId === 'undercity';
        return isUndercity ? get().undercityDungeon : get().regularDungeon;
      },
      setDungeon: (dungeonId) => {
        const dungeon = dungeons.find(d => d.id === dungeonId);
        if (!dungeon) return;

        const isUndercity = dungeonId === 'undercity';
        set((state) => ({
          ...state,
          [isUndercity ? 'undercityDungeon' : 'regularDungeon']: {
            activeDungeon: dungeon,
            currentRoom: null,
            visitedRooms: []
          }
        }));
      },
      visitRoom: (roomId, dungeonId) => {
        const { canVisitRoom, getDungeonProgress } = get();
        if (!canVisitRoom(roomId, dungeonId)) return;

        const progress = getDungeonProgress(dungeonId);
        const room = progress.activeDungeon?.rooms.find(r => r.id === roomId);
        if (!room) return;

        const isUndercity = dungeonId === 'undercity';
        set((state) => ({
          ...state,
          [isUndercity ? 'undercityDungeon' : 'regularDungeon']: {
            ...state[isUndercity ? 'undercityDungeon' : 'regularDungeon'],
            currentRoom: room,
            visitedRooms: [...state[isUndercity ? 'undercityDungeon' : 'regularDungeon'].visitedRooms, roomId]
          }
        }));
      },
      canVisitRoom: (roomId, dungeonId) => {
        const { getDungeonProgress } = get();
        const progress = getDungeonProgress(dungeonId);
        const { activeDungeon, currentRoom, visitedRooms } = progress;
        if (!activeDungeon) return false;
        
        const room = activeDungeon.rooms.find(r => r.id === roomId);
        if (!room) return false;

        // First room is always available if no current room
        if (!currentRoom && room === activeDungeon.rooms[0]) return true;

        // Can't visit already visited rooms
        if (visitedRooms.includes(roomId)) return false;

        // Can only visit rooms connected to current room
        return currentRoom?.connections.includes(roomId) || false;
      },
      resetDungeon: () => set({
        regularDungeon: initialProgress,
        undercityDungeon: initialProgress
      })
    }),
    {
      name: 'mtg-dungeon-storage'
    }
  )
);