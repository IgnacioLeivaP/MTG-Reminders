import { NavItem } from '../types';

export const navigationItems: NavItem[] = [
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
    name: 'Configuration',
    icon: 'Settings',
    description: 'App settings and preferences'
  },
  {
    id: 'reset',
    name: 'Reset App',
    icon: 'RefreshCw',
    description: 'Reset all application data'
  }
];