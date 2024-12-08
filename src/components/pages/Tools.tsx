import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { GamePhases } from './GamePhases';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'deck-brewing' | 'in-game' | 'special' | 'game-mechanics';
  comingSoon?: boolean;
  action?: string;
}

const tools: Tool[] = [
  // Deck Brewing Tools
  {
    id: 'mana-calculator',
    name: 'Mana Calculator',
    description: 'Calculate the optimal number of lands and mana sources for your deck based on your mana curve.',
    icon: 'Calculator',
    category: 'deck-brewing',
    action: 'Calculate Mana'
  },
  {
    id: 'deck-builder',
    name: 'Deck Builder',
    description: 'Learn about different Magic formats and their deck building rules. Get format-specific guidelines and check banned cards.',
    icon: 'Library',
    category: 'deck-brewing',
    action: 'Build Deck'
  },

  // In-Game Tools
  {
    id: 'life-counter',
    name: 'Life Counter',
    description: 'Track life totals for different game formats (Commander, Modern, etc.) with support for multiple players.',
    icon: 'Heart',
    category: 'in-game',
    action: 'Track Life'
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll different types of dice (d20, d6, etc.) for various game mechanics like rolling to see who goes first.',
    icon: 'Dice6',
    category: 'in-game',
    action: 'Roll Dice'
  },
  {
    id: 'cascade-helper',
    name: 'Cascade Helper',
    description: 'Track cascade triggers and help resolve cascade chains in the correct order.',
    icon: 'ArrowDownAZ',
    category: 'in-game',
    action: 'Track Cascade'
  },
  {
    id: 'mana-pool',
    name: 'Mana Pool',
    description: 'Track floating mana that doesn\'t empty from your mana pool as steps and phases end.',
    icon: 'Droplets',
    category: 'in-game',
    action: 'Track Mana'
  },
  {
    id: 'token-generator',
    name: 'Token Generator',
    description: 'Create and keep track of multiple tokens with custom power/toughness and abilities.',
    icon: 'Copy',
    category: 'in-game',
    action: 'Create Token'
  },
  {
    id: 'damage-tracker',
    name: 'Damage Tracker',
    description: 'Track damage dealt to and from creatures during combat or by spells and abilities.',
    icon: 'Swords',
    category: 'in-game',
    action: 'Track Damage'
  },
  {
    id: 'storm-counter',
    name: 'Storm Counter',
    description: 'Keep track of spells cast this turn for Storm and other similar mechanics.',
    icon: 'Cloud',
    category: 'in-game',
    action: 'Count Spells'
  },

  // Game Mechanics
  {
    id: 'game-phases',
    name: 'Game Phases',
    description: 'Track the current phase and step of the turn, with detailed information about each phase.',
    icon: 'Clock',
    category: 'game-mechanics',
    action: 'Track Phases'
  },
  {
    id: 'helper-cards',
    name: 'Helper Cards',
    description: 'Access quick reference cards for dungeons, day/night cycle, monarch status, and other game mechanics.',
    icon: 'BookOpen',
    category: 'game-mechanics',
    action: 'View Cards'
  },
  {
    id: 'emblems',
    name: 'Emblems',
    description: 'Track active planeswalker emblems and their effects during your game.',
    icon: 'Badge',
    category: 'game-mechanics',
    action: 'View Emblems'
  },

  // Special Game Modes
  {
    id: 'special-modes',
    name: 'Special Modes',
    description: 'Explore different ways to play Magic: The Gathering including Planechase, Archenemy, and other variants.',
    icon: 'Sparkles',
    category: 'special',
    action: 'View Modes'
  }
];

export function Tools() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setActiveSection } = useNavigationStore();

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  const handleToolClick = (toolId: string) => {
    setActiveSection(toolId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">Tools</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-dark-text
            focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent transition-colors"
        />
      </div>

      {searchTerm === '' ? (
        <>
          {/* Game Mechanics Section */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Game Mechanics</h3>
              <p className="text-gray-600 dark:text-dark-text mt-1">
                Reference cards and trackers for special game mechanics like dungeons, day/night cycle, and planeswalker emblems.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'game-mechanics').map(tool => (
                <ToolCard key={tool.id} tool={tool} onToolClick={handleToolClick} renderIcon={renderIcon} />
              ))}
            </div>
          </div>

          {/* In-Game Tools Section */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">In-Game Tools</h3>
              <p className="text-gray-600 dark:text-dark-text mt-1">
                Essential utilities for tracking life, tokens, damage, and other game mechanics during your matches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'in-game').map(tool => (
                <ToolCard key={tool.id} tool={tool} onToolClick={handleToolClick} renderIcon={renderIcon} />
              ))}
            </div>
          </div>

          {/* Special Game Modes Section */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Spice Up The Gameplay</h3>
              <p className="text-gray-600 dark:text-dark-text mt-1">
                Explore alternative ways to play Magic with variants like Planechase, Archenemy, and other special formats.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'special').map(tool => (
                <ToolCard key={tool.id} tool={tool} onToolClick={handleToolClick} renderIcon={renderIcon} />
              ))}
            </div>
          </div>

          {/* Deck Brewing Section */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Deck Brewing</h3>
              <p className="text-gray-600 dark:text-dark-text mt-1">
                Tools to help you build and optimize your decks, from mana calculations to format guidelines.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.category === 'deck-brewing').map(tool => (
                <ToolCard key={tool.id} tool={tool} onToolClick={handleToolClick} renderIcon={renderIcon} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onToolClick={handleToolClick} renderIcon={renderIcon} />
          ))}
        </div>
      )}

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-dark-text/60">
            No tools found matching your search criteria
          </p>
        </div>
      )}
    </div>
  );
}

// Componente de tarjeta separado para mejor organización
function ToolCard({ tool, onToolClick, renderIcon }) {
  return (
    <div
      onClick={() => onToolClick(tool.id)}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-100 dark:bg-dark-accent/50 rounded-lg text-purple-600 dark:text-purple-400">
            {renderIcon(tool.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">
                {tool.name}
              </h3>
              {tool.comingSoon && (
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-dark-text mb-4">
          {tool.description}
        </p>

        {!tool.comingSoon && (
          <button
            onClick={() => onToolClick(tool.id)}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-100 text-white hover:text-purple-700
              dark:bg-dark-accent dark:hover:bg-dark-highlight dark:hover:text-purple-900
              rounded-lg transition-colors text-sm font-medium"
          >
            {tool.action}
          </button>
        )}
      </div>
    </div>
  );
}