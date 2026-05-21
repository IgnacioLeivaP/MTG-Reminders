import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { phases } from '../../data/phases';
import { PhaseCard } from '../PhaseCard';
import { ReminderForm } from '../ReminderForm';
import { usePhaseStore } from '../../store/usePhaseStore';
import { useCountersStore } from '../../store/useCountersStore';
import { useRemindersStore } from '../../store/useRemindersStore';
import { FavoriteButton } from '../FavoriteButton';
import { useTranslation } from '../../i18n/useTranslation';

export function GamePhases() {
  const { activePhase, setActivePhase } = usePhaseStore();
  const { counters } = useCountersStore();
  const { addReminder, deleteReminder, hasReminder } = useRemindersStore();
  const t = useTranslation();

  const localizedPhases = phases.map(p => ({
    ...p,
    ...(t.phases[p.id] ?? {}),
  }));

  useEffect(() => {
    const radiationCount = counters['18'] || 0;
    const radiationReminderId = 'radiation-reminder';
    const hasRadiationReminder = hasReminder(radiationReminderId);

    if (radiationCount > 0 && !hasRadiationReminder) {
      addReminder(
        'Radiation: Mill cards equal to your rad counters. Lose 1 life and 1 rad counter for each nonland card milled.',
        'precombat-main',
        radiationReminderId
      );
    } else if (radiationCount === 0 && hasRadiationReminder) {
      deleteReminder(radiationReminderId);
    }
  }, [counters, addReminder, deleteReminder, hasReminder]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold dark:text-dark-highlight">{t.gamePhases.title}</h2>
          </div>
          <FavoriteButton toolId="game-phases" toolName="Game Phases" toolIcon="Clock" />
        </div>
        <p className="text-gray-600 dark:text-dark-text">{t.gamePhases.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        <div className="block lg:hidden space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-highlight">{t.gamePhases.addReminder}</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text">{t.gamePhases.addReminderDesc}</p>
              <ReminderForm />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {localizedPhases.map(phase => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              isActive={phase.id === activePhase}
              onClick={() => setActivePhase(phase.id)}
            />
          ))}
        </div>

        <div className="hidden lg:block lg:sticky lg:top-4 space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-highlight">{t.gamePhases.addReminder}</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text">{t.gamePhases.addReminderDesc}</p>
              <ReminderForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
