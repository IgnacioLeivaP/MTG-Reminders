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
import { SpeedTracker } from '../SpeedTracker';
import { FavoriteButton } from '../FavoriteButton';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useSpeedStore } from '../../store/useSpeedStore';
import { useTranslation } from '../../i18n/useTranslation';

type FilterMode = 'all' | 'interactive' | 'reference';

const INTERACTIVE_CARD_NAMES = ['Day/Night', 'The Ring', 'Monarch', "City's Blessing", 'Speed'];

const isInteractiveCard = (card: HelperCard) =>
  card.hasCounter || INTERACTIVE_CARD_NAMES.includes(card.name);

export function HelperCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState<HelperCard | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const selectedHelperId = useNavigationStore(state => state.selectedHelperId);
  const setSelectedHelperId = useNavigationStore(state => state.setSelectedHelperId);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { counters, setCounter } = useCountersStore();
  const { isDay } = useDayNightStore();
  const { isMonarch } = useMonarchStore();
  const { hasBlessing } = useCitysBlessingStore();
  const speed = useSpeedStore(state => state.speed);
  const t = useTranslation();

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

  const isSpeedActive = (card: HelperCard) => card.name === 'Speed' && speed > 0;

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
    if (card.name === 'Speed' && speed === 4) {
      return 'bg-gradient-to-br from-orange-500 to-red-600 text-white';
    }
    if (card.name === 'Speed' && speed > 0) {
      return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white';
    }
    if (isInteractiveCard(card)) {
      return 'bg-white dark:bg-dark-card';
    }
    return isDarkMode ? 'bg-gray-800/60' : 'bg-gray-100';
  };

  const getTextClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' ||
        (card.name === 'Monarch' && isMonarch) ||
        (card.name === "City's Blessing" && hasBlessing) ||
        isSpeedActive(card)) {
      return 'text-white';
    }
    return 'text-gray-600 dark:text-dark-text';
  };

  const getTitleClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' ||
        (card.name === 'Monarch' && isMonarch) ||
        (card.name === "City's Blessing" && hasBlessing) ||
        isSpeedActive(card)) {
      return 'text-white';
    }
    return 'text-gray-900 dark:text-dark-highlight';
  };

  const getIconBgClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night') return isDay ? 'bg-orange-400/50' : 'bg-blue-900/50';
    if (card.name === 'Monarch' && isMonarch) return isDarkMode ? 'bg-[#bb9b49]/50' : 'bg-[#b48811]';
    if (card.name === "City's Blessing" && hasBlessing) return isDarkMode ? 'bg-[#71f9ff]/20' : 'bg-sky-500';
    if (isSpeedActive(card)) return speed === 4 ? 'bg-red-700/50' : 'bg-orange-400/50';
    return 'bg-theme-surface dark:bg-dark-accent/50';
  };

  const getIconClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night' ||
        (card.name === 'Monarch' && isMonarch) ||
        (card.name === "City's Blessing" && hasBlessing) ||
        isSpeedActive(card)) {
      return 'text-white';
    }
    return 'text-theme-primary dark:text-dark-accent';
  };

  const getCounterBgClasses = (card: HelperCard) => {
    if (card.name === 'Day/Night') return isDay ? 'bg-orange-400/30' : 'bg-blue-900/30';
    if (card.name === 'Monarch' && isMonarch) return isDarkMode ? 'bg-[#ebd197]/20' : 'bg-[#ebd197]/40';
    return 'bg-gray-50 dark:bg-dark-accent/30';
  };

  const getInteractiveBorderClasses = (card: HelperCard) => {
    if (!isInteractiveCard(card)) return '';
    // Cards with active gradients already have their own borders — skip ring for those
    if (card.name === 'Day/Night') return '';
    if (card.name === 'Monarch' && isMonarch) return '';
    if (card.name === "City's Blessing" && hasBlessing) return '';
    if (isSpeedActive(card)) return '';
    return 'ring-2 ring-theme-primary/70/50 dark:ring-dark-accent/40';
  };

  const showDungeons =
    filterMode !== 'reference' &&
    (searchTerm === '' || searchTerm.toLowerCase().includes('dungeon'));

  const displayCards = filteredCards
    .filter(card => card.name !== 'Dungeon')
    .filter(card => {
      if (filterMode === 'interactive') return isInteractiveCard(card);
      if (filterMode === 'reference') return !isInteractiveCard(card);
      return true;
    })
    .sort((a, b) => {
      const aInteractive = isInteractiveCard(a);
      const bInteractive = isInteractiveCard(b);
      if (aInteractive && !bInteractive) return -1;
      if (!aInteractive && bInteractive) return 1;
      return 0;
    });

  useEffect(() => {
    if (selectedHelperId) {
      const card = helperCards.find(card => card.id === selectedHelperId);
      if (card) setSelectedCard(card);
      setSelectedHelperId(undefined);
    }
  }, [selectedHelperId, setSelectedHelperId]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-theme-primary dark:text-dark-accent" />
            <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.helperCards.title}</h2>
          </div>
          <FavoriteButton toolId="helper-cards" toolName="Helper Cards" toolIcon="BookOpen" />
        </div>
        <p className="text-gray-600 dark:text-dark-text leading-relaxed">{t.helperCards.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text/60 w-5 h-5" />
          <input
            type="text"
            placeholder={t.helperCards.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-dark-accent dark:bg-dark-card dark:text-dark-text
              focus:border-theme-primary dark:focus:border-dark-accent focus:ring-theme-primary dark:focus:ring-dark-accent transition-colors"
          />
        </div>

        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-dark-accent self-start sm:self-auto">
          {(['all', 'interactive', 'reference'] as FilterMode[]).map((mode) => {
            const label =
              mode === 'all' ? t.helperCards.filterAll :
              mode === 'interactive' ? t.helperCards.filterInteractive :
              t.helperCards.filterReference;
            return (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap
                  ${filterMode === mode
                    ? 'bg-theme-primary text-white dark:bg-dark-accent'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-accent/30'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showDungeons && (
          <>
            <DungeonCard />
            <UndercityCard />
          </>
        )}

        {displayCards.map(card => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`${getCardClasses(card)} ${getInteractiveBorderClasses(card)} rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col`}
          >
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${getIconBgClasses(card)} rounded-lg ${getIconClasses(card)}`}>
                    {card.name === 'Day/Night'
                      ? renderIcon(isDay ? card.icon : card.nightIcon!)
                      : renderIcon(card.icon)
                    }
                  </div>
                  <h3 className={`text-lg font-semibold ${getTitleClasses(card)}`}>{card.name}</h3>
                </div>
                {(card.name === 'Day/Night' ||
                  card.name === 'Monarch' ||
                  card.name === "City's Blessing" ||
                  card.name === 'The Ring' ||
                  card.name === 'Speed') && (
                  <div onClick={e => e.stopPropagation()}>
                    <FavoriteButton
                      toolId={`helper-${card.id}`}
                      toolName={card.name}
                      toolIcon={card.name === 'Day/Night' ? (isDay ? card.icon : card.nightIcon!) : card.icon}
                    />
                  </div>
                )}
              </div>

              <p className={`mb-4 ${getTextClasses(card)}`}>{card.description}</p>

              {card.powerToughness && (
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 dark:bg-dark-accent/30 rounded text-sm font-medium text-gray-700 dark:text-dark-text">
                  {card.powerToughness}
                </div>
              )}

              {card.hasCounter && <div className="flex-1" />}

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
                  <span className={getTitleClasses(card)}>{counters[card.id] || 0}</span>
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

              {card.name === 'Speed' && (
                <SpeedTracker isCompact={true} />
              )}
            </div>
          </div>
        ))}
      </div>

      {displayCards.length === 0 && !showDungeons && searchTerm !== '' && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-dark-text/60">{t.helperCards.noResults}</p>
        </div>
      )}

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
