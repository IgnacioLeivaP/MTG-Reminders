import React, { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { helperCards } from '../../data/helperCards';
import { HelperCard } from '../../types';
import { HelperCardModal } from '../HelperCardModal';
import { DungeonCard } from '../dungeons/DungeonCard';
import { UndercityCard } from '../dungeons/UndercityCard';
import { useThemeStore } from '../../store/useThemeStore';
import { useCountersStore } from '../../store/useCountersStore';
import { useDayNightStore } from '../../store/useDayNightStore';
import { useMonarchStore } from '../../store/useMonarchStore';
import { useCitysBlessingStore } from '../../store/useCitysBlessingStore';
import { RingTimeline } from '../RingTimeline';
import { FavoriteButton } from '../FavoriteButton';
import { useNavigationStore } from '../../store/useNavigationStore';

export function HelperCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState<HelperCard | null>(null);
  const selectedHelperId = useNavigationStore(state => state.selectedHelperId);
  const setSelectedHelperId = useNavigationStore(state => state.setSelectedHelperId);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { counters, setCounter } = useCountersStore();
  const { isDay } = useDayNightStore();
  const { isMonarch } = useMonarchStore();
  const { hasBlessing } = useCitysBlessingStore();

  const filteredCards = helperCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  const handleCounterChange = (cardId: string, amount: number) => {
    setCounter(cardId, (counters[cardId] || 0) + amount);
  };

  const getCardClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night') {
      return isDay 
        ? 'bg-gradient-to-br from-[#e05e00] to-[#ff3d00] text-white'
        : 'bg-gradient-to-br from-[#03013c] to-[#11002e] border-2 border-[#6e49e1] text-white';
    }
    if (card.name === 'Monarch' && isMonarch) {
      return isDarkMode
        ? 'bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d] border-2 border-[#bb9b49]'
        : 'bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d]';
    }
    if (card.name === "City's Blessing" && hasBlessing) {
      return isDarkMode
        ? 'bg-gradient-to-br from-[#3f939a] via-[#417a9a] to-[#35516d] border-2 border-[#71f9ff]'
        : 'bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400';
    }
    return 'bg-white dark:bg-dark-card';
  };

  const getTextClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' || 
        (card.name === 'Monarch' && isMonarch) || 
        (card.name === "City's Blessing" && hasBlessing)) {
      return 'text-white';
    }
    return 'text-gray-600 dark:text-dark-text';
  };

  const getTitleClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' || 
        (card.name === 'Monarch' && isMonarch) || 
        (card.name === "City's Blessing" && hasBlessing)) {
      return 'text-white';
    }
    return 'text-gray-900 dark:text-dark-highlight';
  };

  const getIconBgClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night') {
      return isDay ? 'bg-orange-400/50' : 'bg-blue-900/50';
    }
    if (card.name === 'Monarch' && isMonarch) {
      return isDarkMode ? 'bg-[#bb9b49]/50' : 'bg-[#b48811]';
    }
    if (card.name === "City's Blessing" && hasBlessing) {
      return isDarkMode ? 'bg-[#71f9ff]/20' : 'bg-sky-500';
    }
    return 'bg-purple-100 dark:bg-dark-accent/50';
  };

  const getIconClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' || 
        (card.name === 'Monarch' && isMonarch) || 
        (card.name === "City's Blessing" && hasBlessing)) {
      return 'text-white';
    }
    return 'text-purple-600 dark:text-purple-400';
  };

  const getCounterBgClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night') {
      return isDay ? 'bg-orange-400/30' : 'bg-blue-900/30';
    }
    if (card.name === 'Monarch' && isMonarch) {
      return isDarkMode ? 'bg-[#ebd197]/20' : 'bg-[#ebd197]/40';
    }
    return 'bg-gray-50 dark:bg-dark-accent/30';
  };

  // Efecto para abrir el modal cuando se navega desde favoritos
  useEffect(() => {
    if (selectedHelperId) {
      const card = helperCards.find(card => card.id === selectedHelperId);
      if (card) {
        setSelectedCard(card);
      }
      setSelectedHelperId(undefined); // Limpiamos el ID después de usarlo
    }
  }, [selectedHelperId, setSelectedHelperId]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold dark:text-dark-highlight">Helper Cards</h2>
          </div>
          <FavoriteButton 
            toolId="helper-cards"
            toolName="Helper Cards"
            toolIcon="BookOpen"
          />
        </div>
        <p className="text-gray-600 dark:text-dark-text leading-relaxed">
          Helper Cards are cards that don't go in your deck but are used as tools to assist with gameplay. 
          They include markers to track special designations like Day/Night, The Monarch, City's Blessing, and The Ring. 
          While tokens and emblems are also part of this category, we've separated them into dedicated sections for easier use.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search helper cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-dark-text
            focus:border-purple-500 dark:focus:border-dark-accent focus:ring-purple-500 dark:focus:ring-dark-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Special handling for Dungeon cards */}
        {(searchTerm === '' || searchTerm.toLowerCase().includes('dungeon')) && (
          <>
            <DungeonCard />
            <UndercityCard />
          </>
        )}
        
        {/* Rest of the helper cards */}
        {filteredCards
          .filter(card => card.name !== 'Dungeon')
          .map(card => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`${getCardClasses(card)} rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${getIconBgClasses(card)} rounded-lg ${getIconClasses(card)}`}>
                      {card.name === 'Day/Night' 
                        ? renderIcon(isDay ? card.icon : card.nightIcon!)
                        : renderIcon(card.icon)
                      }
                    </div>
                    <h3 className={`text-lg font-semibold ${getTitleClasses(card)}`}>
                      {card.name}
                    </h3>
                  </div>
                  {(card.name === 'Day/Night' || 
                    card.name === 'Monarch' || 
                    card.name === "City's Blessing" ||
                    card.name === 'The Ring') && (
                    <div onClick={e => e.stopPropagation()}>
                      <FavoriteButton 
                        toolId={`helper-${card.id}`}
                        toolName={card.name}
                        toolIcon={card.name === 'Day/Night' 
                          ? (isDay ? card.icon : card.nightIcon!) 
                          : card.icon
                        }
                      />
                    </div>
                  )}
                </div>
                
                <p className={`mb-4 ${getTextClasses(card)}`}>
                  {card.description}
                </p>

                {card.powerToughness && (
                  <div className="mt-4 inline-block px-3 py-1 bg-gray-100 dark:bg-dark-accent/30 rounded text-sm font-medium text-gray-700 dark:text-dark-text">
                    {card.powerToughness}
                  </div>
                )}

                {card.hasCounter && (
                  <div 
                    className={`flex items-center justify-between mt-4 p-2 ${getCounterBgClasses(card)} rounded-lg`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleCounterChange(card.id, -1)}
                      className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-accent/50 ${getIconClasses(card)}`}
                    >
                      {renderIcon('Minus')}
                    </button>
                    <span className={getTitleClasses(card)}>
                      {counters[card.id] || 0}
                    </span>
                    <button
                      onClick={() => handleCounterChange(card.id, 1)}
                      className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-accent/50 ${getIconClasses(card)}`}
                    >
                      {renderIcon('Plus')}
                    </button>
                  </div>
                )}

                {card.name === 'The Ring' && (
                  <div className="mt-4">
                    <RingTimeline isCompact={true} />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {selectedCard && (
        <HelperCardModal
          card={selectedCard}
          onClose={() => {
            setSelectedCard(null);
            setSelectedHelperId(undefined);
          }}
        />
      )}
    </div>
  );
}