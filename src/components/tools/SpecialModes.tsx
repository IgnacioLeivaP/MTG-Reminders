import React, { useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

interface GameMode {
  id: string;
  name: string;
  description: string;
  playerCount?: string;
  hasOwnTool?: boolean;
  toolId?: string;
  officialFormat?: boolean;
  comingSoon?: boolean;
}

const gameModes: GameMode[] = [
  {
    id: 'planechase',
    name: 'Planechase',
    description: 'Players travel through different planes of the Multiverse, each with unique effects that change gameplay.',
    playerCount: '2+',
    hasOwnTool: true,
    toolId: 'planechase',
    officialFormat: true
  },
  {
    id: 'archenemy',
    name: 'Archenemy',
    description: 'One player takes on the role of a powerful villain with scheme cards, facing off against multiple opponents working together.',
    playerCount: '3-4',
    hasOwnTool: true,
    toolId: 'archenemy',
    officialFormat: true,
    comingSoon: true
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    description: 'Players use special oversized cards that modify their starting life and hand size.',
    playerCount: '2+',
    officialFormat: true,
    comingSoon: true
  },
  {
    id: '3-card-blind',
    name: '3-Card Blind',
    description: 'Players build decks using only three cards total, with unlimited basic lands allowed.',
    playerCount: '2'
  },
  {
    id: 'ancient',
    name: 'Ancient',
    description: 'Only cards printed in 1993 and 1994 are legal, with specific reprint rules.',
    playerCount: '2'
  },
  {
    id: 'archon',
    name: 'Archon',
    description: 'Players use shared decks built from three booster packs each, with special deck construction rules.',
    playerCount: '2-4'
  },
  {
    id: 'assassin',
    name: 'Assassin',
    description: 'Each player is secretly assigned another player as their target. Win by eliminating your target while protecting yourself.',
    playerCount: '4+'
  },
  {
    id: 'auction',
    name: 'Auction',
    description: 'Players bid life points or other resources to draft cards for their deck before playing.',
    playerCount: '3+'
  },
  {
    id: 'baroque',
    name: 'Baroque',
    description: 'All cards are played face down and retain their normal characteristics except for being 2/2 creatures.',
    playerCount: '2+'
  },
  {
    id: 'block-party',
    name: 'Block Party',
    description: 'Each player builds a deck using cards from a single block of their choice.',
    playerCount: '2+'
  },
  {
    id: 'byob',
    name: 'Bring Your Own Block',
    description: 'Similar to Block Party, but each player must use a different block than the others.',
    playerCount: '2+'
  },
  {
    id: 'bys',
    name: 'Build Your Own Standard',
    description: 'Players choose a number of sets to form their own Standard environment.',
    playerCount: '2+'
  },
  {
    id: 'captain',
    name: 'Captain',
    description: 'A variant of Commander where the deck must include exactly two legendary creatures as captains.',
    playerCount: '2-6'
  },
  {
    id: 'challenge-deck',
    name: 'Challenge Deck',
    description: 'One or more players face off against a specialized automated deck with unique rules.',
    playerCount: '1+'
  },
  {
    id: 'chaos-magic',
    name: 'Chaos Magic',
    description: 'Random effects occur throughout the game, changing rules and gameplay elements.',
    playerCount: '2+'
  },
  {
    id: 'commander',
    name: 'Commander',
    description: 'A 100-card singleton format where each player has a legendary creature as their commander.',
    playerCount: '2-6',
    officialFormat: true
  },
  {
    id: 'duel-commander',
    name: 'Duel Commander',
    description: 'A 1v1 variant of Commander with its own banlist and starting life total of 20.',
    playerCount: '2'
  },
  {
    id: 'flavortown',
    name: 'Flavortown',
    description: 'All cards must have flavor text, and gameplay decisions must be justified by the flavor.',
    playerCount: '2+'
  },
  {
    id: 'folk-commander',
    name: 'Folk Commander',
    description: 'A Commander variant where any creature can be your commander.',
    playerCount: '2-6'
  },
  {
    id: 'forgetful-fish',
    name: 'Forgetful Fish',
    description: 'Players must play with their cards face down and rely on memory to know what each card is.',
    playerCount: '2'
  },
  {
    id: 'frontier',
    name: 'Frontier',
    description: 'A non-rotating format using cards from Magic 2015 forward.',
    playerCount: '2'
  },
  {
    id: 'gentry',
    name: 'Gentry',
    description: 'A budget format where decks can only contain a limited number of rares and uncommons.',
    playerCount: '2'
  },
  {
    id: 'highlander',
    name: 'Highlander',
    description: 'A singleton format (only one copy of each card) with no commander.',
    playerCount: '2'
  },
  {
    id: 'judge-tower',
    name: 'Judge Tower',
    description: 'Players must cast spells and activate abilities whenever legally possible or lose the game.',
    playerCount: '2+'
  },
  {
    id: 'lightning-magic',
    name: 'Lightning Magic',
    description: 'Each player has 10 seconds to take their entire turn or pass priority.',
    playerCount: '2'
  },
  {
    id: 'old-school',
    name: 'Old School',
    description: 'Only cards printed in 1993/1994 are legal, using original rules and restrictions.',
    playerCount: '2'
  },
  {
    id: 'oathbreaker',
    name: 'Oathbreaker',
    description: 'A 60-card singleton format with a planeswalker as your commander and a signature spell.',
    playerCount: '2-6'
  },
  {
    id: 'pauper-commander',
    name: 'Pauper Commander',
    description: 'Commander variant where the deck must be all commons, but the commander can be an uncommon creature.',
    playerCount: '2-6'
  },
  {
    id: 'peasant',
    name: 'Peasant',
    description: 'Similar to Pauper, but allows up to 5 uncommon cards in the deck.',
    playerCount: '2'
  },
  {
    id: 'ql-magic',
    name: 'QL Magic',
    description: 'Players start with all cards in play and must remove them to win.',
    playerCount: '2'
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    description: 'Each nonland card in your deck must be a different color combination.',
    playerCount: '2'
  },
  {
    id: 'stairwell',
    name: 'Stairwell',
    description: 'Each card in your deck must have a different mana value, increasing by one each time.',
    playerCount: '2'
  },
  {
    id: 'retro-modern',
    name: 'Retro-Modern',
    description: 'Modern format but with old-frame cards only.',
    playerCount: '2'
  },
  {
    id: 'solitaire',
    name: 'Solitaire',
    description: 'Single-player variant with specific victory conditions.',
    playerCount: '1'
  },
  {
    id: 'star',
    name: 'Star',
    description: 'Five-player format where you win when both players opposite to you lose.',
    playerCount: '5'
  },
  {
    id: 'supervillain-rumble',
    name: 'Supervillain Rumble',
    description: 'Multiple Archenemy players face off against each other.',
    playerCount: '3+'
  },
  {
    id: 'tiny-leaders',
    name: 'Tiny Leaders',
    description: 'Commander variant where all cards must have mana value 3 or less.',
    playerCount: '2'
  }
];

export function SpecialModes() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const filteredModes = gameModes.filter(mode =>
    mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mode.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveSection('tools')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Special Modes</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search game modes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 rounded-lg border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-dark-card focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
            focus:border-transparent dark:text-dark-text"
        />
        <Search className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModes.map(mode => (
          <div
            key={mode.id}
            className="card-base p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => !mode.comingSoon && setSelectedMode(mode)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400">
                {mode.name}
              </h3>
              <div className="flex gap-2">
                {mode.officialFormat && (
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-400 rounded-full">
                    Official
                  </span>
                )}
                {mode.comingSoon && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 
                    text-yellow-600 dark:text-yellow-400 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-dark-text text-sm mb-4">
              {mode.description}
            </p>
            {mode.playerCount && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Players: {mode.playerCount}
              </div>
            )}
            {mode.hasOwnTool && !mode.comingSoon && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection(mode.toolId!);
                }}
                className="mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 
                  dark:hover:text-purple-300 font-medium inline-flex items-center"
              >
                Try our {mode.name} tool
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {selectedMode.name}
              </h3>
              <button
                onClick={() => setSelectedMode(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-dark-text mb-4">
              {selectedMode.description}
            </p>
            {selectedMode.playerCount && (
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Recommended players: {selectedMode.playerCount}
              </div>
            )}
            {selectedMode.hasOwnTool && (
              <button
                onClick={() => {
                  setSelectedMode(null);
                  setActiveSection(selectedMode.toolId!);
                }}
                className="w-full p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                  transition-colors flex items-center justify-center space-x-2"
              >
                <span>Try our {selectedMode.name} tool</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 