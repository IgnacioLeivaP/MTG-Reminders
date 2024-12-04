import { HelperCard } from '../types';

export const helperCards: HelperCard[] = [
  {
    id: '1',
    name: 'Day/Night',
    mechanic: 'Day/Night',
    description: 'If it becomes day, all cards transform to their day face. If it becomes night, all cards transform to their night face.',
    icon: 'Sun',
    nightIcon: 'Moon',
    hasCounter: false
  },
  {
    id: '2',
    name: 'The Ring',
    mechanic: 'The Ring',
    description: 'The Ring tempts you at the beginning of your upkeep.',
    icon: 'CircleDot',
    hasCounter: false
  },
  {
    id: '3',
    name: 'Monarch',
    mechanic: 'Monarch',
    description: 'At the beginning of your end step, draw a card. When a creature deals combat damage to you, its controller becomes the monarch.',
    icon: 'Crown',
    hasCounter: false
  },
  {
    id: '4',
    name: "City's Blessing",
    mechanic: 'Ascend',
    description: "If you control ten or more permanents, you get the city's blessing for the rest of the game.",
    icon: 'Building2',
    hasCounter: false
  },
  {
    id: '5',
    name: 'Energy Reserve',
    mechanic: 'Energy',
    description: 'Energy counters are a special type of counter that players can get. They stay with the player until spent.',
    icon: 'Zap',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '6',
    name: 'Experience',
    mechanic: 'Experience',
    description: 'Experience counters are a special type of counter that players can get.',
    icon: 'Star',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '7',
    name: 'Acorn Counter',
    mechanic: 'Acorn',
    description: 'Acorn counters are used by some Un-set cards.',
    icon: 'Nut',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '8',
    name: 'Ticket',
    mechanic: 'Ticket',
    description: 'Tickets can be spent to activate special abilities or traded for prizes.',
    icon: 'Ticket',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '9',
    name: 'Radiation Counter',
    mechanic: 'Radiation',
    description: 'At the beginning of your precombat main phase, if you have any rad counters, mill that many cards. For each nonland card milled this way, you lose 1 life and a rad counter.',
    icon: 'Atom',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '10',
    name: 'Poison Counter',
    mechanic: 'Poison',
    description: 'A player with ten or more poison counters loses the game.',
    icon: 'Skull',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '11',
    name: 'Shield Counter',
    mechanic: 'Shield Counter',
    description: 'If a creature with a shield counter would be dealt damage or destroyed, remove a shield counter from it instead.',
    icon: 'Shield',
    hasCounter: true,
    counterValue: 0,
    isDecrementMode: false
  },
  {
    id: '12',
    name: 'Companion',
    mechanic: 'Companion',
    description: 'Reveal your companion from outside the game if your deck meets its condition. Once per game, you may pay {3} to put it into your hand.',
    icon: 'Users',
    hasCounter: false
  },
  {
    id: '13',
    name: 'Foretell',
    mechanic: 'Foretell',
    description: 'During your turn, you may pay {2} and exile this card from your hand face down. Cast it later for its foretell cost.',
    icon: 'Eye',
    hasCounter: false
  },
  {
    id: '14',
    name: 'Adventure',
    mechanic: 'Adventure',
    description: 'Cast this card as an Adventure from your hand, then exile it. You may cast the creature later from exile.',
    icon: 'Compass',
    hasCounter: false
  },
  {
    id: '15',
    name: 'Initiative',
    mechanic: 'Initiative',
    description: 'When you take the initiative, venture into Undercity. At the beginning of your upkeep, venture deeper.',
    icon: 'Swords',
    hasCounter: false
  },
  {
    id: '16',
    name: 'Plot',
    mechanic: 'Plot',
    description: 'Exile cards from your hand face down to plot. Cast them later for their plot cost.',
    icon: 'Scroll',
    hasCounter: false
  },
  {
    id: '17',
    name: 'Solved Case',
    mechanic: 'Case',
    description: 'When you solve a case, you get a reward. Each case can only be solved once per turn.',
    icon: 'FileSearch',
    hasCounter: false
  },
  {
    id: '18',
    name: 'Suspected',
    mechanic: 'Suspect',
    description: "A suspected creature can't block. When it deals combat damage to a player, investigate.",
    icon: 'AlertCircle',
    hasCounter: false
  },
  {
    id: '19',
    name: 'A Mysterious Creature',
    mechanic: 'Face-down',
    description: 'You can cover a face-down creature with this reminder card. A face-down creature that was cloaked or cast with disguise has ward {2}. (Whenever that creature becomes the target of a spell or ability an opponent controls, counter it unless that player pays {2}.)',
    icon: 'HelpCircle',
    hasCounter: false,
    powerToughness: '2/2'
  },
  {
    id: '20',
    name: 'Manifest',
    mechanic: 'Manifest',
    description: 'You can cover a face-down manifested creature with this reminder card.\n\nA manifested creature card can be turned face up any time for its mana cost. A face-down card can also be turned face up for its morph cost.',
    icon: 'FileQuestion',
    hasCounter: false,
    powerToughness: '2/2'
  },
  {
    id: '21',
    name: 'Morph',
    mechanic: 'Morph',
    description: 'You can cover a face-down creature with this reminder card.\n\nA card with morph can be turned face up any time for its morph cost.',
    icon: 'FlipHorizontal',
    hasCounter: false,
    powerToughness: '2/2'
  }
];