import { Dungeon, DungeonRoom } from '../types';

export const dungeons: Dungeon[] = [
  {
    id: 'lost-mine',
    name: 'Lost Mine of Phandelver',
    rooms: [
      {
        id: 'cave-entrance',
        name: 'Cave Entrance',
        effect: 'Scry 1',
        connections: ['goblin-lair', 'mine-tunnels']
      },
      {
        id: 'goblin-lair',
        name: 'Goblin Lair',
        effect: 'Create a 1/1 red Goblin creature token',
        connections: ['storeroom', 'dark-pool']
      },
      {
        id: 'mine-tunnels',
        name: 'Mine Tunnels',
        effect: 'Create a Treasure token',
        connections: ['dark-pool', 'fungi-cavern']
      },
      {
        id: 'storeroom',
        name: 'Storeroom',
        effect: 'Create two Treasure tokens',
        connections: ['temple-dumathoin']
      },
      {
        id: 'dark-pool',
        name: 'Dark Pool',
        effect: 'Each opponent loses 1 life and you gain 1 life',
        connections: ['temple-dumathoin']
      },
      {
        id: 'fungi-cavern',
        name: 'Fungi Cavern',
        effect: 'Target creature gets -4/-0 until your next turn',
        connections: ['temple-dumathoin']
      },
      {
        id: 'temple-dumathoin',
        name: 'Temple of Dumathoin',
        effect: 'Draw a card',
        connections: []
      }
    ]
  },
  {
    id: 'tomb-annihilation',
    name: 'Tomb of Annihilation',
    rooms: [
      {
        id: 'trapped-entry',
        name: 'Trapped Entry',
        effect: 'Each player loses 1 life',
        connections: ['veils-fear', 'oubliette']
      },
      {
        id: 'veils-fear',
        name: 'Veils of Fear',
        effect: 'Each player loses 2 life unless they discard a card',
        connections: ['sandfall-cell']
      },
      {
        id: 'oubliette',
        name: 'Oubliette',
        effect: 'Discard a card and sacrifice an artifact, a creature and a land',
        connections: ['cradle-death-god']
      },
      {
        id: 'sandfall-cell',
        name: 'Sandfall Cell',
        effect: 'Each player loses 2 life unless they sacrifice an artifact, a creature or a land',
        connections: ['cradle-death-god']
      },
      {
        id: 'cradle-death-god',
        name: 'Cradle of the Death God',
        effect: 'Create The Atropal, a legendary 4/4 black God Horror creature token with deathtouch',
        connections: []
      }
    ]
  },
  {
    id: 'mad-mage',
    name: 'Dungeon of the Mad Mage',
    rooms: [
      {
        id: 'yawning-portal',
        name: 'Yawning Portal',
        effect: 'You gain 1 life',
        connections: ['dungeon-level']
      },
      {
        id: 'dungeon-level',
        name: 'Dungeon Level',
        effect: 'Scry 1',
        connections: ['goblin-bazaar', 'twisted-caverns']
      },
      {
        id: 'goblin-bazaar',
        name: 'Goblin Bazaar',
        effect: 'Create a Treasure token',
        connections: ['lost-level']
      },
      {
        id: 'twisted-caverns',
        name: 'Twisted Caverns',
        effect: "Target creature can't attack until your next turn",
        connections: ['lost-level']
      },
      {
        id: 'lost-level',
        name: 'Lost Level',
        effect: 'Scry 2',
        connections: ['runestone-caverns', 'muirals-graveyard']
      },
      {
        id: 'runestone-caverns',
        name: 'Runestone Caverns',
        effect: 'Exile the top two cards of your library. You may play them',
        connections: ['deep-mines']
      },
      {
        id: 'muirals-graveyard',
        name: "Muiral's Graveyard",
        effect: 'Create two 1/1 black Skeleton creature tokens',
        connections: ['deep-mines']
      },
      {
        id: 'deep-mines',
        name: 'Deep Mines',
        effect: 'Scry 3',
        connections: ['mad-wizard-lair']
      },
      {
        id: 'mad-wizard-lair',
        name: "Mad Wizard's Lair",
        effect: 'Draw three cards and reveal them. You may cast one of them without paying its mana cost',
        connections: []
      }
    ]
  },
  {
    id: 'undercity',
    name: 'The Undercity',
    rooms: [
      {
        id: 'secret-entrance',
        name: 'Secret Entrance',
        effect: 'Search your library for a basic land card, reveal it, put it into your hand, then shuffle',
        connections: ['forge', 'lost-well']
      },
      {
        id: 'forge',
        name: 'Forge',
        effect: 'Put two +1/+1 counters on target creature',
        connections: ['trap', 'arena']
      },
      {
        id: 'lost-well',
        name: 'Lost Well',
        effect: 'Scry 2',
        connections: ['arena', 'stash']
      },
      {
        id: 'trap',
        name: 'Trap!',
        effect: 'Target player loses 5 life',
        connections: ['archives']
      },
      {
        id: 'arena',
        name: 'Arena',
        effect: 'Goad target creature',
        connections: ['archives', 'catacombs']
      },
      {
        id: 'stash',
        name: 'Stash',
        effect: 'Create a Treasure token',
        connections: ['catacombs']
      },
      {
        id: 'archives',
        name: 'Archives',
        effect: 'Draw a card',
        connections: ['throne-dead-three']
      },
      {
        id: 'catacombs',
        name: 'Catacombs',
        effect: 'Create a 4/1 black Skeleton creature token with menace',
        connections: ['throne-dead-three']
      },
      {
        id: 'throne-dead-three',
        name: 'Throne of the Dead Three',
        effect: 'Reveal the top ten cards of your library. Put a creature card from among them onto the battlefield with three +1/+1 counters on it. It gains hexproof until your next turn. Then shuffle',
        connections: []
      }
    ]
  }
];