import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { phases } from '../../data/phases';
import { PhaseCard } from '../PhaseCard';
import { ReminderForm } from '../ReminderForm';
import { usePhaseStore } from '../../store/usePhaseStore';
import { useCountersStore } from '../../store/useCountersStore';
import { useRemindersStore } from '../../store/useRemindersStore';

export function GamePhases() {
  const { activePhase, setActivePhase } = usePhaseStore();
  const { counters } = useCountersStore();
  const { addReminder, deleteReminder, hasReminder } = useRemindersStore();

  // Check for radiation counters and manage reminder
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
      <div className="flex items-center space-x-3">
        <Clock className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Game Phases</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        {/* Mobile: Reminder Form appears first */}
        <div className="block lg:hidden space-y-6">
          <div className="bg-dark-bg rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Add Reminder</h3>
            <ReminderForm />
          </div>
        </div>

        {/* Phases List */}
        <div className="space-y-4">
          {phases.map(phase => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              isActive={phase.id === activePhase}
              onClick={() => setActivePhase(phase.id)}
            />
          ))}
        </div>

        {/* Desktop: Reminder Form on the side */}
        <div className="hidden lg:block lg:sticky lg:top-4 space-y-6">
          <div className="bg-dark-bg rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Add Reminder</h3>
            <ReminderForm />
          </div>
        </div>
      </div>
    </div>
  );
}