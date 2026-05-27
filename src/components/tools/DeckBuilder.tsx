import React, { useState } from 'react';
import { Library, ArrowLeft, ArrowRight, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTranslation } from '../../i18n/useTranslation';

interface CardGroup {
  category: string;
  cards: string[];
}

interface Bracket {
  level: number;
  name: string;
  description: string;
  traits: string[];
  exampleCards?: CardGroup[];
}

interface Format {
  id: string;
  name: string;
  description: string;
  deckSize: string;
  rules: string[];
  bannedListUrl: string;
  rotationUrl?: string;
  landSuggestions: {
    total: string;
    breakdown?: string[];
    notes?: string[];
  };
  brackets?: Bracket[];
}

const formats: Format[] = [
  {
    id: 'commander',
    name: 'Commander',
    description: 'A casual multiplayer format where each player chooses a legendary creature as their commander.',
    deckSize: '99 cards + 1 commander',
    rules: [
      'Singleton format (only one copy of each card except basic lands)',
      'Must include a legendary creature as commander (playgroups may allow planeswalkers)',
      'All cards must match the commander\'s color identity',
      'Starting life total is 40',
      'Designed for multiplayer games'
    ],
    bannedListUrl: 'https://magic.wizards.com/en/banned-restricted-list#commander',
    brackets: [
      {
        level: 1,
        name: 'Exhibition',
        description: 'Preconstructed decks with minimal changes. Ideal for learning the format.',
        traits: [
          'Precon cards with budget replacements only',
          'No tutors that search for specific cards',
          'No extra turns, mass land destruction, or infinite combos',
          'Games typically end through combat by turns 10–15',
        ],
        exampleCards: [
          { category: 'Mana', cards: ['Sol Ring', 'Arcane Signet', "Commander's Sphere", 'Cultivate', "Kodama's Reach"] },
          { category: 'Utility', cards: ['Swiftfoot Boots', 'Lightning Greaves', 'Solemn Simulacrum', 'Burnished Hart'] },
          { category: 'Removal', cards: ['Generous Gift', 'Chaos Warp', 'Swords to Plowshares', 'Reclamation Sage'] },
        ],
      },
      {
        level: 2,
        name: 'Core',
        description: 'Upgraded precons and entry-level custom builds. The most common casual table.',
        traits: [
          'Synergistic strategy with a clear game plan',
          'Some tutors and card draw, but not excessive',
          'No "must answer or lose" threats before turn 6',
          'Mana rocks up to 2 CMC are common',
        ],
        exampleCards: [
          { category: 'Engines', cards: ['Rhystic Study', 'Smothering Tithe', 'Sylvan Library', 'Phyrexian Arena'] },
          { category: 'Tutors', cards: ['Diabolic Tutor', 'Worldly Tutor', "Eladamri's Call", 'Fauna Shaman'] },
          { category: 'Interaction', cards: ['Counterspell', 'Cyclonic Rift', 'Path to Exile', 'Beast Within'] },
          { category: 'Ramp', cards: ['Three Visits', 'Farseek', "Nature's Lore", 'Skyshroud Claim'] },
        ],
      },
      {
        level: 3,
        name: 'Powered',
        description: 'Optimized decks with efficient engines. Expect fast mana and consistent combos.',
        traits: [
          'Efficient tutors and strong card draw engines',
          'Fast mana rocks (Sol Ring, Mana Crypt acceptable)',
          'Combos present but require multiple pieces',
          'Games can end turns 5–8 through combo or board advantage',
        ],
        exampleCards: [
          { category: 'Fast Mana', cards: ['Mana Crypt', 'Chrome Mox', 'Mox Diamond', 'Mana Vault'] },
          { category: 'Tutors', cards: ['Demonic Tutor', 'Vampiric Tutor', 'Imperial Seal', 'Enlightened Tutor'] },
          { category: 'Engines', cards: ['Necropotence', 'Mystic Remora', 'Dockside Extortionist', 'Ad Nauseam'] },
          { category: 'Combos', cards: ['Isochron Scepter', 'Dramatic Reversal', 'Thoracle', 'Underworld Breach'] },
        ],
      },
      {
        level: 4,
        name: 'cEDH',
        description: 'Competitive EDH — fully optimized decks aiming to win as early as turns 2–4.',
        traits: [
          'All powerful cards allowed (Dockside, Thassa\'s Oracle, etc.)',
          'Optimal mana base with fetch/dual lands',
          'Full tutor package and fast combo wins are the norm',
          'Heavy interaction suite (counterspells, hate pieces)',
        ],
        exampleCards: [
          { category: 'Win Conditions', cards: ["Thassa's Oracle", 'Demonic Consultation', 'Tainted Pact', 'Underworld Breach + Brain Freeze'] },
          { category: 'Free Interaction', cards: ['Force of Will', 'Force of Negation', 'Fierce Guardianship', 'Pact of Negation', 'Mental Misstep'] },
          { category: 'Fast Mana', cards: ['Jeweled Lotus', 'Mana Crypt', 'Chrome Mox', 'Mox Diamond', 'Mana Vault'] },
          { category: 'Tutors', cards: ['Demonic Tutor', 'Vampiric Tutor', 'Tainted Pact', 'Intuition', 'Grim Tutor'] },
        ],
      },
    ],
    landSuggestions: {
      total: '36-38 lands',
      breakdown: [
        '10-12 basic lands',
        '8-10 dual/shock/fetch lands',
        '8-10 utility lands',
        '8-10 other nonbasic lands'
      ],
      notes: [
        'Adjust based on your mana curve and color requirements',
        'Include more ramp spells if running fewer lands',
        'Consider your commander\'s mana value when deciding land count'
      ]
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'The most commonly played format, using only the most recently released sets.',
    deckSize: 'Minimum 60 cards',
    rules: [
      'Maximum 4 copies of any card except basic lands',
      'Only cards from the most recent sets are legal',
      'Starting life total is 20',
      '15-card sideboard allowed'
    ],
    bannedListUrl: 'https://magic.wizards.com/en/banned-restricted-list#standard',
    rotationUrl: 'https://whatsinstandard.com',
    landSuggestions: {
      total: '24-26 lands',
      breakdown: [
        '12-16 basic lands',
        '4-8 dual lands',
        '2-4 utility lands'
      ],
      notes: [
        'Aggro decks might run as few as 20 lands',
        'Control decks might run up to 27 lands',
        'Consider your curve and color requirements'
      ]
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A non-rotating format that includes cards from 8th Edition forward.',
    deckSize: 'Minimum 60 cards',
    rules: [
      'Maximum 4 copies of any card except basic lands',
      'Cards must be from 8th Edition forward',
      'Starting life total is 20',
      '15-card sideboard allowed'
    ],
    bannedListUrl: 'https://magic.wizards.com/en/banned-restricted-list#modern',
    landSuggestions: {
      total: '22-24 lands',
      breakdown: [
        '6-8 basic lands',
        '8-12 fetch lands',
        '4-8 shock lands',
        '2-4 utility lands'
      ],
      notes: [
        'Modern mana bases are typically more aggressive',
        'Fetch lands help with consistency',
        'Consider your deck\'s speed and color requirements'
      ]
    }
  },
  {
    id: 'pioneer',
    name: 'Pioneer',
    description: 'A non-rotating format that includes cards from Return to Ravnica forward.',
    deckSize: 'Minimum 60 cards',
    rules: [
      'Maximum 4 copies of any card except basic lands',
      'Cards must be from Return to Ravnica (2012) forward',
      'Starting life total is 20',
      '15-card sideboard allowed',
      'Fetchlands are not legal in this format'
    ],
    bannedListUrl: 'https://magic.wizards.com/en/banned-restricted-list#pioneer',
    landSuggestions: {
      total: '22-24 lands',
      breakdown: [
        '8-12 basic lands',
        '8-12 dual lands',
        '2-4 utility lands',
        '0-2 pathway lands'
      ],
      notes: [
        'Mana bases are generally less expensive than Modern',
        'Focus on checklands, fastlands, and pathways',
        'Consider your deck\'s speed and color intensity requirements'
      ]
    }
  },
  {
    id: 'prerelease',
    name: 'Pre-release',
    description: 'A sealed deck format where players build decks using 6 booster packs from the newest set.',
    deckSize: 'Minimum 40 cards',
    rules: [
      'Build deck using only the cards from your 6 booster packs and basic lands',
      'Starting life total is 20',
      'All cards from your pool not in your main deck become your sideboard',
      'Basic lands are provided by the store'
    ],
    bannedListUrl: 'https://magic.wizards.com/en/limited',
    landSuggestions: {
      total: '17-18 lands',
      breakdown: [
        '15-17 basic lands',
        '0-2 nonbasic lands from your pool'
      ],
      notes: [
        'Use this ratio: 17 lands for most decks, 18 for control, 16 for aggressive',
        'Try to stick to two colors unless you have strong fixing',
        'Count cards with cycling/card draw as partial lands',
        'Consider your mana curve carefully in limited formats'
      ]
    }
  }
];

export function DeckBuilder() {
  const setActiveSection = useNavigationStore(state => state.setActiveSection);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [expandedBrackets, setExpandedBrackets] = useState<Set<number>>(new Set());
  const t = useTranslation();

  const toggleBracket = (level: number) => {
    setExpandedBrackets(prev => {
      const next = new Set(prev);
      next.has(level) ? next.delete(level) : next.add(level);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveSection('tools')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
        </button>
        <Library className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.deckBuilder.title}</h2>
      </div>

      {!selectedFormat ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format)}
              className="card-base p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-theme-primary-hover dark:text-dark-accent">
                {format.name}
              </h3>
              <p className="text-gray-600 dark:text-dark-text text-sm">
                {format.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedFormat(null)}
            className="text-theme-primary dark:text-dark-accent hover:text-theme-primary-hover 
              dark:hover:text-dark-accent/70 font-medium inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.deckBuilder.backToFormats}
          </button>

          <div className="card-base p-6">
            <h3 className="text-2xl font-bold mb-4 text-theme-primary-hover dark:text-dark-accent">
              {selectedFormat.name}
            </h3>
            <p className="text-gray-600 dark:text-dark-text mb-4">
              {selectedFormat.description}
            </p>

            <div className="bg-theme-surface/50 dark:bg-dark-accent/20 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
                <span className="font-medium text-theme-primary-hover dark:text-dark-accent/70">
                  {t.deckBuilder.deckSizeLabel} {selectedFormat.deckSize}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-dark-highlight">
              {t.deckBuilder.formatRules}
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedFormat.rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-theme-primary dark:text-dark-accent">•</span>
                  <span className="text-gray-600 dark:text-dark-text">{rule}</span>
                </li>
              ))}
            </ul>

            {selectedFormat.brackets && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-dark-highlight">
                  Power Level Brackets
                </h4>
                <p className="text-sm text-gray-500 dark:text-dark-text/70 mb-3">
                  Introduced by the Commander Rules Committee in 2024 to help players find games at matching power levels. Agree on a bracket with your table before the game (Rule 0).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFormat.brackets.map((bracket) => {
                    const colors = [
                      { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-400 dark:border-emerald-600', badge: 'bg-emerald-500', text: 'text-emerald-800 dark:text-emerald-300', sub: 'text-emerald-700 dark:text-emerald-400', chip: 'bg-emerald-100 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200', btn: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200' },
                      { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-400 dark:border-blue-600', badge: 'bg-blue-500', text: 'text-blue-800 dark:text-blue-300', sub: 'text-blue-700 dark:text-blue-400', chip: 'bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200', btn: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200' },
                      { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-400 dark:border-amber-600', badge: 'bg-amber-500', text: 'text-amber-800 dark:text-amber-300', sub: 'text-amber-700 dark:text-amber-400', chip: 'bg-amber-100 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200', btn: 'text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200' },
                      { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-400 dark:border-red-600', badge: 'bg-red-500', text: 'text-red-800 dark:text-red-300', sub: 'text-red-700 dark:text-red-400', chip: 'bg-red-100 dark:bg-red-800/40 text-red-800 dark:text-red-200', btn: 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200' },
                    ][bracket.level - 1];
                    const isExpanded = expandedBrackets.has(bracket.level);
                    return (
                      <div key={bracket.level} className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-4`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`${colors.badge} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                            {bracket.level}
                          </span>
                          <span className={`font-semibold ${colors.text}`}>{bracket.name}</span>
                        </div>
                        <p className={`text-xs mb-2 ${colors.sub}`}>{bracket.description}</p>
                        <ul className="space-y-1 mb-3">
                          {bracket.traits.map((trait, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-dark-text">
                              <span className={`${colors.sub} mt-0.5 flex-shrink-0`}>•</span>
                              {trait}
                            </li>
                          ))}
                        </ul>

                        {bracket.exampleCards && (
                          <>
                            <button
                              onClick={() => toggleBracket(bracket.level)}
                              className={`flex items-center gap-1 text-xs font-medium transition-colors ${colors.btn}`}
                            >
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              {isExpanded ? 'Hide examples' : 'Show example cards'}
                            </button>

                            {isExpanded && (
                              <div className="mt-3 space-y-2 border-t border-current/10 pt-3">
                                {bracket.exampleCards.map((group) => (
                                  <div key={group.category}>
                                    <p className={`text-xs font-semibold mb-1 ${colors.sub}`}>{group.category}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {group.cards.map((card) => (
                                        <span key={card} className={`text-xs px-2 py-0.5 rounded-full ${colors.chip}`}>
                                          {card}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <a
                href={selectedFormat.bannedListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-primary dark:text-dark-accent hover:text-theme-primary-hover
                  dark:hover:text-dark-accent/70 inline-flex items-center"
              >
                {t.deckBuilder.viewBannedList}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              
              {selectedFormat.rotationUrl && (
                <a
                  href={selectedFormat.rotationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-theme-primary dark:text-dark-accent hover:text-theme-primary-hover 
                    dark:hover:text-dark-accent/70 inline-flex items-center"
                >
                  {t.deckBuilder.checkSets}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          </div>

          <div className="card-base p-6 bg-theme-surface/50 dark:bg-dark-accent/20 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-3 text-theme-primary-hover dark:text-dark-accent/70">
              {t.deckBuilder.suggestedManaBase}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-theme-primary dark:text-dark-accent" />
                <span className="font-medium text-theme-primary-hover dark:text-dark-accent/70">
                  {selectedFormat.landSuggestions.total}
                </span>
              </div>

              {selectedFormat.landSuggestions.breakdown && (
                <div className="space-y-2">
                  <h5 className="font-medium text-theme-primary-hover dark:text-dark-accent/70">
                    {t.deckBuilder.suggestedBreakdown}
                  </h5>
                  <ul className="space-y-1">
                    {selectedFormat.landSuggestions.breakdown.map((item, index) => (
                      <li key={index} className="text-gray-600 dark:text-dark-text flex items-start space-x-2">
                        <span className="text-theme-primary dark:text-dark-accent">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedFormat.landSuggestions.notes && (
                <div className="space-y-2">
                  <h5 className="font-medium text-theme-primary-hover dark:text-dark-accent/70">
                    {t.deckBuilder.notes}
                  </h5>
                  <ul className="space-y-1">
                    {selectedFormat.landSuggestions.notes.map((note, index) => (
                      <li key={index} className="text-gray-600 dark:text-dark-text flex items-start space-x-2">
                        <span className="text-theme-primary dark:text-dark-accent">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 p-4 bg-theme-surface dark:bg-dark-accent/30 rounded-lg">
                <p className="text-theme-primary-hover dark:text-dark-accent/70 mb-2">
                  {t.deckBuilder.tryManaCalculator}
                </p>
                <button
                  onClick={() => setActiveSection('mana-calculator')}
                  className="text-theme-primary-hover dark:text-dark-accent hover:text-theme-primary-hover
                    dark:hover:text-dark-accent/70 font-medium inline-flex items-center"
                >
                  {t.deckBuilder.tryManaCalculatorBtn}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 