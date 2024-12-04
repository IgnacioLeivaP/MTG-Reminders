export interface Phase {
  id: string;
  name: string;
  description: string;
  steps: string[];
}

export interface Reminder {
  id: string;
  text: string;
  phase: string;
  isActive: boolean;
}

export interface NavItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface HelperCard {
  id: string;
  name: string;
  mechanic: string;
  description: string;
  icon: string;
  hasCounter: boolean;
  counterValue?: number;
  isDecrementMode?: boolean;
  nightIcon?: string;
  powerToughness?: string;
}

export interface Emblem {
  id: string;
  name: string;
  planeswalker: string;
  effect: string;
  icon: string;
}

export interface DungeonRoom {
  id: string;
  name: string;
  effect: string;
  connections: string[];
}

export interface Dungeon {
  id: string;
  name: string;
  rooms: DungeonRoom[];
}