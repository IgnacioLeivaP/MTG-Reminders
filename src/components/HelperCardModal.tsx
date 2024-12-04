import React from 'react';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { HelperCard } from '../types';
import { useDayNightStore } from '../store/useDayNightStore';
import { useMonarchStore } from '../store/useMonarchStore';
import { useCitysBlessingStore } from '../store/useCitysBlessingStore';
import { RingTimeline } from './RingTimeline';
import { CitysBlessingRules } from './CitysBlessingRules';
import { useThemeStore } from '../store/useThemeStore';

interface HelperCardModalProps {
  card: HelperCard;
  onClose: () => void;
}

export function HelperCardModal({ card, onClose }: HelperCardModalProps) {
  const { isDay, setIsDay } = useDayNightStore();
  const { isMonarch, setIsMonarch } = useMonarchStore();
  const { hasBlessing, setHasBlessing } = useCitysBlessingStore();
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className="w-16 h-16" /> : null;
  };

  const getDayNightDescription = () => {
    if (card.name !== 'Day/Night') return card.description;
    
    return isDay
      ? "As it becomes day, transform all nightbound permanents.\n\nIf a player casts no spells during their own turn, it becomes night next turn."
      : "As it becomes night, transform all daybound permanents.\n\nPermanents enter the battlefield nightbound.\n\nIf a player casts at least two spells during their own turn, it becomes day next turn.";
  };

  const handleDayNightToggle = (newIsDay: boolean) => {
    if (card.name === 'Day/Night') {
      setIsDay(newIsDay);
    }
  };

  const getModalClasses = () => {
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

  const getTextClasses = () => {
    if (card.name === 'Day/Night' || 
        (card.name === 'Monarch' && isMonarch) || 
        (card.name === "City's Blessing" && hasBlessing)) {
      return 'text-white';
    }
    return 'text-gray-700 dark:text-dark-text';
  };

  const getHeaderClasses = () => {
    if (card.name === 'Day/Night') {
      return isDay ? 'bg-[#e05e00]' : 'bg-[#03013c] border-b-2 border-[#6e49e1]';
    }
    if (card.name === 'Monarch' && isMonarch) {
      return isDarkMode ? 'bg-[#bb9b49]' : 'bg-[#b48811]';
    }
    if (card.name === "City's Blessing" && hasBlessing) {
      return isDarkMode ? 'bg-[#3f939a]' : 'bg-sky-600';
    }
    return 'bg-purple-600 dark:bg-dark-accent';
  };

  const getDescriptionBoxClasses = () => {
    if (card.name === 'Day/Night') {
      return isDay ? 'bg-orange-100/20' : 'bg-blue-900/20';
    }
    if (card.name === 'Monarch' && isMonarch) {
      return isDarkMode ? 'bg-[#ebd197]/20' : 'bg-[#ebd197]/40';
    }
    if (card.name === "City's Blessing" && hasBlessing) {
      return isDarkMode ? 'bg-[#0c1923]/40' : 'bg-sky-100';
    }
    return 'bg-gray-50 dark:bg-dark-accent/30';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${getModalClasses()} rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative transition-colors duration-300`}>
        <div className={`${getHeaderClasses()} text-white p-6 transition-colors duration-300`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-opacity-75"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">{card.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              {card.nightIcon ? (
                <div className="flex items-center space-x-8">
                  <div 
                    className={`flex flex-col items-center cursor-pointer transition-transform ${isDay ? 'scale-110' : 'opacity-50 hover:opacity-75'}`}
                    onClick={() => handleDayNightToggle(true)}
                  >
                    <div className="p-4 bg-orange-100/20 rounded-full mb-2">
                      {renderIcon(card.icon)}
                    </div>
                    <span className={`text-sm font-medium ${getTextClasses()}`}>Day</span>
                  </div>
                  <div 
                    className={`flex flex-col items-center cursor-pointer transition-transform ${!isDay ? 'scale-110' : 'opacity-50 hover:opacity-75'}`}
                    onClick={() => handleDayNightToggle(false)}
                  >
                    <div className="p-4 bg-blue-900/20 rounded-full mb-2">
                      <div className="text-white">
                        {renderIcon(card.nightIcon)}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${getTextClasses()}`}>Night</span>
                  </div>
                </div>
              ) : (
                <div className={`p-4 ${
                  card.name === 'Monarch' && isMonarch 
                    ? isDarkMode ? 'bg-[#bb9b49]/50 text-white' : 'bg-[#b48811] text-white'
                    : card.name === "City's Blessing" && hasBlessing
                      ? isDarkMode ? 'bg-[#71f9ff]/20 text-white' : 'bg-sky-500 text-white'
                      : 'bg-purple-100 dark:bg-dark-accent/50'
                } rounded-full mb-4`}>
                  {renderIcon(card.icon)}
                </div>
              )}
            </div>

            <div className={`${getDescriptionBoxClasses()} rounded-lg p-4 mb-4 transition-colors duration-300`}>
              <p className={`${getTextClasses()} text-lg leading-relaxed whitespace-pre-line transition-colors duration-300`}>
                {getDayNightDescription()}
              </p>
            </div>

            {card.name === 'Day/Night' && (
              <div className={`${getDescriptionBoxClasses()} rounded-lg p-4 mb-4 transition-colors duration-300`}>
                <p className={`${getTextClasses()} text-sm italic transition-colors duration-300`}>
                  (If it becomes day or night or if a daybound permanent enters the battlefield, track day/night for the rest of the game.)
                </p>
              </div>
            )}

            {card.name === 'Monarch' && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsMonarch(!isMonarch)}
                  className={`px-6 py-3 rounded-lg font-medium text-lg transition-all
                    ${isMonarch 
                      ? isDarkMode
                        ? 'bg-[#bb9b49] text-white hover:bg-[#b48811]'
                        : 'bg-[#b48811] text-white hover:bg-[#a2790d]'
                      : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-highlight'}`}
                >
                  {isMonarch ? 'Relinquish Crown' : 'Claim Crown'}
                </button>
              </div>
            )}

            {card.name === "City's Blessing" && (
              <>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setHasBlessing(!hasBlessing)}
                    className={`px-6 py-3 rounded-lg font-medium text-lg transition-all
                      ${hasBlessing 
                        ? isDarkMode 
                          ? 'bg-[#71f9ff] text-[#0c1923] hover:bg-[#71f9ff]/90' 
                          : 'bg-sky-500 text-white hover:bg-sky-600'
                        : 'bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-highlight'}`}
                  >
                    {hasBlessing ? 'Remove Blessing' : 'Receive Blessing'}
                  </button>
                </div>
                <div className="mt-8">
                  <CitysBlessingRules />
                </div>
              </>
            )}

            {card.name === 'The Ring' && (
              <>
                <div className="mt-6 mb-6">
                  <RingTimeline isVertical={true} />
                </div>
                <div className={`bg-gray-50 dark:bg-dark-accent/30 rounded-lg p-4 space-y-4`}>
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-3">The Ring Tempts You</h3>
                  <p className="text-gray-700 dark:text-dark-text leading-relaxed">
                    As the Ring tempts you, you get an emblem named The Ring if you don't have one. Then your emblem gains its next ability and you choose a creature you control to become or remain your Ring-bearer.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-dark-text">
                    <li>The Ring can tempt you even if you don't control a creature.</li>
                    <li>The Ring gains its abilities in order from top to bottom. Once it gains an ability, it has that ability for the rest of the game.</li>
                    <li>Each time the Ring tempts you, you must choose a creature if you control one.</li>
                    <li>Each player can have only one emblem named The Ring and only one Ring-bearer at a time.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}