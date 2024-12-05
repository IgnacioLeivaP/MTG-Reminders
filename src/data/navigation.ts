import { NavItem } from '../types';

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    name: 'Home',
    icon: 'Home',
    description: 'Welcome to MTG Reminders'
  },
  {
    id: 'helper-cards',
    name: 'Helper Cards',
    icon: 'Library',
    description: 'Quick reference cards for game mechanics'
  },
  {
    id: 'emblems',
    name: 'Emblems',
    icon: 'Badge',
    description: 'List of planeswalker emblems and their effects'
  },
  {
    id: 'game-phases',
    name: 'Game Phases',
    icon: 'Clock',
    description: 'Track game phases and reminders'
  },
  {
    id: 'life-counter',
    name: 'Life Counter',
    icon: 'Heart',
    description: 'Keep track of player life totals'
  },
  {
    id: 'configuration',
    name: 'Settings',
    icon: 'Settings',
    description: 'App settings and preferences'
  }
];