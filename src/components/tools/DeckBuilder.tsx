import React, { useState } from 'react';
import { Library, ArrowLeft, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';

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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveSection('tools')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </button>
        <Library className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Deck Builder</h2>
      </div>

      {!selectedFormat ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format)}
              className="card-base p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-400">
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
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 
              dark:hover:text-purple-300 font-medium inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to formats
          </button>

          <div className="card-base p-6">
            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
              {selectedFormat.name}
            </h3>
            <p className="text-gray-600 dark:text-dark-text mb-4">
              {selectedFormat.description}
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-purple-700 dark:text-purple-300">
                  Deck Size: {selectedFormat.deckSize}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-dark-highlight">
              Format Rules
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedFormat.rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  <span className="text-gray-600 dark:text-dark-text">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col space-y-3">
              <a
                href={selectedFormat.bannedListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 
                  dark:hover:text-purple-300 inline-flex items-center"
              >
                View Banned Cards List
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              
              {selectedFormat.rotationUrl && (
                <a
                  href={selectedFormat.rotationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 
                    dark:hover:text-purple-300 inline-flex items-center"
                >
                  Check Current Sets in Format
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          </div>

          <div className="card-base p-6 bg-purple-50 dark:bg-purple-900/30 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
              Suggested Mana Base
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-purple-700 dark:text-purple-300">
                  {selectedFormat.landSuggestions.total}
                </span>
              </div>

              {selectedFormat.landSuggestions.breakdown && (
                <div className="space-y-2">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300">
                    Suggested Breakdown:
                  </h5>
                  <ul className="space-y-1">
                    {selectedFormat.landSuggestions.breakdown.map((item, index) => (
                      <li key={index} className="text-gray-600 dark:text-dark-text flex items-start space-x-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedFormat.landSuggestions.notes && (
                <div className="space-y-2">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300">
                    Notes:
                  </h5>
                  <ul className="space-y-1">
                    {selectedFormat.landSuggestions.notes.map((note, index) => (
                      <li key={index} className="text-gray-600 dark:text-dark-text flex items-start space-x-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <p className="text-purple-800 dark:text-purple-300 mb-2">
                  Want to calculate the exact number of lands and mana sources for your deck?
                </p>
                <button
                  onClick={() => setActiveSection('mana-calculator')}
                  className="text-purple-700 dark:text-purple-400 hover:text-purple-800 
                    dark:hover:text-purple-300 font-medium inline-flex items-center"
                >
                  Try our Mana Calculator
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