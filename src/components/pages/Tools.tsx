import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTranslation } from '../../i18n/useTranslation';

interface ToolMeta {
  id: string;
  icon: string;
  category: 'deck-brewing' | 'in-game' | 'special' | 'game-mechanics';
  comingSoon?: boolean;
}

const toolsMeta: ToolMeta[] = [
  { id: 'mana-calculator', icon: 'Calculator', category: 'deck-brewing' },
  { id: 'deck-builder', icon: 'Library', category: 'deck-brewing' },
  { id: 'life-counter', icon: 'Heart', category: 'in-game' },
  { id: 'dice-roller', icon: 'Dice6', category: 'in-game' },
  { id: 'cascade-helper', icon: 'ArrowDownAZ', category: 'in-game' },
  { id: 'mana-pool', icon: 'Droplets', category: 'in-game' },
  { id: 'token-generator', icon: 'Copy', category: 'in-game' },
  { id: 'damage-tracker', icon: 'Swords', category: 'in-game' },
  { id: 'storm-counter', icon: 'Cloud', category: 'in-game' },
  { id: 'game-phases', icon: 'Clock', category: 'game-mechanics' },
  { id: 'helper-cards', icon: 'BookOpen', category: 'game-mechanics' },
  { id: 'emblems', icon: 'Badge', category: 'game-mechanics' },
  { id: 'special-modes', icon: 'Sparkles', category: 'special' },
];

export function Tools() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setActiveSection } = useNavigationStore();
  const t = useTranslation();

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  const getToolData = (id: string) => t.tools.items[id as keyof typeof t.tools.items];

  const filteredTools = toolsMeta.filter(tool => {
    const data = getToolData(tool.id);
    if (!data) return false;
    const term = searchTerm.toLowerCase();
    return data.name.toLowerCase().includes(term) || data.description.toLowerCase().includes(term);
  });

  const sections: { key: 'game-mechanics' | 'in-game' | 'special' | 'deck-brewing'; title: string; desc: string }[] = [
    { key: 'game-mechanics', title: t.tools.sections.gameMechanics, desc: t.tools.sections.gameMechanicsDesc },
    { key: 'in-game', title: t.tools.sections.inGame, desc: t.tools.sections.inGameDesc },
    { key: 'special', title: t.tools.sections.special, desc: t.tools.sections.specialDesc },
    { key: 'deck-brewing', title: t.tools.sections.deckBrewing, desc: t.tools.sections.deckBrewingDesc },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.tools.title}</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text/60 w-5 h-5" />
        <input
          type="text"
          placeholder={t.tools.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-dark-text
            focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent transition-colors"
        />
      </div>

      {searchTerm === '' ? (
        <>
          {sections.map(({ key, title, desc }) => (
            <div key={key} className="space-y-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">{title}</h3>
                <p className="text-gray-600 dark:text-dark-text mt-1">{desc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolsMeta.filter(tool => tool.category === key).map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    toolData={getToolData(tool.id)}
                    onToolClick={() => setActiveSection(tool.id)}
                    renderIcon={renderIcon}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              toolData={getToolData(tool.id)}
              onToolClick={() => setActiveSection(tool.id)}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      )}

      {filteredTools.length === 0 && searchTerm !== '' && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-dark-text/60">{t.tools.noResults}</p>
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool, toolData, onToolClick, renderIcon }: {
  tool: ToolMeta;
  toolData: { name: string; description: string; action: string } | undefined;
  onToolClick: () => void;
  renderIcon: (name: string) => React.ReactNode;
}) {
  if (!toolData) return null;
  return (
    <div
      onClick={onToolClick}
      className="bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-100 dark:bg-dark-accent/50 rounded-lg text-purple-600 dark:text-purple-400">
            {renderIcon(tool.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-highlight">{toolData.name}</h3>
              {tool.comingSoon && (
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-dark-text mb-4">{toolData.description}</p>

        {!tool.comingSoon && (
          <button
            onClick={onToolClick}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-100 text-white hover:text-purple-700
              dark:bg-dark-accent dark:hover:bg-dark-highlight dark:hover:text-purple-900
              rounded-lg transition-colors text-sm font-medium"
          >
            {toolData.action}
          </button>
        )}
      </div>
    </div>
  );
}
