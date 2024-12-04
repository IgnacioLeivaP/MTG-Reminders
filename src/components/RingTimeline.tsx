import React from 'react';
import { useRingStore } from '../store/useRingStore';
import { Eye } from 'lucide-react';

interface RingTimelineProps {
  isCompact?: boolean;
  isVertical?: boolean;
}

const ringSteps = [
  'Your Ring-bearer is legendary and can\'t be blocked by creatures with greater power.',
  'Whenever your Ring-bearer attacks, draw a card, then discard a card.',
  'Whenever your Ring-bearer becomes blocked by a creature, that creature\'s controller sacrifices it at end of combat.',
  'Whenever your Ring-bearer deals combat damage to a player, each opponent loses 3 life.'
];

const getBackgroundColor = (index: number, isActive: boolean) => {
  if (!isActive) return 'bg-gray-100 dark:bg-dark-accent/30';
  
  switch (index) {
    case 0: return 'bg-orange-100 dark:bg-orange-900/30';
    case 1: return 'bg-orange-200 dark:bg-orange-800/30';
    case 2: return 'bg-red-200 dark:bg-red-900/30';
    case 3: return 'bg-red-300 dark:bg-red-800/30';
    default: return 'bg-gray-100 dark:bg-dark-accent/30';
  }
};

const getTextColor = (index: number, isActive: boolean) => {
  if (!isActive) return 'text-gray-400 dark:text-dark-text/50';
  
  switch (index) {
    case 0: return 'text-orange-800 dark:text-orange-200';
    case 1: return 'text-orange-900 dark:text-orange-100';
    case 2: return 'text-red-800 dark:text-red-200';
    case 3: return 'text-red-900 dark:text-red-100';
    default: return 'text-gray-400 dark:text-dark-text/50';
  }
};

export function RingTimeline({ isCompact = false, isVertical = false }: RingTimelineProps) {
  const { activeSteps, toggleStep } = useRingStore();

  const handleStepClick = (index: number) => {
    if (index === 0) {
      // If clicking first step, toggle between 0 and 1 steps
      if (activeSteps.length === 1 && activeSteps[0] === 0) {
        toggleStep(0); // Clear all steps
      } else {
        // Set only first step
        activeSteps.forEach(step => toggleStep(step)); // Clear all steps
        toggleStep(0); // Set first step
      }
    } else {
      // Can only activate if previous step is active
      if (!activeSteps.includes(index - 1)) return;
      
      // Can only activate next step in sequence
      if (index > activeSteps.length) return;
      
      toggleStep(index);
    }
  };

  return (
    <div className={`
      ${isVertical 
        ? 'flex flex-col gap-3 w-full max-w-xl mx-auto' 
        : 'flex gap-3 justify-center items-center'
      }
    `}>
      {ringSteps.map((step, index) => {
        const isActive = activeSteps.includes(index);
        const canBeActivated = index === 0 || activeSteps.includes(index - 1);
        
        return (
          <div
            key={index}
            className={`
              ${isVertical ? 'w-full' : 'w-[180px]'}
              ${getBackgroundColor(index, isActive)}
              rounded-lg p-3 transition-all duration-200
              ${canBeActivated ? 'cursor-pointer hover:shadow-md hover:scale-102' : 'opacity-50 cursor-not-allowed'}
            `}
            onClick={() => canBeActivated && handleStepClick(index)}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              {index === 3 ? (
                <Eye className={`w-5 h-5 ${isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-dark-text/50'}`} />
              ) : (
                <span className={`
                  text-lg font-medium 
                  ${getTextColor(index, isActive)}
                `}>
                  {index + 1}
                </span>
              )}
              {!isCompact && (
                <p className={`font-medium ${getTextColor(index, isActive)}`}>
                  Step {index + 1}
                </p>
              )}
            </div>
            {!isCompact && (
              <p className={`text-sm ${getTextColor(index, isActive)} leading-relaxed text-center`}>
                {step}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}