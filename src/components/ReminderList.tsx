import React from 'react';
import { useRemindersStore } from '../store/useRemindersStore';
import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface ReminderListProps {
  phaseId: string;
}

export function ReminderList({ phaseId }: ReminderListProps) {
  const reminders = useRemindersStore(state => 
    state.reminders.filter(r => r.phase === phaseId)
  );
  const toggleReminder = useRemindersStore(state => state.toggleReminder);
  const deleteReminder = useRemindersStore(state => state.deleteReminder);

  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {reminders.map(reminder => (
        <div
          key={reminder.id}
          className={`p-2 rounded-lg border ${
            reminder.isActive 
              ? 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-accent' 
              : 'bg-gray-50 dark:bg-dark-bg border-gray-100 dark:border-dark-card'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`${reminder.isActive ? 'text-gray-800 dark:text-dark-text' : 'text-gray-500 dark:text-dark-text/50 line-through'}`}>
              {reminder.text}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => toggleReminder(reminder.id)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent/50"
              >
                {reminder.isActive 
                  ? <ToggleRight className="w-4 h-4 text-green-500 dark:text-green-400" />
                  : <ToggleLeft className="w-4 h-4 text-gray-400 dark:text-dark-text/50" />
                }
              </button>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent/50"
              >
                <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}